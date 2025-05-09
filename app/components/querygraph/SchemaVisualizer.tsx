'use client'

import React, { useState } from 'react';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, PieChart, Pie, Cell } from 'recharts';

const DatabaseSchemaVisualizer = () => {
  const [schema, setSchema] = useState({
    tables: [
      {
        name: 'Users',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'username', type: 'varchar', isPrimary: false },
          { name: 'email', type: 'varchar', isPrimary: false },
          { name: 'password_hash', type: 'varchar', isPrimary: false },
          { name: 'created_at', type: 'timestamp', isPrimary: false },
          { name: 'updated_at', type: 'timestamp', isPrimary: false }
        ],
        rowCount: 12500
      },
      {
        name: 'Posts',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'title', type: 'varchar', isPrimary: false },
          { name: 'content', type: 'text', isPrimary: false },
          { name: 'user_id', type: 'uuid', isPrimary: false, isForeign: true, references: 'Users.id' },
          { name: 'created_at', type: 'timestamp', isPrimary: false },
          { name: 'updated_at', type: 'timestamp', isPrimary: false }
        ],
        rowCount: 45000
      },
      {
        name: 'Comments',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'content', type: 'text', isPrimary: false },
          { name: 'user_id', type: 'uuid', isPrimary: false, isForeign: true, references: 'Users.id' },
          { name: 'post_id', type: 'uuid', isPrimary: false, isForeign: true, references: 'Posts.id' },
          { name: 'created_at', type: 'timestamp', isPrimary: false }
        ],
        rowCount: 87500
      },
      {
        name: 'Categories',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'name', type: 'varchar', isPrimary: false },
          { name: 'description', type: 'text', isPrimary: false }
        ],
        rowCount: 120
      },
      {
        name: 'PostCategories',
        columns: [
          { name: 'post_id', type: 'uuid', isPrimary: true, isForeign: true, references: 'Posts.id' },
          { name: 'category_id', type: 'uuid', isPrimary: true, isForeign: true, references: 'Categories.id' }
        ],
        rowCount: 67500
      }
    ],
    relationships: [
      { from: 'Posts.user_id', to: 'Users.id' },
      { from: 'Comments.user_id', to: 'Users.id' },
      { from: 'Comments.post_id', to: 'Posts.id' },
      { from: 'PostCategories.post_id', to: 'Posts.id' },
      { from: 'PostCategories.category_id', to: 'Categories.id' }
    ]
  });

  const [selectedTable, setSelectedTable] = useState(schema?.tables[0]?.name);

  const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#0088FE', '#8884D8', '#82CA9D'];

  // Prepare data for the column type distribution chart
  const getColumnTypesData = () => {
    const typeCounts = {};
    schema.tables.forEach(table => {
      table.columns.forEach(column => {
        typeCounts[column.type] = (typeCounts[column.type] || 0) + 1;
      });
    });
    
    return Object.entries(typeCounts).map(([type, count]) => ({
      type,
      count
    }));
  };

  // Prepare data for column distribution per table
  const getTableColumnData = () => {
    return schema.tables.map(table => {
      const types = {};
      table.columns.forEach(column => {
        types[column.type] = (types[column.type] || 0) + 1;
      });
      
      return {
        name: table.name,
        columnCount: table.columns.length,
        primaryKeys: table.columns.filter(c => c.isPrimary).length,
        foreignKeys: table.columns.filter(c => c.isForeign).length,
        types
      };
    });
  };

  // Get table relationships
  const getTableRelationships = (tableName) => {
    return schema.relationships.filter(rel => 
      rel.from.startsWith(tableName) || rel.to.startsWith(tableName)
    );
  };

  // Get a count of incoming and outgoing relationships for each table
  const getRelationshipCounts = () => {
    const counts = {};
    
    schema.tables.forEach(table => {
      counts[table.name] = {
        name: table.name,
        incoming: 0,
        outgoing: 0,
        total: 0
      };
    });
    
    schema.relationships.forEach(rel => {
      const sourceTable = rel.from.split('.')[0];
      const targetTable = rel.to.split('.')[0];
      
      counts[sourceTable].outgoing += 1;
      counts[sourceTable].total += 1;
      counts[targetTable].incoming += 1;
      counts[targetTable].total += 1;
    });
    
    return Object.values(counts);
  };

  // Render Table Details Section
  const renderTableDetails = () => {
    return (
      <div className="w-full bg-gray-700 border border-gray-600 rounded-lg overflow-hidden mb-8">
        <div className="flex">
          <div className="w-1/4 border-r border-gray-600">
            <div className="bg-gray-600 p-4 font-bold text-gray-100">Tables</div>
            {schema.tables.map(table => (
              <div 
                key={table.name}
                className={`p-4 cursor-pointer border-b border-gray-600 ${selectedTable === table.name ? 'bg-blue-900' : 'hover:bg-gray-600'} text-gray-200`}
                onClick={() => setSelectedTable(table.name)}
              >
                {table.name}
              </div>
            ))}
          </div>
          <div className="w-3/4 p-4 text-gray-200">
            {selectedTable ? (
              <>
                <h2 className="text-xl font-bold mb-4 text-gray-100">{selectedTable}</h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-600 p-4 rounded-lg">
                    <div className="text-sm text-gray-300">Columns</div>
                    <div className="text-2xl font-bold text-gray-100">
                      {schema.tables.find(t => t.name === selectedTable)?.columns.length}
                    </div>
                  </div>
                  <div className="bg-gray-600 p-4 rounded-lg">
                    <div className="text-sm text-gray-300">Rows</div>
                    <div className="text-2xl font-bold text-gray-100">
                      {schema.tables.find(t => t.name === selectedTable)?.rowCount.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="overflow-auto">
                  <table className="min-w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-600">
                        <th className="px-4 py-2 text-left text-gray-200">Column</th>
                        <th className="px-4 py-2 text-left text-gray-200">Type</th>
                        <th className="px-4 py-2 text-left text-gray-200">Constraints</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schema.tables.find(t => t.name === selectedTable)?.columns.map((column, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-gray-700' : 'bg-gray-750'}>
                          <td className="px-4 py-2 text-gray-200">{column.name}</td>
                          <td className="px-4 py-2 text-gray-200">{column.type}</td>
                          <td className="px-4 py-2">
                            {column.isPrimary && <span className="bg-yellow-800 text-yellow-200 text-xs px-2 py-1 rounded mr-1">PRIMARY KEY</span>}
                            {column.isForeign && <span className="bg-blue-800 text-blue-200 text-xs px-2 py-1 rounded">FOREIGN KEY → {column.references}</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                Select a table to view details
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render Column Analysis Section
  const renderColumnAnalysis = () => {
    const columnTypes = getColumnTypesData();
    const tableData = getTableColumnData();
    
    return (
      <div className="w-full bg-gray-700 border border-gray-600 rounded-lg p-4 mb-8 text-gray-200">
        <h2 className="text-xl font-bold mb-6 text-gray-100">Column Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-100">Column Types Distribution</h3>
            <div className="h-64 bg-gray-750 p-4 rounded-lg">
              <PieChart width={400} height={350}>
                <Pie
                  data={columnTypes}
                  cx={150}
                  cy={120}
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="type"
                  label={({ type, count }) => `${type}: ${count}`}
                >
                  {columnTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', color: '#e5e7eb', borderColor: '#4b5563' }} />
              </PieChart>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-100">Column Count Per Table</h3>
            <div className="bg-gray-750 p-4 rounded-lg">
              <BarChart width={400} height={250} data={tableData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                <XAxis dataKey="name" tick={{ fill: '#e5e7eb' }} />
                <YAxis tick={{ fill: '#e5e7eb' }} />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', color: '#e5e7eb', borderColor: '#4b5563' }} />
                <Legend wrapperStyle={{ color: '#e5e7eb' }} />
                <Bar dataKey="columnCount" fill="#8884d8" name="Total Columns" />
                <Bar dataKey="primaryKeys" fill="#82ca9d" name="Primary Keys" />
                <Bar dataKey="foreignKeys" fill="#ffc658" name="Foreign Keys" />
              </BarChart>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-bold mb-4 text-gray-100">Column Details by Table</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-600">
                  <th className="px-4 py-2 text-left text-gray-200">Table</th>
                  <th className="px-4 py-2 text-left text-gray-200">Total Columns</th>
                  <th className="px-4 py-2 text-left text-gray-200">Primary Keys</th>
                  <th className="px-4 py-2 text-left text-gray-200">Foreign Keys</th>
                  <th className="px-4 py-2 text-left text-gray-200">Data Types</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((table, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-gray-700' : 'bg-gray-750'}>
                    <td className="px-4 py-2 font-medium text-gray-200">{table.name}</td>
                    <td className="px-4 py-2 text-gray-200">{table.columnCount}</td>
                    <td className="px-4 py-2 text-gray-200">{table.primaryKeys}</td>
                    <td className="px-4 py-2 text-gray-200">{table.foreignKeys}</td>
                    <td className="px-4 py-2">
                      {Object.entries(table.types).map(([type, count], j) => (
                        <span key={j} className="inline-block bg-gray-600 rounded-full px-2 py-1 text-xs mr-1 mb-1 text-gray-200">
                          {type}: {count}
                        </span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Render Relationship Map Section
  const renderRelationshipMap = () => {
    const relationshipCounts = getRelationshipCounts();
    
    return (
      <div className="w-full bg-gray-700 border border-gray-600 rounded-lg p-4 mb-8 text-gray-200">
        <h2 className="text-xl font-bold mb-6 text-gray-100">Relationship Map</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-100">Relationship Counts</h3>
            <div className="bg-gray-750 p-4 rounded-lg">
              <BarChart width={400} height={300} data={relationshipCounts}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                <XAxis dataKey="name" tick={{ fill: '#e5e7eb' }} />
                <YAxis tick={{ fill: '#e5e7eb' }} />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', color: '#e5e7eb', borderColor: '#4b5563' }} />
                <Legend wrapperStyle={{ color: '#e5e7eb' }} />
                <Bar dataKey="incoming" fill="#8884d8" name="Incoming Relationships" />
                <Bar dataKey="outgoing" fill="#82ca9d" name="Outgoing Relationships" />
              </BarChart>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-100">Relationship Matrix</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-600">
                    <th className="px-4 py-2 text-gray-200">Table</th>
                    {schema.tables.map(table => (
                      <th key={table.name} className="px-4 py-2 text-gray-200">{table.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {schema.tables.map(sourceTable => (
                    <tr key={sourceTable.name} className="border-t border-gray-600">
                      <td className="px-4 py-2 font-medium text-gray-200">{sourceTable.name}</td>
                      {schema.tables.map(targetTable => {
                        const relCount = schema.relationships.filter(rel => 
                          (rel.from.startsWith(sourceTable.name) && rel.to.startsWith(targetTable.name)) ||
                          (rel.from.startsWith(targetTable.name) && rel.to.startsWith(sourceTable.name))
                        ).length;
                        
                        return (
                          <td key={targetTable.name} className="px-4 py-2 text-center">
                            {relCount > 0 ? (
                              <span className="inline-block bg-blue-600 text-blue-100 rounded-full w-6 h-6 flex items-center justify-center">
                                {relCount}
                              </span>
                            ) : (
                              <span className="text-gray-500">-</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-bold mb-4 text-gray-100">All Relationships</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-600">
                  <th className="px-4 py-2 text-left text-gray-200">Source Table</th>
                  <th className="px-4 py-2 text-left text-gray-200">Source Column</th>
                  <th className="px-4 py-2 text-left text-gray-200">Target Table</th>
                  <th className="px-4 py-2 text-left text-gray-200">Target Column</th>
                </tr>
              </thead>
              <tbody>
                {schema.relationships.map((rel, i) => {
                  const [sourceTable, sourceColumn] = rel.from.split('.');
                  const [targetTable, targetColumn] = rel.to.split('.');
                  
                  return (
                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-700' : 'bg-gray-750'}>
                      <td className="px-4 py-2 text-gray-200">{sourceTable}</td>
                      <td className="px-4 py-2 text-gray-200">{sourceColumn}</td>
                      <td className="px-4 py-2 text-gray-200">{targetTable}</td>
                      <td className="px-4 py-2 text-gray-200">{targetColumn}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Render Size Comparison Section
  const renderSizeComparison = () => {
    const tableSizes = schema.tables.map(table => ({
      name: table.name,
      rowCount: table.rowCount,
      columnCount: table.columns.length,
      estimatedSize: table.rowCount * table.columns.length * 10 // Rough estimate
    }));
    
    // Sort tables by row count
    const sortedBySize = [...tableSizes].sort((a, b) => b.rowCount - a.rowCount);
    
    return (
      <div className="w-full bg-gray-700 border border-gray-600 rounded-lg p-4 mb-8 text-gray-200">
        <h2 className="text-xl font-bold mb-6 text-gray-100">Size Comparison</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-100">Table Size Comparison</h3>
            <div className="bg-gray-750 p-4 rounded-lg">
              <BarChart width={400} height={300} data={sortedBySize}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                <XAxis dataKey="name" tick={{ fill: '#e5e7eb' }} />
                <YAxis tick={{ fill: '#e5e7eb' }} />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', color: '#e5e7eb', borderColor: '#4b5563' }} />
                <Legend wrapperStyle={{ color: '#e5e7eb' }} />
                <Bar dataKey="rowCount" fill="#8884d8" name="Row Count" />
              </BarChart>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-100">Estimated Storage Size</h3>
            <div className="bg-gray-750 p-4 rounded-lg">
              <PieChart width={400} height={300}>
                <Pie
                  data={sortedBySize}
                  cx={200}
                  cy={150}
                  labelLine={true}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="estimatedSize"
                  nameKey="name"
                  label={({ name }) => `${name}`}
                >
                  {sortedBySize.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `${(value / 1024).toFixed(2)} KB (est.)`}
                  contentStyle={{ backgroundColor: '#1f2937', color: '#e5e7eb', borderColor: '#4b5563' }}
                />
              </PieChart>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-bold mb-4 text-gray-100">Table Size Details</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-600">
                  <th className="px-4 py-2 text-left text-gray-200">Table</th>
                  <th className="px-4 py-2 text-right text-gray-200">Row Count</th>
                  <th className="px-4 py-2 text-right text-gray-200">Column Count</th>
                  <th className="px-4 py-2 text-right text-gray-200">Est. Size</th>
                  <th className="px-4 py-2 text-right text-gray-200">% of Total</th>
                </tr>
              </thead>
              <tbody>
                {sortedBySize.map((table, i) => {
                  const totalSize = sortedBySize.reduce((sum, t) => sum + t.estimatedSize, 0);
                  const percentage = (table.estimatedSize / totalSize * 100).toFixed(1);
                  
                  return (
                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-700' : 'bg-gray-750'}>
                      <td className="px-4 py-2 font-medium text-gray-200">{table.name}</td>
                      <td className="px-4 py-2 text-right text-gray-200">{table.rowCount.toLocaleString()}</td>
                      <td className="px-4 py-2 text-right text-gray-200">{table.columnCount}</td>
                      <td className="px-4 py-2 text-right text-gray-200">{(table.estimatedSize / 1024).toFixed(2)} KB</td>
                      <td className="px-4 py-2 text-right">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-600 rounded-full h-2 mr-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-gray-200">{percentage}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-gray-800 p-4 text-gray-100 border border-gray-700 rounded-xl">
      <div className="rounded-lg p-4 mb-6 ">
        <h1 className="text-2xl font-bold mb-6 text-gray-100">Database Schema Visualizer</h1>
        
        {/* Table Details Section */}
        {renderTableDetails()}
        
        {/* Column Analysis Section */}
        {renderColumnAnalysis()}
        
        {/* Relationship Map Section */}
        {renderRelationshipMap()}
        
        {/* Size Comparison Section */}
        {renderSizeComparison()}
      </div>
    </div>
  );
};

export default DatabaseSchemaVisualizer;