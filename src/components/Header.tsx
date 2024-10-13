import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header className="bg-gray-800 py-4">
      <div className="container mx-auto px-4">
        <Link to="/">
          <h1 className="text-2xl font-bold">The movie DB</h1>
        </Link>
      </div>
    </header>
  );
}
