import React from "react";
import Model from "./model";
import { Canvas } from "@react-three/fiber";

export default function Scene() {
  return (
    <div className="relative h-screen">
      <Canvas>
        <Model />
      </Canvas>
    </div>
  );
}
