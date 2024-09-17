"use client";

import React, { FC, useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Profile from "../components/Profile/Profile";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type Props = {};

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);

  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState("");
  const { data } = useLoadUserQuery(undefined, {});
  const user = data;
  return (
    <div className="min-h-screen">
      <Protected>
        <Heading
          title={`${user.name} Profile - Elearning`}
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
        <Profile user={user} />
        <br />
        <br />
        <br />
        <br />
        <Footer />
      </Protected>
    </div>
  );
};

export default Page;
