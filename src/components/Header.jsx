import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import userIcon from "../assets/userIcon.png";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {
  const location = useLocation();
  const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ");
  const [search, setSearch] = useState(removeSpace);
  const navigate = useNavigate();

  const navigation = [
    { id: 1, label: "TV Series", href: "tv" },
    { id: 2, label: "Movies", href: "movie" },
  ];

  useEffect(() => {
    if (search) {
      navigate(`/search?q=${search}`);
    }
  }, [search, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <header className="fixed top-0 w-full shadow-lg bg-white/90 backdrop-blur-md z-40 border-b border-gray-100">
      <div className="container mx-auto px-4 flex items-center py-3">
        <Link to="/" className="flex-shrink-0">
          <img
            className="mix-blend-multiply w-13 hover:opacity-80 transition-all duration-300 hover:scale-105"
            src={logo}
            alt="logo"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-2 ml-10">
          {navigation.map((el) => (
            <NavLink
              key={el.id}
              to={el.href}
              className={({ isActive }) =>
                `px-5 py-2 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 font-semibold relative ${
                  isActive
                    ? "text-blue-600 bg-gradient-to-r from-blue-50 to-purple-50"
                    : "text-gray-700 hover:text-blue-600"
                }`
              }
            >
              <span className="relative">
                {el.label}
                <span
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300`}
                  style={{ width: "0%" }}
                ></span>
              </span>
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="relative hidden lg:block">
              <input
                type="text"
                placeholder="Search Movies..."
                className="bg-gradient-to-r from-gray-50 to-gray-100 shadow-sm rounded-full pl-4 pr-10 py-2.5 outline-none border border-gray-200 focus:border-blue-400 focus:from-blue-50 focus:to-purple-50 text-gray-700 placeholder-gray-500 transition-all duration-300 w-56 focus:w-64"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
            <button
              type="button"
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-all duration-300 text-gray-700 hover:text-blue-600"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          <div className="relative">
            <div className="w-9 h-9 rounded-full overflow-hidden cursor-pointer ring-2 ring-gray-200 hover:ring-blue-400 transition-all duration-300 hover:scale-110 active:scale-95">
              <img
                src={userIcon}
                alt="User Icon"
                className="w-full h-full mix-blend-multiply"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-2 border-white shadow-sm"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
