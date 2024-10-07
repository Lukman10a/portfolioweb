import React from "react";
import { projects } from "../../data";
import Image from "next/image"; // Import the Image component from next/image

interface ProjectProps {
  setActiveMenu: (value: number | null) => void;
}
export default function Projects({ setActiveMenu }: ProjectProps) {
  return (
    <div className="relative mix-blend-difference z-10 text-white h-screen w-full">
      <ul
        onMouseLeave={() => {
          setActiveMenu(null);
        }}
        className="border-b"
      >
        {projects.map((project, i) => {
          return (
            <li
              onMouseOver={() => {
                setActiveMenu(i);
              }}
              key={project.title}
              className="text-[4vw] p-5 border-t flex items-center"
            >
              <p className="mr-2">{project.title}</p>
              {/* <Image
                src={project.img || "/images/default.png"} // Fallback image in case img is undefined
                alt={project.title}
                width={100}
                height={100}
                onError={(e) => {
                  // Optional: handle image load error to display fallback image
                  e.currentTarget.src = "/images/default.png";
                }}
              /> */}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
