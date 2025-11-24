
import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@shared/schema";

const projects: Project[] = [
  {
    id: "1",
    title: "Event Registration and entry Management System",
    description: "A full-featured platform which can allow user to manger the event registration,entry pass management and ticketing system with payment gatewaywith the help linktree.",
    technologies: ["React", "Node.js", "Mongodb", "Nodemailer"],
    demoUrl: "https://battlearena.jigsromeo.site/",
    repoUrl: "https://github.com/username/ecommerce",
  },
  
  
];

export function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 lg:py-32 relative overflow-hidden"
      data-testid="section-projects"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-chart-1/10 via-primary/5 to-chart-2/10" />
      <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-background/40 to-background/70" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work and personal projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              className={`p-6 space-y-4 hover-elevate transition-all duration-300 flex flex-col ${
                isVisible ? "animate-scale-in" : "opacity-0"
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
              data-testid={`card-project-${project.id}`}
            >
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground" data-testid={`text-project-name-${project.id}`}>
                  {project.title}
                </h3>
              </div>

              <p className="text-muted-foreground leading-relaxed flex-grow" data-testid={`text-project-description-${project.id}`}>
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <Badge key={techIndex} variant="secondary" data-testid={`badge-tech-${project.id}-${techIndex}`}>
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2 pt-2">
                {project.repoUrl && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    asChild
                  >
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`link-repo-${project.id}`}
                    >
                      <Github className="w-4 h-4 mr-1" />
                      Code
                    </a>
                  </Button>
                )}
                {project.demoUrl && (
                  <Button
                    size="sm"
                    className="flex-1"
                    asChild
                  >
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`link-demo-${project.id}`}
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Demo
                    </a>
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
