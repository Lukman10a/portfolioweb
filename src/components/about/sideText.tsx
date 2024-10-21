import React from "react";
import styles from "././styles.module.css";

const SideText = () => {
  return (
    <ul
      className={`${styles.verticalText} my-4 flex gap-4 self-end text-sm uppercase sm:hidden`}
    >
      <li>Digital Marketing</li>
      <li>Development</li>
      <li>Designing</li>
    </ul>
  );
};

export default SideText;
