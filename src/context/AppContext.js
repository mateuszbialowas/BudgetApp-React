import { createContext, useReducer, useEffect } from "react";
import { toast } from "react-toastify";
import { useUserAuth } from "./UserAuthContext";
import {
  getBudgetFromUser,
  getExpensesFromUser,
  addExpenseToUser,
} from "../database";

export const AppContext = createContext();

const AppReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      console.log("ADD_EXPENSE");
      addExpenseToUser(action.user_id, action.payload);
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload
        ),
      };
    case "SET_BUDGET":
      return {
        ...state,
        budget: action.payload,
      };
    case "SET_EXPENSES":
      return {
        ...state,
        expenses: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

const initialState = {
  budget: 0,
  expenses: [
    // { id: 12, name: "shopping", cost: 40 },
    // { id: 13, name: "holiday", cost: 50 },
  ],
  isLoading: false,
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const { user } = useUserAuth();

  useEffect(() => {
    // TODO create async function then call it and set loading to false
    dispatch({ type: "SET_LOADING", payload: true });
    getBudgetFromUser(user.uid)
      .then((budget) => {
        dispatch({ type: "SET_BUDGET", payload: budget });
      })
      .then(() => {
        console.log("start get expenses");
        getExpensesFromUser(user.uid).then((expenses) => {
          if (expenses) {
            console.log("ADD_EXPENSE from useEffect");
            console.log(...expenses);
            dispatch({ type: "SET_EXPENSES", payload: expenses });
          }
        });
      })
      .then(() => {
        dispatch({ type: "SET_LOADING", payload: false });
        console.log("SET_LOADING to false from useEffect");
      });
  }, [user]);

  useEffect(() => {
    if (state.isLoading) {
      toast.loading("Loading data... Please wait", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
      });
    } else {
      toast.dismiss();
    }
  }, [state.isLoading]);

  return (
    <AppContext.Provider
      value={{
        budget: state.budget,
        expenses: state.expenses,
        isLoading: state.isLoading,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
