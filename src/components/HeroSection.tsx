
import { InteractiveTerminal } from "./InteractiveTerminal";

export function HeroSection() {
  const welcomeMessage = `
Welcome to usr_neo's terminal!
I'm a Cloud DevOps Engineer focused on digital transformation.

Type 'help' for available commands or scroll down to explore.
`;

  // Make sure initialCommands is properly formatted with the expected structure
  const initialCommands = [
    {
      input: "whoami",
      output: "neo",
    },
    {
      input: "cat .profile",
      output: "Cloud DevOps Engineer | Digital Transformation Specialist",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 to-transparent"></div>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-primary font-mono">Hi, my name is</h2>
              <h1 className="text-4xl md:text-5xl font-bold">usr_neo</h1>
              <h2 className="text-3xl md:text-4xl font-bold text-muted-foreground">
                I build cloud infrastructure.
              </h2>
            </div>
            
            <p className="text-muted-foreground max-w-lg">
              I'm a specialized Cloud DevOps Engineer focused on digital transformation,
              infrastructure automation, and cloud-native solutions. Currently, I'm helping
              organizations modernize their infrastructure and embrace DevOps practices.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a
                href="/contact"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono py-2.5 px-4 rounded transition-colors"
              >
                Contact Me
              </a>
              <a
                href="/projects"
                className="border border-primary text-primary hover:bg-primary/10 font-mono py-2.5 px-4 rounded transition-colors"
              >
                View My Work
              </a>
            </div>
          </div>
          
          <div className="relative">
            <InteractiveTerminal 
              initialCommands={initialCommands} 
              welcomeMessage={welcomeMessage} 
              glowEffect={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
