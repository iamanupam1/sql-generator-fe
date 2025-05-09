import { Code, Github, Mail, Twitter } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3">
              <Code className="h-7 w-7 text-blue-500" />
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                DataMind AI
              </h1>
            </div>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              AI-powered tools for query conversion and database visualization.
            </p>
            <div className="mt-6 flex space-x-4">
              {[
                { href: "https://github.com", icon: Github, label: "GitHub" },
                {
                  href: "https://twitter.com",
                  icon: Twitter,
                  label: "Twitter",
                },
                {
                  href: "mailto:info@databridge.com",
                  icon: Mail,
                  label: "Email",
                },
              ].map(({ href, icon: Icon, label }, index) => (
                <a
                  key={index}
                  href={href}
                  className="p-2 rounded-full bg-gray-800 hover:bg-blue-500 transition-colors duration-300 transform hover:scale-110"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5 text-gray-400 hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-white font-medium mb-4">Products</h3>
              <ul className="space-y-3">
                {[
                  { label: "NLQConvert", href: "/nlqconvert" },
                  { label: "QueryGraph", href: "/querygraph" },
                  { label: "Pricing", href: "/pricing" },
                ].map(({ label, href }, index) => (
                  <li key={index}>
                    <a
                      href={href}
                      className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-medium mb-4">Company</h3>
              <ul className="space-y-3">
                {[
                  { label: "About", href: "/about" },
                  { label: "Contact", href: "/contact" },
                ].map(({ label, href }, index) => (
                  <li key={index}>
                    <a
                      href={href}
                      className="text-gray-400 hover:text-indigo-400 transition-colors text-sm flex items-center"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-10 border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} DataMind AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
