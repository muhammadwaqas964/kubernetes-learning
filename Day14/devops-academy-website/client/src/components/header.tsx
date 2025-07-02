import { useState } from "react";
import { Link } from "wouter";
import { Search, Cloud, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useSearch from "@/hooks/use-search";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const { searchResults, isLoading } = useSearch(searchQuery);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Cloud className="text-white" size={16} />
              </div>
              <h1 className="text-xl font-bold text-gray-900">DevOps Academy</h1>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Curriculum
            </Link>
            <a href="#tutorials" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Tutorials
            </a>
            <a href="#resources" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Resources
            </a>
            <a href="#community" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Community
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10"
                />
                <Search className="absolute left-3 top-3 text-gray-400" size={16} />
              </div>
              
              {searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                  {isLoading ? (
                    <div className="p-4 text-gray-500">Searching...</div>
                  ) : searchResults.length > 0 ? (
                    <div className="py-2">
                      {searchResults.map((topic) => (
                        <Link
                          key={topic.id}
                          href={`/topic/${topic.slug}`}
                          className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                          onClick={() => setSearchQuery("")}
                        >
                          <div className="font-medium text-gray-900">{topic.title}</div>
                          <div className="text-sm text-gray-500 truncate">{topic.description}</div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-gray-500">No topics found</div>
                  )}
                </div>
              )}
            </div>
            
            <Button className="bg-primary-600 hover:bg-primary-700 text-white">
              Get Started
            </Button>
            
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu size={20} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
