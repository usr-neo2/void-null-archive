
import { useTheme } from "./ThemeProvider";
import { Moon, Sun, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeSwitcher() {
  const { theme, toggleTheme, colorScheme, setColorScheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  
  const handleColorSchemeChange = (scheme: "matrix" | "blue" | "amber" | "purple" | "default" | "green" | "orange" | "pink") => {
    setColorScheme(scheme);
    setIsOpen(false);
  };
  
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 bg-card/50 border border-border rounded-full px-2 py-1">
        <Sun className="h-4 w-4 text-yellow-500" />
        <Switch
          checked={theme === "dark"}
          onCheckedChange={toggleTheme}
          aria-label="Toggle theme"
        />
        <Moon className="h-4 w-4 text-blue-400" />
      </div>
      
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Change color scheme"
            className="relative overflow-hidden group"
          >
            <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
              <div className="bg-primary/20 h-full w-full" />
            </div>
            <Palette className="h-[1.2rem] w-[1.2rem] transition-transform group-hover:scale-110" />
            <span className="sr-only">Change color scheme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="retro-menu">
          <DropdownMenuLabel className="retro-text">Retro Color Scheme</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className={`retro-item ${colorScheme === 'default' ? 'bg-muted/50' : ''} group`}
            onClick={() => handleColorSchemeChange('default')}
          >
            <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
            <span>Default</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className={`retro-item ${colorScheme === 'matrix' ? 'bg-muted/50' : ''} group`}
            onClick={() => handleColorSchemeChange('matrix')}
          >
            <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
            <span>Matrix</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className={`retro-item ${colorScheme === 'blue' ? 'bg-muted/50' : ''} group`}
            onClick={() => handleColorSchemeChange('blue')}
          >
            <div className="w-4 h-4 rounded-full bg-blue-600 mr-2"></div>
            <span>CRT Blue</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className={`retro-item ${colorScheme === 'amber' ? 'bg-muted/50' : ''} group`}
            onClick={() => handleColorSchemeChange('amber')}
          >
            <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
            <span>Amber</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className={`retro-item ${colorScheme === 'purple' ? 'bg-muted/50' : ''} group`}
            onClick={() => handleColorSchemeChange('purple')}
          >
            <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
            <span>Cyberpunk</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className={`retro-item ${colorScheme === 'green' ? 'bg-muted/50' : ''} group`}
            onClick={() => handleColorSchemeChange('green')}
          >
            <div className="w-4 h-4 rounded-full bg-emerald-500 mr-2"></div>
            <span>Phosphor Green</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className={`retro-item ${colorScheme === 'orange' ? 'bg-muted/50' : ''} group`}
            onClick={() => handleColorSchemeChange('orange')}
          >
            <div className="w-4 h-4 rounded-full bg-orange-500 mr-2"></div>
            <span>Orange Retro</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className={`retro-item ${colorScheme === 'pink' ? 'bg-muted/50' : ''} group`}
            onClick={() => handleColorSchemeChange('pink')}
          >
            <div className="w-4 h-4 rounded-full bg-pink-500 mr-2"></div>
            <span>Synthwave</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
