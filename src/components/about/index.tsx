import SectionHeading from "./sectionHeading";
import SideText from "./sideText";

const About = () => {
  return (
    <section className="flex gap-16 bg-pryma-ivory px-10 py-28 text-pryma-main md:px-10 md:py-20 relative overflow-hidden">
      {/* Side Text with Animation */}
      <div className="self-center sm:hidden animate-slideInLeft delay-200">
        <SideText />
      </div>

      <div className="flex-1">
        {/* Section Heading with Bounce Animation */}
        <div className="animate-bounceIn">
          <SectionHeading underLinedword="About" othersWords="Me" />
        </div>

        <div className="flex items-center gap-14 lg:flex-col md:gap-11">
          {/* Large Letter 'A' with a Rotating Animation */}
          <p className="font-montserrat text-[400px] lg:text-[300px] md:text-[200px] animate-rotateIn [-webkit-text-fill-color:transparent] [-webkit-text-stroke:2px_#1a1f1e]">
            A
          </p>

          {/* About Text Section with Fade and Slide Animation */}
          <div className="space-y-8 animate-fadeInUp">
            <h4 className="w-4/5 font-montserrat text-3xl text-pryma-main animate-scaleIn">
              Building Web & Mobile Apps{" "}
              <span className="text-[#88a09d]">Precision & Passion</span>
            </h4>
            <div className="max-w-3xl space-y-3 text-2xl font-light md:text-lg animate-fadeInUp delay-300">
              <p>
                As a seasoned developer with over four years of hands-on
                experience, I specialize in creating efficient, scalable, and
                visually striking web and mobile applications. My expertise
                spans front-end frameworks, including React, React Native,
                Next.js, TypeScript, and Tailwind CSS.
              </p>
              <p>
                Whether building pixel-perfect interfaces for mobile or
                developing dynamic web apps, I am passionate about delivering
                seamless user experiences. I am dedicated to writing clean,
                maintainable code and thrive in Agile environments, where
                collaboration and innovation drive success.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Animation */}
      <div className="absolute bottom-[-50px] right-[-50px] w-64 h-64 bg-pryma-accent rounded-full animate-float"></div>
    </section>
  );
};

export default About;
