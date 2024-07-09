import React, { useEffect, useRef } from 'react';
import { useLearningContext } from '../contexts/LearningContext';

const getRandomColor = () => {
  const colors = ['#4CAF50', '#2196F3', '#FFC107', '#E91E63', '#9C27B0', '#00BCD4'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const JourneyMap = () => {
  const { history } = useLearningContext();
  const svgRef = useRef(null);

  useEffect(() => {
    if (history.length > 0 && svgRef.current) {
      const svg = svgRef.current;
      const svgNS = "http://www.w3.org/2000/svg";

      // Clear previous content
      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }

      // Create nodes and connections
      history.forEach((topic, index) => {
        const x = 80 + index * 160;
        const y = 75;

        // Create connection line (except for the first node)
        if (index > 0) {
          const line = document.createElementNS(svgNS, "path");
          line.setAttribute("d", `M${x - 160},${y} C${x - 80},${y - 40} ${x - 80},${y + 40} ${x},${y}`);
          line.setAttribute("fill", "none");
          line.setAttribute("stroke", "#999");
          line.setAttribute("stroke-width", 2);
          svg.appendChild(line);
        }

        // Create node
        const circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", 20);
        circle.setAttribute("fill", getRandomColor());
        svg.appendChild(circle);

        // Create label
        const text = document.createElementNS(svgNS, "text");
        text.setAttribute("x", x);
        text.setAttribute("y", y + 35);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("fill", "black");
        text.setAttribute("font-size", "12px");
        text.setAttribute("font-weight", "bold");
        
        // Wrap text if it's too long
        const words = topic.split(' ');
        let line = '';
        let lineNumber = 0;
        const lineHeight = 14;
        words.forEach(word => {
          const testLine = line + word + ' ';
          if (testLine.length > 15) {
            const tspan = document.createElementNS(svgNS, "tspan");
            tspan.setAttribute("x", x);
            tspan.setAttribute("dy", `${lineNumber * lineHeight}px`);
            tspan.textContent = line;
            text.appendChild(tspan);
            line = word + ' ';
            lineNumber++;
          } else {
            line = testLine;
          }
        });
        const tspan = document.createElementNS(svgNS, "tspan");
        tspan.setAttribute("x", x);
        tspan.setAttribute("dy", `${lineNumber * lineHeight}px`);
        tspan.textContent = line;
        text.appendChild(tspan);

        svg.appendChild(text);
      });

      // Update SVG viewBox to fit all nodes
      const width = Math.max(240, history.length * 160);
      svg.setAttribute("viewBox", `0 0 ${width} 180`);
    }
  }, [history]);

  return (
    <div className="journey-map">
      <h3>Your Learning Journey</h3>
      <svg ref={svgRef} width="100%" height="180"></svg>
    </div>
  );
};

export default JourneyMap;