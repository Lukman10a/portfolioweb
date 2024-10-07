"use client";
import { Canvas } from "@react-three/fiber";
import React from "react";
import Model from "../components/model";

interface SceneProps {
  activeMenu?: number | null;
}
export default function Scene({ activeMenu = 0 }: SceneProps) {
  return (
    <div className="fixed top-0 h-screen w-full">
      <Canvas>
        {typeof activeMenu === "number" && <Model activeMenu={activeMenu} />}{" "}
      </Canvas>
    </div>
  );
}
