"use client";
import React, { useCallback, useState } from "react";
import BaseLayout from "./components/common/BaseLayout";
import {
  ArrowRight,
  MessageSquare,
  BarChart3,
  Database,
  FileCode,
} from "lucide-react";
import Typewriter from "./components/common/Typewriter";
import { PLACEHOLDER } from "./constants";

const HomePage = () => {
  const [sqlVisible, setSqlVisible] = useState(false);

  const handleQueryComplete = useCallback(() => {
    setTimeout(() => setSqlVisible(true), 500);
  }, []);

  const handleQueryReset = useCallback(() => {
    setSqlVisible(false);
  }, []);

  return (
    <BaseLayout>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-black mt-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-800/40 via-purple-900/30 to-indigo-900/40 z-0"></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 mix-blend-overlay z-0"></div>
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="mx-auto px-8 py-12 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="text-center md:text-left w-full md:w-1/2 space-y-8">
              <div className="inline-block px-4 py-1.5 bg-blue-500/10 backdrop-blur-md rounded-full mb-4">
                <p className="text-sm font-medium text-blue-300">
                  Next-Generation Database Tools
                </p>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-purple-500">
                  Transform Your Data Experience
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-xl">
                Convert natural language to database queries and visualize your
                data structure with powerful AI tools.
              </p>
            </div>

            {/* Hero image/mockup section */}
            <div className="relative w-full md:w-1/2 h-64 sm:h-80 lg:h-96">
              {/* Stylish preview mockup */}
              <div className="absolute w-full h-full rounded-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md border border-gray-700/30 p-4 overflow-hidden shadow-2xl">
                <div className="flex gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex flex-col h-5/6">
                  <div className="bg-gray-800/70 rounded-lg p-3 mb-3 border border-gray-700/50">
                    <Typewriter
                      text={PLACEHOLDER.homepageQuery}
                      speed={20}
                      className="text-gray-300 text-sm"
                      onComplete={handleQueryComplete}
                      repeat={true}
                      repeatDelay={5000}
                      onRestart={handleQueryReset}
                    />
                  </div>

                  <div className="bg-blue-900/30 rounded-lg p-3 border border-blue-700/30 text-sm font-mono text-blue-300 flex-1">
                    {sqlVisible && (
                      <Typewriter
                        text={PLACEHOLDER.homepageGenerated}
                        speed={10}
                        className="text-blue-300"
                        repeat={true}
                        repeatDelay={5500}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="py-12">
        <div className="mx-auto">
          <div>
            <div className="flex items-center mb-10">
              <h2 className="text-3xl font-semibold text-white">Products</h2>
            </div>

            {/* NLQConvert and QueryGraph */}
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 md:p-8 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <MessageSquare className="h-6 w-6 text-blue-400 mr-2" />
                  <h3 className="text-2xl font-semibold text-white">
                    NLQConvert
                  </h3>
                </div>
                <p className="text-gray-300 mb-6 flex-grow">
                  NLQConvert is an innovative tool that transforms natural
                  language queries into database-ready SQL or MongoDB commands.
                  This AI-powered system allows users to describe what they want
                  to know in plain language, and it generates the appropriate
                  query for their database.
                </p>
                <div className="bg-gray-900 rounded-md p-4 mb-4">
                  <p className="text-sm text-gray-400 mb-2">Example:</p>
                  <p className="text-blue-300 mb-2">
                    "Show me active users who signed up last week"
                  </p>
                  <p className="text-gray-400 mb-2">↓ Converts to ↓</p>
                  <p className="text-blue-300 text-sm whitespace-pre">
                    SELECT * FROM users
                    <br />
                    WHERE is_active = true
                    <br />
                    AND signup_date &gt;= DATE_SUB(CURDATE(), INTERVAL 7 DAY);
                  </p>
                </div>
                <a
                  href="/nlqconvert"
                  className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Try NLQConvert
                  <ArrowRight className="h-4 w-4 ml-2" />
                </a>
              </div>

              <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 md:p-8 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <BarChart3 className="h-6 w-6 text-purple-400 mr-2" />
                  <h3 className="text-2xl font-semibold text-white">
                    QueryGraph
                  </h3>
                </div>
                <p className="text-gray-300 mb-6 flex-grow">
                  QueryGraph is an interactive database visualization tool that
                  helps you understand your data structure and relationships.
                  Map your database schema, explore connections between tables,
                  and generate visual reports.
                </p>
                <div className="bg-gray-900 rounded-md p-4 mb-4">
                  <p className="text-sm text-gray-400 mb-2">Features:</p>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-purple-500 bg-opacity-20 flex items-center justify-center mr-2 mt-0.5">
                        <Database className="h-3 w-3 text-purple-400" />
                      </div>
                      Interactive schema visualization
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-purple-500 bg-opacity-20 flex items-center justify-center mr-2 mt-0.5">
                        <FileCode className="h-3 w-3 text-purple-400" />
                      </div>
                      Real-time SQL/MongoDB query generation
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-purple-500 bg-opacity-20 flex items-center justify-center mr-2 mt-0.5">
                        <BarChart3 className="h-3 w-3 text-purple-400" />
                      </div>
                      Data relationship mapping
                    </li>
                  </ul>
                </div>
                <a
                  href="/querygraph"
                  className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Explore QueryGraph
                  <ArrowRight className="h-4 w-4 ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default HomePage;
