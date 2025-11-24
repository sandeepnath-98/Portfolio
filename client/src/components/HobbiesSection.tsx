import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Plane, Camera, Gamepad2, Trophy } from "lucide-react";
import type { Hobby } from "@shared/schema";


import travelImage1 from "@assets/stock_images/tour.jpg";
import travelImage2 from "@assets/stock_images/tour1.jpg";
import travelImage3 from "@assets/stock_images/tour2.jpg";
import travelImage4 from "@assets/stock_images/tour3.jpg";
import travelImage5 from "@assets/stock_images/tour4.jpg";


const hobbies: Hobby[] = [
  
  {
    id: "1",
    title: "High school Memories",
    category: "travel",
    description: "Exploring new place with the inner child,friends in collage Trip.",
    highlights: ["Pokhara", "Friends", "collage Tour"],
    icon: "bus",
    images: [travelImage1, travelImage2, travelImage3, travelImage4, travelImage5],
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

function HobbyCard({ hobby, index, isVisible }: { hobby: Hobby; index: number; isVisible: boolean }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = iconMap[hobby.icon as keyof typeof iconMap];
  // Guard against missing icon components to avoid React throwing an
  // "Element type is invalid" error at runtime. If an icon is missing,
  // render a simple placeholder and log a warning to help debugging.
  const SafeIcon: React.ComponentType<any> =
    IconComponent ?? (() => {
      console.warn(`Missing icon component for hobby.icon="${hobby.icon}"`);
      return <div className="w-4 h-4 bg-muted rounded-sm" />;
    });
  const colorClass = categoryColors[hobby.category];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % hobby.images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [hobby.images.length]);

  return (
    <Card
      className={`group overflow-visible hover-elevate transition-all duration-500 flex flex-col ${
        isVisible ? "animate-scale-in" : "opacity-0"
      } hover:shadow-2xl hover:-translate-y-2`}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`card-hobby-${hobby.id}`}
    >
      <div className="relative h-80 overflow-hidden rounded-t-md">
        {hobby.images.map((image, imgIndex) => (
          <img
            key={imgIndex}
            src={image}
            alt={`${hobby.title} ${imgIndex + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
              imgIndex === currentImageIndex ? "opacity-100" : "opacity-0"
            } group-hover:scale-110`}
            data-testid={`img-hobby-${hobby.id}-${imgIndex}`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-all duration-300 group-hover:from-black/80" />
        
          <div className={`absolute top-3 left-3 p-2 rounded-md ${colorClass} backdrop-blur-sm transition-all duration-300 ${
          isHovered ? "scale-110 rotate-12" : ""
        }`}>
          <SafeIcon className={`w-4 h-4 transition-transform duration-300 ${
            isHovered ? "animate-bounce" : ""
          }`} data-testid={`icon-hobby-${hobby.id}`} />
        </div>
        
        <div className="absolute bottom-3 right-3 flex gap-1">
          {hobby.images.map((_, imgIndex) => (
            <div
              key={imgIndex}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                imgIndex === currentImageIndex 
                  ? "bg-white w-4 scale-110" 
                  : "bg-white/50 w-1.5 hover:bg-white/80"
              }`}
              data-testid={`indicator-${hobby.id}-${imgIndex}`}
            />
          ))}
        </div>

        <div className={`absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/20 opacity-0 transition-opacity duration-500 pointer-events-none ${
          isHovered ? "opacity-100" : ""
        }`} />
      </div>

      <div className="p-4 space-y-2 bg-card">
        <div className="flex items-center justify-between gap-2">
          <h3 className={`text-lg font-bold text-foreground transition-all duration-300 ${
            isHovered ? "text-primary" : ""
          }`} data-testid={`text-hobby-title-${hobby.id}`}>
            {hobby.title}
          </h3>
          <Badge 
            variant="secondary" 
            className={`text-xs transition-all duration-300 ${
              isHovered ? "scale-110 animate-pulse" : ""
            }`} 
            data-testid={`badge-category-${hobby.id}`}
          >
            {hobby.category}
          </Badge>
        </div>

        <p className={`text-sm text-muted-foreground leading-snug transition-all duration-300 ${
          isHovered ? "text-foreground" : ""
        }`} data-testid={`text-hobby-description-${hobby.id}`}>
          {hobby.description}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {hobby.highlights.map((highlight, idx) => (
            <span
              key={idx}
              className={`text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-sm transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:scale-105 ${
                isHovered ? "animate-fade-in" : ""
              }`}
              style={{
                animationDelay: `${idx * 50}ms`,
              }}
              data-testid={`text-highlight-${hobby.id}-${idx}`}
            >
              {highlight}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}

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
          {hobbies.map((hobby, index) => (
            <HobbyCard key={hobby.id} hobby={hobby} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
