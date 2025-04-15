import { Layout } from "@/components/Layout";
import { InteractiveTerminal } from "@/components/InteractiveTerminal";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export default function Contact() {
  const contactCommands = [
    {
      input: "echo 'Hello, I'd like to connect!'",
      output: "Message received! Here's how you can reach me:",
    },
    {
      input: "cat contact.json",
      output: (
        <div className="space-y-1">
          <div>
            <span className="text-terminal-green">Email:</span>
            <span className="ml-2">contact@usr-neo.com</span>
          </div>
          <div>
            <span className="text-terminal-green">LinkedIn:</span>
            <span className="ml-2">linkedin.com/in/usr-neo</span>
          </div>
          <div>
            <span className="text-terminal-green">GitHub:</span>
            <span className="ml-2">github.com/usr-neo</span>
          </div>
          <div>
            <span className="text-terminal-green">Location:</span>
            <span className="ml-2">San Francisco, CA</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="container pt-24 pb-16">
        <h1 className="text-3xl font-bold mb-8">Get In Touch</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <InteractiveTerminal initialCommands={contactCommands} />
            
            <div className="bg-card p-6 rounded-lg border border-border">
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] text-primary-foreground font-bold mt-0.5">
                    @
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <a href="mailto:contact@usr-neo.com" className="text-primary hover:underline">
                      contact@usr-neo.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] text-primary-foreground font-bold mt-0.5">
                    in
                  </div>
                  <div>
                    <h3 className="font-medium">LinkedIn</h3>
                    <a href="#" className="text-primary hover:underline">
                      linkedin.com/in/usr-neo
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] text-primary-foreground font-bold mt-0.5">
                    gh
                  </div>
                  <div>
                    <h3 className="font-medium">GitHub</h3>
                    <a href="#" className="text-primary hover:underline">
                      github.com/usr-neo
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] text-primary-foreground font-bold mt-0.5">
                    📍
                  </div>
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-muted-foreground">
                      San Francisco, CA
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-card p-8 rounded-lg border border-border flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold mb-6">Contact Form</h2>
            <p className="text-muted-foreground mb-8 text-center">
              Fill out my Google Form to send me a message directly. I'll get back to you as soon as possible.
            </p>
            
            <a 
              href="https://forms.google.com/contact-form" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-6 rounded-md transition-colors inline-flex items-center gap-2 font-mono"
            >
              Go to Contact Form <ExternalLink className="h-4 w-4" />
            </a>
            
            <p className="mt-6 text-sm text-muted-foreground">
              Your information will be securely processed and never shared with third parties.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
