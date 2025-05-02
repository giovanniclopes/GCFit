import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useState } from "react";

interface NavbarProps {
  currentDate: string;
}

export const Navbar = ({ currentDate }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {" "}
          <div className="flex-shrink-0 flex items-center">
            <div className="flex items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src="/src/assets/images/logo.svg"
                  alt="GCFit Logo"
                  className="h-10"
                />
              </motion.div>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400 font-poppins">
              {currentDate}
            </span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <NavLink href="#" isActive>
              Dashboard
            </NavLink>
            <NavLink href="#">Alimentação</NavLink>
            <NavLink href="#">Treinos</NavLink>
            <NavLink href="#">Progresso</NavLink>
            <NavLink href="#">Rotina</NavLink>
          </nav>
          <div className="flex md:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Abrir menu</span>
              {isMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          className="md:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.2 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-800 shadow-lg">
            <MobileNavLink href="#" isActive>
              Dashboard
            </MobileNavLink>
            <MobileNavLink href="#">Alimentação</MobileNavLink>
            <MobileNavLink href="#">Treinos</MobileNavLink>
            <MobileNavLink href="#">Progresso</MobileNavLink>
            <MobileNavLink href="#">Rotina</MobileNavLink>
          </div>
          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-poppins">
              {currentDate}
            </span>
          </div>
        </motion.div>
      )}
    </header>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavLink = ({ href, children, isActive = false }: NavLinkProps) => {
  return (
    <a
      href={href}
      className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
        isActive
          ? "border-fitness-500 text-fitness-600"
          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
      }`}
    >
      {children}
    </a>
  );
};

const MobileNavLink = ({ href, children, isActive = false }: NavLinkProps) => {
  return (
    <a
      href={href}
      className={`block px-3 py-2 rounded-md text-base font-medium ${
        isActive
          ? "bg-fitness-50 dark:bg-fitness-900/20 text-fitness-600"
          : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
      }`}
    >
      {children}
    </a>
  );
};
