import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="bg-gray-950 text-white  min-w-auto md: min-h-auto md:min-h-screen p-6  ">
      <h2 className="text-2xl font-bold mb-6">Finance Visualizer</h2>
      <nav className="flex flex-col gap-3">
        <Link to="/form">
          <Button variant="secondary" className="justify-start w-full">
            Transaction From
          </Button>
        </Link>
        <Link to="/monthly">
          <Button variant="secondary" className="justify-start w-full">
            Monthly Expenses
          </Button>
        </Link>
        <Link to="/expenses-list">
          <Button variant="secondary" className="justify-start w-full">
            Expenses List
          </Button>
        </Link>
        <Link to="/daily">
          <Button variant="secondary" className="justify-start w-full">
            Daily Expenses
          </Button>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
