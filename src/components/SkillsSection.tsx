
import { Terminal } from "./Terminal";

export function SkillsSection() {
  const skillsCommands = [
    {
      prompt: "grep -r 'skills' --include='*.json' .",
      output: (
        <div className="space-y-1 font-mono">
          <div className="text-xs text-terminal-green">./skills.json:{"{"}</div>
          <div className="text-xs ml-4">"cloudPlatforms": ["AWS", "Azure", "GCP"],</div>
          <div className="text-xs ml-4">"containerization": ["Docker", "Kubernetes", "Podman"],</div>
          <div className="text-xs ml-4">"cicd": ["Jenkins", "GitHub Actions", "GitLab CI", "ArgoCD"],</div>
          <div className="text-xs ml-4">"iac": ["Terraform", "Ansible", "Pulumi"],</div>
          <div className="text-xs ml-4">"monitoring": ["Prometheus", "Grafana", "ELK Stack"],</div>
          <div className="text-xs ml-4">"languages": ["Python", "Bash", "Go", "Rust"],</div>
          <div className="text-xs ml-4">"other": ["Git", "Linux", "Networking", "Security"]</div>
          <div className="text-xs text-terminal-green">{"}"}</div>
        </div>
      ),
    },
  ];

  return (
    <section id="skills" className="py-16 md:py-24">
      <div className="container">
        <h2 className="text-2xl font-mono font-bold mb-8 flex items-center">
          <span className="text-primary mr-2">03.</span>
          <span className="mr-4">skills</span>
          <div className="h-px bg-border flex-grow"></div>
        </h2>

        <div className="space-y-8">
          <Terminal initialCommands={skillsCommands} autoType={false} />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card p-4 rounded-lg border border-border">
              <h3 className="font-mono text-primary text-sm mb-2">Cloud Platforms</h3>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-terminal-blue">■</span> AWS
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-terminal-blue">■</span> Azure
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-terminal-blue">■</span> GCP
                </li>
              </ul>
            </div>
            
            <div className="bg-card p-4 rounded-lg border border-border">
              <h3 className="font-mono text-primary text-sm mb-2">Containerization</h3>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-terminal-blue">■</span> Docker
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-terminal-blue">■</span> Kubernetes
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-terminal-blue">■</span> Podman
                </li>
              </ul>
            </div>
            
            <div className="bg-card p-4 rounded-lg border border-border">
              <h3 className="font-mono text-primary text-sm mb-2">CI/CD</h3>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-terminal-blue">■</span> Jenkins
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-terminal-blue">■</span> GitHub Actions
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-terminal-blue">■</span> GitLab CI
                </li>
              </ul>
            </div>
            
            <div className="bg-card p-4 rounded-lg border border-border">
              <h3 className="font-mono text-primary text-sm mb-2">IaC</h3>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-terminal-blue">■</span> Terraform
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-terminal-blue">■</span> Ansible
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-terminal-blue">■</span> Pulumi
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
