"use client";

import React, { useRef } from "react";
import styles from "././styles.module.css";
import { motion, useInView } from "framer-motion";

const ClipElement = ({
  containerBg = "bg-pryma-main",
  topbg = "bg-pryma-forest",
  bottomBg = "bg-pryma-ivory",
}: {
  containerBg?: string;
  topbg?: string;
  bottomBg?: string;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref);

  const animationVariant = {
    visible: {
      scaleY: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
    hidden: {
      scaleY: 0,
    },
  };

  return (
    <section
      ref={ref}
      className={`${containerBg} relative h-72 overflow-hidden md:h-56`}
    >
      <motion.div
        // initial="hidden"
        // animate={inView ? "visible" : "hidden"}
        // variants={animationVariant}
        // viewport={{ once: true }}
        className={`${styles.section_transition_light_dark_lower_block} ${bottomBg} absolute -left-1/2 right-0 top-1/2 z-[5] h-72 w-[200%] origin-[50%] md:h-56`}
      ></motion.div>
      <motion.div
        className={`${styles.section_transition_light_dark_higher_block} ${topbg} absolute -left-1/2 right-0 top-1/2 z-[6] h-72 w-[200%] origin-[50%] md:h-56`}
      ></motion.div>
    </section>
  );
};

export default ClipElement;
