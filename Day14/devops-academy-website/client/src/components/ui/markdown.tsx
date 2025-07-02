import { useMemo } from "react";
import { cn } from "@/lib/utils";
import CodeBlock from "@/components/code-block";

interface MarkdownProps {
  content: string;
  className?: string;
}

export default function Markdown({ content, className }: MarkdownProps) {
  const processedContent = useMemo(() => {
    // Simple markdown processor - in production, use a library like react-markdown
    let html = content;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-gray-900 mb-4 mt-8">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-gray-900 mb-6 mt-8">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-gray-900 mb-6">$1</h1>');

    // Bold and italic
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

    // Paragraphs
    html = html.replace(/\n\n/g, '</p><p class="text-gray-700 mb-6 leading-relaxed">');
    html = '<p class="text-gray-700 mb-6 leading-relaxed">' + html + '</p>';

    // Lists
    html = html.replace(/^\d+\. (.*$)/gim, '<li class="mb-2">$1</li>');
    html = html.replace(/^- (.*$)/gim, '<li class="mb-2 flex items-start"><span class="mr-2">•</span><span>$1</span></li>');

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">$1</code>');

    return html;
  }, [content]);

  const renderContent = () => {
    const parts = content.split(/(```[\s\S]*?```)/);
    
    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        const lines = part.split('\n');
        const language = lines[0].replace('```', '');
        const code = lines.slice(1, -1).join('\n');
        
        return (
          <CodeBlock
            key={index}
            code={code}
            language={language}
            filename={language === 'hcl' ? 'main.tf' : language === 'dockerfile' ? 'Dockerfile' : undefined}
          />
        );
      }
      
      return (
        <div
          key={index}
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: processedContent }}
        />
      );
    });
  };

  return (
    <div className={cn("", className)}>
      {renderContent()}
    </div>
  );
}
