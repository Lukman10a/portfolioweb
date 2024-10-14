import { motion } from "framer-motion-3d";
import { useRef } from "react";
import { useMotionValue, useTransform } from "framer-motion";
import useDimension from "./useDimension";
import useMouse from "./useMouse";
import { useFrame, useThree } from "@react-three/fiber";
import { fragment, vertex } from "./shader";
import { useTexture } from "@react-three/drei";

export default function Model() {
  const mesh = useRef();
  const dimension = useDimension();
  const mouse = useMouse();
  const { viewport } = useThree();

  const texture = useTexture("/images/img2.png");

  // Smooth mouse position
  const smoothMouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const uniforms = useRef({
    uTexture: { value: texture },
    uDelta: { value: { x: 0, y: 0 } },
  });

  const lerp = (x, y, a) => x * (1 - a) + y * a;

  useFrame(() => {
    const { x, y } = mouse;
    const smoothx = smoothMouse.x.get();
    const smoothy = smoothMouse.y.get();
    smoothMouse.x.set(lerp(smoothMouse.x.get(), x.get(), 0.1));
    smoothMouse.y.set(lerp(smoothMouse.y.get(), y.get(), 0.1));
    mesh.current.material.uniforms.uDelta.value = {
      x: x.get() - smoothx,
      y: y.get() - smoothy,
    };
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
    <motion.mesh ref={mesh} position-x={x} position-y={y}>
      <planeGeometry args={[2, 3, 12, 12]} />
      {/* <motion.meshBasicMaterial wireframe color={"blue"} /> */}
      <shaderMaterial
        fragmentShader={fragment}
        vertexShader={vertex}
        uniforms={uniforms.current}
      />
    </motion.mesh>
  );
}
