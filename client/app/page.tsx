"use client";

import React, { FC, ReactNode, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";
import Courses from "./components/Route/Courses";
import Reviews from "./components/Route/Reviews";
import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/Footer";

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);

  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("");
  return (
    <div className="">
      <Heading
        title="E- learning"
        description="E- learning is a platform for learning online courses"
        keywords="E- learning, online courses, learning platform"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />

      <Hero />
      <Courses />
      <Reviews />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Page;
