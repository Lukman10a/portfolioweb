import { motion } from "framer-motion-3d";
import useMouse from "./useMouse";
import React from "react";
import { useMotionValue, useTransform } from "framer-motion";
import useDimension from "./useDimension";
import { useFrame, useThree } from "@react-three/fiber";
import { fragment, vertex } from "../shader";
// import { ShaderMaterial } from "three";

export default function Model() {
  const dimension = useDimension();
  const mouse = useMouse();
  const { viewport } = useThree();
  console.log(viewport);

  // Smooth mouse position
  const smoothMouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const lerp = (x, y, a) => x * (1 - a) + y * a;

  useFrame(() => {
    const { x, y } = mouse;
    smoothMouse.x.set(lerp(smoothMouse.x.get(), x.get(), 0.1));
    smoothMouse.y.set(lerp(smoothMouse.y.get(), y.get(), 0.1));
  });

  const x = useTransform(
    smoothMouse.x,
    [0, dimension.width],
    [(-1 * viewport.width) / 2, viewport.width / 2]
  );
  const y = useTransform(
    smoothMouse.y,
    [0, dimension.height],
    [viewport.height / 2, (-1 * viewport.height) / 2]
  );

  return (
    <motion.mesh position-x={x} position-y={y}>
      <planeGeometry args={[2, 3, 12, 12]} />
      {/* <motion.meshBasicMaterial wireframe color={"blue"} /> */}
      <shaderMaterial />
    </motion.mesh>
  );
}
