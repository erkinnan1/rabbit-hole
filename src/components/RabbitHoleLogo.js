import React from 'react';

   const RabbitHoleLogo = () => (
     <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
       <circle cx="50" cy="50" r="40" fill="#8B4513" /> {/* Rabbit hole */}
       <circle cx="50" cy="20" r="15" fill="#FFF" /> {/* Rabbit body */}
       <circle cx="50" cy="10" r="10" fill="#FFF" /> {/* Rabbit head */}
       <ellipse cx="45" cy="8" rx="2" ry="3" fill="#000" /> {/* Left eye */}
       <ellipse cx="55" cy="8" rx="2" ry="3" fill="#000" /> {/* Right eye */}
       <ellipse cx="50" cy="12" rx="1" ry="2" fill="#FFA07A" /> {/* Nose */}
       <path d="M40 20 Q50 30 60 20" stroke="#000" strokeWidth="2" fill="none" /> {/* Mouth */}
       <path d="M45 0 Q47 10 40 15" stroke="#FFF" strokeWidth="2" fill="none" /> {/* Left ear */}
       <path d="M55 0 Q53 10 60 15" stroke="#FFF" strokeWidth="2" fill="none" /> {/* Right ear */}
     </svg>
   );

   export default RabbitHoleLogo;