import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Sidebar from "../admin/Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  processTransaction,
  clearErrors,
  getAllTransactions,
} from "../../actions/transactionActions";
import { PROCESS_TRANSACTION_RESET } from "../../constants/transactionConstants";

const NewTransaction = () => {
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("");
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading, error, success } = useSelector(
    (state) => state.processTransaction
  );

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const message = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  // useEffect(() => {
  //   if (error) {
  //     dispatch(clearErrors());
  //   }
  //   if (success) {
  //     navigate("/transaction-list");
  //     message("Transaction created successfully");
  //     dispatch({ type: PROCESS_TRANSACTION_RESET });
  //   }
  // }, [dispatch, error, success, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const transactionData = {
        account,
        amount,
        category,
        notes,
        date,
      };
      await dispatch(processTransaction(transactionData));
      navigate("/transaction-list");
      dispatch(getAllTransactions());
      successMsg("Transaction Deleted Successfully");
    } catch (error) {
      errMsg("Error Deleting Transaction!");
    }
  };

  const accountOptions = [
    { value: "", label: "Select Account" },
    { value: "On Hand", label: "Cash" },
    { value: "ATM", label: "ATM" },
  ];

  const categoryOptions = [
    { value: "", label: "Select Category" },
    { value: "Expenses", label: "Expenses" },
    { value: "Savings", label: "Savings" },
  ];

  const expenseNotesOptions = [
    { value: "", label: "Select Note" },
    { value: "Rent", label: "Rent" },
    { value: "Utilities", label: "Utilities" },
    { value: "Groceries", label: "Groceries" },
    { value: "Food", label: "Food" },
    { value: "Toys", label: "Toys" },
    { value: "Loans", label: "Loans" },
    { value: "Family", label: "Family" },
    { value: "Bills", label: "Bills" },
    { value: "Tax", label: "Tax" },
    { value: "Transportation", label: "Transportation" },
    { value: "Others", label: "Others" },
  ];

  return (
    <Fragment>
      <MetaData title={"New Transaction"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <div className="wrapper my-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-4">New Transaction</h1>

                <div className="form-group">
                  <label htmlFor="account_field">Account</label>
                  <select
                    id="account_field"
                    className="form-control"
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                  >
                    {accountOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

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

                <div className="form-group">
                  <label htmlFor="category_field">Category</label>
                  <select
                    id="category_field"
                    className="form-control"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categoryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="notes_field">Notes</label>
                  {category === "Expenses" ? (
                    <select
                      id="notes_field"
                      className="form-control"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    >
                      {expenseNotesOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <textarea
                      className="form-control"
                      id="notes_field"
                      rows="4"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    ></textarea>
                  )}
                </div>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                  disabled={loading ? true : false}
                >
                  CREATE
                </button>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default NewTransaction;
