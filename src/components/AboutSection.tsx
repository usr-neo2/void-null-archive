
import { Terminal } from "./Terminal";

export function AboutSection() {
  const aboutCommands = [
    {
      prompt: "cat about.md",
      output: (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Vaibhav Mishra</h3>
          <p>
            I'm a Cloud DevOps Engineer with a passion for digital transformation and
            infrastructure automation. With expertise in cloud platforms, CI/CD, and containerization,
            I help organizations modernize their infrastructure and development workflows.
          </p>
          <p>
            My goal is to bridge the gap between development and operations,
            empowering teams to deliver software faster, more reliably, and at scale.
          </p>
        </div>
      ),
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container">
        <h2 className="text-2xl font-mono font-bold mb-8 flex items-center">
          <span className="text-primary mr-2">01.</span>
          <span className="mr-4">about me</span>
          <div className="h-px bg-border flex-grow"></div>
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <Terminal initialCommands={aboutCommands} autoType={false} />
          
          <div className="bg-muted/40 p-6 rounded-lg border border-border">
            <div className="space-y-4">
              <h3 className="font-mono text-primary">Quick Bio</h3>
              <p className="text-muted-foreground">
                With over 5 years of experience in IT infrastructure and Cloud technologies,
                I've helped numerous projects achieve their digital transformation goals
                through effective DevOps practices.
              </p>
              <h3 className="font-mono text-primary">Current Focus</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Cloud-native architecture and Kubernetes orchestration</li>
                <li>Infrastructure as Code (IaC) using Terraform and Pulumi</li>
                <li>CI/CD pipeline optimization</li>
                <li>Security automation and compliance as code</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
