import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { 
  Clock, 
  Users, 
  Signal, 
  Target, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight,
  Lightbulb,
  FolderSync,
  Rocket,
  GitBranch,
  DollarSign,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Markdown from "@/components/ui/markdown";
import ProgressBar from "@/components/progress-bar";
import { formatReadTime, formatLearnerCount, getLevelColor } from "@/lib/utils";
import type { TopicWithProgress } from "@shared/schema";

export default function Topic() {
  const [, params] = useRoute("/topic/:slug");
  const slug = params?.slug;

  const { data: topic, isLoading } = useQuery<TopicWithProgress>({
    queryKey: [`/api/topics/${slug}`],
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Topic not found</h1>
        <p className="text-gray-600 mb-6">The topic you're looking for doesn't exist.</p>
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    );
  }

  const benefitIcons = {
    "Consistency": FolderSync,
    "Speed": Rocket, 
    "Version Control": GitBranch,
    "Cost Control": DollarSign,
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <nav className="flex items-center space-x-2 text-sm">
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            Home
          </Link>
          <ChevronRight className="text-gray-400" size={16} />
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            {topic.level}
          </Link>
          <ChevronRight className="text-gray-400" size={16} />
          <span className="text-gray-900 font-medium">{topic.title}</span>
        </nav>
      </div>

      {/* Content Area */}
      <div className="p-6 max-w-4xl mx-auto">
        {/* Topic Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <Target className="text-primary-600" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{topic.title}</h1>
              <p className="text-gray-600 mt-1">{topic.description}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Clock size={16} />
              <span>{formatReadTime(topic.readTime)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Signal size={16} />
              <Badge variant="outline" className={getLevelColor(topic.level)}>
                {topic.level}
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Users size={16} />
              <span>{formatLearnerCount(topic.learnerCount)} learners</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <ProgressBar
            percentage={65}
            color="blue"
            label="Your Progress"
          />
        </div>

        {/* Learning Objectives */}
        <Card className="mb-8 border-green-200 bg-green-50">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
              <Target className="mr-3" size={20} />
              Learning Objectives
            </h2>
            <ul className="space-y-2 text-green-700">
              {topic.objectives.map((objective, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Key Benefits Cards */}
        {topic.slug === "infrastructure-as-code" && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Core Benefits of IaC</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Consistency",
                  description: "Eliminates configuration drift by ensuring identical environments across development, staging, and production.",
                  color: "blue"
                },
                {
                  title: "Speed", 
                  description: "Rapid provisioning and scaling of infrastructure resources compared to manual processes.",
                  color: "green"
                },
                {
                  title: "Version Control",
                  description: "Track changes, collaborate with teams, and rollback to previous infrastructure states when needed.",
                  color: "purple"
                },
                {
                  title: "Cost Control",
                  description: "Better visibility and control over resource usage, enabling cost optimization and waste reduction.",
                  color: "red"
                }
              ].map((benefit) => {
                const Icon = benefitIcons[benefit.title as keyof typeof benefitIcons] || FolderSync;
                return (
                  <Card key={benefit.title} className="p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        benefit.color === "blue" ? "bg-blue-100" :
                        benefit.color === "green" ? "bg-green-100" :
                        benefit.color === "purple" ? "bg-purple-100" :
                        "bg-red-100"
                      }`}>
                        <Icon className={`${
                          benefit.color === "blue" ? "text-blue-600" :
                          benefit.color === "green" ? "text-green-600" :
                          benefit.color === "purple" ? "text-purple-600" :
                          "text-red-600"
                        }`} size={20} />
                      </div>
                      <h4 className="font-semibold text-gray-900">{benefit.title}</h4>
                    </div>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Key Insight */}
        <Card className="mb-8 border-l-4 border-amber-400 bg-amber-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <Lightbulb className="text-amber-500 text-xl mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold text-amber-800 mb-2">Key Insight</h3>
                <p className="text-amber-700">
                  {topic.slug === "infrastructure-as-code" ? 
                    "Think of IaC as writing recipes for your infrastructure. Just like a recipe ensures you can recreate the same dish every time, IaC ensures you can recreate the same infrastructure environment consistently." :
                    "Remember that the key to success is practice and continuous learning. Start with simple examples and gradually work your way up to more complex scenarios."
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none mb-8">
          <Markdown content={topic.content} />
        </div>

        {/* Interactive Exercise */}
        <Card className="mb-8 primary-gradient text-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Play className="text-2xl" size={24} />
              <h3 className="text-xl font-semibold">Hands-on Exercise</h3>
            </div>
            <p className="mb-4 opacity-90">
              Ready to practice? Create your first {topic.title.toLowerCase()} project to deploy a simple web server.
            </p>
            <Button variant="secondary" className="text-primary-600">
              Start Exercise
            </Button>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-200">
          <Button variant="outline" className="flex items-center space-x-2">
            <ChevronLeft size={16} />
            <span>Previous: DevOps Fundamentals</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <span>Next: Advanced Concepts</span>
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
