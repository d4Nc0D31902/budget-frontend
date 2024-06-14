import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import Sidebar from "../admin/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addCashAmount,
  getAdminCash,
  getCashDetails,
  clearErrors,
} from "../../actions/cashActions";
import { ADD_CASH_RESET } from "../../constants/cashConstants";

const AddCash = () => {
  const [amount, setAmount] = useState(0);

  const dispatch = useDispatch();
  const { error, cashEntry } = useSelector((state) => state.cashEntryDetails);
  const {
    loading,
    error: addError,
    success,
  } = useSelector((state) => state.addAmount);
  let { id } = useParams();
  let navigate = useNavigate();
  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const submitHandler = (e) => {
    e.preventDefault();
    try {
      const amountNumber = parseFloat(amount);
      dispatch(addCashAmount(id, amountNumber));
      navigate("/cash-list");
      dispatch(getAdminCash());
      successMsg("Cash added successfully!");
    } catch (error) {
      console.error("Error adding cash:", error);
    }
  };

  return (
    <Fragment>
      <MetaData title={"Add Cash"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <div className="wrapper my-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-4">Add Cash</h1>
                <div className="form-group">
                  <label htmlFor="amount_field">Amount</label>
                  <input
                    type="number"
                    id="amount_field"
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                  disabled={loading ? true : false}
                >
                  ADD
                </button>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default AddCash;
