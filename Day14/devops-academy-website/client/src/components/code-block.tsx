import { useState } from "react";
import { Copy, Check, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
}

export default function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await copyToClipboard(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  const getLanguageLabel = (lang: string) => {
    switch (lang) {
      case "hcl":
        return "Terraform";
      case "dockerfile":
        return "Dockerfile";
      case "bash":
        return "Shell";
      case "yaml":
        return "YAML";
      case "json":
        return "JSON";
      default:
        return lang.toUpperCase();
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 mb-6 overflow-x-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Code className="text-gray-400" size={16} />
          <span className="text-gray-300 font-mono text-sm">
            {filename || getLanguageLabel(language)}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="text-gray-400 hover:text-white"
        >
          {copied ? (
            <>
              <Check size={16} className="mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy size={16} className="mr-2" />
              Copy
            </>
          )}
        </Button>
      </div>
      <pre className="text-gray-300 font-mono text-sm leading-relaxed overflow-x-auto">
        <code className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
}
