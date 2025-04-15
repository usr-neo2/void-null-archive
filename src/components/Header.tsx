
import { Menu, Palette } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Header() {
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="fixed w-full top-0 z-50 border-b border-border/40 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-primary">usr_neo</span>
        </div>
        
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex">
            <ul className="flex items-center gap-6">
              <li>
                <Link to="/" className="text-sm hover:text-primary transition-colors">
                  home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-primary transition-colors">
                  about
                </Link>
              </li>
              <li>
                <Link to="/experience" className="text-sm hover:text-primary transition-colors">
                  experience
                </Link>
              </li>
              <li>
                <Link to="/skills" className="text-sm hover:text-primary transition-colors">
                  skills
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-sm hover:text-primary transition-colors">
                  projects
                </Link>
              </li>
              <li>
                <Link to="/terminal" className="text-sm hover:text-primary transition-colors">
                  terminal
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-primary transition-colors">
                  contact
                </Link>
              </li>
            </ul>
          </nav>
          
          <ThemeSwitcher />
          
          <button 
            className="block md:hidden" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card/90 backdrop-blur-md border-b border-border">
          <nav className="container py-4">
            <ul className="flex flex-col space-y-4">
              <li>
                <Link
                  to="/" 
                  className="block py-2 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  home
                </Link>
              </li>
              <li>
                <Link
                  to="/about" 
                  className="block py-2 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  about
                </Link>
              </li>
              <li>
                <Link
                  to="/experience" 
                  className="block py-2 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  experience
                </Link>
              </li>
              <li>
                <Link
                  to="/skills" 
                  className="block py-2 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  skills
                </Link>
              </li>
              <li>
                <Link
                  to="/projects" 
                  className="block py-2 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  projects
                </Link>
              </li>
              <li>
                <Link
                  to="/terminal" 
                  className="block py-2 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  terminal
                </Link>
              </li>
              <li>
                <Link
                  to="/contact" 
                  className="block py-2 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
