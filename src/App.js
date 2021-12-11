import logo from "./logo.svg";
import "./App.css";
import Budget from "./components/Budget";
import Remaining from "./components/Remaining";
import ExpenseTotal from "./components/ExpenseTotal";

function App() {
  return (
    <div className="border container mx-auto p-4">
      <h1 className="text-5xl text-center">Budget App</h1>
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Budget />
        <Remaining />
        <ExpenseTotal />
      </div>
    </div>
  );
}

export default App;
