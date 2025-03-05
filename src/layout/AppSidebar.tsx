import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import { useSidebar } from "../context/SidebarContext";
import { ChevronDownIcon, GridIcon, HorizontaLDots, TableIcon } from "../icons";
import { _AuthApi } from "../services/auth.service";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: "/home",
    // subItems: [{ name: "Ecommerce", path: "/", pro: false }],
  },
  // {
  //   name: "Admin",
  //   icon: <TableIcon />,
  //   subItems: [{ name: "Manage", path: "/basic-tables", pro: false }],
  // },
  {
    name: "Users",
    icon: <TableIcon />,
    path: "/basic-tables",
  },
  // {
  //   name: "Partner Management",
  //   icon: <TableIcon />,
  //   subItems: [
  //     { name: "Hirarchy", path: "/basic-tables", pro: false },
  //     { name: "Partner", path: "/basic-tables", pro: false },
  //     { name: "Mercants", path: "/basic-tables", pro: false },
  //     { name: "Branches", path: "/basic-tables", pro: false },
  //     { name: "Terminals", path: "/basic-tables", pro: false },
  //     { name: "Users", path: "/basic-tables", pro: false },
  //   ],
  // },
  // {
  //   name: "Digital Receipts",
  //   icon: <TableIcon />,
  //   subItems: [
  //     { name: "Transactions", path: "/basic-tables", pro: false },
  //     { name: "Reconciliations", path: "/basic-tables", pro: false },
  //     { name: "Receipts", path: "/basic-tables", pro: false },
  //   ],
  // },
  {
    icon: <GridIcon />,
    name: "Logout",
    // subItems: [{ name: "Ecommerce", path: "/", pro: false }],
  },
];

// const navItems: NavItem[] = [
//   {
//     icon: <GridIcon />,
//     name: "Dashboard",
//     path: "/",
//     // subItems: [{ name: "Ecommerce", path: "/", pro: false }],
//   },
//   {
//     name: "Admin",
//     icon: <TableIcon />,
//     subItems: [{ name: "Manage", path: "/basic-tables", pro: false }],
//   },
//   {
//     name: "Hirarchy",
//     icon: <TableIcon />,
//     path: "/basic-tables",
//   },
//   {
//     name: "Partner",
//     icon: <TableIcon />,
//     path: "/basic-tables",
//   },
//   {
//     name: "Mercants",
//     icon: <TableIcon />,
//     path: "/basic-tables",
//   },
//   {
//     name: "Branches",
//     icon: <TableIcon />,
//     path: "/basic-tables",
//   },
//   {
//     name: "Terminals",
//     icon: <TableIcon />,
//     path: "/basic-tables",
//   },
//   {
//     name: "Users",
//     icon: <TableIcon />,
//     path: "/basic-tables",
//   },
//   {
//     name: "Digital Receipts",
//     icon: <TableIcon />,
//     subItems: [
//       { name: "Transactions", path: "/basic-tables", pro: false },
//       { name: "Reconciliations", path: "/basic-tables", pro: false },
//       { name: "Receipts", path: "/basic-tables", pro: false },
//     ],
//   },
// ];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate(); 
  
  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // const isActive = (path: string) => location.pathname === path;
  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`menu-item-icon-size  ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : nav.name === "Logout" ? (
            <button
              onClick={async () => {
                try {
                  await _AuthApi.logout();
                  navigate("/signin")
                } catch (error) {
                  console.error("Logout failed:", error);
                }
              }}
              className={`menu-item group ${
                isActive(nav.path || "")
                  ? "menu-item-active"
                  : "menu-item-inactive"
              }`}
            >
              <span
                className={`menu-item-icon-size ${
                  isActive(nav.path || "")
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[230px]"
            : isHovered
            ? "w-[230px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-0 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-center"
        }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img
                className="dark:hidden"
                src="/images/logo/logo-icon.png"
                alt="Logo"
                width={130}
                height={40}
              />
              <img
                className="hidden dark:block"
                src="/images/logo/logo.png"
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <img
              src="/images/logo/logo-icon.png"
              alt="Logo"
              width={60}
              height={60}
            />
          )}
        </Link>
      </div>
      {/* <div className="border-t border-gray-300 my-4"></div> */}
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
