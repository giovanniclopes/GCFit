import { ReactNode } from "react";

interface FooterProps {
  children?: ReactNode;
}

export const Footer = ({ children }: FooterProps) => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              {" "}
              <img
                src="/src/assets/images/logo.svg"
                alt="GCFit Logo"
                className="h-8"
              />
            </div>

            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-fitness-600"
              >
                Sobre
              </a>
              <a
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-fitness-600"
              >
                Contato
              </a>
              <a
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-fitness-600"
              >
                Ajuda
              </a>
            </div>
          </div>

          <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} GCFit. Todos os direitos
              reservados.
            </p>
            {children}
          </div>
        </div>
      </div>
    </footer>
  );
};
