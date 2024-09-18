import React from "react";
import { styles } from "../styles/style";

type Props = {};

const Policy = (props: Props) => {
  return (
    <div>
      <div
        className={`w-[95%] 800px:w-[92%] m-auto py-2 dark:text-white text-black px-3`}
      >
        <h1 className={`${styles.title} !text-start pt-2`}>
          Platform Terms and Condition
        </h1>
      </div>
      <div
        style={{ listStyle: "unset", marginLeft: "15px" }}
        className="w-[95%] 800px:w-[85%] m-auto"
      >
        <p className="py-2 ml-[-15px] text-[-16px] font-Poppins leading-8 whitespace-pre-line">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem pariatur
          placeat maxime? Et facilis dicta quod at sunt, voluptas fugiat
          voluptatum deserunt numquam rerum rem eos? Tempora sequi excepturi
          modi?
        </p>
        <br />
        <p className="py-2 ml-[-15px] text-[-16px] font-Poppins leading-8 whitespace-pre-line">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi
          omnis labore corporis obcaecati pariatur repudiandae vitae quos sunt
          dolorem iusto perspiciatis placeat, earum, nobis non, rerum aperiam
          reiciendis expedita porro.
        </p>
        <br />
        <p className="py-2 ml-[-15px] text-[-16px] font-Poppins leading-8 whitespace-pre-line">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est
          obcaecati eveniet voluptas alias. Aliquid consequatur, assumenda,
          aliquam laborum debitis, aut itaque nesciunt voluptatem esse enim
          aspernatur. Velit est consequuntur vitae.
        </p>
        <br />
        <p className="py-2 ml-[-15px] text-[-16px] font-Poppins leading-8 whitespace-pre-line">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem pariatur
          placeat maxime? Et facilis dicta quod at sunt, voluptas fugiat
          voluptatum deserunt numquam rerum rem eos? Tempora sequi excepturi
          modi?
        </p>
      </div>
    </div>
  );
};

export default Policy;
