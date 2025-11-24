import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Plane, Camera, Gamepad2, Trophy } from "lucide-react";
import type { Hobby } from "@shared/schema";

import fitnessImage1 from "@assets/stock_images/person_doing_fitness_94d2774e.jpg";
import fitnessImage2 from "@assets/stock_images/fitness_gym_workout__fe7f3cbf.jpg";
import fitnessImage3 from "@assets/stock_images/fitness_gym_workout__dda90380.jpg";
import fitnessImage4 from "@assets/stock_images/fitness_gym_workout__75a47bb0.jpg";

import travelImage1 from "@assets/stock_images/travel_adventure_sce_6d8398b4.jpg";
import travelImage2 from "@assets/stock_images/travel_adventure_wor_2ad38136.jpg";
import travelImage3 from "@assets/stock_images/travel_adventure_wor_3c588347.jpg";
import travelImage4 from "@assets/stock_images/travel_adventure_wor_adfbf96a.jpg";

import photographyImage1 from "@assets/stock_images/photographer_taking__a150f388.jpg";
import photographyImage2 from "@assets/stock_images/photography_camera_l_4e88ddef.jpg";
import photographyImage3 from "@assets/stock_images/photography_camera_l_6d9fdf73.jpg";
import photographyImage4 from "@assets/stock_images/photography_camera_l_01b7ec53.jpg";

import gamingImage1 from "@assets/stock_images/gaming_esports_playe_5ec071dc.jpg";
import gamingImage2 from "@assets/stock_images/gaming_video_games_c_e9e6132f.jpg";
import gamingImage3 from "@assets/stock_images/gaming_video_games_c_09f98e82.jpg";
import gamingImage4 from "@assets/stock_images/gaming_video_games_c_30d1328c.jpg";

import sportsImage1 from "@assets/stock_images/sports_basketball_or_49a977fa.jpg";
import sportsImage2 from "@assets/stock_images/sports_action_soccer_36f6732c.jpg";
import sportsImage3 from "@assets/stock_images/sports_action_soccer_5d15c3d4.jpg";
import sportsImage4 from "@assets/stock_images/sports_action_soccer_6f8df17d.jpg";

const hobbies: Hobby[] = [
  {
    id: "1",
    title: "Fitness & Wellness",
    category: "fitness",
    description: "Maintaining a healthy lifestyle through regular workouts and mindful practices.",
    highlights: ["Morning runs", "Gym 4x/week", "Yoga sessions"],
    icon: "dumbbell",
    images: [fitnessImage1, fitnessImage2, fitnessImage3, fitnessImage4],
  },
  {
    id: "2",
    title: "Travel Adventures",
    category: "travel",
    description: "Exploring new cultures and destinations that fuel creativity and broaden perspectives.",
    highlights: ["15+ countries", "Mountain hiking", "Local cuisine"],
    icon: "plane",
    images: [travelImage1, travelImage2, travelImage3, travelImage4],
  },
  {
    id: "3",
    title: "Photography",
    category: "photography",
    description: "Capturing moments through the lens with focus on street and landscape photography.",
    highlights: ["Street shots", "Landscapes", "Photo editing"],
    icon: "camera",
    images: [photographyImage1, photographyImage2, photographyImage3, photographyImage4],
  },
  {
    id: "4",
    title: "Gaming",
    category: "gaming",
    description: "Strategy, teamwork, and continuous improvement through competitive and story-driven games.",
    highlights: ["Strategy games", "Team play", "Speedrunning"],
    icon: "gamepad",
    images: [gamingImage1, gamingImage2, gamingImage3, gamingImage4],
  },
  {
    id: "5",
    title: "Sports Enthusiast",
    category: "sports",
    description: "Active participation in sports teaching teamwork, perseverance, and discipline.",
    highlights: ["Weekend soccer", "Basketball", "Marathon"],
    icon: "trophy",
    images: [sportsImage1, sportsImage2, sportsImage3, sportsImage4],
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
  const IconComponent = iconMap[hobby.icon as keyof typeof iconMap];
  const colorClass = categoryColors[hobby.category];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % hobby.images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [hobby.images.length]);

  return (
    <Card
      className={`overflow-hidden hover-elevate transition-all duration-300 flex flex-col ${
        isVisible ? "animate-scale-in" : "opacity-0"
      }`}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
      data-testid={`card-hobby-${hobby.id}`}
    >
      <div className="relative h-80 overflow-hidden">
        {hobby.images.map((image, imgIndex) => (
          <img
            key={imgIndex}
            src={image}
            alt={`${hobby.title} ${imgIndex + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              imgIndex === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            data-testid={`img-hobby-${hobby.id}-${imgIndex}`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className={`absolute top-3 left-3 p-2 rounded-md ${colorClass} backdrop-blur-sm`}>
          <IconComponent className="w-4 h-4" data-testid={`icon-hobby-${hobby.id}`} />
        </div>
        <div className="absolute bottom-3 right-3 flex gap-1">
          {hobby.images.map((_, imgIndex) => (
            <div
              key={imgIndex}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                imgIndex === currentImageIndex ? "bg-white w-4" : "bg-white/50"
              }`}
              data-testid={`indicator-${hobby.id}-${imgIndex}`}
            />
          ))}
        </div>
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-bold text-foreground" data-testid={`text-hobby-title-${hobby.id}`}>
            {hobby.title}
          </h3>
          <Badge variant="secondary" className="text-xs" data-testid={`badge-category-${hobby.id}`}>
            {hobby.category}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground leading-snug" data-testid={`text-hobby-description-${hobby.id}`}>
          {hobby.description}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {hobby.highlights.map((highlight, idx) => (
            <span
              key={idx}
              className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-sm"
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
