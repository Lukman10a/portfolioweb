import { motion } from "framer-motion-3d";
import React, { useEffect } from "react";
import { useRef } from "react";
import { animate, progress, useMotionValue, useTransform } from "framer-motion";
import useDimension from "./useDimension";
import useMouse from "./useMouse";
import { useFrame, useThree } from "@react-three/fiber";
import { fragment, vertex } from "./shader";
import { useAspect, useTexture } from "@react-three/drei";
import { projects } from "../../data";

export default function Model({ activeMenu }) {
  const mesh = useRef();
  const dimension = useDimension();
  const mouse = useMouse();
  const { viewport } = useThree();
  const textures = projects.map((project) => useTexture(project.img));
  const opacity = useMotionValue(0);

  const scale = useAspect(
    textures[0].image.width,
    textures[0].image.height,
    0.225
  );

  // Smooth mouse position
  const smoothMouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const uniforms = useRef({
    uTexture: { value: textures[0] },
    uDelta: { value: { x: 0, y: 0 } },
    uOpacity: { value: 1 },
  });

  useEffect(() => {
    if (activeMenu != null) {
      animate(opacity, 1, {
        duration: 0.2,
        onUpdate: (progress) =>
          (mesh.current.material.uniforms.uOpacity.value = progress),
      });
      mesh.current.material.uniforms.uTexture.value = textures[activeMenu];
    } else
      animate(opacity, 0, {
        duration: 0.2,
        onUpdate: (progress) =>
          (mesh.current.material.uniforms.uOpacity.value = progress),
      });
  }, [activeMenu]);

  const lerp = (x, y, a) => x * (1 - a) + y * a;

  useFrame(() => {
    const { x, y } = mouse;
    const smoothx = smoothMouse.x.get();
    const smoothy = smoothMouse.y.get();
    smoothMouse.x.set(lerp(smoothMouse.x.get(), x.get(), 0.1));
    smoothMouse.y.set(lerp(smoothMouse.y.get(), y.get(), 0.1));
    mesh.current.material.uniforms.uDelta.value = {
      x: x.get() - smoothx,
      y: -1 * (y.get() - smoothy),
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
    <motion.mesh scale={scale} ref={mesh} position-x={x} position-y={y}>
      <planeGeometry args={[1, 2, 12, 12]} />
      <shaderMaterial
        fragmentShader={fragment}
        vertexShader={vertex}
        uniforms={uniforms.current}
        transparent
      />
    </motion.mesh>
  );
}
