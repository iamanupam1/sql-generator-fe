"use client";
import React, { useState } from "react";
import BaseLayout from "../components/common/BaseLayout";
import {
  Database,
  Copy,
  Download,
  Link,
  ChevronDown,
  CheckCircle,
  Search,
  Code,
  Zap,
  Loader,
  PlayCircle,
} from "lucide-react";
import DBConnectionModal from "../components/DBConnectionModal";
import { useUserDatabase } from "../user-provider";
import { ConnectionDetails } from "../types";
import ConnectionViewer from "../components/ConnectionViewer";
import { PLACEHOLDER } from "../constants";

const NLQConvertPage = () => {
  const { userDatabase, connectDB } = useUserDatabase();
  const [query, setQuery] = useState("");
  const [databaseEngine, setDatabaseEngine] = useState("MongoDB");
  const [isDBDropdownOpen, setIsDBDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAPIFetching, setIsAPIFetching] = useState(false);
  const [generatedSQL, setGeneratedSQL] = useState(PLACEHOLDER.generated_query);
  const [copyStatus, setCopyStatus] = useState("");

  const databaseOptions = ["MongoDB", "SQL", "MySQL", "PostgreSQL"];
  console.log("userDatabase", userDatabase);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDatabaseConnect = async (
    connectionDetails: ConnectionDetails
  ) => {
    try {
      setIsAPIFetching(true);
      const response = await fetch("http://127.0.0.1:5000/api/fetch-database", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          database_engine: connectionDetails.databaseEngine,
          connection_string: connectionDetails.connectionString,
          database_name: connectionDetails.databaseName,
        }),
      });
      const responseData = await response.json();
      setIsAPIFetching(false);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      connectDB({
        connection: connectionDetails,
        collections: responseData.data,
      });
    } catch (error) {
      setIsAPIFetching(false);
      console.error("Error connecting to database:", error);
    }
  };

  const handleGenerateSQL = async () => {
    try {
      setIsAPIFetching(true);
      const response = await fetch("http://127.0.0.1:5000/api/generate-query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query,
          database_engine: databaseEngine,
          context: userDatabase?.collections
        }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      setGeneratedSQL(data.response);
      setIsAPIFetching(false);
    } catch (error) {
      console.error("Error generating SQL:", error);
      setGeneratedSQL("Error generating SQL. Please try again.");
      setIsAPIFetching(false);
    }
  };

  const handleCopyToClipboard = () => {
    // Extract SQL from the markdown code block
    const sqlMatch = generatedSQL.match(/```sql\n([\s\S]*?)```/);
    const sqlContent = sqlMatch ? sqlMatch[1] : generatedSQL;

    navigator.clipboard.writeText(sqlContent);
    setCopyStatus("copied");
    setTimeout(() => setCopyStatus(""), 2000);
  };
  return (
    <BaseLayout>
      {/* Hero Section */}
      <div className="text-center py-18">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          NLQConvert
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          NLQConvert is an innovative tool that transforms natural language
          queries into database-ready SQL or MongoDB commands. This AI-powered
          system allows users to describe what they want to know in plain
          language, and it generates the appropriate query for their database.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 mb-12 py-18">
        <div className="w-full lg:w-1/2 bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700">
          <div className="p-4 sm:p-6">
            <div className="mb-8">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 flex items-center">
                <Database className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-400" />
                Database Connection
              </h2>
              <div className="w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 mb-4"></div>

              {/* Database Engine Dropdown */}
              <div className="relative mb-6">
                <div
                  className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg backdrop-blur-sm border border-gray-600 hover:border-blue-500 transition-all duration-200 cursor-pointer"
                  onClick={() => setIsDBDropdownOpen(!isDBDropdownOpen)}
                >
                  <div className="flex items-center">
                    <Database className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-400" />
                    <span className="text-gray-200">{databaseEngine}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform duration-200 ${
                      isDBDropdownOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </div>

                {/* Dropdown Menu */}
                {isDBDropdownOpen && (
                  <div className="absolute w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10 overflow-hidden">
                    {databaseOptions.map((option) => (
                      <div
                        key={option}
                        className="p-3 hover:bg-gray-700 cursor-pointer flex items-center"
                        onClick={() => {
                          setDatabaseEngine(option);
                          setIsDBDropdownOpen(false);
                        }}
                      >
                        {option === databaseEngine && (
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        )}
                        <span
                          className={
                            option === databaseEngine
                              ? "text-green-500"
                              : "text-gray-300"
                          }
                        >
                          {option}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <h2 className="text-base sm:text-lg font-bold text-white mb-4">
                Tables / Collections
              </h2>

              <div className="mb-6">
                {userDatabase?.connection ? (
                  <ConnectionViewer />
                ) : (
                  <button
                    className="w-full flex cursor-pointer items-center justify-center bg-gray-800 hover:bg-gray-700 p-3 sm:p-4 rounded-lg border border-gray-700 hover:border-blue-400 transition-all duration-200"
                    onClick={handleOpenModal}
                  >
                    {!isAPIFetching ? (
                      <Link className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mr-2" />
                    ) : (
                      <Loader className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mr-1 animate-spin" />
                    )}
                    <span className="text-xs sm:text-sm font-medium text-white">
                      {isAPIFetching ? "Connecting..." : "Connect Database"}
                    </span>
                  </button>
                )}
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-base sm:text-lg font-bold text-white mb-2 flex items-center">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-400" />
                Describe Your Query
              </h2>
              <div className="w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 mb-4"></div>
            </div>

            {/* Query Input */}
            <div className="flex-grow mb-6">
              <textarea
                className="w-full h-32 sm:h-40 p-3 sm:p-4 bg-gray-700/50 rounded-lg border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={PLACEHOLDER.user_query}
              />
            </div>

            {/* Generate Button */}
            <button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg flex items-center justify-center self-end transition-all duration-300 shadow-lg hover:shadow-blue-500/20 w-full"
              onClick={handleGenerateSQL}
              disabled={isAPIFetching}
            >
              {isAPIFetching ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-t-2 border-b-2 border-white mr-2"></div>
                  <span className="text-sm sm:text-base">Generating...</span>
                </div>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-sm sm:text-base mr-2">
                    Generate Query
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-1/2 bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700">
          <div className="p-4 sm:p-6 pb-0 sm:pb-0">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-2 flex items-center">
              <Code className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-400" />
              Generated Query
            </h2>
            <div className="w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 mb-4"></div>

            {/* SQL Output */}
            <div className="flex-grow relative">
              <div className="text-xs text-gray-400 mb-2 flex items-center">
                <div className="mr-2 h-2 w-2 bg-green-500 rounded-full"></div>
                {databaseEngine} Query
              </div>
              <div className="bg-gray-900 rounded-lg p-3 sm:p-4 border border-gray-700 overflow-auto h-auto sm:h-[420px]">
                <pre className="text-xs sm:text-sm text-gray-200 whitespace-pre-wrap font-mono">
                  {generatedSQL}
                </pre>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex justify-end space-x-2 sm:space-x-3">
                <button
                  className={`p-2 ${
                    copyStatus === "copied" ? "bg-green-600" : "bg-gray-700"
                  } rounded-lg flex items-center transition-all duration-200 hover:bg-gray-600 cursor-pointer`}
                  onClick={handleCopyToClipboard}
                >
                  {copyStatus === "copied" ? (
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  ) : (
                    <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
                  )}
                  <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-300">
                    {copyStatus === "copied" ? "Copied!" : "Copy"}
                  </span>
                </button>
                {/* <button className="p-2 bg-gray-700 cursor-pointer rounded-lg flex items-center transition-all duration-200 hover:bg-gray-600">
                  <PlayCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
                  <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-300">
                    Execute Command
                  </span>
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Database Connection Modal */}
      <DBConnectionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConnect={handleDatabaseConnect}
        databaseEngine={databaseEngine}
      />
    </BaseLayout>
  );
};

export default NLQConvertPage;
