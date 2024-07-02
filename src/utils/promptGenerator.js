export const prompts = {
    initialPrompt: (topic) => `Generate 3-5 really interesting things about "${topic}" that a user can learn about. For each interesting thing, provide a brief outline. Your response should be in the following format:
  
  1. [Interesting Thing 1]
     - Brief outline point 1
     - Brief outline point 2
     - Brief outline point 3
  
  2. [Interesting Thing 2]
     - Brief outline point 1
     - Brief outline point 2
     - Brief outline point 3
  
  ... and so on.
  
  Be creative and try to cover diverse aspects of the topic that might surprise or intrigue the user.`,
  
    tabContentPrompt: (topic, outlinePoint) => `Provide an in-depth exploration of the following aspect of "${topic}":
  
  ${outlinePoint}
  
  Your response should be comprehensive and engaging. Don't constrain the length - cover the topic thoroughly. Include relevant examples, historical context, current applications, and future implications where appropriate.`,
  
    newPromptsGenerator: (tabContent) => `Based on the following content about a topic, generate 2 new interesting subject prompts that a user might want to explore next. These should be related but not directly covered in the given content. Your response should be brief and to the point, just listing the two new prompts.
  
  Content:
  ${tabContent}
  
  Generate 2 new interesting subject prompts:`
  };