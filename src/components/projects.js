import React from "react";
import { projects } from "../../data";

export default function Projects() {
  return (
    <div className="relative mix-blend-difference z-10 text-white h-screen w-full">
      <ul className="border-b">
        {projects.map((project, i) => {
          return (
            <li key={project.title} className="text-[4vw] p-5 border-t">
              <p>{project.title}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
