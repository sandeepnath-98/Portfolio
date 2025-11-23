
import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@shared/schema";

const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with shopping cart, payment integration, and admin dashboard. Built with modern web technologies for optimal performance.",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
    demoUrl: "https://example.com/ecommerce",
    repoUrl: "https://github.com/username/ecommerce",
  },
  {
    id: "2",
    title: "Task Management App",
    description: "Collaborative task management application with real-time updates, team collaboration features, and intuitive drag-and-drop interface.",
    technologies: ["TypeScript", "Express", "MongoDB", "Socket.io"],
    demoUrl: "https://example.com/tasks",
    repoUrl: "https://github.com/username/task-manager",
  },
  {
    id: "3",
    title: "Weather Dashboard",
    description: "Beautiful weather dashboard with real-time data, forecasts, and interactive maps. Features location-based weather alerts and historical data.",
    technologies: ["React", "Tailwind CSS", "OpenWeather API"],
    demoUrl: "https://example.com/weather",
    repoUrl: "https://github.com/username/weather-dashboard",
  },
  {
    id: "4",
    title: "Social Media Analytics",
    description: "Analytics platform for social media metrics with beautiful data visualizations, automated reporting, and AI-powered insights.",
    technologies: ["Next.js", "Chart.js", "PostgreSQL", "Python"],
    demoUrl: "https://example.com/analytics",
    repoUrl: "https://github.com/username/social-analytics",
  },
  {
    id: "5",
    title: "Portfolio Generator",
    description: "Automated portfolio website generator with customizable themes, drag-and-drop builder, and one-click deployment.",
    technologies: ["React", "Vite", "Tailwind CSS", "Firebase"],
    repoUrl: "https://github.com/username/portfolio-gen",
  },
  {
    id: "6",
    title: "Blog Platform",
    description: "Modern blogging platform with markdown support, SEO optimization, and content management system. Features include comments and social sharing.",
    technologies: ["TypeScript", "Express", "MongoDB", "Next.js"],
    demoUrl: "https://example.com/blog",
    repoUrl: "https://github.com/username/blog-platform",
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
