import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import BadgeIcon from "@mui/icons-material/Badge";
import { useNavigate } from "react-router-dom";
import Login from "../Component/Login";
// import PopupForm from "../Component/PopupForm";
import AdminLogin from "../Component/AdminLogin";
import ManagerLogin from "../Component/ManagerLogin";
const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [a, setA] = useState("");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const listStyle = {
    background: "#fafa00",
    backgroundColor: "red",
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const navigate = useNavigate();
  // useEffect(() => {}, []);
  const drawer = (
    // <div>
    <Typography component="div">
      <Toolbar />
      <Divider />
      <List>
        {["Login", "Admin", "Manager"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => {
                setA(text);
                console.log(a);
              }}
            >
              <ListItemIcon>
                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                 */}

                {index === 0 ? <HomeIcon /> : ""}
                {index === 1 ? <AdminPanelSettingsIcon /> : ""}
                {index === 2 ? <SupervisorAccountIcon /> : ""}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Typography>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className="container-main">
      <Box className="main-page-complete" sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          style={listStyle}
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar style={listStyle}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h5"
              className="resp-heading"
              noWrap
              component="div"
            >
              Customer Relationship Management
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          {a ? (
            <Typography component="div">
              {a === "Login" ? <Login /> : ""}
              {a === "Admin" ? <AdminLogin /> : ""}
              {a === "Manager" ? <ManagerLogin /> : ""}
            </Typography>
          ) : (
            <div className="main-page">CRM PROJECT</div>
          )}
        </Box>
      </Box>
    </div>
  );
}

export default ResponsiveDrawer;
