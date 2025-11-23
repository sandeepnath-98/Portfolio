import { useEffect, useState, useRef } from "react";
import { SiReact, SiTypescript, SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiGit, SiDocker, SiFigma, SiTailwindcss, SiVite, SiNextdotjs } from "react-icons/si";
import { Card } from "@/components/ui/card";

interface Skill {
  id: string;
  name: string;
  category: "Frontend" | "Backend" | "Tools";
  icon: React.ReactNode;
}

const skills: Skill[] = [
  {
    id: "1",
    name: "React",
    category: "Frontend",
    icon: <SiReact className="w-12 h-12" />,
  },
  {
    id: "2",
    name: "TypeScript",
    category: "Frontend",
    icon: <SiTypescript className="w-12 h-12" />,
  },
  {
    id: "3",
    name: "Next.js",
    category: "Frontend",
    icon: <SiNextdotjs className="w-12 h-12" />,
  },
  {
    id: "4",
    name: "Tailwind CSS",
    category: "Frontend",
    icon: <SiTailwindcss className="w-12 h-12" />,
  },
  {
    id: "5",
    name: "Vite",
    category: "Frontend",
    icon: <SiVite className="w-12 h-12" />,
  },
  {
    id: "6",
    name: "Node.js",
    category: "Backend",
    icon: <SiNodedotjs className="w-12 h-12" />,
  },
  {
    id: "7",
    name: "Express",
    category: "Backend",
    icon: <SiExpress className="w-12 h-12" />,
  },
  {
    id: "8",
    name: "PostgreSQL",
    category: "Backend",
    icon: <SiPostgresql className="w-12 h-12" />,
  },
  {
    id: "9",
    name: "MongoDB",
    category: "Backend",
    icon: <SiMongodb className="w-12 h-12" />,
  },
  {
    id: "10",
    name: "Git",
    category: "Tools",
    icon: <SiGit className="w-12 h-12" />,
  },
  {
    id: "11",
    name: "Docker",
    category: "Tools",
    icon: <SiDocker className="w-12 h-12" />,
  },
  {
    id: "12",
    name: "Figma",
    category: "Tools",
    icon: <SiFigma className="w-12 h-12" />,
  },
];

const categories: Array<"Frontend" | "Backend" | "Tools"> = ["Frontend", "Backend", "Tools"];

export function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
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
      id="skills"
      ref={sectionRef}
      className="py-20 lg:py-32 relative overflow-hidden"
      data-testid="section-skills"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-chart-2/10 to-chart-3/10" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-background/50 to-background/80" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Skills & Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit of modern technologies and best practices
          </p>
        </div>

        <div className="space-y-16">
          {categories.map((category) => {
            const categorySkills = skills.filter((skill) => skill.category === category);
            return (
              <div key={category} className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground text-center lg:text-left">
                  {category}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {categorySkills.map((skill, index) => (
                    <Card
                      key={skill.id}
                      className={`p-6 hover-elevate active-elevate-2 transition-all duration-300 flex flex-col items-center justify-center gap-4 ${
                        isVisible ? "animate-scale-in" : "opacity-0"
                      }`}
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                      data-testid={`card-skill-${skill.id}`}
                    >
                      <div className="text-primary">
                        {skill.icon}
                      </div>
                      <h4 className="text-lg font-semibold text-foreground text-center" data-testid={`text-skill-name-${skill.id}`}>
                        {skill.name}
                      </h4>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
