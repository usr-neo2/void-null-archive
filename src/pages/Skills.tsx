import { Layout } from "@/components/Layout";
import { SkillsSection } from "@/components/SkillsSection";
import { InteractiveTerminal } from "@/components/InteractiveTerminal";

export default function Skills() {
  return (
    <Layout>
      <div className="container pt-24 pb-16">
        <h1 className="text-3xl font-bold mb-8">Skills & Expertise</h1>
        
        <div className="space-y-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <InteractiveTerminal />
            </div>
            
            <div className="prose dark:prose-invert">
              <p>
                Over the years, I've developed a diverse skill set in cloud technologies, 
                DevOps practices, and infrastructure automation. My technical expertise spans 
                across multiple cloud platforms, containerization technologies, CI/CD tools, 
                and infrastructure as code solutions.
              </p>
              <p>
                I believe in continuous learning and regularly update my skills to stay 
                current with the rapidly evolving technology landscape. My approach combines 
                technical knowledge with a focus on business outcomes, ensuring that 
                technology implementations deliver real value.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="font-mono text-primary text-lg font-bold mb-4">Cloud Platforms</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-terminal-blue">■</span> AWS (EC2, S3, Lambda, EKS)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-terminal-blue">■</span> Azure (AKS, VM, Functions)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-terminal-blue">■</span> Google Cloud Platform (GKE, Compute)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-terminal-blue">■</span> Multi-cloud architecture
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-terminal-blue">■</span> Cloud security best practices
                </li>
              </ul>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="font-mono text-primary text-lg font-bold mb-4">Containerization</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-terminal-blue">■</span> Docker container development
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-terminal-blue">■</span> Kubernetes orchestration
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-terminal-blue">■</span> Helm charts and operators
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-terminal-blue">■</span> Container security scanning
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-terminal-blue">■</span> Service mesh (Istio, Linkerd)
                </li>
              </ul>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="font-mono text-primary text-lg font-bold mb-4">DevOps & CI/CD</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-terminal-blue">■</span> Jenkins pipeline development
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-terminal-blue">■</span> GitHub Actions workflows
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-terminal-blue">■</span> GitLab CI pipelines
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-terminal-blue">■</span> ArgoCD & GitOps patterns
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-terminal-blue">■</span> Continuous testing integration
                </li>
              </ul>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="font-mono text-primary text-lg font-bold mb-4">Infrastructure as Code</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-terminal-blue">■</span> Terraform modules & workspaces
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-terminal-blue">■</span> Ansible automation
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-terminal-blue">■</span> CloudFormation templates
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-terminal-blue">■</span> Pulumi infrastructure as code
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-terminal-blue">■</span> Infrastructure testing
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
