import React, { createContext, useReducer } from "react";
import axios from "axios";
import {
  TRANSACTION_CREATION_STARTED,
  TRANSACTION_CREATION_SUCCESS,
  TRANSACTION_CREATION_FAIL,
} from "./transactionsActionTypes";
import { API_URL_TRANSACTION } from "../../../utils/apiURL";

export const transactionContext = createContext();

const INITIAL_STATE = {
  transaction: null,
  transactions: [],
  loading: false,
  error: null,
  token: JSON.parse(localStorage.getItem("userAuth")),
};
const transactionReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case TRANSACTION_CREATION_SUCCESS:
      return {
        ...state,
        loading: false,
        transaction: payload,
      };
    case TRANSACTION_CREATION_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const TransactionContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, INITIAL_STATE);

  //Create Transaction
    const createTransactionAction = async accountData => {
    try {
      //Header
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.token?.token}`,
        },
      };
      //Request
      const res = await axios.post(API_URL_TRANSACTION, accountData, config);
      console.log(res);
      if (res?.data?.status === "success") { //if response is successful..
        dispatch({ type: TRANSACTION_CREATION_SUCCESS, payload: res?.data }); //dispatch the success action
      }
    } catch (error) {
      dispatch({
        type: TRANSACTION_CREATION_FAIL, //otherwise dispatch the fail action
        payload: error?.response?.data?.message,
      });
    }
  };
  return (
    <transactionContext.Provider
      value={{
        transaction: state.transaction,
        transactions: state.transactions,
        createTransactionAction,
        error: state?.error,
      }}
    >
      {children}
    </transactionContext.Provider>
  );
};
