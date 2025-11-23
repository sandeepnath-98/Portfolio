import { useEffect, useState, useRef } from "react";
import { Code2, Database, Layout, Smartphone, Cloud, GitBranch } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  icon: React.ReactNode;
}

const skills: Skill[] = [
  {
    id: "1",
    name: "React & TypeScript",
    category: "Frontend",
    proficiency: 95,
    icon: <Code2 className="w-8 h-8" />,
  },
  {
    id: "2",
    name: "Node.js & Express",
    category: "Backend",
    proficiency: 90,
    icon: <Database className="w-8 h-8" />,
  },
  {
    id: "3",
    name: "UI/UX Design",
    category: "Design",
    proficiency: 85,
    icon: <Layout className="w-8 h-8" />,
  },
  {
    id: "4",
    name: "Mobile Development",
    category: "Mobile",
    proficiency: 80,
    icon: <Smartphone className="w-8 h-8" />,
  },
  {
    id: "5",
    name: "Cloud & DevOps",
    category: "Infrastructure",
    proficiency: 88,
    icon: <Cloud className="w-8 h-8" />,
  },
  {
    id: "6",
    name: "Git & CI/CD",
    category: "Tools",
    proficiency: 92,
    icon: <GitBranch className="w-8 h-8" />,
  },
];

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
      className="py-20 lg:py-32 bg-card/30"
      data-testid="section-skills"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Skills & Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit of modern technologies and best practices
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <Card
              key={skill.id}
              className={`p-6 hover-elevate active-elevate-2 transition-all duration-300 ${
                isVisible ? "animate-scale-in" : "opacity-0"
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
              data-testid={`card-skill-${skill.id}`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    {skill.icon}
                  </div>
                  <Badge variant="secondary" data-testid={`badge-category-${skill.id}`}>
                    {skill.category}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground" data-testid={`text-skill-name-${skill.id}`}>
                    {skill.name}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Proficiency</span>
                      <span className="font-semibold text-foreground" data-testid={`text-proficiency-${skill.id}`}>
                        {skill.proficiency}%
                      </span>
                    </div>
                    <Progress value={skill.proficiency} className="h-2" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
