import Scene from "@/components/projects/scene";
import Projects from "@/components/projects/projects";
import { useEffect, useState } from "react";
import Lenis from "lenis";
import About from "@/components/about";
import ClipElement from "@/components/about/clipElement";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <main>
      <ClipElement bottomBg="bg-pryma-forest500" topbg="bg-pryma-ivory" />
      <About />
      <ClipElement
        containerBg="bg-pryma-ivory"
        bottomBg="bg-pryma-forest500"
        topbg="bg-pryma-main"
      />
      <Scene activeMenu={activeMenu} />
      <div className="p-10">
        <Projects setActiveMenu={setActiveMenu} />
      </div>
    </main>
  );
}
