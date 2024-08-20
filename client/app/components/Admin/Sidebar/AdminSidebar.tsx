"use client";

import { FC, useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import {
  HomeOutlinedIcon,
  ArrowForwardIosIcon,
  ArrowBackIosIcon,
  PeopleOutlinedIcon,
  ReceiptOutlinedIcon,
  BarChartOutlinedIcon,
  MapOutlinedIcon,
  GroupsIcon,
  OndemandVideoIcon,
  VideoCallIcon,
  WebIcon,
  QuizIcon,
  WysiwygIcon,
  ManageHistoryIcon,
  SettingsIcon,
  ExitToAppIcon,
} from "./Icon";

import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { stat } from "fs";

interface itemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: any;
}

const Item: FC<itemProps> = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography className="!text-[16px] !font-Poppins"> {title} </Typography>
      <Link href={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const { user } = useSelector((state: any) => state.auth);

  const [logout, setLogout] = useState(false);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const logoutHandler = () => {
    setLogout(true);
  };

  return (
    <ProSidebar collapsed={isCollapsed}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box sx={{ display: "flex", alignItems: "center", padding: "16px" }}>
          <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? <ArrowForwardIosIcon /> : <ArrowBackIosIcon />}
          </IconButton>
          {!isCollapsed && (
            <Box
              sx={{ display: "flex", alignItems: "center", marginLeft: "16px" }}
            >
              <Image
                src="/assets/avatar.png"
                alt="User Avatar"
                width={40}
                height={40}
              />
              <Typography variant="h6" sx={{ marginLeft: "8px" }}>
                {user?.name || "User"}
              </Typography>
            </Box>
          )}
        </Box>
        <Menu>
          <Item
            title="Dashboard"
            to="/dashboard"
            icon={<HomeOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Users"
            to="/users"
            icon={<PeopleOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Reports"
            to="/reports"
            icon={<ReceiptOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Analytics"
            to="/analytics"
            icon={<BarChartOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Map"
            to="/map"
            icon={<MapOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Groups"
            to="/groups"
            icon={<GroupsIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Videos"
            to="/videos"
            icon={<OndemandVideoIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Calls"
            to="/calls"
            icon={<VideoCallIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Web"
            to="/web"
            icon={<WebIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Quiz"
            to="/quiz"
            icon={<QuizIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Docs"
            to="/docs"
            icon={<WysiwygIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="History"
            to="/history"
            icon={<ManageHistoryIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Settings"
            to="/settings"
            icon={<SettingsIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Box sx={{ marginTop: "auto" }}>
            <MenuItem icon={<ExitToAppIcon />} onClick={logoutHandler}>
              <Typography className="!text-[16px] !font-Poppins">
                {" "}
                Logout{" "}
              </Typography>
            </MenuItem>
          </Box>
        </Menu>
      </Box>
    </ProSidebar>
  );
};

export default Sidebar;
