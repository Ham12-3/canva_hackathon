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
  GroupsIcon,
  OndemandVideoIcon,
  VideoCallIcon,
  WebIcon,
  QuizIcon,
  WysiwygIcon,
  SettingsIcon,
  BarChartOutlinedIcon,
  ExitToAppIcon,
} from "./Icon";

import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";

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
        borderLeft: selected === title ? "4px solid #4ea8de" : "none",
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
    // Handle logout functionality
  };

  return (
    <ProSidebar
      collapsed={isCollapsed}
      style={{
        background: "#121a3a", // Dark navy-blue background
        color: "#ffffff33",
        height: "100vh",
        transition: "width 0.3s",
      }}
    >
      <Box
        className="sidebar-scrollable"
        sx={{
          color: "#ffffff",
          background: "#121a3a",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        }}
      >
        {/* User Info */}
        <Box
          sx={{
            color: "#ffffff",
            background: "#121a3a",
            padding: "16px",
            display: "flex",
            alignItems: "center",
          }}
        >
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
                marginLeft: "16px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Image
                src="/assets/avatar.png"
                alt="User Avatar"
                width={40}
                height={40}
                style={{ borderRadius: "50%", border: "2px solid #4ea8de" }}
              />
              <Box sx={{ marginLeft: "8px" }}>
                <Typography variant="h6" sx={{ color: "#ffffff" }}>
                  {user?.name || "shahriar sajeeb"}
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
            to="/admin/dashboard"
            icon={<HomeOutlinedIcon style={{ color: "#ffffff" }} />}
            selected={selected}
            setSelected={setSelected}
          />
          <Typography sx={{ color: "#6c757d", padding: "0 16px" }}>
            Data
          </Typography>
          <Item
            title="Users"
            to="/admin/users"
            icon={<PeopleOutlinedIcon style={{ color: "#ffffff" }} />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Invoices"
            to="/admin/invoices"
            icon={<ReceiptOutlinedIcon style={{ color: "#ffffff" }} />}
            selected={selected}
            setSelected={setSelected}
          />
          <Typography sx={{ color: "#6c757d", padding: "0 16px" }}>
            Content
          </Typography>
          <Item
            title="Create Course"
            to="/admin/create-course"
            icon={<VideoCallIcon style={{ color: "#ffffff" }} />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Live Courses"
            to="/admin/live-courses"
            icon={<OndemandVideoIcon style={{ color: "#ffffff" }} />}
            selected={selected}
            setSelected={setSelected}
          />
          <Typography sx={{ color: "#6c757d", padding: "0 16px" }}>
            Customization
          </Typography>
          <Item
            title="Hero"
            to="/admin/hero"
            icon={<WebIcon style={{ color: "#ffffff" }} />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="FAQ"
            to="/admin/faq"
            icon={<QuizIcon style={{ color: "#ffffff" }} />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Categories"
            to="/admin/categories"
            icon={<WysiwygIcon style={{ color: "#ffffff" }} />}
            selected={selected}
            setSelected={setSelected}
          />
          <Typography sx={{ color: "#6c757d", padding: "0 16px" }}>
            Controllers
          </Typography>
          <Item
            title="Manage Team"
            to="/admin/manage-team"
            icon={<GroupsIcon style={{ color: "#ffffff" }} />}
            selected={selected}
            setSelected={setSelected}
          />
          <Typography sx={{ color: "#6c757d", padding: "0 16px" }}>
            Analytics
          </Typography>
          <div className="bg-[#121a3a] dark:text-white text-black ">
            <Item
              title="Course Analytics"
              to="/admin/courses-analytics"
              icon={<BarChartOutlinedIcon style={{ color: "#ffffff" }} />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Order Analytics"
              to="/admin/orders-analytics"
              icon={<BarChartOutlinedIcon style={{ color: "#ffffff" }} />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="User Analytics"
              to="/admin/users-analytics"
              icon={<BarChartOutlinedIcon style={{ color: "#ffffff" }} />}
              selected={selected}
              setSelected={setSelected}
            />
          </div>

          <Box
            sx={{
              color: "#ffffff",
              background: "#121a3a",
              marginTop: "auto",
              padding: "10px 20px",
            }}
          >
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
