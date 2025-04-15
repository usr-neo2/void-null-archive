
import { Layout } from "@/components/Layout";
import { InteractiveTerminal } from "@/components/InteractiveTerminal";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Maximize, Minimize, Info, Terminal as TerminalIcon, Settings } from "lucide-react";
import { MatrixBackground } from "@/components/MatrixBackground";
import { useTheme } from "@/components/ThemeProvider";
import { 
  Dialog,
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TerminalPage() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { colorScheme, setColorScheme, theme } = useTheme();
  const [showMatrix, setShowMatrix] = useState(false);
  const [scanlines, setScanlines] = useState(true);
  const [terminalFlicker, setTerminalFlicker] = useState(true);
  const [glowEffect, setGlowEffect] = useState(true);

  // Enable matrix background effect only for matrix theme or when explicitly enabled
  useEffect(() => {
    setShowMatrix(colorScheme === 'matrix');
  }, [colorScheme]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <Layout>
      {showMatrix && <MatrixBackground opacity={0.2} speed={1.2} />}
      <div 
        className={`container ${
          isFullscreen ? 'fixed inset-0 z-40 bg-background p-0 m-0 max-w-full' : 'py-16'
        } transition-all duration-300 space-y-8`}
      >
        <div className={`${
          isFullscreen ? 'h-screen flex flex-col p-4 max-w-full' : 'max-w-4xl mx-auto'
        } space-y-4 relative`}>
          <div className="flex justify-between items-center pt-8">
            <div className="flex items-center gap-2">
              <TerminalIcon className="h-6 w-6 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold retro-text">Terminal</h1>
            </div>
            <div className="flex gap-2 z-10 pt-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="flex gap-1 items-center">
                    <Info className="h-4 w-4" />
                    <span className="hidden sm:inline">About Terminal</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px]">
                  <DialogHeader>
                    <DialogTitle>About This Terminal</DialogTitle>
                    <DialogDescription>
                      A retro-inspired interactive terminal built with React
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Tabs defaultValue="features">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="features">Features</TabsTrigger>
                      <TabsTrigger value="implementation">Implementation</TabsTrigger>
                      <TabsTrigger value="commands">Commands</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="features" className="space-y-4 py-4">
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Command history (use up/down arrows)</li>
                        <li>ASCII animations (matrix, steam locomotive)</li>
                        <li>Classic terminal games (snake, math game)</li>
                        <li>Keyboard navigation with WASD controls for games</li>
                        <li>Multiple retro theme options</li>
                        <li>Matrix-inspired themes and effects</li>
                        <li>Retro CRT monitor styling with green glow</li>
                        <li>Scanlines and CRT flicker effects</li>
                      </ul>
                    </TabsContent>
                    
                    <TabsContent value="implementation" className="space-y-4 py-4">
                      <p>
                        Built with React hooks and custom animations, this terminal simulates a real command-line interface
                        while maintaining the aesthetic of classic terminal applications. Most games and animations are rendered
                        using ASCII art and CSS for the retro feel.
                      </p>
                      
                      <p>
                        Each command is processed by a central handler that updates the terminal state.
                        Game logic is implemented with custom hooks, intervals, and keyboard event listeners
                        to provide responsive gameplay while staying within the terminal aesthetic.
                      </p>
                      
                      <p>
                        The terminal uses global keyboard event listeners to capture keystrokes even when the input field doesn't have focus,
                        allowing seamless control during games and animations.
                      </p>
                      
                      <div className="bg-muted/30 p-3 rounded-md border border-border mt-2">
                        <p className="text-sm">
                          <span className="font-bold">Technical Details:</span> The component uses React's useRef, useState, and useEffect hooks to manage state and side effects.
                          Animations are created using setInterval for timing, with clean-up functions in useEffect to prevent memory leaks.
                        </p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="commands" className="space-y-4 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-bold mb-2">System Commands</h3>
                          <ul className="space-y-1">
                            <li><code className="text-primary">clear</code> - Clear the terminal</li>
                            <li><code className="text-primary">help</code> - Show available commands</li>
                            <li><code className="text-primary">whoami</code> - Display user info</li>
                            <li><code className="text-primary">ls</code> - List files</li>
                            <li><code className="text-primary">cat [file]</code> - Show file contents</li>
                            <li><code className="text-primary">date</code> - Show current date/time</li>
                            <li><code className="text-primary">fortune [category]</code> - Random fortune by category</li>
                            <li><code className="text-primary">ascii [art-name]</code> - Display ASCII art</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="font-bold mb-2">Fun Commands</h3>
                          <ul className="space-y-1">
                            <li><code className="text-primary">matrix</code> - Matrix rain animation</li>
                            <li><code className="text-primary">sl</code> - Steam locomotive</li>
                            <li><code className="text-primary">rabbit</code> - Red/Blue pill choice</li>
                            <li><code className="text-primary">game</code> - Number guessing game</li>
                            <li><code className="text-primary">snake</code> - Play Snake (use WASD)</li>
                            <li><code className="text-primary">tictactoe</code> - Play Tic Tac Toe</li>
                            <li><code className="text-primary">math</code> - Math practice game</li>
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <DialogFooter className="mt-4">
                    <div className="bg-muted/30 p-3 rounded-md border border-border w-full">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-bold">Tip:</span> Use arrow keys for command history and WASD keys for navigation in games.
                      </p>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex gap-1 items-center">
                    <Settings className="h-4 w-4" />
                    <span className="hidden sm:inline">Terminal Settings</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Terminal Theme</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setColorScheme("matrix")} className={colorScheme === "matrix" ? "bg-primary/20" : ""}>
                    Matrix Green
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setColorScheme("cyber-cyan")} className={colorScheme === "cyber-cyan" ? "bg-primary/20" : ""}>
                    Cyber Cyan
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setColorScheme("vintage-amber")} className={colorScheme === "vintage-amber" ? "bg-primary/20" : ""}>
                    Vintage Amber
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setColorScheme("retro-red")} className={colorScheme === "retro-red" ? "bg-primary/20" : ""}>
                    Retro Red
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setColorScheme("midnight-blue")} className={colorScheme === "midnight-blue" ? "bg-primary/20" : ""}>
                    Midnight Blue
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>CRT Effects</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setScanlines(!scanlines)} className="flex justify-between">
                    <span>Scanlines</span>
                    <span>{scanlines ? "✓" : ""}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTerminalFlicker(!terminalFlicker)} className="flex justify-between">
                    <span>Screen Flicker</span>
                    <span>{terminalFlicker ? "✓" : ""}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setGlowEffect(!glowEffect)} className="flex justify-between">
                    <span>Terminal Glow</span>
                    <span>{glowEffect ? "✓" : ""}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowMatrix(!showMatrix)}
                className="text-sm"
              >
                {showMatrix ? 'Disable' : 'Enable'} Matrix
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleFullscreen} 
                aria-label="Toggle fullscreen"
                className="relative overflow-hidden group"
              >
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                  <div className="bg-primary/20 h-full w-full" />
                </div>
                {isFullscreen ? 
                  <Minimize className="h-5 w-5 transition-transform group-hover:scale-110" /> : 
                  <Maximize className="h-5 w-5 transition-transform group-hover:scale-110" />
                }
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            <div className="md:col-span-2">
              <p className="text-muted-foreground mb-4">
                Interact with the terminal interface. Type 'help' to see available commands.
                Use the WASD keys to play games like Snake.
              </p>
              
              <div className={`${isFullscreen ? 'flex-grow' : 'mt-6'}`}>
                <div className={`${scanlines ? 'crt-scanlines' : ''} ${terminalFlicker ? 'terminal-flicker' : ''}`}>
                  <InteractiveTerminal 
                    className={`${isFullscreen ? 'h-[calc(100vh-180px)]' : 'h-[500px]'} transition-all duration-300`} 
                    welcomeMessage={`
Welcome to the Retro Terminal Interface v1.0
Type 'help' to see available commands.
Try the 'matrix', 'sl', 'snake', 'math', or ASCII art commands for special effects!
Use WASD keys for Snake and navigation.
                    `}
                    glowEffect={glowEffect}
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4 hidden md:block">
              <div className="bg-card border border-border rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-3">Quick Commands</h2>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="justify-start" onClick={() => navigator.clipboard.writeText('matrix')}>matrix</Button>
                  <Button variant="outline" size="sm" className="justify-start" onClick={() => navigator.clipboard.writeText('sl')}>sl</Button>
                  <Button variant="outline" size="sm" className="justify-start" onClick={() => navigator.clipboard.writeText('snake')}>snake</Button>
                  <Button variant="outline" size="sm" className="justify-start" onClick={() => navigator.clipboard.writeText('math')}>math</Button>
                  <Button variant="outline" size="sm" className="justify-start" onClick={() => navigator.clipboard.writeText('fortune')}>fortune</Button>
                  <Button variant="outline" size="sm" className="justify-start" onClick={() => navigator.clipboard.writeText('rabbit')}>rabbit</Button>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-3">Game Controls</h2>
                <ul className="space-y-2 text-sm">
                  <li><span className="font-mono font-bold">W</span> - Move up</li>
                  <li><span className="font-mono font-bold">A</span> - Move left</li>
                  <li><span className="font-mono font-bold">S</span> - Move down</li>
                  <li><span className="font-mono font-bold">D</span> - Move right</li>
                  <li><span className="font-mono font-bold">Q</span> - Quit game</li>
                </ul>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-3">Retro Themes</h2>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="justify-start bg-green-500/10 border-green-500/30" 
                    onClick={() => setColorScheme("matrix")}
                  >
                    Matrix Green
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="justify-start bg-cyan-500/10 border-cyan-500/30" 
                    onClick={() => setColorScheme("cyber-cyan")}
                  >
                    Cyber Cyan
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="justify-start bg-yellow-500/10 border-yellow-500/30" 
                    onClick={() => setColorScheme("vintage-amber")}
                  >
                    Vintage Amber
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="justify-start bg-red-500/10 border-red-500/30" 
                    onClick={() => setColorScheme("retro-red")}
                  >
                    Retro Red
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-muted-foreground text-sm mt-4">
            <p>Tip: Try typing 'matrix', 'rabbit', 'sl', 'snake', 'math', 'fortune [category]', or 'ascii [art-name]' to discover easter eggs.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
