import { createContext, useReducer, useEffect } from "react";
import { toast } from "react-toastify";
import { useUserAuth } from "./UserAuthContext";
import {
  getBudgetFromUser,
  getExpensesFromUser,
  addExpenseToUser,
  deleteExpenseFromUser,
} from "../database";

export const AppContext = createContext();

const AppReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      addExpenseToUser(action.user_id, action.payload);
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case "DELETE_EXPENSE":
      deleteExpenseFromUser(action.user_id, action.payload);
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
    case "EDIT_EXPENSE":
      addExpenseToUser(action.user_id, action.payload);
      return {
        ...state,
        expenses: state.expenses.map((expense) => {
          if (expense.id === action.payload.id) {
            return action.payload;
          } else {
            return expense;
          }
        }),
      };

    default:
      return state;
  }
};

const initialState = {
  budget: 0,
  expenses: [
    // {
    //   id: 12,
    //   name: "shopping",
    //   cost: 40,
    //   details:
    //     "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla, officia qui aperiam id quis est fugiat voluptatibus? Incidunt, temporibus! Id repudiandae provident laborum, odio ullam expedita veniam doloremque dignissimos est fugiat. Similique tenetur harum obcaecati distinctio dolores perferendis molestiae? Nesciunt mollitia esse dolorum id error alias velit doloremque qui eos!",
    //   date: "2020-01-01",
    //   category: "food",
    //   categoryEmoji: "🍔",
    // },
    // {
    //   id: 13,
    //   name: "rent",
    //   cost: 500,
    //   details: "rent",
    //   date: "2020-01-01",
    //   category: "housing",
    //   categoryEmoji: "🏠",
    // },
    // {
    //   id: 14,
    //   name: "car",
    //   cost: 200,
    //   details: "fuel",
    //   date: "2020-01-01",
    //   category: "transportation",
    //   categoryEmoji: "🚗",
    // },
    // {
    //   id: 15,
    //   name: "salary",
    //   cost: -1000,
    //   details: "salary",
    //   date: "2020-01-01",
    //   category: "income",
    //   categoryEmoji: "💰",
    // },
    // {
    //   id: 16,
    //   name: "Rękawice bokserskie",
    //   cost: 100,
    //   details: "Rękawice bokserskie",
    //   date: "2020-01-01",
    //   category: "clothes",
    //   categoryEmoji: "👕",
    // },
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
        getExpensesFromUser(user.uid)
          .then((expenses) => {
            if (expenses) {
              dispatch({ type: "SET_EXPENSES", payload: expenses });
            }
          })
          .then(() => {
            dispatch({ type: "SET_LOADING", payload: false });
          });
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
