
import { Terminal } from "./Terminal";
import { ExternalLink } from "lucide-react";

export function ContactSection() {
  const contactCommands = [
    {
      prompt: "echo 'Hello, I'd like to connect!'",
      output: "Message received! Here's how you can reach me:",
    },
  ];

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="container">
        <h2 className="text-2xl font-mono font-bold mb-8 flex items-center">
          <span className="text-primary mr-2">05.</span>
          <span className="mr-4">contact</span>
          <div className="h-px bg-border flex-grow"></div>
        </h2>

        <div className="max-w-2xl mx-auto space-y-8">
          <Terminal initialCommands={contactCommands} autoType={false} />
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="space-y-4">
                <h3 className="font-mono text-primary font-bold">Get in touch</h3>
                <p className="text-muted-foreground text-sm">
                  I'm currently looking for new opportunities in Cloud and DevOps.
                  Feel free to reach out if you're interested in working together!
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">Email:</span>
                    <a href="mailto:vaibhavmishra5g@gmail.com" className="text-sm hover:text-primary transition-colors">
                      vaibhavmishra5g@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">LinkedIn:</span>
                    <a href="https://www.linkedin.com/in/vaibhav-jeet-mishra/" className="text-sm hover:text-primary transition-colors">
                    www.linkedin.com/in/vaibhav-jeet-mishra/
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">GitHub:</span>
                    <a href="https://github.com/usr-neo" className="text-sm hover:text-primary transition-colors">
                      github.com/usr-neo
                    </a>
                  </div>
                </div>
                
                <div className="mt-6">
                  <a 
                    href="https://forms.gle/z3ydrjgaEhQ5VTw66" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground py-2 px-4 rounded transition-colors inline-flex items-center gap-2 text-sm"
                  >
                    Contact Form <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/40 p-6 rounded-lg border border-border">
              <div className="font-mono space-y-4">
                <div className="text-xs">
                  <span className="text-terminal-green">$</span> whoami
                </div>
                <div className="text-xs ml-4">
                  neo
                </div>
                <div className="text-xs">
                  <span className="text-terminal-green">$</span> pwd
                </div>
                <div className="text-xs ml-4">
                  /home/neo/digital-transformation
                </div>
                <div className="text-xs">
                  <span className="text-terminal-green">$</span> uptime
                </div>
                <div className="text-xs ml-4">
                  8 years in cloud and DevOps
                </div>
                <div className="text-xs">
                  <span className="text-terminal-green">$</span> finger neo
                </div>
                <div className="text-xs ml-4">
                  Location: India
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
