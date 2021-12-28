import { createContext, useReducer, useEffect } from "react";
import { ref, set, child, get, onValue, push } from "firebase/database";
import { database } from "../firebse";
import { toast } from "react-toastify";
import {useUserAuth} from "./UserAuthContext";
import {getBudgetFromUser, getExpensesFromUser} from "../database";

export const AppContext = createContext();

const AppReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
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
    dispatch({type: "SET_LOADING", payload: true});
    getBudgetFromUser(user.uid)
        .then((budget) => {
          dispatch({type: "SET_BUDGET", payload: budget});
        })
        .then(() => {
          getExpensesFromUser(user.uid).then((expenses) => {
            if (expenses.exist) {
              dispatch({type: "ADD_EXPENSE", payload: expenses});
            }
          });
        })
        .then(() => {
          dispatch({type: "SET_LOADING", payload: false});
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
