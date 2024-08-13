"use client";

import React, { FC, ReactNode } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";

interface Props {}

const Page: FC<Props> = (props) => {
  return (
    <div>
      <Heading
        title="E- learning"
        description="E- learning is a platform for learning online courses"
        keywords="E- learning, online courses, learning platform"
      />
      <Header />
    </div>
  );
};

export default Page;
