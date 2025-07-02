import { 
  users, learningPaths, topics, userProgress, codeSnippets,
  type User, type InsertUser, type LearningPath, type InsertLearningPath,
  type Topic, type InsertTopic, type UserProgress, type InsertUserProgress,
  type CodeSnippet, type InsertCodeSnippet, type LearningPathWithTopics,
  type TopicWithProgress
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Learning Paths
  getAllLearningPaths(): Promise<LearningPath[]>;
  getLearningPathWithTopics(id: number, userId?: number): Promise<LearningPathWithTopics | undefined>;
  createLearningPath(path: InsertLearningPath): Promise<LearningPath>;

  // Topics
  getAllTopics(): Promise<Topic[]>;
  getTopicBySlug(slug: string, userId?: number): Promise<TopicWithProgress | undefined>;
  getTopicsByLearningPath(pathId: number, userId?: number): Promise<TopicWithProgress[]>;
  createTopic(topic: InsertTopic): Promise<Topic>;
  searchTopics(query: string): Promise<Topic[]>;

  // User Progress
  getUserProgress(userId: number, topicId: number): Promise<UserProgress | undefined>;
  updateUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  getUserProgressByPath(userId: number, pathId: number): Promise<UserProgress[]>;

  // Code Snippets
  getCodeSnippetsByTopic(topicId: number): Promise<CodeSnippet[]>;
  createCodeSnippet(snippet: InsertCodeSnippet): Promise<CodeSnippet>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private learningPaths: Map<number, LearningPath> = new Map();
  private topics: Map<number, Topic> = new Map();
  private userProgress: Map<string, UserProgress> = new Map();
  private codeSnippets: Map<number, CodeSnippet> = new Map();
  private currentId = 1;

  constructor() {
    this.seedData();
  }

  private getNextId(): number {
    return this.currentId++;
  }

  private seedData(): void {
    // Seed learning paths
    const beginnerPath: LearningPath = {
      id: this.getNextId(),
      name: "Beginner",
      description: "Introduction to DevOps and Cloud Computing fundamentals",
      level: "beginner",
      icon: "fas fa-graduation-cap",
      color: "primary",
      order: 1,
    };

    const intermediatePath: LearningPath = {
      id: this.getNextId(),
      name: "Intermediate",
      description: "Hands-on DevOps practices and cloud implementation",
      level: "intermediate",
      icon: "fas fa-cogs",
      color: "amber",
      order: 2,
    };

    const advancedPath: LearningPath = {
      id: this.getNextId(),
      name: "Advanced",
      description: "Complex architectures and enterprise-level practices",
      level: "advanced",
      icon: "fas fa-rocket",
      color: "gray",
      order: 3,
    };

    this.learningPaths.set(beginnerPath.id, beginnerPath);
    this.learningPaths.set(intermediatePath.id, intermediatePath);
    this.learningPaths.set(advancedPath.id, advancedPath);

    // Seed topics
    const topics = [
      {
        id: this.getNextId(),
        title: "DevOps Fundamentals",
        slug: "devops-fundamentals",
        description: "Understanding the core principles and culture of DevOps",
        content: `# DevOps Fundamentals

DevOps is a set of practices that combines software development (Dev) and IT operations (Ops). It aims to shorten the systems development life cycle and provide continuous delivery with high software quality.

## Key Principles

### 1. Collaboration
Breaking down silos between development and operations teams to foster better communication and shared responsibility.

### 2. Automation
Automating repetitive tasks to reduce human error and increase efficiency throughout the development lifecycle.

### 3. Continuous Integration/Continuous Deployment (CI/CD)
Implementing automated pipelines for building, testing, and deploying code changes.

### 4. Monitoring and Feedback
Continuous monitoring of applications and infrastructure to provide rapid feedback and enable quick issue resolution.

## Benefits of DevOps

- **Faster Time to Market**: Reduced deployment time from months to minutes
- **Improved Quality**: Automated testing catches issues early
- **Better Collaboration**: Shared ownership and responsibility
- **Increased Reliability**: More stable and reliable systems
- **Cost Reduction**: Efficient resource utilization

## Getting Started

1. Start with version control (Git)
2. Implement basic CI/CD pipelines
3. Automate testing processes
4. Monitor and measure everything
5. Foster a culture of continuous improvement`,
        icon: "fas fa-infinity",
        level: "beginner",
        readTime: 30,
        learnerCount: 5420,
        learningPathId: beginnerPath.id,
        order: 1,
        objectives: [
          "Understand DevOps principles and culture",
          "Learn about CI/CD fundamentals",
          "Recognize the benefits of DevOps practices",
          "Identify key tools and technologies"
        ],
        tags: ["devops", "fundamentals", "culture", "principles"],
        prerequisites: [],
      },
      {
        id: this.getNextId(),
        title: "Infrastructure as Code (IaC)",
        slug: "infrastructure-as-code",
        description: "Learn to manage infrastructure through code with Terraform, CloudFormation, and best practices",
        content: `# Infrastructure as Code (IaC)

Infrastructure as Code (IaC) is the practice of managing and provisioning computing infrastructure through machine-readable definition files, rather than physical hardware configuration or interactive configuration tools.

## What is Infrastructure as Code?

IaC treats infrastructure the same way developers treat application code. Instead of manually configuring servers, networks, and other infrastructure components, you define them in code that can be version controlled, tested, and automated.

## Core Benefits of IaC

### 1. Consistency
Eliminates configuration drift by ensuring identical environments across development, staging, and production.

### 2. Speed
Rapid provisioning and scaling of infrastructure resources compared to manual processes.

### 3. Version Control
Track changes, collaborate with teams, and rollback to previous infrastructure states when needed.

### 4. Cost Control
Better visibility and control over resource usage, enabling cost optimization and waste reduction.

## Popular IaC Tools

### Terraform
- **Provider**: HashiCorp
- **Language**: HCL (HashiCorp Configuration Language)
- **Strengths**: Multi-cloud support, large ecosystem
- **Use Case**: Cross-platform infrastructure management

### AWS CloudFormation
- **Provider**: Amazon Web Services
- **Language**: JSON/YAML
- **Strengths**: Deep AWS integration, native service support
- **Use Case**: AWS-specific infrastructure

### Azure Resource Manager (ARM)
- **Provider**: Microsoft Azure
- **Language**: JSON
- **Strengths**: Native Azure integration
- **Use Case**: Azure-specific deployments

## Getting Started with Terraform

Here's a simple example that creates an AWS VPC:

\`\`\`hcl
# Configure the AWS Provider
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region = "us-west-2"
}

# Create a VPC
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name = "Main VPC"
  }
}

# Create a subnet
resource "aws_subnet" "public" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"

  tags = {
    Name = "Public Subnet"
  }
}
\`\`\`

## Best Practices

1. **Use Version Control**: Always store IaC code in version control systems
2. **State Management**: Use remote state backends for team collaboration
3. **Modular Design**: Create reusable modules for common patterns
4. **Environment Separation**: Use separate state files for different environments
5. **Testing**: Implement automated testing for infrastructure code
6. **Documentation**: Document your infrastructure architecture and decisions

## Common Challenges

- **State Management**: Ensuring state consistency across teams
- **Secrets Management**: Handling sensitive data securely
- **Resource Dependencies**: Managing complex resource relationships
- **Cost Management**: Monitoring and controlling cloud costs

## Next Steps

1. Choose an IaC tool based on your cloud provider
2. Start with simple resources (VPC, EC2 instances)
3. Implement proper state management
4. Create reusable modules
5. Integrate with CI/CD pipelines`,
        icon: "fas fa-server",
        level: "intermediate",
        readTime: 45,
        learnerCount: 2847,
        learningPathId: intermediatePath.id,
        order: 1,
        objectives: [
          "Understand Infrastructure as Code principles and benefits",
          "Master Terraform syntax and resource management",
          "Implement state management and remote backends",
          "Apply IaC best practices in real-world scenarios"
        ],
        tags: ["iac", "terraform", "aws", "infrastructure", "automation"],
        prerequisites: ["devops-fundamentals"],
      },
      {
        id: this.getNextId(),
        title: "Containerization with Docker",
        slug: "containerization-docker",
        description: "Master container technology, Docker fundamentals, and container orchestration",
        content: `# Containerization with Docker

Containerization is a lightweight alternative to full machine virtualization that involves encapsulating an application in a container with its own operating environment.

## What are Containers?

Containers are lightweight, portable, and self-sufficient units that can run applications and their dependencies. Unlike virtual machines, containers share the host OS kernel, making them more efficient in terms of system resources.

## Why Docker?

Docker is the most popular containerization platform that makes it easy to:
- Package applications with their dependencies
- Ensure consistency across different environments
- Scale applications efficiently
- Simplify deployment processes

## Docker Architecture

### Docker Engine
The runtime that manages containers, images, and networks.

### Docker Images
Read-only templates used to create containers. Images are built from Dockerfiles.

### Docker Containers
Running instances of Docker images.

### Docker Registry
Storage and distribution system for Docker images (e.g., Docker Hub).

## Essential Docker Commands

\`\`\`bash
# Build an image
docker build -t myapp:latest .

# Run a container
docker run -d -p 80:80 myapp:latest

# List running containers
docker ps

# Stop a container
docker stop <container_id>

# Remove a container
docker rm <container_id>

# List images
docker images

# Remove an image
docker rmi <image_id>
\`\`\`

## Dockerfile Best Practices

\`\`\`dockerfile
# Use official base images
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start application
CMD ["npm", "start"]
\`\`\`

## Docker Compose

For multi-container applications, Docker Compose allows you to define and run multiple containers:

\`\`\`yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db
      - redis
  
  db:
    image: postgres:13
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  redis:
    image: redis:alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
\`\`\`

## Container Security

1. **Use Official Images**: Start with official base images from trusted sources
2. **Keep Images Updated**: Regularly update base images and dependencies
3. **Run as Non-Root**: Create and use non-root users in containers
4. **Scan for Vulnerabilities**: Use tools like Docker Scout or Snyk
5. **Limit Resources**: Set CPU and memory limits
6. **Use Secrets Management**: Don't store secrets in images

## Production Considerations

- **Image Optimization**: Use multi-stage builds and minimal base images
- **Logging**: Configure proper logging drivers
- **Monitoring**: Implement health checks and monitoring
- **Orchestration**: Consider Kubernetes for production deployments
- **CI/CD Integration**: Automate image building and deployment

## Next Steps

1. Practice writing Dockerfiles for different types of applications
2. Learn Docker Compose for multi-container applications
3. Explore container registries and image management
4. Study Kubernetes for container orchestration
5. Implement security best practices`,
        icon: "fab fa-docker",
        level: "intermediate",
        readTime: 40,
        learnerCount: 3156,
        learningPathId: intermediatePath.id,
        order: 2,
        objectives: [
          "Understand containerization concepts and benefits",
          "Master Docker commands and Dockerfile creation",
          "Implement Docker Compose for multi-container applications",
          "Apply container security and optimization best practices"
        ],
        tags: ["docker", "containers", "containerization", "devops"],
        prerequisites: ["devops-fundamentals"],
      }
    ];

    topics.forEach(topic => {
      this.topics.set(topic.id, topic as Topic);
    });

    // Seed code snippets
    const snippets = [
      {
        id: this.getNextId(),
        topicId: 2, // Infrastructure as Code
        title: "Basic Terraform Configuration",
        language: "hcl",
        code: `# Configure the AWS Provider
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-west-2"
}

# Create a VPC
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name = "Main VPC"
  }
}`,
        description: "A simple Terraform configuration to create an AWS VPC",
        order: 1,
      },
      {
        id: this.getNextId(),
        topicId: 3, // Docker
        title: "Node.js Dockerfile",
        language: "dockerfile",
        code: `FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000

CMD ["npm", "start"]`,
        description: "Production-ready Dockerfile for a Node.js application",
        order: 1,
      }
    ];

    snippets.forEach(snippet => {
      this.codeSnippets.set(snippet.id, snippet as CodeSnippet);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.getNextId();
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }

  async getAllLearningPaths(): Promise<LearningPath[]> {
    return Array.from(this.learningPaths.values()).sort((a, b) => a.order - b.order);
  }

  async getLearningPathWithTopics(id: number, userId?: number): Promise<LearningPathWithTopics | undefined> {
    const path = this.learningPaths.get(id);
    if (!path) return undefined;

    const pathTopics = await this.getTopicsByLearningPath(id, userId);
    const completedCount = pathTopics.filter(t => t.progress?.completed).length;

    return {
      ...path,
      topics: pathTopics,
      completedCount,
      totalCount: pathTopics.length,
    };
  }

  async createLearningPath(path: InsertLearningPath): Promise<LearningPath> {
    const id = this.getNextId();
    const learningPath: LearningPath = { ...path, id };
    this.learningPaths.set(id, learningPath);
    return learningPath;
  }

  async getAllTopics(): Promise<Topic[]> {
    return Array.from(this.topics.values()).sort((a, b) => a.order - b.order);
  }

  async getTopicBySlug(slug: string, userId?: number): Promise<TopicWithProgress | undefined> {
    const topic = Array.from(this.topics.values()).find(t => t.slug === slug);
    if (!topic) return undefined;

    let progress;
    if (userId) {
      progress = await this.getUserProgress(userId, topic.id);
    }

    const codeSnippets = await this.getCodeSnippetsByTopic(topic.id);

    return {
      ...topic,
      progress,
      codeSnippets,
    };
  }

  async getTopicsByLearningPath(pathId: number, userId?: number): Promise<TopicWithProgress[]> {
    const pathTopics = Array.from(this.topics.values())
      .filter(t => t.learningPathId === pathId)
      .sort((a, b) => a.order - b.order);

    const result: TopicWithProgress[] = [];
    for (const topic of pathTopics) {
      let progress;
      if (userId) {
        progress = await this.getUserProgress(userId, topic.id);
      }
      result.push({ ...topic, progress });
    }

    return result;
  }

  async createTopic(topic: InsertTopic): Promise<Topic> {
    const id = this.getNextId();
    const newTopic: Topic = { ...topic, id };
    this.topics.set(id, newTopic);
    return newTopic;
  }

  async searchTopics(query: string): Promise<Topic[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.topics.values()).filter(topic => 
      topic.title.toLowerCase().includes(lowercaseQuery) ||
      topic.description.toLowerCase().includes(lowercaseQuery) ||
      topic.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  async getUserProgress(userId: number, topicId: number): Promise<UserProgress | undefined> {
    const key = `${userId}-${topicId}`;
    return this.userProgress.get(key);
  }

  async updateUserProgress(progress: InsertUserProgress): Promise<UserProgress> {
    const key = `${progress.userId}-${progress.topicId}`;
    const existing = this.userProgress.get(key);
    
    const updatedProgress: UserProgress = {
      id: existing?.id || this.getNextId(),
      ...progress,
      lastAccessed: new Date(),
    };
    
    this.userProgress.set(key, updatedProgress);
    return updatedProgress;
  }

  async getUserProgressByPath(userId: number, pathId: number): Promise<UserProgress[]> {
    const pathTopics = Array.from(this.topics.values()).filter(t => t.learningPathId === pathId);
    const result: UserProgress[] = [];
    
    for (const topic of pathTopics) {
      const progress = await this.getUserProgress(userId, topic.id);
      if (progress) {
        result.push(progress);
      }
    }
    
    return result;
  }

  async getCodeSnippetsByTopic(topicId: number): Promise<CodeSnippet[]> {
    return Array.from(this.codeSnippets.values())
      .filter(snippet => snippet.topicId === topicId)
      .sort((a, b) => a.order - b.order);
  }

  async createCodeSnippet(snippet: InsertCodeSnippet): Promise<CodeSnippet> {
    const id = this.getNextId();
    const newSnippet: CodeSnippet = { ...snippet, id };
    this.codeSnippets.set(id, newSnippet);
    return newSnippet;
  }
}

export const storage = new MemStorage();
