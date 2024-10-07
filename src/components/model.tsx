import React, { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { animate, useMotionValue, useTransform } from "framer-motion";
import { vertex, fragment } from "../components/shader";
import { useTexture, useAspect } from "@react-three/drei";
import useMouse from "../lib/useMouse";
import useDimension from "../lib/useDimension";
import { projects } from "../../data";
import * as THREE from "three"; // Importing the THREE namespace
import { Mesh } from "three";

interface ModelProps {
  activeMenu: number;
}

export default function Model({ activeMenu }: ModelProps) {
  const plane = useRef<THREE.Mesh>(null!); // Use non-null assertion for TypeScript
  const { viewport } = useThree();
  const dimension = useDimension();
  const mouse = useMouse();
  const opacity = useMotionValue(0);

  const textures = projects.map((project) => useTexture(project.img));
  const { width, height } = textures[0].image;
  const lerp = (x: number, y: number, a: number): number => x * (1 - a) + y * a;

  const scale = useAspect(width, height, 0.225);
  const smoothMouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  // Initialize uniforms with default values
  const uniforms = useRef<{
    uDelta: { value: { x: number; y: number } };
    uAmplitude: { value: number };
    uTexture: { value: THREE.Texture };
    uAlpha: { value: number };
  }>({
    uDelta: { value: { x: 0, y: 0 } },
    uAmplitude: { value: 0.0 },
    uTexture: { value: textures[0] }, // Set a default texture
    uAlpha: { value: 0.0 },
  });

  useEffect(() => {
    if (plane.current && plane.current.material) {
      const material = plane.current.material as THREE.ShaderMaterial;

      if (activeMenu !== null && material.uniforms) {
        material.uniforms.uTexture.value = textures[activeMenu];
        animate(opacity, 1, {
          duration: 0.2,
          onUpdate: (latest) => (material.uniforms.uAlpha.value = latest),
        });
      } else {
        animate(opacity, 0, {
          duration: 0.2,
          onUpdate: (latest) => (material.uniforms.uAlpha.value = latest),
        });
      }
    }
  }, [activeMenu]);

  useFrame(() => {
    const { x, y } = mouse;
    const smoothX = smoothMouse.x.get();
    const smoothY = smoothMouse.y.get();

    if (plane.current && plane.current.material) {
      const material = plane.current.material as THREE.ShaderMaterial;

      if (Math.abs(x - smoothX) > 1) {
        smoothMouse.x.set(lerp(smoothX, x, 0.1));
        smoothMouse.y.set(lerp(smoothY, y, 0.1));

        if (material.uniforms) {
          material.uniforms.uDelta.value = {
            x: x - smoothX,
            y: -1 * (y - smoothY),
          };
        }
      }
    }
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
    <motion.mesh position-x={x} position-y={y} ref={plane} scale={scale}>
      <planeGeometry args={[1, 1, 15, 15]} />
      <shaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms.current} // Using initialized uniforms
        transparent={true}
      />
    </motion.mesh>
  );
}
