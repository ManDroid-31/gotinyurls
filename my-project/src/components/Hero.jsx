import { ArrowRight, Link2, MousePointer } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card"; 
import { Link } from "react-router-dom";
export default function Hero() {
  return (
    <section className="text-center text-white py-20 bg-gradient-to-b from-[#0f172a] to-[#0a0f1e] min-h-screen">
      {/* Title + Subtitle */}
      <h1 className="text-5xl font-extrabold leading-tight">
        Shorten <span className="text-blue-400">URLs</span> <br /> Track Everything
      </h1>
      <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
        Create powerful short links with advanced analytics, custom domains, and
        enterprise-grade reliability. Perfect for marketers, developers, and
        businesses.
      </p>

      {/* Buttons */}
      <div className="mt-8 flex justify-center gap-4">
        <button className="px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg flex items-center gap-2">
          Get Started Free <ArrowRight size={18} />
        </button>
        <Link to="/signup" className="px-6 py-3 bg-gray-800 rounded-lg border border-gray-700">
          Sign In
        </Link>
      </div>

      {/* Shorten URL Demo Card */}
      <div className="mt-16 px-4">
        <Card className="max-w-2xl mx-auto shadow-2xl border-0 bg-gray-950/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="space-y-4">
              {/* Long URL box */}
              <div className="flex items-center space-x-3 p-4 bg-gray-800/70 rounded-lg">
                <Link2 className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-400 flex-1 text-left truncate">
                  https://example.com/very-long-url-that-needs-shortening
                </span>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center">
                <ArrowRight className="h-6 w-6 text-blue-500" />
              </div>

              {/* Short URL box */}
              <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-500/10 to-blue-600/20 rounded-lg border border-blue-500/20">
                <Link2 className="h-5 w-5 text-blue-400" />
                <code className="text-blue-400 font-medium">shortify.co/abc123</code>
                <div className="flex items-center space-x-2 ml-auto">
                  <MousePointer className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium text-green-500">
                    1,247 clicks
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
