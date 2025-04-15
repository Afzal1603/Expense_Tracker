// client/src/components/Header.jsx
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white md:block hidden shadow-md px-4 py-3 flex items-center justify-between">
      <h1 className="text-xl font-semibold text-gray-900">
        Personal Finance Dashboard
      </h1>
      {/* <div className="flex gap-2">
        <Button>Dummy 1</Button>
        <Button variant="outline">Dummy 2</Button>
      </div> */}
    </header>
  );
};

export default Header;
