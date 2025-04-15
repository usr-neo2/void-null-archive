
import { useTheme } from "./ThemeProvider";

export function Footer() {
  const { theme } = useTheme();
  
  return (
    <footer className="border-t border-border py-8">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-mono text-sm">
            <span className="text-muted-foreground">
              Designed & Built by <a href="https://mintx-portal.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">MintXLabs</a>
            </span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © 2025 MintXLabs. All rights reserved.
          </div>
          
          <div className="flex items-center gap-4">
            <a href="https://github.com/usr-neo" className="text-muted-foreground hover:text-primary transition-colors">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/vaibhav-jeet-mishra/" className="text-muted-foreground hover:text-primary transition-colors">
              LinkedIn
            </a>
            <a href="https://x.com/vaibhavmishra5g?s=21" className="text-muted-foreground hover:text-primary transition-colors">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
