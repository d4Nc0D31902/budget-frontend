import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import UserSalesChart from "./UserSalesChart";
import MonthlySalesChart from "./MonthlySalesChart";
import ProductSalesChart from "./ProductSalesChart";
import MostExpenses from "./MostExpenses";
import { useDispatch, useSelector } from "react-redux";
import { getTotalCashAmount } from "../../actions/cashActions";
import { getTotalSavings } from "../../actions/savingsActions";
import { getTotalAtmAmount } from "../../actions/atmActions";
import { getTotalIncome } from "../../actions/incomeActions";
import {
  getTotalExpenses,
  getAdminExpenses,
} from "../../actions/expensesActions";
import {
  getIncomePerMonth,
  getExpensesPerMonth,
} from "../../actions/chartActions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { totalAmount } = useSelector((state) => state.totalCash);
  const { totalSavings } = useSelector((state) => state.totalSavings);
  const { totalAtm } = useSelector((state) => state.totalAtm);
  const { totalIncome } = useSelector((state) => state.totalIncome);
  const { incomePerMonth } = useSelector((state) => state.incomePerMonth);
  const { expensesPerMonth } = useSelector((state) => state.expensesPerMonth);
  const { expensesEntries } = useSelector((state) => state.expensesEntries);
  const { totalExpenses, loading } = useSelector(
    (state) => state.totalExpenses
  );

  useEffect(() => {
    dispatch(getTotalCashAmount());
    dispatch(getTotalSavings());
    dispatch(getTotalAtmAmount());
    dispatch(getTotalIncome());
    dispatch(getTotalExpenses());
    dispatch(getIncomePerMonth());
    dispatch(getExpensesPerMonth());
    dispatch(getAdminExpenses());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <h1 className="my-4">Dashboard</h1>
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <MetaData title={"Admin Dashboard"} />
              <div className="row pr-4">
                <div className="col-xl-12 col-sm-12 mb-3">
                  <div className="card text-white bg-success o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Total Savings
                        <br />{" "}
                        <b>
                          ₱
                          {totalSavings &&
                            totalSavings
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row pr-4">
                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-info o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Cash Balance
                        <br />{" "}
                        <b>
                          ₱
                          {totalAmount &&
                            totalAmount
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </b>
                      </div>
                      {/*  */}
                    </div>

                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to="/cash-list"
                    >
                      <span className="float-left">View Details</span>

                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-info o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Card Balance
                        <br />{" "}
                        <b>
                          ₱
                          {totalAtm &&
                            totalAtm
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </b>
                      </div>
                    </div>

                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to="/atm-list"
                    >
                      <span className="float-left">View Details</span>

                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-primary o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Total Income
                        <br />{" "}
                        <b>
                          ₱
                          {totalIncome &&
                            totalIncome
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </b>
                      </div>
                    </div>

                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to="/income-list"
                    >
                      <span className="float-left">View Details</span>

                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-danger o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Total Expenses
                        <br />{" "}
                        <b>
                          ₱
                          {totalExpenses &&
                            totalExpenses
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </b>
                      </div>
                    </div>
                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to="/expenses-list"
                    >
                      <span className="float-left">View Details</span>

                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
              {/* <Fragment>
                <UserSalesChart data={incom} />
              </Fragment> */}
              <Fragment>
                <h1 style={{ textAlign: "center", marginTop: "50px" }}>
                  Monthly Income
                </h1>
                <MonthlySalesChart data={incomePerMonth} />
              </Fragment>
              <Fragment>
                <h1 style={{ textAlign: "center", marginTop: "50px" }}>
                  Monthly Expenses
                </h1>
                <MonthlySalesChart data={expensesPerMonth} />
              </Fragment>

              <Fragment>
                <h1 style={{ textAlign: "center", marginTop: "50px" }}>
                  Most Expenses
                </h1>
                <MostExpenses data={expensesEntries} />
              </Fragment>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
