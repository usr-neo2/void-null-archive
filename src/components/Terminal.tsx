
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "./ThemeProvider";

interface Command {
  input?: string;
  prompt?: string;  // Support both input and prompt for backward compatibility
  output: string | React.ReactNode;
  isTyping?: boolean;
}

interface TerminalProps {
  className?: string;
  initialCommands?: Command[];
  autoType?: boolean;
  typingSpeed?: number;
  glowEffect?: boolean;
}

export function Terminal({ 
  className, 
  initialCommands = [], 
  autoType = true,
  typingSpeed = 50,
  glowEffect = true
}: TerminalProps) {
  // Ensure initialCommands is properly formatted and not null/undefined
  const safeInitialCommands = Array.isArray(initialCommands) ? initialCommands : [];
  
  const [commands, setCommands] = useState<Command[]>(
    safeInitialCommands.map(cmd => ({ 
      ...cmd, 
      isTyping: autoType,
      // Ensure we're using a consistent property (prompt) internally
      prompt: cmd.prompt || cmd.input 
    }))
  );
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!autoType || currentCommandIndex >= commands.length) return;

    const currentCommand = commands[currentCommandIndex];
    if (!currentCommand) return;
    
    const prompt = currentCommand.prompt || '';
    let displayedChars = 0;

    const typingInterval = setInterval(() => {
      displayedChars++;
      
      setCommands(prevCommands => 
        prevCommands.map((cmd, i) => {
          if (i !== currentCommandIndex) return cmd;
          
          return {
            ...cmd,
            isTyping: displayedChars < prompt.length,
            prompt: prompt.substring(0, displayedChars),
          };
        })
      );
      
      if (displayedChars >= prompt.length) {
        clearInterval(typingInterval);
        setCurrentCommandIndex(prev => prev + 1);
        // Auto scroll to bottom when typing completes
        scrollToBottom();
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [commands, currentCommandIndex, autoType, typingSpeed]);

  useEffect(() => {
    // Auto scroll to bottom when commands change
    scrollToBottom();
  }, [commands]);

  // Function to scroll terminal to bottom
  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <div className="h-3 w-3 rounded-full bg-terminal-red"></div>
        <div className="h-3 w-3 rounded-full bg-terminal-yellow"></div>
        <div className="h-3 w-3 rounded-full bg-terminal-green"></div>
        <div className="ml-2 text-xs text-muted-foreground">terminal</div>
      </div>
      <div 
        ref={terminalRef} 
        className={`terminal-body max-h-96 overflow-y-auto ${
          theme === 'dark' ? 'text-green-400' : 'text-primary'
        } ${glowEffect ? 'shadow-terminal' : ''} cursor-text`}
      >
        {commands.map((command, index) => (
          <div key={index} className="mb-4">
            <div className="command-line">
              <span className="command-prompt">$</span>
              <span className="command-text">{command.prompt || command.input}
                {command.isTyping && <span className="cursor"></span>}
              </span>
            </div>
            {!command.isTyping && (
              <div className="command-output mt-1">
                {command.output}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
