import { useState, useEffect } from "react";

interface Viewport {
  width: number;
  height: number;
  keyboardOpen: boolean;
  keyboardHeight: number;
}

export default function useViewport() {
  const [viewport, setViewport] = useState<Viewport>({
    width: 0,
    height: 0,
    keyboardOpen: false,
    keyboardHeight: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.visualViewport) {
      const handleResize = () => {
        if (window.visualViewport) {
          const currentWidth = window.visualViewport.width;
          const currentHeight = window.visualViewport.height;
          const keyboardHeight = window.innerHeight - currentHeight;
          const isKeyboardOpen = keyboardHeight > 100; // Adjust this threshold as needed

          setViewport({
            width: currentWidth,
            height: currentHeight,
            keyboardOpen: isKeyboardOpen,
            keyboardHeight: isKeyboardOpen ? keyboardHeight : 0,
          });
        }
      };
      // Set initial dimensions
      handleResize();

      window.visualViewport.addEventListener("resize", handleResize);
      window.visualViewport.addEventListener("scroll", handleResize);

      // Cleanup event listeners on unmount
      return () => {
        window.visualViewport?.removeEventListener("resize", handleResize);
        window.visualViewport?.removeEventListener("scroll", handleResize);
      };
    }
  }, []);

  return viewport;
}
