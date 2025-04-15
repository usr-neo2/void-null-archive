import { Layout } from "@/components/Layout";
import { AboutSection } from "@/components/AboutSection";
import { InteractiveTerminal } from "@/components/InteractiveTerminal";

export default function About() {
  return (
    <Layout>
      <div className="container pt-24 pb-16">
        <h1 className="text-3xl font-bold mb-8">About Vaibhav Mishra</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="prose prose-lg dark:prose-invert">
              <p>
                With over 8 years of experience in IT infrastructure and cloud technologies,
                I've helped numerous enterprises achieve their digital transformation goals
                through effective DevOps practices.
              </p>
              
              <p>
                My journey in technology began with a passion for automation and solving complex
                infrastructure challenges. Over the years, I've developed expertise in cloud platforms,
                containerization, and modern CI/CD practices that enable organizations to deliver
                software more efficiently and reliably.
              </p>
              
              <p>
                As the technology landscape continues to evolve, I remain committed to staying
                at the forefront of cloud-native technologies and best practices, continuously
                expanding my knowledge and skills to deliver innovative solutions.
              </p>
              
              <h2 className="text-xl font-semibold mt-8">Education</h2>
              <ul>
                <li>
                  <strong>Master of Computer Applications</strong>
                  <br />
                  Delhi University - 2015
                </li>
                <li>
                  <strong>Bachelor of Computer Science</strong>
                  <br />
                  Mumbai University - 2013
                </li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-8">Certifications</h2>
              <ul>
                <li>AWS Certified Solutions Architect - Professional</li>
                <li>Certified Kubernetes Administrator (CKA)</li>
                <li>HashiCorp Certified Terraform Associate</li>
                <li>Azure DevOps Engineer Expert</li>
                <li>Google Cloud Professional Cloud Architect</li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-6">
            <InteractiveTerminal />
            
            <div className="bg-muted/40 p-6 rounded-lg border border-border">
              <h2 className="font-mono text-primary text-lg font-bold mb-4">Personal Philosophy</h2>
              <blockquote className="pl-4 border-l-2 border-primary italic">
                "Infrastructure should be treated as code, operations should be automated,
                and systems should be designed for resilience and scalability from the start."
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
