export const parseOutlines = (rawOutlines) => {
    try {
      // Split the raw text into sections, ignoring empty lines
      const sections = rawOutlines.split(/\d+\.\s*/).filter(Boolean);
      
      return sections.map(section => {
        const lines = section.split('\n').filter(Boolean);
        const title = lines[0].trim();
        const points = lines.slice(1).map(point => point.replace(/^-\s*/, '').trim());
        
        return { title, points };
      });
    } catch (error) {
      console.error('Error parsing outlines:', error);
      // Return a default structure if parsing fails
      return [{ title: 'Interesting Topic', points: ['Explore this topic further'] }];
    }
  };
  
  export const parseNewPrompts = (rawPrompts) => {
    try {
      // Split the raw text into lines and filter out any empty lines
      const lines = rawPrompts.split('\n').filter(Boolean);
      
      // Extract prompts, assuming they're the last two non-empty lines
      // If there aren't at least two lines, use default prompts
      const prompts = lines.slice(-2).map(line => line.replace(/^\d+\.\s*/, '').trim());
      
      // Ensure we always return exactly two prompts
      while (prompts.length < 2) {
        prompts.push('Explore related topics');
      }
      
      return prompts.slice(0, 2); // Return only the first two prompts
    } catch (error) {
      console.error('Error parsing new prompts:', error);
      // Return default prompts if parsing fails
      return ['Explore related topics', 'Discover more'];
    }
  };