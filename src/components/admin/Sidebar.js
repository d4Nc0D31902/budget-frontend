import React, { useEffect, useState } from "react";
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
import PieChartIcon from "@mui/icons-material/PieChart";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import CategoryIcon from '@mui/icons-material/Category';
import axios from "axios";
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
  const [cashCount, setCashCount] = useState(0);
  const [atmCount, setAtmCount] = useState(0);
  const [categoryOpen, setCategoryOpen] = useState(false);
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

  const handleCategoryOpen = () => {
    setCategoryOpen(!categoryOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  useEffect(() => {
    fetchCashCount();
  }, []);

  useEffect(() => {
    fetchAtmCount();
  }, []);

  const fetchCashCount = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/cash-count`,
        {
          withCredentials: true,
        }
      );
      setCashCount(response.data.count);
    } catch (error) {
      console.error("Error fetching cash count:", error);
    }
  };

  const fetchAtmCount = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/atm-count`,
        {
          withCredentials: true,
        }
      );
      setAtmCount(response.data.count);
    } catch (error) {
      console.error("Error fetching atm count:", error);
    }
  };

  return (
    <Drawer variant="permanent" anchor="left">
      <List sx={{ width: "240px" }}>
        <Box p={"5px"}>
          <Typography variant="h4" textAlign={"center"}>
            <img
              src="../images/ba.png"
              style={{
                width: "70%",
                borderRadius: "80px",
              }}
            />
          </Typography>
        </Box>
        <Divider sx={{ margin: "20px" }} />
        <ListItemButton component={Link} to="/" selected={isActive("/")}>
          <ListItemIcon>
            <PieChartIcon />
          </ListItemIcon>
          <ListItemText primary="Analytics" />
        </ListItemButton>

        <ListItemButton onClick={handleCategoryOpen}>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Category" />
          {categoryOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>

        <Collapse in={categoryOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              button
              component={Link}
              to="/category-list"
              selected={isActive("/category-list")}
              sx={{ marginLeft: "20px" }}
            >
              <ListItemIcon>
                <TableChartIcon />
              </ListItemIcon>
              <ListItemText primary="Categories" />
            </ListItemButton>
            <ListItemButton
              button
              component={Link}
              to="/category/new"
              selected={isActive("/category/new")}
              sx={{ marginLeft: "20px" }}
            >
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="New" />
            </ListItemButton>
          </List>
        </Collapse>

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
              disabled={cashCount > 0}
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
              disabled={atmCount > 0}
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
                <ReceiptLongRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Transact" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
};

export default Sidebar;
