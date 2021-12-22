import { createContext, useReducer, useEffect } from "react";
import { ref, set, child, get, onValue, push } from "firebase/database";
import { database } from "../firebse";
import { toast } from "react-toastify";
import { useUserAuth } from "./UserAuthContext";

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
    default:
      return state;
  }
};

const initialState = {
  budget: 0,
  expenses: [],
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  let { user } = useUserAuth();

  useEffect(() => {
    if (user) {
      const dbRef = ref(database);
      get(child(dbRef, "users/" + user.uid + "/budget"))
        .then((snapshot) => {
          if (snapshot.exists()) {
            dispatch({ type: "SET_BUDGET", payload: snapshot.val() });
          } else {
            set(child(dbRef, "users/" + user.uid + "/budget"), 1500)
              .then(() => {
                dispatch({ type: "SET_BUDGET", payload: 1500 });
              })
              .catch((error) => {
                console.log(
                  "AppProvider: useEffect: SET_BUDGET: Error: " + error
                );
              });
          }
        })
        .catch((error) => {
          console.log(
            "AppProvider: useEffect: GET_BUDGET: Error: " + error
          );
        });
    }
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        budget: state.budget,
        expenses: state.expenses,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
