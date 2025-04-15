
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FlipCardProps {
  title: string;
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  className?: string;
}

export function FlipCard({ title, frontContent, backContent, className }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <div
      className={cn(
        "flip-card-container w-full h-[350px] perspective-1000 cursor-pointer",
        className
      )}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={cn(
          "flip-card relative w-full h-full transition-transform duration-500 transform-style-3d",
          isFlipped ? "rotate-y-180" : ""
        )}
      >
        <div className="flip-card-front absolute w-full h-full backface-hidden bg-card p-6 rounded-lg border border-border shadow-md flex flex-col">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <ScrollArea className="flex-1 pr-4">
            <div>{frontContent}</div>
          </ScrollArea>
          <div className="text-xs text-muted-foreground mt-4 text-center">Click to see details</div>
        </div>
        
        <div className="flip-card-back absolute w-full h-full backface-hidden bg-card p-6 rounded-lg border border-primary transform rotate-y-180 flex flex-col">
          <ScrollArea className="flex-1 pr-4">
            <div>{backContent}</div>
          </ScrollArea>
          <div className="text-xs text-muted-foreground mt-4 text-center">Click to flip back</div>
        </div>
      </div>
    </div>
  );
}
