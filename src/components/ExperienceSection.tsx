
import { Terminal } from "./Terminal";

export function ExperienceSection() {
  const experienceCommands = [
    {
      prompt: "ls experience/",
      output: (
        <div className="space-y-1 font-mono">
          <div className="grid grid-cols-4 text-xs">
            <span className="text-terminal-blue col-span-1">2025-Present</span>
            <span className="col-span-3">Founder and CEO of MintXlabs</span>
          </div>
          <div className="grid grid-cols-4 text-xs">
            <span className="text-terminal-blue col-span-1">2024-2025</span>
            <span className="col-span-3">Google Cloud Trainee at Jellyfish London </span>
          </div>
          <div className="grid grid-cols-4 text-xs">
            <span className="text-terminal-blue col-span-1">2023-2024</span>
            <span className="col-span-3">Student Alumnus at buildspace</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="experience" className="py-16 md:py-24 bg-muted/10">
      <div className="container">
        <h2 className="text-2xl font-mono font-bold mb-8 flex items-center">
          <span className="text-primary mr-2">02.</span>
          <span className="mr-4">experience</span>
          <div className="h-px bg-border flex-grow"></div>
        </h2>

        <div className="space-y-8">
          <Terminal initialCommands={experienceCommands} autoType={false} />
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">Founder and CEO</h3>
                    <p className="text-primary font-medium">MintXLabs</p>
                  </div>
                  <span className="text-xs text-muted-foreground">2025- Present</span>
                </div>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 text-sm">
                  <li>Migrated infrastructure to Open Source tools to improve uptime of the application to 90%</li>
                  <li>Implemented HELM for Kubernetes deployments on EKS (AWS)</li>
                  <li>Designed and maintained multi-cloud infrastructure using Terraform</li>
                  <li>Established security scanning and compliance automation in CI/CD pipelines</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">Google Cloud Trainee</h3>
                    <p className="text-primary font-medium">Jellyfish,London</p>
                  </div>
                  <span className="text-xs text-muted-foreground">2024 - 2025</span>
                </div>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 text-sm">
                  <li>Built and optimized compute instances by installing and checking correct and latest drivers.</li>
                  <li>Managed containerized applications and their network policies</li>
                  <li>Learned to automate infrastructure to enhance compliance and security to the code</li>
                  <li>Implemented monitoring and observability solutions using Prometheus and Grafana on networked Kubernetes Instances</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
