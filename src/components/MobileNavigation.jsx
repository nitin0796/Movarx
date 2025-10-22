import { ClapperboardIcon, Home, Search, Tv } from "lucide-react";
import { NavLink } from "react-router-dom";

const MobileNavigation = () => {
  const mobileNav = [
    { id: 1, label: "Home", href: "/", icons: <Home /> },
    { id: 2, label: "TV Series", href: "tv", icons: <Tv /> },
    { id: 3, label: "Movies", href: "movie", icons: <ClapperboardIcon /> },
    { id: 4, label: "Search", href: "/search", icons: <Search /> },
  ];

  return (
    <div className="lg:hidden h-16 fixed bottom-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-2xl z-40">
      <div className="flex items-center justify-around h-full">
        {mobileNav.map((el) => (
          <NavLink
            to={el.href}
            key={el.id}
            className={({ isActive }) =>
              `flex h-full items-center flex-col justify-center transition-all duration-300 px-4 relative group ${
                isActive ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={`absolute top-0 left-1/2 -translate-x-1/2 h-1 rounded-b-full transition-all duration-300 ${
                    isActive ? "w-12" : "w-0"
                  }`}
                ></div>

                <div
                  className={`p-2 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-br from-blue-50 to-purple-50 scale-110"
                      : "group-hover:bg-gray-50"
                  }`}
                >
                  <div className="text-2xl">{el.icons}</div>
                </div>

                <p
                  className={`text-xs mt-1 font-medium transition-all duration-300 ${
                    isActive ? "font-semibold" : ""
                  }`}
                >
                  {el.label}
                </p>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default MobileNavigation;
