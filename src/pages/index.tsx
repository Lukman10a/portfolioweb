import Scene from "@/components/scene";
import Projects from "@/components/Projects";
import { useEffect, useState } from "react";
import Lenis from "lenis";

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
      <Scene activeMenu={activeMenu} />
      <div className="h-[50vh]"></div>
      <Projects setActiveMenu={setActiveMenu} />
      <div className="h-[50vh]"></div>
    </main>
  );
}
