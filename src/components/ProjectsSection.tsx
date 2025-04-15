
import { Terminal } from "./Terminal";
import { FlipCard } from "./FlipCard";
import { Link } from "react-router-dom";
import { ExternalLink, Github } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ProjectsSection() {
  const projectsCommands = [
    {
      prompt: "find ./projects -type f -name 'README.md' | xargs cat",
      output: (
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-terminal-yellow font-semibold">Enterprise Cloud Migration</h3>
            <p className="text-sm">
              Led a comprehensive cloud migration for a financial services company, 
              migrating 200+ applications from on-premises to AWS. Reduced infrastructure 
              costs by 40% and improved application performance by 60%.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="text-terminal-yellow font-semibold">Kubernetes Platform Implementation</h3>
            <p className="text-sm">
              Designed and implemented a production-grade Kubernetes platform using EKS, 
              enabling developers to self-service deploy applications. Reduced deployment 
              time from days to minutes.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="text-terminal-yellow font-semibold">CI/CD Pipeline Automation</h3>
            <p className="text-sm">
              Built a standardized CI/CD pipeline framework using GitHub Actions and ArgoCD, 
              improving deployment reliability and enabling continuous delivery across multiple teams.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="text-terminal-yellow font-semibold">🐇 Follow the white rabbit...</h3>
            <p className="text-sm">
              Type 'rabbit' in the terminal to see where it leads...
            </p>
          </div>
        </div>
      ),
    },
  ];

  const webProjects = [
    {
      title: "Visa Guide",
      image: "/visa-guide.webp",
      frontContent: (
        <div className="space-y-4">
          <div className="mb-4 h-32 overflow-hidden rounded">
            <img src="/visa-guide.webp" alt="Visa Guide" className="object-cover w-full h-full" />
          </div>
          <p className="text-muted-foreground text-sm">
            Interactive visa application guide with country-specific requirements and document checklists.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-muted px-2 py-1 rounded text-xs">React</span>
            <span className="bg-muted px-2 py-1 rounded text-xs">Next.js</span>
            <span className="bg-muted px-2 py-1 rounded text-xs">TypeScript</span>
          </div>
        </div>
      ),
      backContent: (
        <div className="space-y-4">
          <h3 className="font-bold">Visa Guide Application</h3>
          <p className="text-sm">
            Comprehensive visa application guide with personalized document requirements
            and step-by-step application process visualization.
          </p>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Interactive visa eligibility checker</li>
            <li>Document template generation</li>
            <li>Application status tracking</li>
            <li>Country-specific requirement database</li>
          </ul>
          <a href="https://visa-guide.example.com" target="_blank" rel="noopener noreferrer" 
            className="flex items-center gap-1 text-sm text-primary hover:underline mt-2">
            <ExternalLink size={14} /> Visit website
          </a>
        </div>
      )
    },
    {
      title: "Street Smart Skills",
      image: "/street-smart.webp",
      frontContent: (
        <div className="space-y-4">
          <div className="mb-4 h-32 overflow-hidden rounded">
            <img src="/street-smart.webp" alt="Street Smart Skills" className="object-cover w-full h-full" />
          </div>
          <p className="text-muted-foreground text-sm">
            Urban survival skills training platform with interactive courses and simulations.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-muted px-2 py-1 rounded text-xs">React</span>
            <span className="bg-muted px-2 py-1 rounded text-xs">Firebase</span>
            <span className="bg-muted px-2 py-1 rounded text-xs">Tailwind</span>
          </div>
        </div>
      ),
      backContent: (
        <div className="space-y-4">
          <h3 className="font-bold">Street Smart Skills</h3>
          <p className="text-sm">
            Online platform teaching urban survival skills through interactive lessons,
            scenario-based learning, and community knowledge sharing.
          </p>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Interactive scenario simulations</li>
            <li>Progress tracking and skill badges</li>
            <li>Community forums and experiences</li>
            <li>Location-based safety alerts</li>
          </ul>
          <a href="https://streetsmartskills.example.com" target="_blank" rel="noopener noreferrer" 
            className="flex items-center gap-1 text-sm text-primary hover:underline mt-2">
            <ExternalLink size={14} /> Visit website
          </a>
        </div>
      )
    },
    {
      title: "Nootropics Guide",
      image: "/nootropics.webp",
      frontContent: (
        <div className="space-y-4">
          <div className="mb-4 h-32 overflow-hidden rounded">
            <img src="/nootropics.webp" alt="Nootropics Guide" className="object-cover w-full h-full" />
          </div>
          <p className="text-muted-foreground text-sm">
            Educational platform on cognitive enhancers with personalized stack recommendations.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-muted px-2 py-1 rounded text-xs">Vue.js</span>
            <span className="bg-muted px-2 py-1 rounded text-xs">Node.js</span>
            <span className="bg-muted px-2 py-1 rounded text-xs">MongoDB</span>
          </div>
        </div>
      ),
      backContent: (
        <div className="space-y-4">
          <h3 className="font-bold">Nootropics Guide</h3>
          <p className="text-sm">
            Evidence-based nootropics resource with personalized stack recommendations
            and integration with health tracking applications.
          </p>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Scientific research database</li>
            <li>Personalized stack builder</li>
            <li>Interaction checker for medications</li>
            <li>Health metrics integration</li>
          </ul>
          <a href="https://nootropics-guide.example.com" target="_blank" rel="noopener noreferrer" 
            className="flex items-center gap-1 text-sm text-primary hover:underline mt-2">
            <Github size={14} /> View on GitHub
          </a>
        </div>
      )
    },
    {
      title: "Inner Call",
      image: "/inner-call.webp",
      frontContent: (
        <div className="space-y-4">
          <div className="mb-4 h-32 overflow-hidden rounded">
            <img src="/inner-call.webp" alt="Inner Call" className="object-cover w-full h-full" />
          </div>
          <p className="text-muted-foreground text-sm">
            Mindfulness meditation app with guided sessions and progress tracking.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-muted px-2 py-1 rounded text-xs">React Native</span>
            <span className="bg-muted px-2 py-1 rounded text-xs">Firebase</span>
            <span className="bg-muted px-2 py-1 rounded text-xs">Redux</span>
          </div>
        </div>
      ),
      backContent: (
        <div className="space-y-4">
          <h3 className="font-bold">Inner Call Meditation</h3>
          <p className="text-sm">
            Mindfulness and meditation application with personalized guidance,
            biofeedback integration, and progressive learning paths.
          </p>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Guided meditation library</li>
            <li>Sleep story narrations</li>
            <li>Breathing exercise visualizations</li>
            <li>Stress reduction programs</li>
          </ul>
          <a href="https://innercall.example.com" target="_blank" rel="noopener noreferrer" 
            className="flex items-center gap-1 text-sm text-primary hover:underline mt-2">
            <ExternalLink size={14} /> Visit website
          </a>
        </div>
      )
    },
    {
      title: "MintXLabs",
      image: "/mintxlabs.webp",
      frontContent: (
        <div className="space-y-4">
          <div className="mb-4 h-32 overflow-hidden rounded">
            <img src="/mintxlabs.webp" alt="MintXLabs" className="object-cover w-full h-full" />
          </div>
          <p className="text-muted-foreground text-sm">
            NFT marketplace with creator tools and blockchain integration.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-muted px-2 py-1 rounded text-xs">React</span>
            <span className="bg-muted px-2 py-1 rounded text-xs">Solidity</span>
            <span className="bg-muted px-2 py-1 rounded text-xs">Web3.js</span>
          </div>
        </div>
      ),
      backContent: (
        <div className="space-y-4">
          <h3 className="font-bold">MintXLabs NFT Platform</h3>
          <p className="text-sm">
            NFT marketplace and creator studio with multi-chain support,
            focusing on digital art, music, and collectibles.
          </p>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Low-code NFT creation tools</li>
            <li>Multi-chain deployment options</li>
            <li>Royalty management system</li>
            <li>Community-driven curation</li>
          </ul>
          <a href="https://mintxlabs.example.com" target="_blank" rel="noopener noreferrer" 
            className="flex items-center gap-1 text-sm text-primary hover:underline mt-2">
            <ExternalLink size={14} /> Visit marketplace
          </a>
        </div>
      )
    }
  ];

  const devOpsProjects = [
    {
      title: "Cloud Migration",
      image: "/cloud-migration.webp",
      frontContent: (
        <div className="space-y-4">
          <div className="mb-4 h-32 overflow-hidden rounded">
            <img src="/cloud-migration.webp" alt="Cloud Migration" className="object-cover w-full h-full" />
          </div>
          <p className="text-muted-foreground text-sm">
            Enterprise cloud migration for financial services company, reducing costs by 40%.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-muted px-2 py-1 rounded text-xs">AWS</span>
            <span className="bg-muted px-2 py-1 rounded text-xs">CloudFormation</span>
            <span className="bg-muted px-2 py-1 rounded text-xs">Python</span>
          </div>
        </div>
      ),
      backContent: (
        <div className="space-y-4">
          <h3 className="font-bold">Enterprise Cloud Migration</h3>
          <p className="text-sm">
            Led a comprehensive cloud migration for a financial services company,
            migrating 200+ applications from on-premises to AWS infrastructure.
          </p>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Reduced infrastructure costs by 40%</li>
            <li>Improved application performance by 60%</li>
            <li>Built automated migration pipelines</li>
            <li>Implemented cloud security best practices</li>
          </ul>
          <a href="https://github.com/username/cloud-migration" target="_blank" rel="noopener noreferrer" 
            className="flex items-center gap-1 text-sm text-primary hover:underline mt-2">
            <Github size={14} /> View architecture
          </a>
        </div>
      )
    },
    {
      title: "Kubernetes Platform",
      image: "/kubernetes.webp",
      frontContent: (
        <div className="space-y-4">
          <div className="mb-4 h-32 overflow-hidden rounded">
            <img src="/kubernetes.webp" alt="Kubernetes Platform" className="object-cover w-full h-full" />
          </div>
          <p className="text-muted-foreground text-sm">
            Production-grade Kubernetes platform using EKS, enabling self-service deployments.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-muted px-2 py-1 rounded text-xs">Kubernetes</span>
            <span className="bg-muted px-2 py-1 rounded text-xs">EKS</span>
            <span className="bg-muted px-2 py-1 rounded text-xs">Helm</span>
          </div>
        </div>
      ),
      backContent: (
        <div className="space-y-4">
          <h3 className="font-bold">Kubernetes Platform Implementation</h3>
          <p className="text-sm">
            Designed and implemented a production-grade Kubernetes platform using EKS,
            enabling developers to self-service deploy applications.
          </p>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Reduced deployment time from days to minutes</li>
            <li>Implemented autoscaling for optimal resource usage</li>
            <li>Created CI/CD pipelines for container deployment</li>
            <li>Set up monitoring with Prometheus and Grafana</li>
          </ul>
          <a href="https://github.com/username/eks-platform" target="_blank" rel="noopener noreferrer" 
            className="flex items-center gap-1 text-sm text-primary hover:underline mt-2">
            <Github size={14} /> View on GitHub
          </a>
        </div>
      )
    },
    {
      title: "CI/CD Pipeline Automation",
      image: "/cicd.webp",
      frontContent: (
        <div className="space-y-4">
          <div className="mb-4 h-32 overflow-hidden rounded">
            <img src="/cicd.webp" alt="CI/CD Pipeline" className="object-cover w-full h-full" />
          </div>
          <p className="text-muted-foreground text-sm">
            Standardized CI/CD pipeline using GitHub Actions and ArgoCD for continuous delivery.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-muted px-2 py-1 rounded text-xs">GitHub Actions</span>
            <span className="bg-muted px-2 py-1 rounded text-xs">ArgoCD</span>
            <span className="bg-muted px-2 py-1 rounded text-xs">Docker</span>
          </div>
        </div>
      ),
      backContent: (
        <div className="space-y-4">
          <h3 className="font-bold">CI/CD Pipeline Automation</h3>
          <p className="text-sm">
            Built a standardized CI/CD pipeline framework using GitHub Actions and ArgoCD,
            improving deployment reliability across multiple teams.
          </p>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Enabled continuous delivery across 15+ teams</li>
            <li>Reduced build times by 70%</li>
            <li>Implemented automated testing and quality checks</li>
            <li>Created self-healing deployment patterns</li>
          </ul>
          <a href="https://github.com/username/cicd-templates" target="_blank" rel="noopener noreferrer" 
            className="flex items-center gap-1 text-sm text-primary hover:underline mt-2">
            <Github size={14} /> View templates
          </a>
        </div>
      )
    },
    {
      title: "Cloud Cost Optimization",
      image: "/cost-optimization.webp",
      frontContent: (
        <div className="space-y-4">
          <div className="mb-4 h-32 overflow-hidden rounded">
            <img src="/cost-optimization.webp" alt="Cloud Cost Optimization" className="object-cover w-full h-full" />
          </div>
          <p className="text-muted-foreground text-sm">
            Automated cost optimization solution using AWS Lambda and Cost Explorer API.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-muted px-2 py-1 rounded text-xs">AWS</span>
            <span className="bg-muted px-2 py-1 rounded text-xs">Lambda</span>
            <span className="bg-muted px-2 py-1 rounded text-xs">Python</span>
          </div>
        </div>
      ),
      backContent: (
        <div className="space-y-4">
          <h3 className="font-bold">Cloud Cost Optimization</h3>
          <p className="text-sm">
            Implemented an automated cost optimization solution using AWS Lambda and
            Cost Explorer API, resulting in substantial monthly savings.
          </p>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>25% monthly savings on cloud infrastructure</li>
            <li>Automated resource scheduling based on usage patterns</li>
            <li>Implemented rightsizing recommendations</li>
            <li>Created real-time cost anomaly detection</li>
          </ul>
          <a href="https://github.com/username/cloud-cost-optimizer" target="_blank" rel="noopener noreferrer" 
            className="flex items-center gap-1 text-sm text-primary hover:underline mt-2">
            <Github size={14} /> View code
          </a>
        </div>
      )
    }
  ];

  return (
    <section id="projects" className="py-16 md:py-24 bg-muted/10">
      <div className="container">
        <h2 className="text-2xl font-mono font-bold mb-8 flex items-center">
          <span className="text-primary mr-2">04.</span>
          <span className="mr-4">projects</span>
          <div className="h-px bg-border flex-grow"></div>
        </h2>

        <div className="space-y-8">
          <Terminal initialCommands={projectsCommands} autoType={false} />
          
          <Tabs defaultValue="web" className="w-full">
            <TabsList className="mb-6 w-full md:w-auto">
              <TabsTrigger value="web">Web Projects</TabsTrigger>
              <TabsTrigger value="devops">DevOps Projects</TabsTrigger>
            </TabsList>
            
            <TabsContent value="web" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {webProjects.map((project, index) => (
                  <FlipCard 
                    key={index}
                    title={project.title}
                    frontContent={project.frontContent}
                    backContent={project.backContent}
                  />
                ))}
              </div>
              <div className="text-center">
                <Link to="/projects" className="text-primary hover:underline inline-flex items-center gap-1">
                  View all web projects <ExternalLink size={14} />
                </Link>
              </div>
            </TabsContent>
            
            <TabsContent value="devops" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {devOpsProjects.map((project, index) => (
                  <FlipCard 
                    key={index}
                    title={project.title}
                    frontContent={project.frontContent}
                    backContent={project.backContent}
                  />
                ))}
              </div>
              <div className="text-center">
                <Link to="/projects" className="text-primary hover:underline inline-flex items-center gap-1">
                  View all DevOps projects <ExternalLink size={14} />
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
