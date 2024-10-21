import React from "react";

const SectionHeading = ({
  underLinedword,
  othersWords,
  color = "text-pryma-main",
  underlineColor = "border-b-pryma-main",
}: {
  underLinedword: string;
  othersWords?: string;
  color?: string;
  underlineColor?: string;
}) => {
  return (
    <h3 className={`${color} font-montserrat text-4xl uppercase md:text-2xl`}>
      <span className={`border-b [border-width:40%]  ${underlineColor} `}>
        {underLinedword}
      </span>{" "}
      <span>{othersWords}</span>
    </h3>
  );
};

export default SectionHeading;
