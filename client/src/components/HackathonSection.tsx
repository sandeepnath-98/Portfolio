import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Calendar, ExternalLink } from "lucide-react";
import type { Hackathon } from "@shared/schema";

const hackathons: Hackathon[] = [
  {
    id: "1",
    name: "Infornoverse",
    date: "october 2025",
    description: "Built a platform which can locate the EV charging stations nearby using leaflet API and opencharge API ",
    position: "Participated to gain the experrience about the hackathon",
    prize: "9 Lakhs",
    technologies: ["Python", "OpenAI API", "opencharge API", "leaflet API"],
    projectUrl: "https://github.com/username/ai-code-reviewer",
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

                <div className="flex items-center gap-2 flex-wrap">
                  {/* Position can be long; render as a truncating inline element so it
                      doesn't force badges out of the card. */}
                  <span
                    className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-sm max-w-[70%] truncate block"
                    data-testid={`badge-position-${hackathon.id}`}
                  >
                    {hackathon.position}
                  </span>

                  {hackathon.prize && (
                    <Badge
                      variant="secondary"
                      data-testid={`badge-prize-${hackathon.id}`}
                      className="flex-shrink-0"
                    >
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
