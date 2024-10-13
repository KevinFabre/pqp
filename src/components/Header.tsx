import { Link } from "@tanstack/react-router";

import logo from "@/assets/logo.svg";

export default function Header() {
  return (
    <header className="bg-gray-800 py-4">
      <div className="container flex  justify-center">
        <Link to="/">
          <img src={logo} className="h-8 md:h-12" />
        </Link>
      </div>
    </header>
  );
}
