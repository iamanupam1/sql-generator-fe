'use client'
import React, { useState } from 'react';
import { Table, TableIcon, X, ChevronRight, AlertTriangle } from 'lucide-react';
import { useUserDatabase } from '../user-provider';

const ConnectionViewer = () => {
  const { userDatabase, disconnectDB } = useUserDatabase();
  const [selectedCollection, setSelectedCollection] = useState<string>('');
  const [isSchemaModalOpen, setIsSchemaModalOpen] = useState(false);
  const [isDisconnectModalOpen, setIsDisconnectModalOpen] = useState(false);

  const handleCollectionClick = (collectionName: string) => {
    setSelectedCollection(collectionName);
    setIsSchemaModalOpen(true);
  };

  const closeSchemaModal = () => {
    setIsSchemaModalOpen(false);
    setSelectedCollection('');
  };

  const openDisconnectModal = () => {
    setIsDisconnectModalOpen(true);
  };

  const closeDisconnectModal = () => {
    setIsDisconnectModalOpen(false);
  };

  const handleDisconnect = () => {
    disconnectDB();
    setIsDisconnectModalOpen(false);
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg border border-gray-700 shadow-md">
      {/* Connection Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div className="absolute -inset-1 bg-green-500 rounded-full opacity-30 animate-ping"></div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-white">
              {userDatabase?.connection.databaseEngine}
            </h3>
            <p className="text-xs text-gray-400">
              {userDatabase?.connection.databaseName}
            </p>
          </div>
        </div>
        <button onClick={openDisconnectModal}
          className="flex cursor-pointer items-center bg-gray-700 hover:bg-red-600 text-gray-300 hover:text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200"
        >
          <X className="w-3.5 h-3.5 mr-1.5" />
          Disconnect
        </button>
      </div>

      {/* Collections Section */}
      {userDatabase?.collections && Object.keys(userDatabase.collections).length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <TableIcon className="w-4 h-4 text-gray-400" />
            <h4 className="text-xs font-medium text-gray-300">Collections</h4>
            <span className="text-xs text-gray-500 italic">(Click to view schema)</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(userDatabase.collections).map(([name]) => (
              <button
                key={name}
                onClick={() => handleCollectionClick(name)}
                className={`group rounded-md px-3 py-1.5 text-xs transition-all duration-200 flex items-center space-x-1 ${
                  selectedCollection === name && isSchemaModalOpen
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                <span className={selectedCollection === name && isSchemaModalOpen ? "text-white" : "text-gray-300 group-hover:text-white"}>
                  {name}
                </span>
                <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-white transition-colors duration-200" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Schema Modal Viewer */}
      {isSchemaModalOpen && selectedCollection && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50" onClick={closeSchemaModal}>
          <div 
            className="bg-gray-900 border border-gray-700 rounded-lg max-w-2xl w-full mx-4 shadow-xl transform transition-all duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <div className="flex items-center space-x-2">
                <Table className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-medium text-white">Schema: {selectedCollection}</h3>
              </div>
              <button
                onClick={closeSchemaModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-4 max-h-96 overflow-y-auto">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-800 text-gray-400">
                    <tr>
                      <th className="px-3 py-2 rounded-tl-md">Field</th>
                      <th className="px-3 py-2 rounded-tr-md">Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {Object.entries(userDatabase?.collections[selectedCollection]).map(([field, details], index) => (
                      <tr key={field} className={index % 2 === 0 ? "bg-gray-900" : "bg-gray-800/50"}>
                        <td className="px-3 py-2 font-medium text-gray-300">{field}</td>
                        <td className="px-3 py-2">
                          <span className={`
                            px-2 py-0.5 rounded-full text-xs font-medium
                            ${details.type === "ObjectId" ? "bg-purple-900/30 text-purple-400" : ""}
                            ${details.type === "str" ? "bg-green-900/30 text-green-400" : ""}
                            ${details.type === "int" ? "bg-blue-900/30 text-blue-400" : ""}
                            ${details.type === "datetime" ? "bg-yellow-900/30 text-yellow-400" : ""}
                          `}>
                            {details.type}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-700 flex justify-end">
              <button
                onClick={closeSchemaModal}
                className="bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white px-4 py-2 rounded-md text-xs font-medium transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Disconnect Confirmation Modal */}
      {isDisconnectModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50" onClick={closeDisconnectModal}>
          <div 
            className="bg-gray-900 border border-gray-700 rounded-lg max-w-md w-full mx-4 shadow-xl transform transition-all duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5">
              <div className="flex items-center mb-4">
                <div className="bg-red-900/30 p-2 rounded-full mr-4">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-lg font-medium text-white">Confirm Disconnect</h3>
              </div>
              
              <p className="text-sm text-gray-300 mb-5">
                Are you sure you want to disconnect from <span className="font-semibold text-white">{userDatabase?.connection.databaseName}</span>? 
                This action will close your current database connection.
              </p>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={closeDisconnectModal}
                  className="bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDisconnect}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectionViewer;