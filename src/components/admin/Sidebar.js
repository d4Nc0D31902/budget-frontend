import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PaymentsIcon from "@mui/icons-material/Payments";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SavingsIcon from "@mui/icons-material/Savings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptIcon from "@mui/icons-material/Receipt";
import TableChartIcon from "@mui/icons-material/TableChart";
import AddIcon from "@mui/icons-material/Add";
import PaidIcon from "@mui/icons-material/Paid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Box,
  Collapse,
  Divider,
  ListItemButton,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [atmOpen, setAtmOpen] = useState(false);
  const [transactionOpen, setTransactionOpen] = useState(false);
  const location = useLocation();

  const handleCollapse = () => {
    setOpen(!open);
  };

  const handleAtmOpen = () => {
    setAtmOpen(!atmOpen);
  };

  const handleTransactionOpen = () => {
    setTransactionOpen(!transactionOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Drawer variant="permanent" anchor="left">
      <List sx={{ width: "240px" }}>
        <Box p={"20px"}>
          <Typography variant="h4" textAlign={"center"}>
            Logo
          </Typography>
        </Box>
        <Divider sx={{ margin: "20px" }} />
        <ListItemButton component={Link} to="/" selected={isActive("/")}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Analytics" />
        </ListItemButton>

        <ListItemButton onClick={handleCollapse}>
          <ListItemIcon>
            <PaymentsIcon />
          </ListItemIcon>
          <ListItemText primary="Cash" />
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              button
              component={Link}
              to="/cash-list"
              selected={isActive("/cash-list")}
              sx={{ marginLeft: "20px" }}
            >
              <ListItemIcon>
                <TableChartIcon />
              </ListItemIcon>
              <ListItemText primary="List" />
            </ListItemButton>
            <ListItemButton
              button
              component={Link}
              to="/cash/new"
              selected={isActive("/cash/new")}
              sx={{ marginLeft: "20px" }}
            >
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Add" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton onClick={handleAtmOpen}>
          <ListItemIcon>
            <CreditCardIcon />
          </ListItemIcon>
          <ListItemText primary="Card" />
          {atmOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>

        <Collapse in={atmOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              button
              component={Link}
              to="/atm-list"
              selected={isActive("/atm-list")}
              sx={{ marginLeft: "20px" }}
            >
              <ListItemIcon>
                <TableChartIcon />
              </ListItemIcon>
              <ListItemText primary="List" />
            </ListItemButton>
            <ListItemButton
              button
              component={Link}
              to="/atm/new"
              selected={isActive("/atm/new")}
              sx={{ marginLeft: "20px" }}
            >
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Add" />
            </ListItemButton>
            <ListItemButton
              button
              component={Link}
              to="/atm/withdraw"
              selected={isActive("/atm/withdraw")}
              sx={{ marginLeft: "20px" }}
            >
              <ListItemIcon>
                <ArrowBackIcon />
              </ListItemIcon>
              <ListItemText primary="Withdraw" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton
          component={Link}
          to="/income-list"
          selected={isActive("/income-list")}
        >
          <ListItemIcon>
            <PaidIcon />
          </ListItemIcon>
          <ListItemText primary="Income" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/expenses-list"
          selected={isActive("/expenses-list")}
        >
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Expenses" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/savings-list"
          selected={isActive("/savings-list")}
        >
          <ListItemIcon>
            <SavingsIcon />
          </ListItemIcon>
          <ListItemText primary="Savings" />
        </ListItemButton>

        <ListItemButton onClick={handleTransactionOpen}>
          <ListItemIcon>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText primary="Transaction" />
          {transactionOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>

        <Collapse in={transactionOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              button
              component={Link}
              to="/transaction-list"
              selected={isActive("/transaction-list")}
              sx={{ marginLeft: "20px" }}
            >
              <ListItemIcon>
                <TableChartIcon />
              </ListItemIcon>
              <ListItemText primary="List" />
            </ListItemButton>
            <ListItemButton
              button
              component={Link}
              to="/transaction/new"
              selected={isActive("/transaction/new")}
              sx={{ marginLeft: "20px" }}
            >
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Add" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
};

export default Sidebar;
