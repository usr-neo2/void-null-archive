
import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MatrixBackground } from "./MatrixBackground";
import { TooltipProvider } from "@/components/ui/tooltip";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <TooltipProvider>
      <div className="flex min-h-screen flex-col">
        <MatrixBackground />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </TooltipProvider>
  );
}
