import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { 
  GraduationCap, 
  ServerCog, 
  Rocket, 
  CheckCircle, 
  Play, 
  Lock, 
  ChevronRight,
  Server,
  Infinity,
  Cloud,
  Layers,
  Hammer
} from "lucide-react";
import { cn, formatLearnerCount } from "@/lib/utils";
import type { LearningPath, TopicWithProgress } from "@shared/schema";

const iconMap = {
  "fas fa-graduation-cap": GraduationCap,
  "fas fa-cogs": ServerCog,
  "fas fa-rocket": Rocket,
  "fas fa-server": Server,
  "fas fa-infinity": Infinity,
  "fab fa-docker": Cloud,
  "fas fa-dharmachakra": Layers,
  "fas fa-layer-group": Layers,
  "fas fa-hammer": Hammer,
  "fab fa-aws": Cloud,
  "fab fa-microsoft": Cloud,
  "fab fa-google": Cloud,
};

const getIcon = (iconString: string) => {
  return iconMap[iconString as keyof typeof iconMap] || Server;
};

export default function Sidebar() {
  const [location] = useLocation();
  
  const { data: learningPaths = [] } = useQuery<LearningPath[]>({
    queryKey: ["/api/learning-paths"],
  });

  const currentTopicSlug = location.startsWith("/topic/") 
    ? location.replace("/topic/", "") 
    : null;

  const getProgressColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-primary-600 text-white";
      case "intermediate":
        return "bg-amber-500 text-white";
      case "advanced":
        return "bg-gray-400 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  const getProgressBg = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-primary-50 border-primary-200";
      case "intermediate":
        return "bg-amber-50 border-amber-200";
      case "advanced":
        return "bg-gray-100 border-gray-200";
      default:
        return "bg-gray-100 border-gray-200";
    }
  };

  const getProgressIcon = (level: string) => {
    switch (level) {
      case "beginner":
        return CheckCircle;
      case "intermediate":
        return Play;
      case "advanced":
        return Lock;
      default:
        return Lock;
    }
  };

  return (
    <aside className="w-80 bg-white border-r border-gray-200 hidden lg:block h-screen overflow-y-auto">
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Learning Path</h2>
          <div className="space-y-2">
            {learningPaths.map((path) => {
              const Icon = getProgressIcon(path.level);
              const iconColor = getProgressColor(path.level);
              const bgColor = getProgressBg(path.level);
              
              // Mock progress data - in real app this would come from user progress
              const mockProgress = {
                beginner: { completed: 12, total: 15 },
                intermediate: { completed: 3, total: 20 },
                advanced: { completed: 0, total: 18 },
              };
              
              const progress = mockProgress[path.level as keyof typeof mockProgress] || { completed: 0, total: 0 };
              
              return (
                <div
                  key={path.id}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg border",
                    bgColor
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", iconColor)}>
                      <Icon size={12} />
                    </div>
                    <span className={cn(
                      "font-medium",
                      path.level === "beginner" ? "text-primary-700" : 
                      path.level === "intermediate" ? "text-amber-700" : 
                      "text-gray-500"
                    )}>
                      {path.name}
                    </span>
                  </div>
                  <span className={cn(
                    "text-sm font-medium",
                    path.level === "beginner" ? "text-primary-600" : 
                    path.level === "intermediate" ? "text-amber-600" : 
                    "text-gray-400"
                  )}>
                    {progress.completed}/{progress.total} Complete
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <nav className="space-y-1">
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Current Section
            </h3>
            <div className="space-y-1">
              <Link
                href="/topic/infrastructure-as-code"
                className={cn(
                  "flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  currentTopicSlug === "infrastructure-as-code"
                    ? "text-primary-600 bg-primary-50"
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                <div className="flex items-center space-x-3">
                  <Server size={16} />
                  <span>Infrastructure as Code</span>
                </div>
                <ChevronRight size={12} />
              </Link>
              <Link
                href="/topic/containerization-docker"
                className={cn(
                  "flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors",
                  currentTopicSlug === "containerization-docker"
                    ? "text-primary-600 bg-primary-50"
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                <div className="flex items-center space-x-3">
                  <Cloud size={16} />
                  <span>Containerization</span>
                </div>
                <ChevronRight size={12} />
              </Link>
              <Link
                href="/topic/devops-fundamentals"
                className={cn(
                  "flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors",
                  currentTopicSlug === "devops-fundamentals"
                    ? "text-primary-600 bg-primary-50"
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                <div className="flex items-center space-x-3">
                  <Infinity size={16} />
                  <span>CI/CD Pipelines</span>
                </div>
                <ChevronRight size={12} />
              </Link>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Cloud Platforms
            </h3>
            <div className="space-y-1">
              {[
                { name: "Amazon Web Services", icon: Cloud },
                { name: "Microsoft Azure", icon: Cloud },
                { name: "Google Cloud Platform", icon: Cloud },
              ].map((platform) => (
                <a
                  key={platform.name}
                  href="#"
                  className="flex items-center justify-between px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <platform.icon size={16} />
                    <span>{platform.name}</span>
                  </div>
                  <ChevronRight size={12} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Tools & Tech
            </h3>
            <div className="space-y-1">
              {[
                { name: "Kubernetes", icon: Layers },
                { name: "Terraform", icon: Layers },
                { name: "Jenkins", icon: Hammer },
              ].map((tool) => (
                <a
                  key={tool.name}
                  href="#"
                  className="flex items-center justify-between px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <tool.icon size={16} />
                    <span>{tool.name}</span>
                  </div>
                  <ChevronRight size={12} />
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}
