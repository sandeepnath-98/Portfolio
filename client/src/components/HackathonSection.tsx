import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Calendar, ExternalLink } from "lucide-react";
import type { Hackathon } from "@shared/schema";

const hackathons: Hackathon[] = [
  {
    id: "1",
    name: "TechCrunch Disrupt Hackathon 2024",
    date: "March 2024",
    description: "Built an AI-powered code review assistant that provides real-time suggestions and best practices. Implemented using GPT-4 and integrated with popular IDEs.",
    position: "1st Place Winner",
    prize: "$10,000",
    technologies: ["Python", "OpenAI API", "React", "FastAPI"],
    projectUrl: "https://github.com/username/ai-code-reviewer",
  },
  {
    id: "2",
    name: "Ethereum Global Hackathon",
    date: "January 2024",
    description: "Developed a decentralized identity verification system using blockchain technology. The solution ensures privacy while providing secure authentication.",
    position: "Top 10 Finalist",
    technologies: ["Solidity", "Web3.js", "Next.js", "IPFS"],
    projectUrl: "https://github.com/username/defi-identity",
  },
  {
    id: "3",
    name: "NASA Space Apps Challenge",
    date: "October 2023",
    description: "Created an interactive visualization tool for satellite data that helps researchers analyze climate change patterns with real-time data processing.",
    position: "Regional Winner",
    prize: "$5,000",
    technologies: ["Python", "TensorFlow", "D3.js", "Node.js"],
    projectUrl: "https://github.com/username/climate-viz",
  },
  {
    id: "4",
    name: "Google Cloud Hackathon",
    date: "August 2023",
    description: "Built a serverless microservices architecture for real-time data analytics. Achieved 99.9% uptime with auto-scaling capabilities.",
    position: "2nd Place Winner",
    prize: "$7,500",
    technologies: ["GCP", "Kubernetes", "Go", "PostgreSQL"],
  },
  {
    id: "5",
    name: "MLH Local Hack Day",
    date: "June 2023",
    description: "Developed a mobile app for mental health support using AI chatbots. Features include mood tracking and personalized recommendations.",
    position: "Best UI/UX Award",
    technologies: ["React Native", "Firebase", "TensorFlow", "Node.js"],
    projectUrl: "https://github.com/username/mental-health-app",
  },
  {
    id: "6",
    name: "AngelHack Global",
    date: "April 2023",
    description: "Created a platform connecting local farmers directly with consumers, reducing food waste and supporting sustainable agriculture.",
    position: "Social Impact Winner",
    prize: "$3,000",
    technologies: ["React", "Express", "MongoDB", "Stripe"],
    projectUrl: "https://github.com/username/farm-connect",
  },
];

export function HackathonSection() {
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
      id="hackathons"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-background"
      data-testid="section-hackathons"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Hackathon Achievements
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Competitive programming events where I've built innovative solutions under pressure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hackathons.map((hackathon, index) => (
            <Card
              key={hackathon.id}
              className={`p-6 space-y-4 hover-elevate transition-all duration-300 flex flex-col ${
                isVisible ? "animate-scale-in" : "opacity-0"
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
              data-testid={`card-hackathon-${hackathon.id}`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-xl font-bold text-foreground leading-tight" data-testid={`text-hackathon-name-${hackathon.id}`}>
                    {hackathon.name}
                  </h3>
                  <Trophy className="w-5 h-5 text-primary flex-shrink-0" />
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{hackathon.date}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="default" data-testid={`badge-position-${hackathon.id}`}>
                    {hackathon.position}
                  </Badge>
                  {hackathon.prize && (
                    <Badge variant="secondary" data-testid={`badge-prize-${hackathon.id}`}>
                      {hackathon.prize}
                    </Badge>
                  )}
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed flex-grow" data-testid={`text-hackathon-description-${hackathon.id}`}>
                {hackathon.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {hackathon.technologies.map((tech, techIndex) => (
                  <Badge key={techIndex} variant="outline" data-testid={`badge-tech-${hackathon.id}-${techIndex}`}>
                    {tech}
                  </Badge>
                ))}
              </div>

              {hackathon.projectUrl ? (
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full mt-2"
                  asChild
                >
                  <a
                    href={hackathon.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`link-project-${hackathon.id}`}
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    View Project
                  </a>
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full mt-2"
                  disabled
                  data-testid={`button-no-project-${hackathon.id}`}
                >
                  Project Not Available
                </Button>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
