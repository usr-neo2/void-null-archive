import { Layout } from "@/components/Layout";
import { ExperienceSection } from "@/components/ExperienceSection";
import { InteractiveTerminal } from "@/components/InteractiveTerminal";

export default function Experience() {
  const experienceCommands = [
    {
      input: "grep -r 'experience' --include='*.json' .",
      output: (
        <div className="space-y-4">
          <div>
            <h3 className="text-terminal-yellow font-semibold">TechNova Solutions (2023-Present)</h3>
            <p className="text-sm ml-4">
              Senior Cloud DevOps Engineer - Led multiple enterprise cloud migration projects
              and implemented GitOps workflows with ArgoCD.
            </p>
          </div>
          <div>
            <h3 className="text-terminal-yellow font-semibold">CloudMatrix Inc. (2020-2023)</h3>
            <p className="text-sm ml-4">
              DevOps Engineer - Built CI/CD pipelines, managed containerized applications,
              and automated infrastructure with Terraform and CloudFormation.
            </p>
          </div>
          <div>
            <h3 className="text-terminal-yellow font-semibold">Infinity IT Services (2018-2020)</h3>
            <p className="text-sm ml-4">
              System Administrator - Maintained Linux environments, implemented monitoring
              solutions, and optimized server performance.
            </p>
          </div>
          <div>
            <h3 className="text-terminal-yellow font-semibold">Global Technologies (2015-2018)</h3>
            <p className="text-sm ml-4">
              IT Support Specialist - Provided technical support, deployed workstations,
              and maintained network infrastructure.
            </p>
          </div>
        </div>
      ),
    },
  ];
  
  return (
    <Layout>
      <div className="container pt-24 pb-16">
        <h1 className="text-3xl font-bold mb-8">Work Experience</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <InteractiveTerminal initialCommands={experienceCommands} />
          </div>
          
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-xl">Senior Cloud DevOps Engineer</h3>
                  <p className="text-primary font-medium">TechNova Solutions</p>
                </div>
                <span className="text-sm text-muted-foreground">2023 - Present</span>
              </div>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                <li>Led cloud migration projects for enterprise clients, reducing infrastructure costs by 35%</li>
                <li>Implemented GitOps workflows with ArgoCD for Kubernetes deployments</li>
                <li>Designed and maintained multi-cloud infrastructure using Terraform</li>
                <li>Established security scanning and compliance automation in CI/CD pipelines</li>
                <li>Mentored junior engineers on cloud-native technologies and best practices</li>
              </ul>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-xl">DevOps Engineer</h3>
                  <p className="text-primary font-medium">CloudMatrix Inc.</p>
                </div>
                <span className="text-sm text-muted-foreground">2020 - 2023</span>
              </div>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                <li>Built and optimized CI/CD pipelines using Jenkins, GitHub Actions, and AWS CodePipeline</li>
                <li>Managed containerized applications with Docker and Kubernetes</li>
                <li>Automated infrastructure provisioning with Terraform and CloudFormation</li>
                <li>Implemented monitoring and observability solutions using Prometheus, Grafana, and ELK stack</li>
                <li>Reduced deployment failures by 80% through automated testing and validation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
