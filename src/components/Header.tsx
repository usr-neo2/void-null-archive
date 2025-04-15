
import { Menu, Palette } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useState } from "react";

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
                <a href="/" className="text-sm hover:text-primary transition-colors">
                  home
                </a>
              </li>
              <li>
                <a href="/about" className="text-sm hover:text-primary transition-colors">
                  about
                </a>
              </li>
              <li>
                <a href="/experience" className="text-sm hover:text-primary transition-colors">
                  experience
                </a>
              </li>
              <li>
                <a href="/skills" className="text-sm hover:text-primary transition-colors">
                  skills
                </a>
              </li>
              <li>
                <a href="/projects" className="text-sm hover:text-primary transition-colors">
                  projects
                </a>
              </li>
              <li>
                <a href="/terminal" className="text-sm hover:text-primary transition-colors">
                  terminal
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm hover:text-primary transition-colors">
                  contact
                </a>
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
                <a 
                  href="/" 
                  className="block py-2 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  home
                </a>
              </li>
              <li>
                <a 
                  href="/about" 
                  className="block py-2 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  about
                </a>
              </li>
              <li>
                <a 
                  href="/experience" 
                  className="block py-2 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  experience
                </a>
              </li>
              <li>
                <a 
                  href="/skills" 
                  className="block py-2 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  skills
                </a>
              </li>
              <li>
                <a 
                  href="/projects" 
                  className="block py-2 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  projects
                </a>
              </li>
              <li>
                <a 
                  href="/terminal" 
                  className="block py-2 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  terminal
                </a>
              </li>
              <li>
                <a 
                  href="/contact" 
                  className="block py-2 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
