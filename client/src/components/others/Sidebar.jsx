import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="bg-gray-950 text-white  min-w-auto md: min-h-auto md:min-h-screen p-6  ">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-6">Finance Visualizer</h2>
        <Link to="/">
          <Button className="md:hidden block " variant="secondary">
            Back to dashboard
          </Button>
        </Link>
      </div>
      <nav className="flex flex-col gap-3">
        <Link to="/form">
          <Button variant="secondary" className="justify-start w-full">
            Add transaction
          </Button>
        </Link>
        <Link to="/setbudget">
          <Button variant="secondary" className="justify-start w-full">
            Set Budget
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
        <Link to="/comparison">
          <Button variant="secondary" className="justify-start w-full">
            Compare budget
          </Button>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
