// import Image from "next/image";
// import localFont from "next/font/local";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export default function Home() {
//   return <div>Home</div>;
// }

import { SetStateAction, useEffect, useState } from "react";
import Scene from "../components/scene";
import Projects from "../components/projects";
import Lenis from "lenis";

export default function Home() {
  const [activeMenu, setActiveMenu] = useState(null);
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <main>
      <div className="h-[50vh]"></div>
      <Projects
        setActiveMenu={(value: SetStateAction<number | null>) =>
          setActiveMenu(value as SetStateAction<null>)
        }
      />
      <Scene activeMenu={activeMenu} />
      <div className="h-[50vh]"></div>
    </main>
  );
}
