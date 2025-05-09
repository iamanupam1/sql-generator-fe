"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { X, Database, Lock, User, Link } from "lucide-react";
import { ConnectionDetails } from "../types";

interface DBConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (details: ConnectionDetails) => void;
  databaseEngine?: string;
}

const DBConnectionModal: React.FC<DBConnectionModalProps> = ({
  isOpen,
  onClose,
  onConnect,
  databaseEngine,
}) => {
  const [connectionDetails, setConnectionDetails] = useState<ConnectionDetails>(
    {
      connectionString: "",
      databaseName: "",
      databaseEngine: databaseEngine || "MongoDB",
    }
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setConnectionDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onConnect(connectionDetails);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-gray-200 flex items-center">
            <Database className="w-5 h-5 mr-2 text-blue-400" />
            Connect Database
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Database Engine */}
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Database Engine
            </label>
            <select
              name="databaseEngine"
              value={connectionDetails.databaseEngine}
              onChange={handleChange}
              disabled
              className="w-full p-3 bg-gray-700 rounded border border-gray-600 text-gray-200 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
            >
              <option value="MongoDB">MongoDB</option>
              <option value="SQL">SQL</option>
              <option value="MySQL">MySQL</option>
              <option value="PostgreSQL">PostgreSQL</option>
            </select>
          </div>

          {/* Connection String */}
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Connection String
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Link className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="connectionString"
                placeholder="mongodb://localhost:27017"
                value={connectionDetails.connectionString}
                onChange={handleChange}
                className="w-full p-3 pl-10 bg-gray-700 rounded border border-gray-600 text-gray-200 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Database Name */}
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Database Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="databaseName"
                placeholder="Type your database name"
                value={connectionDetails.databaseName}
                onChange={handleChange}
                className="w-full p-3 pl-10 bg-gray-700 rounded border border-gray-600 text-gray-200 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Connect
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DBConnectionModal;
