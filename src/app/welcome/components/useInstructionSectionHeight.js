import { useEffect, useCallback } from 'react';

const useInstructionSectionHeight = () => {
  const fixWelcomeSectionHeight = useCallback(() => {
    const detectWidth = window.innerWidth;
    const parentBox = document.getElementById("instruction-section");
    const childBox1 = document.getElementById("black-box");
    const childBox2 = document.getElementById("instruction-box");
    
    if (parentBox !== null && childBox1 && childBox2) {
      if (detectWidth <= 768) {
        parentBox.style.height = "auto";
        return;
      }
      
      const childBox1Height = childBox1.offsetHeight;
      const childBox2Height = childBox2.offsetHeight;
      
      let highestHeight = childBox1Height > childBox2Height ? childBox1Height : childBox2Height;
      
      if (highestHeight === childBox2Height) {
        highestHeight += 80;
      }
      
      parentBox.style.height = highestHeight + "px";
    }
  }, []);

  const handleScrollToInstruction = useCallback(() => {
    const instructionBox = document.getElementById("instruction-box");
    if (instructionBox) {
      window.scrollBy({
        top: instructionBox.getBoundingClientRect().top,
        left: 0,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    const handleResize = () => fixWelcomeSectionHeight();
    
    // Initial calculation after component mounts
    const timer = setTimeout(() => {
      fixWelcomeSectionHeight();
    }, 100); // Small delay to ensure DOM is ready
    
    // Add event listeners
    window.addEventListener("load", fixWelcomeSectionHeight);
    window.addEventListener("resize", handleResize);
    
    // Cleanup
    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", fixWelcomeSectionHeight);
      window.removeEventListener("resize", handleResize);
    };
  }, [fixWelcomeSectionHeight]);

  return {
    handleScrollToInstruction,
  };
};

export default useInstructionSectionHeight;