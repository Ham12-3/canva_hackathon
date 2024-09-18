import React from "react";

import { styles } from "../styles/style";

const About = () => {
  return (
    <div className="text-black dark:text-white">
      <br />
      <h1 className={`${styles.title} 800px:!text-[45px]`}>
        What is <span className="text-gradient">Lacodemy?</span>
      </h1>
      <br />
      <div className="w-[95%] 800px:w-[85%] m-auto text-black dark:text-white">
        <p className="text-[18px] font-Poppins">
          Lacodemy is an AI edtech app for helping students learn better and
          also programmers as well. We provide courses on programming, web
          development, mobile development, and other technical courses. We also
          provide a platform for students to learn and practice programming. We
          have a community of programmers who are willing to help you learn and
          grow in your programming career. We provide a platform for students to
          learn.
          <br />
          <br />
          We provide a platform for students to learn and practice programming.
          We have a community of programmers who are willing to help you learn
          and grow in your programming career. We provide a platform for
          students to learn and practice programming. We have a community of
          programmers who are willing to help you learn and grow in your
          programming career. We provide a platform for students to learn and
          practice programming. We have a community of programmers who are
          willing to help you learn and grow in your programming career.
          <br />
          <br />
          We provide a platform for students to learn and practice programming.
          We have a community of programmers who are willing to help you learn
          and grow in your programming career. We provide a platform for
          students to learn and practice programming. We have a community of
          programmers who are willing to help you learn and grow in your
          programming career. We provide a platform for students to learn and
          practice programming.
          <br />
          <br />
        </p>
        <br />
        <span className=" text-[22px] ">Abdulhamid Sonaike</span>
        <h5 className="text-[18px] font-Poppins">
          Founder and CEO of Lacodemy
        </h5>
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default About;
