import React, { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardWidgets from "./Widgets/DashboardWidgets";

type Props = {
  isDashboard?: boolean;
};

const DashboardHero = ({ isDashboard }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="z-20">
      <DashboardHeader open={open} setOpen={setOpen} />
      {isDashboard && <DashboardWidgets open={open} />}
    </div>
  );
};

export default DashboardHero;
