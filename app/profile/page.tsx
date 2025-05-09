'use client'
import React from 'react'
import { Database, Code, BarChart3, Users, ArrowRight, MessageSquare, FileCode } from "lucide-react";
import BaseLayout from "../components/common/BaseLayout";


const ProfilePage = () => {
  return (
    <BaseLayout>
      <div className="mx-auto px-4 py-18">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            About DataMind AI
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're simplifying database interaction through natural language processing and visual analytics.
          </p>
        </div>

        {/* Our Mission */}
        <div className="mb-20">
          <div className="flex items-center mb-6">
            <Users className="h-8 w-8 text-blue-500 mr-3" />
            <h2 className="text-3xl font-semibold text-white">Our Mission</h2>
          </div>
          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 md:p-8">
            <p className="text-gray-300 leading-relaxed">
              At DataMind AI, we believe that data should be accessible to everyone, regardless of their technical expertise. Our mission is to bridge the gap between natural language and database operations, making data analysis intuitive and efficient for developers, analysts, and business users alike.
            </p>
          </div>
        </div>

        {/* Our Products */}
        <div className="mb-20">
          <div className="flex items-center mb-10">
            <Code className="h-8 w-8 text-blue-500 mr-3" />
            <h2 className="text-3xl font-semibold text-white">Our Products</h2>
          </div>

          {/* NLQConvert */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 md:p-8 flex flex-col h-full">
              <div className="flex items-center mb-4">
                <MessageSquare className="h-6 w-6 text-blue-400 mr-2" />
                <h3 className="text-2xl font-semibold text-white">NLQConvert</h3>
              </div>
              <p className="text-gray-300 mb-6 flex-grow">
                NLQConvert transforms natural language queries into database-ready SQL or MongoDB commands. Simply describe what you want to know, and our AI will generate the appropriate query.
              </p>
              <div className="bg-gray-900 rounded-md p-4 mb-4">
                <p className="text-sm text-gray-400 mb-2">Example:</p>
                <p className="text-blue-300 mb-2">" Show me active users who signed up last week "</p>
                <p className="text-gray-400 mb-2">↓ Converts to ↓</p>
                <p className="text-blue-300 text-sm whitespace-pre">
                      SELECT * FROM users<br/>
                      WHERE is_active = true<br/>
                      AND signup_date &gt;= DATE_SUB(CURDATE(), INTERVAL 7 DAY);
                    </p>

              </div>
              <a href="/nlqconvert" className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                Try NLQConvert
                <ArrowRight className="h-4 w-4 ml-2" />
              </a>
            </div>

            {/* QueryGraph */}
            <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 md:p-8 flex flex-col h-full">
              <div className="flex items-center mb-4">
                <BarChart3 className="h-6 w-6 text-purple-400 mr-2" />
                <h3 className="text-2xl font-semibold text-white">QueryGraph</h3>
              </div>
              <p className="text-gray-300 mb-6 flex-grow">
                QueryGraph is an interactive database visualization tool that helps you understand your data structure and relationships. Map your database schema, explore connections between tables, and generate visual reports.
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
              <a href="/querygraph" className="flex items-center text-purple-400 hover:text-purple-300 transition-colors">
                Explore QueryGraph
                <ArrowRight className="h-4 w-4 ml-2" />
              </a>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-20">
          <div className="flex items-center mb-10">
            <Database className="h-8 w-8 text-blue-500 mr-3" />
            <h2 className="text-3xl font-semibold text-white">Why Choose DataMind AI</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Accuracy</h3>
              <p className="text-gray-300">
                Our AI models are trained on millions of database queries to ensure precise and efficient query generation.
              </p>
            </div>
            <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Versatility</h3>
              <p className="text-gray-300">
                Support for both SQL and MongoDB, with plans to expand to more database systems in the future.
              </p>
            </div>
            <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Integration</h3>
              <p className="text-gray-300">
                Easy integration with your existing workflows through our API and developer tools.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white mb-6">Ready to transform your database experience?</h2>
          <div className="flex justify-center space-x-4">
            <a href="/nlqconvert" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md transition-colors">
              Try NLQConvert
            </a>
            <a href="/querygraph" className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-6 rounded-md transition-colors">
              Explore QueryGraph
            </a>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

export default ProfilePage