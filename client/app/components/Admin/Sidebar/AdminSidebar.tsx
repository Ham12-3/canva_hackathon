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
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

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
      style={{
        color: "#ffffff",
        padding: "10px 20px",
        backgroundColor: selected === title ? "#1f2a48" : "transparent",
      }}
    >
      <Typography className="!text-[16px] !font-Poppins">{title}</Typography>
      <Link href={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const { user } = useSelector((state: any) => state.auth);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const logOutHandler = async () => {
    // setLogout(true);
    // await signOut({ redirect: false }); // Prevent automatic redirection by NextAuth
    // redirect("/");
  };

  return (
    <ProSidebar
      collapsed={isCollapsed}
      style={{
        background: "#111c44",
        color: "#ffffff",
        height: "100vh",
        transition: "width 0.3s",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* User Info and Collapse Button */}
        <Box sx={{ display: "flex", alignItems: "center", padding: "16px" }}>
          <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? (
              <ArrowForwardIosIcon style={{ color: "#ffffff" }} />
            ) : (
              <ArrowBackIosIcon style={{ color: "#ffffff" }} />
            )}
          </IconButton>
          {!isCollapsed && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginLeft: "16px",
              }}
            >
              <Image
                src="/assets/avatar.png"
                alt="User Avatar"
                width={40}
                height={40}
                style={{ borderRadius: "50%" }}
              />
              <Box sx={{ marginLeft: "8px" }}>
                <Typography variant="h6" sx={{ color: "#ffffff" }}>
                  {user?.name || "User"}
                </Typography>
                <Typography variant="subtitle2" sx={{ color: "#6c757d" }}>
                  Admin
                </Typography>
              </Box>
            </Box>
          )}
        </Box>

        {/* Menu Items */}
        <Menu iconShape="square">
          <Item
            title="Dashboard"
            to="/dashboard"
            icon={<HomeOutlinedIcon style={{ color: "#ffffff" }} />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Users"
            to="/users"
            icon={<PeopleOutlinedIcon style={{ color: "#ffffff" }} />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Reports"
            to="/reports"
            icon={<ReceiptOutlinedIcon style={{ color: "#ffffff" }} />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Analytics"
            to="/analytics"
            icon={<BarChartOutlinedIcon style={{ color: "#ffffff" }} />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Map"
            to="/map"
            icon={<MapOutlinedIcon style={{ color: "#ffffff" }} />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Groups"
            to="/groups"
            icon={<GroupsIcon style={{ color: "#ffffff" }} />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Videos"
            to="/videos"
            icon={<OndemandVideoIcon style={{ color: "#ffffff" }} />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Calls"
            to="/calls"
            icon={<VideoCallIcon style={{ color: "#ffffff" }} />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Web"
            to="/web"
            icon={<WebIcon style={{ color: "#ffffff" }} />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Quiz"
            to="/quiz"
            icon={<QuizIcon style={{ color: "#ffffff" }} />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Docs"
            to="/docs"
            icon={<WysiwygIcon style={{ color: "#ffffff" }} />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="History"
            to="/history"
            icon={<ManageHistoryIcon style={{ color: "#ffffff" }} />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Settings"
            to="/settings"
            icon={<SettingsIcon style={{ color: "#ffffff" }} />}
            selected={selected}
            setSelected={setSelected}
          />
          <Box sx={{ marginTop: "auto", padding: "10px 20px" }}>
            <MenuItem
              icon={<ExitToAppIcon style={{ color: "#ffffff" }} />}
              onClick={logOutHandler}
              style={{ color: "#ffffff" }}
            >
              <Typography className="!text-[16px] !font-Poppins">
                Logout
              </Typography>
            </MenuItem>
          </Box>
        </Menu>
      </Box>
    </ProSidebar>
  );
};

export default Sidebar;
