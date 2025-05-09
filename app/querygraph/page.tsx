"use client";
import React, { useState } from "react";
import BaseLayout from "../components/common/BaseLayout";
import { Database, ChevronDown, CheckCircle, Link, Loader } from "lucide-react";
import DatabaseSchemaVisualizer from "../components/querygraph/SchemaVisualizer";
import DBConnectionModal from "../components/DBConnectionModal";
import { useUserDatabase } from "../user-provider";
import { ConnectionDetails } from "../types";

const QueryGraphPage = () => {
  const [isDBDropdownOpen, setIsDBDropdownOpen] = useState(false);
  const [databaseEngine, setDatabaseEngine] = useState("MongoDB");
  const [databaseOptions] = useState([
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "SQLite",
    "Oracle",
  ]);

  const { userDatabase, connectDB } = useUserDatabase();
  const [isAPIFetching, setIsAPIFetching] = useState(false);
  console.log("userDatabase", userDatabase);
  const [isModalOpen, setIsModalOpen] = useState(false);
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


  const handleGenerateSQL = () => {
    setIsAPIFetching(true);
    setTimeout(() => {
      setIsAPIFetching(false);
    }, 2000);
  };

  const ConnectionViewer = () => {
    return (
      <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Database className="w-4 h-4 mr-2 text-green-500" />
            <span className="text-green-500 font-medium">Connected</span>
          </div>
          <button className="text-xs text-gray-400 hover:text-gray-200">
            Disconnect
          </button>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Database:</span>
            <span className="text-gray-200 text-sm">
              {userDatabase?.connection.databaseName}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Tables:</span>
            <span className="text-gray-200 text-sm">{Object.keys(userDatabase?.collections)?.length}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <BaseLayout>
      <div className="mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            QueryGraph
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            QueryGraph is an interactive database visualization tool that helps
            you understand your data structure and relationships. Map your
            database schema, explore connections between tables, and generate
            visual reports.
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12 pt-18">
          {/* Database Connection Card */}
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
            </div>
          </div>

          {/* Visualization Area */}
          <div className="w-full lg:w-1/2 bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700">
            <div className="p-4 sm:p-6">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white mb-4">
                  Available Tables
                </h2>

                {userDatabase?.connection ? (
                  <div className="space-y-2 max-h-72 overflow-y-auto">
                    {Object.keys(userDatabase?.collections)?.map((table) => (
                      <div
                        key={table}
                        className="p-3 bg-gray-700/50 rounded-lg border border-gray-600 hover:border-blue-500 transition-all duration-200 cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Database className="w-4 h-4 mr-2 text-blue-400" />
                            <span className="text-gray-200">{table}</span>
                          </div>
                          <span className="text-xs text-gray-400">
                            {Object.keys(userDatabase?.collections[table]).length}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center bg-gray-700/50 rounded-lg border border-gray-600">
                    <p className="text-gray-400">No tables available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <DBConnectionModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConnect={handleDatabaseConnect}
          databaseEngine={databaseEngine}
        />
        <DatabaseSchemaVisualizer />
      </div>
    </BaseLayout>
  );
};

export default QueryGraphPage;
