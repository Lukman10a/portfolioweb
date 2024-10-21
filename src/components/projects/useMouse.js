// import { useMotionValue } from "framer-motion";
// import { useEffect } from "react";

// export default function useMouse() {
//   const mouse = {
//     x: useMotionValue(0),
//     y: useMotionValue(0),
//   };

//   const mouseMove = (e) => {
//     const { clientX, clientY } = e;
//     mouse.x.set(clientX);
//     mouse.y.set(clientY);
//   };

//   useEffect(() => {
//     window.addEventListener("mousemove", mouseMove);
//     return () => window.removeEventListener("mousemove", mouseMove);
//   }, []);

//   return mouse;
// }

import { useMotionValue } from "framer-motion";
import { useEffect, useCallback } from "react";

export default function useMouse() {
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  // Use useCallback to memoize the mouseMove function
  const mouseMove = useCallback(
    (e) => {
      const { clientX, clientY } = e;
      mouse.x.set(clientX);
      mouse.y.set(clientY);
    },
    [mouse.x, mouse.y]
  ); // Include mouse.x and mouse.y as dependencies

  useEffect(() => {
    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, [mouseMove]); // Add mouseMove to the dependency array

  return mouse;
}
