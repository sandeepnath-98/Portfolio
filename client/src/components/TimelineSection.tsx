import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  tags: string[];
  position: "top" | "bottom";
}

const events: TimelineEvent[] = [
  {
    id: "1",
    date: "2024",
    title: "Senior Full Stack Developer",
    description: "Leading development of enterprise-scale applications with microservices architecture",
    tags: ["React", "Node.js", "AWS"],
    position: "top",
  },
  {
    id: "2",
    date: "2022",
    title: "Full Stack Developer",
    description: "Built and maintained multiple client projects with modern tech stack",
    tags: ["TypeScript", "PostgreSQL", "Docker"],
    position: "bottom",
  },
  {
    id: "3",
    date: "2020",
    title: "Frontend Developer",
    description: "Created responsive and accessible user interfaces for web applications",
    tags: ["React", "CSS", "JavaScript"],
    position: "top",
  },
  {
    id: "4",
    date: "2018",
    title: "Junior Developer",
    description: "Started professional journey in software development",
    tags: ["HTML", "CSS", "JavaScript"],
    position: "bottom",
  },
];

export function TimelineSection() {
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
      id="timeline"
      ref={sectionRef}
      className="py-20 lg:py-32"
      data-testid="section-timeline"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Professional Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Key milestones in my career development
          </p>
        </div>

        <div className="relative overflow-x-auto pb-4">
          <div className="min-w-max px-4">
            <div className="relative">
              <div className="absolute left-0 right-0 top-1/2 h-1 bg-border hidden lg:block">
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 1000 4"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 0 2 Q 250 0, 500 2 T 1000 2"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    fill="none"
                    className={isVisible ? "animate-draw-line" : ""}
                    style={{
                      strokeDasharray: "1000",
                      strokeDashoffset: isVisible ? "0" : "1000",
                    }}
                  />
                </svg>
              </div>

              <div className="grid grid-flow-col auto-cols-[minmax(280px,320px)] gap-8 lg:gap-6 relative">
                {events.map((event, index) => (
                  <div
                    key={event.id}
                    className={`${
                      event.position === "top"
                        ? "lg:mb-40"
                        : "lg:mt-40"
                    } ${isVisible ? (event.position === "top" ? "animate-slide-in-left" : "animate-slide-in-right") : "opacity-0"}`}
                    style={{
                      animationDelay: `${index * 200}ms`,
                    }}
                  >
                    <div className="relative">
                      <div className="absolute left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-1/2 -bottom-6 lg:-bottom-20 z-10 hidden lg:block">
                        <div className="w-4 h-4 rounded-full bg-primary border-4 border-background" />
                      </div>

                      {event.position === "bottom" && (
                        <div className="absolute left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-1/2 -top-6 lg:-top-20 z-10 hidden lg:block">
                          <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-card-border" />
                        </div>
                      )}

                      <Card className="p-6 space-y-4 hover-elevate transition-all duration-300" data-testid={`card-event-${event.id}`}>
                        <div className="flex items-center gap-2 text-primary">
                          <Calendar className="w-5 h-5" />
                          <span className="font-semibold text-lg" data-testid={`text-date-${event.id}`}>{event.date}</span>
                        </div>

                        <h3 className="text-xl font-bold text-foreground" data-testid={`text-title-${event.id}`}>
                          {event.title}
                        </h3>

                        <p className="text-muted-foreground leading-relaxed" data-testid={`text-description-${event.id}`}>
                          {event.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {event.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="secondary" data-testid={`badge-tag-${event.id}-${tagIndex}`}>
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </Card>

                      {event.position === "top" && (
                        <div className="absolute left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-1/2 -bottom-6 lg:-bottom-20 z-10 hidden lg:block">
                          <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-card-border" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
