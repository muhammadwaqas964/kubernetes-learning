import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { 
  GraduationCap, 
  ServerCog, 
  Rocket, 
  Clock, 
  Users, 
  TrendingUp,
  ArrowRight,
  Target,
  BookOpen,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProgressBar from "@/components/progress-bar";
import { formatReadTime, formatLearnerCount, getLevelColor } from "@/lib/utils";
import type { LearningPath, Topic } from "@shared/schema";

export default function Home() {
  const { data: learningPaths = [] } = useQuery<LearningPath[]>({
    queryKey: ["/api/learning-paths"],
  });

  const { data: topics = [] } = useQuery<Topic[]>({
    queryKey: ["/api/topics"],
  });

  const featuredTopics = topics.slice(0, 3);

  const pathIcons = {
    "fas fa-graduation-cap": GraduationCap,
    "fas fa-cogs": ServerCog,
    "fas fa-rocket": Rocket,
  };

  const stats = [
    { label: "Learning Paths", value: "3", icon: BookOpen },
    { label: "Topics", value: topics.length.toString(), icon: Target },
    { label: "Active Learners", value: "12.5k", icon: Users },
    { label: "Success Rate", value: "94%", icon: Award },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Master DevOps & Cloud Computing
          </h1>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            Learn from industry experts with hands-on projects, real-world examples, 
            and a structured curriculum designed to take you from beginner to expert.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button size="lg" variant="secondary" className="text-primary-700">
              Start Learning
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-700">
              View Curriculum
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="text-primary-600" size={24} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Start your journey with our carefully crafted learning paths, 
              designed to build your skills progressively from fundamentals to advanced concepts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {learningPaths.map((path) => {
              const Icon = pathIcons[path.icon as keyof typeof pathIcons] || GraduationCap;
              
              // Mock progress data
              const mockProgress = {
                "Beginner": { percentage: 80, completed: 12, total: 15 },
                "Intermediate": { percentage: 15, completed: 3, total: 20 },
                "Advanced": { percentage: 0, completed: 0, total: 18 },
              };
              
              const progress = mockProgress[path.name as keyof typeof mockProgress] || { percentage: 0, completed: 0, total: 0 };
              
              return (
                <Card key={path.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        path.level === "beginner" ? "bg-primary-100" :
                        path.level === "intermediate" ? "bg-amber-100" :
                        "bg-gray-100"
                      }`}>
                        <Icon className={`${
                          path.level === "beginner" ? "text-primary-600" :
                          path.level === "intermediate" ? "text-amber-600" :
                          "text-gray-600"
                        }`} size={24} />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{path.name}</CardTitle>
                        <Badge variant="outline" className={getLevelColor(path.level)}>
                          {path.level}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6">{path.description}</p>
                    
                    <div className="mb-6">
                      <ProgressBar
                        percentage={progress.percentage}
                        color={path.level === "beginner" ? "blue" : path.level === "intermediate" ? "amber" : "blue"}
                        label="Progress"
                      />
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{progress.completed}/{progress.total} topics completed</span>
                      <span className="flex items-center">
                        <TrendingUp size={14} className="mr-1" />
                        {path.level === "beginner" ? "Popular" : path.level === "intermediate" ? "In Progress" : "Coming Soon"}
                      </span>
                    </div>

                    <Button 
                      className={`w-full group-hover:bg-primary-700 ${
                        path.level === "advanced" ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={path.level === "advanced"}
                    >
                      {path.level === "advanced" ? "Coming Soon" : "Continue Learning"}
                      {path.level !== "advanced" && <ArrowRight className="ml-2" size={16} />}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Topics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Topics
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our most popular topics and start building practical skills 
              with hands-on examples and real-world scenarios.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredTopics.map((topic) => (
              <Card key={topic.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="text-primary-600" size={20} />
                    </div>
                    <Badge variant="outline" className={getLevelColor(topic.level)}>
                      {topic.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary-600 transition-colors">
                    {topic.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-3">{topic.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{formatReadTime(topic.readTime)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users size={14} />
                      <span>{formatLearnerCount(topic.learnerCount)} learners</span>
                    </div>
                  </div>

                  <Link href={`/topic/${topic.slug}`}>
                    <Button className="w-full group-hover:bg-primary-700">
                      Start Topic
                      <ArrowRight className="ml-2" size={16} />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your DevOps Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of developers who have advanced their careers with our comprehensive DevOps curriculum.
          </p>
          <Button size="lg" variant="secondary" className="text-purple-700">
            Get Started Today
            <ArrowRight className="ml-2" size={20} />
          </Button>
        </div>
      </section>
    </div>
  );
}
