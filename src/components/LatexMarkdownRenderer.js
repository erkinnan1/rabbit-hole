import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

const LatexMarkdownRenderer = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        p: ({node, ...props}) => <p style={{whiteSpace: 'pre-wrap'}} {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default LatexMarkdownRenderer;