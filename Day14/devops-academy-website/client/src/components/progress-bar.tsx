import { cn } from "@/lib/utils";

interface ProgressBarProps {
  percentage: number;
  color?: "blue" | "green" | "amber" | "red";
  size?: "sm" | "md" | "lg";
  showPercentage?: boolean;
  label?: string;
}

export default function ProgressBar({ 
  percentage, 
  color = "blue", 
  size = "md", 
  showPercentage = true,
  label 
}: ProgressBarProps) {
  const colorClasses = {
    blue: "bg-blue-600",
    green: "bg-green-600", 
    amber: "bg-amber-500",
    red: "bg-red-600",
  };

  const backgroundClasses = {
    blue: "bg-blue-200",
    green: "bg-green-200",
    amber: "bg-amber-200", 
    red: "bg-red-200",
  };

  const sizeClasses = {
    sm: "h-1",
    md: "h-2", 
    lg: "h-3",
  };

  const textColorClasses = {
    blue: "text-blue-700",
    green: "text-green-700",
    amber: "text-amber-700",
    red: "text-red-700",
  };

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <span className={cn("text-sm font-medium", textColorClasses[color])}>
              {label}
            </span>
          )}
          {showPercentage && (
            <span className={cn("text-sm", textColorClasses[color])}>
              {percentage}% Complete
            </span>
          )}
        </div>
      )}
      <div className={cn("w-full rounded-full", backgroundClasses[color], sizeClasses[size])}>
        <div 
          className={cn("rounded-full transition-all duration-300", colorClasses[color], sizeClasses[size])}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
}
