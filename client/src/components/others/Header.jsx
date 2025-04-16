// client/src/components/Header.jsx
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full bg-white shadow-md px-6 py-4 md:block hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo / Title */}
        <h1 className="text-2xl font-bold text-primary">
          Personal Finance Dashboard
        </h1>

        {/* Navigation Button */}
        <Link to="/">
          <Button variant="default" className="px-6">
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
