import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "../admin/Sidebar";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllTransactions,
  deleteTransaction,
  clearErrors,
} from "../../actions/transactionActions";

import { DELETE_TRANSACTION_RESET } from "../../constants/transactionConstants";

const TransactionList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading, error, transactions } = useSelector(
    (state) => state.allTransactions
  );
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteTransaction
  );
  useEffect(() => {
    dispatch(getAllTransactions());
    if (error) {
      dispatch(clearErrors());
    }
    if (deleteError) {
      dispatch(clearErrors());
    }
    if (isDeleted) {
      navigate("/transaction-list");
      dispatch({ type: DELETE_TRANSACTION_RESET });
    }
  }, [dispatch, error, navigate, isDeleted, deleteError]);

  const setTransactions = () => {
    const data = {
      columns: [
        {
          label: "Account",
          field: "account",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Category",
          field: "category",
          sort: "asc",
        },
        {
          label: "Notes",
          field: "notes",
          sort: "asc",
        },
        {
          label: "Date",
          field: "date",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    if (transactions) {
      transactions.forEach((transaction) => {
        data.rows.push({
          id: transaction._id,
          account: transaction.account,
          amount: `₱${transaction.amount}`,
          category: transaction.category,
          notes: transaction.notes,
          date: new Date(transaction.date).toLocaleDateString(),
          actions: (
            <Fragment>
              <Link
                to={`/transaction/${transaction._id}/update`}
                className="btn btn-primary py-1 px-2"
              >
                <i className="fa fa-pencil"></i>
              </Link>
              <button
                className="btn btn-danger py-1 px-2 ml-2"
                onClick={() => deleteTransactionHandler(transaction._id)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </Fragment>
          ),
        });
      });
    }

    return data;
  };

  const deleteTransactionHandler = (id) => {
    dispatch(deleteTransaction(id));
  };

  return (
    <Fragment>
      <MetaData title={"All Transactions"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Transactions</h1>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setTransactions()}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default TransactionList;
