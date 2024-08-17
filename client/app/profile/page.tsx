"use client";

import React, { FC, useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";

type Props = {};

const page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);

  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("");
  return (
    <div>
      <Protected>
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
      </Protected>
    </div>
  );
};

export default page;
