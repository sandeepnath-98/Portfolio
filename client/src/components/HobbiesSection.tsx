import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Plane, Camera, Gamepad2, Trophy } from "lucide-react";
import type { Hobby } from "@shared/schema";

const hobbies: Hobby[] = [
  {
    id: "1",
    title: "Fitness & Wellness",
    category: "fitness",
    description: "Committed to maintaining a healthy lifestyle through regular workouts and mindful practices. From strength training to yoga, fitness keeps me energized and focused.",
    highlights: ["Morning runs", "Gym 4x/week", "Yoga sessions", "Nutrition tracking"],
    icon: "dumbbell",
  },
  {
    id: "2",
    title: "Travel Adventures",
    category: "travel",
    description: "Exploring new cultures and destinations fuels my creativity. Every trip teaches me something new and broadens my perspective on life and problem-solving.",
    highlights: ["15+ countries visited", "Backpacking Europe", "Mountain hiking", "Local cuisine explorer"],
    icon: "plane",
  },
  {
    id: "3",
    title: "Photography",
    category: "photography",
    description: "Capturing moments through my lens helps me appreciate details and composition. Street photography and landscapes are my favorite subjects to shoot.",
    highlights: ["Street photography", "Landscape shots", "Event coverage", "Photo editing"],
    icon: "camera",
  },
  {
    id: "4",
    title: "Gaming",
    category: "gaming",
    description: "Gaming isn't just entertainment—it's about strategy, teamwork, and continuous improvement. From competitive matches to story-driven adventures, I love the challenge.",
    highlights: ["Strategy games", "Team competitions", "Speedrunning", "Game design analysis"],
    icon: "gamepad",
  },
  {
    id: "5",
    title: "Sports Enthusiast",
    category: "sports",
    description: "Whether playing or watching, sports teach valuable lessons about teamwork, perseverance, and discipline. Active participation keeps me competitive and team-oriented.",
    highlights: ["Weekend soccer", "Basketball league", "Tennis matches", "Marathon runner"],
    icon: "trophy",
  },
];

const iconMap = {
  dumbbell: Dumbbell,
  plane: Plane,
  camera: Camera,
  gamepad: Gamepad2,
  trophy: Trophy,
};

const categoryColors = {
  fitness: "bg-green-500/10 text-green-600 dark:text-green-400",
  travel: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  photography: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  gaming: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  sports: "bg-red-500/10 text-red-600 dark:text-red-400",
};

export function HobbiesSection() {
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
      id="hobbies"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-muted/30"
      data-testid="section-hobbies"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Beyond the Code
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Who am I outside tech? Here's what keeps me balanced and inspired
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hobbies.map((hobby, index) => {
            const IconComponent = iconMap[hobby.icon as keyof typeof iconMap];
            const colorClass = categoryColors[hobby.category];

            return (
              <Card
                key={hobby.id}
                className={`p-6 space-y-4 hover-elevate transition-all duration-300 flex flex-col ${
                  isVisible ? "animate-scale-in" : "opacity-0"
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
                data-testid={`card-hobby-${hobby.id}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${colorClass}`}>
                    <IconComponent className="w-6 h-6" data-testid={`icon-hobby-${hobby.id}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground" data-testid={`text-hobby-title-${hobby.id}`}>
                      {hobby.title}
                    </h3>
                    <Badge variant="secondary" className="mt-1" data-testid={`badge-category-${hobby.id}`}>
                      {hobby.category}
                    </Badge>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed" data-testid={`text-hobby-description-${hobby.id}`}>
                  {hobby.description}
                </p>

                <div className="space-y-2 flex-grow">
                  <p className="text-sm font-semibold text-foreground">Highlights:</p>
                  <ul className="space-y-1">
                    {hobby.highlights.map((highlight, idx) => (
                      <li 
                        key={idx} 
                        className="text-sm text-muted-foreground flex items-center gap-2"
                        data-testid={`text-highlight-${hobby.id}-${idx}`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
