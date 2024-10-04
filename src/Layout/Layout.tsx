import { AppShell, Button, Grid, Header, Tabs } from "@mantine/core";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { HomeIcon, LogoutIcon } from "../components/shared/Icons";
import FeatherIcon from "feather-icons-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from '../routes/AuthContext'

const Layout: FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login");
  };

  return (
    <AppShell
      padding="md"
      header={
        <Header
          height={60}
          p="xs"
          style={{ backgroundColor: "#a492d4", justifyContent: "center" }}
        >
          {
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>Logo</p>
              <Button onClick={handleLogout}>
                <LogoutIcon />
              </Button>
            </div>
          }
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Outlet />
    </AppShell>
  );
};

export default Layout;
