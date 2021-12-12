import "./App.css";
import Budget from "./components/Budget";
import Remaining from "./components/Remaining";
import ExpenseTotal from "./components/ExpenseTotal";
import ExpenseList from "./components/ExpenseList";
import AddExpenseForm from "./components/AddExpenseForm";

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="font-medium text-5xl md:text-7xl text-center">Budget App</h1>
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Budget />
        <Remaining />
        <ExpenseTotal />
      </div>
      <ExpenseList/>
      <AddExpenseForm/>
    </div>
  );
}

export default App;
