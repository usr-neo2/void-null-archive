import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

interface MatrixBackgroundProps {
  density?: number;
  speed?: number;
  opacity?: number;
}

export function MatrixBackground({ 
  density = 20, 
  speed = 1.5,  // Slower speed for a more cinematic effect
  opacity = 0.4  // Lower opacity for better content visibility
}: MatrixBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Create an array to store the streams of characters
    const columns = Math.floor(canvas.width / density);
    const drops: number[] = [];
    
    // Initialize all drops to random positions above the canvas
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -canvas.height);
    }
    
    // Enhanced character set with Latin, Japanese Katakana, and special symbols
    // This creates a more authentic Matrix look with the iconic Japanese characters
    const latinChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,./<>?";
    const japaneseChars = "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";
    const specialChars = "♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼⌂¢£¥₧ƒ";
    
    // Combine all character sets with higher probability for Japanese characters
    const matrixChars = latinChars + japaneseChars + japaneseChars + specialChars;
    
    // Create an array of characters for each column
    const columnChars: string[][] = [];
    const columnLengths: number[] = [];
    
    for (let i = 0; i < columns; i++) {
      columnChars[i] = [];
      // Varied stream lengths for more organic look
      const colLength = 10 + Math.floor(Math.random() * 25);
      columnLengths[i] = colLength;
      
      for (let j = 0; j < colLength; j++) {
        // Higher chance of Japanese characters for first few positions
        if (j < 3 && Math.random() > 0.5) {
          columnChars[i][j] = japaneseChars.charAt(Math.floor(Math.random() * japaneseChars.length));
        } else {
          columnChars[i][j] = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
        }
      }
    }
    
    // Matrix effect colors based on theme
    const getMatrixColorWithOpacity = (index: number, maxLength: number) => {
      // Calculate diminishing brightness - head characters are brightest
      const brightness = Math.max(0.1, 1 - (index / maxLength));
      
      if (index === 0) {
        // Head character is brightest (white-green glow)
        return theme === "dark"
          ? `rgba(220, 255, 220, ${brightness * opacity * 2})`
          : `rgba(50, 255, 50, ${brightness * opacity * 1.8})`;
      }
      
      if (index < 2) {
        // Second characters are bright green
        return theme === "dark"
          ? `rgba(180, 255, 160, ${brightness * opacity * 1.5})`
          : `rgba(30, 230, 30, ${brightness * opacity * 1.5})`;
      }
      
      // Rest of the trail with diminishing brightness
      return theme === "dark"
        ? `rgba(0, 180, 0, ${brightness * opacity})`
        : `rgba(0, 150, 0, ${brightness * opacity})`;
    };
    
    // Ensure proper clearing of the canvas for each frame
    const clearCanvas = () => {
      // Use a highly transparent background to create proper fading effect
      ctx.fillStyle = theme === "dark" 
        ? "rgba(0, 0, 0, 0.90)" // Slightly more transparent for trail effect
        : "rgba(255, 255, 255, 0.92)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    
    // Character changing rates - some characters change more often than others
    const charChangeRates: number[] = [];
    for (let i = 0; i < columns; i++) {
      charChangeRates[i] = Math.random() * 0.05 + 0.01; // Between 1% and 6%
    }
    
    let animationFrameId: number;
    
    // The drawing function
    const draw = () => {
      clearCanvas();
      
      // Draw each column
      for (let i = 0; i < drops.length; i++) {
        const streamLength = columnLengths[i];
        
        // Draw the stream of characters
        for (let j = 0; j < streamLength; j++) {
          const y = drops[i] - (j * density);
          
          // Only draw if within canvas
          if (y > 0 && y < canvas.height) {
            const colorWithOpacity = getMatrixColorWithOpacity(j, streamLength);
            ctx.fillStyle = colorWithOpacity;
            
            // Increase size for head character to give it more emphasis
            if (j === 0) {
              ctx.font = `bold ${density + 2}px "Courier New", monospace`;
            } else if (j === 1) {
              ctx.font = `${density + 1}px "Courier New", monospace`;
            } else {
              ctx.font = `${Math.max(density - j/2, density - 3)}px "Courier New", monospace`;
            }
            
            // Randomly change characters for authentic Matrix effect
            // Head characters change more frequently
            if (j === 0 && Math.random() > 0.8) {
              columnChars[i][j] = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
            } else if (Math.random() > (1 - charChangeRates[i])) {
              columnChars[i][j] = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
            }
            
            ctx.fillText(columnChars[i][j], i * density, y);
          }
        }
        
        // Move drops down at varying speeds for more natural movement
        const dropSpeed = speed * (0.8 + (Math.random() * 0.5));
        drops[i] += dropSpeed;
        
        // Reset drop when it goes off screen with some randomization
        if (drops[i] - (streamLength * density) > canvas.height) {
          if (Math.random() > 0.98) {
            drops[i] = Math.random() * -100 - streamLength * density;
            
            // Refresh the characters with higher chance of Japanese at the beginning
            for (let j = 0; j < streamLength; j++) {
              if (j < 2 && Math.random() > 0.6) {
                columnChars[i][j] = japaneseChars.charAt(Math.floor(Math.random() * japaneseChars.length));
              } else {
                columnChars[i][j] = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
              }
            }
            
            // Sometimes change the stream length for variety
            if (Math.random() > 0.7) {
              columnLengths[i] = 10 + Math.floor(Math.random() * 25);
            }
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };
    
    draw();
    
    // Clean up
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density, speed, opacity, theme]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
}
