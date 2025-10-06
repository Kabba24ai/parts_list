import React, { useState, useMemo } from 'react';
import { Search, Plus, Eye, Trash2, Package, CreditCard as Edit, X, ArrowLeft, Save, DollarSign, FileText, Copy, GripVertical } from 'lucide-react';

const mockParts = [
  {
    id: 1,
    part_name: 'Hydraulic Filter',
    category: 'Excavators',
    equipment_name: 'CAT 320D Excavator',
    equipment_id: 'EXC-001',
    part_number: 'HF-2024-001',
    supplier: 'Caterpillar Inc.',
    unit_cost: 45.99,
    stock_level: 12,
    min_stock: 5,
    dni: false
  },
  {
    id: 2,
    part_name: 'Engine Oil Filter',
    category: 'Generators',
    equipment_name: 'Kohler 150kW Generator',
    equipment_id: 'GEN-045',
    part_number: 'OF-2024-005',
    supplier: 'Kohler Power',
    unit_cost: 28.50,
    stock_level: 8,
    min_stock: 3,
    dni: false
  },
  {
    id: 3,
    part_name: 'Air Filter Element',
    category: 'Compressors',
    equipment_name: 'Atlas Copco GA30',
    equipment_id: 'CMP-078',
    part_number: 'AF-2024-012',
    supplier: 'Atlas Copco',
    unit_cost: 67.25,
    stock_level: 4,
    min_stock: 2,
    dni: false
  }
];

const TemplateManagement = ({ onCreateTemplate, onEditTemplate }) => {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: 'Excavator Standard Maintenance',
      category: 'Excavators',
      description: 'Standard maintenance parts for all excavator models',
      parts_count: 12,
      created_date: '2024-01-15',
      last_modified: '2024-02-10',
      created_by: 'John Smith'
    },
    {
      id: 2,
      name: 'Generator Basic Service Kit',
      category: 'Generators',
      description: 'Essential service parts for generator maintenance',
      parts_count: 8,
      created_date: '2024-01-20',
      last_modified: '2024-02-05',
      created_by: 'Sarah Johnson'
    }
  ]);

  const [filters, setFilters] = useState({
    search: '',
    category: ''
  });

  const categories = ['Bulldozers', 'Compressors', 'Excavators', 'Generators', 'Loaders', 'Supplies'];

  const filteredTemplates = useMemo(() => {
    return templates.filter(template => {
      const matchesSearch = !filters.search ||
        template.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        template.description.toLowerCase().includes(filters.search.toLowerCase());

      const matchesCategory = !filters.category || template.category === filters.category;

      return matchesSearch && matchesCategory;
    });
  }, [templates, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ search: '', category: '' });
  };

  const handleDeleteTemplate = (templateId, templateName) => {
    if (window.confirm('Are you sure you want to delete "' + templateName + '"?')) {
      setTemplates(prev => prev.filter(template => template.id !== templateId));
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <div className="flex-1 p-6 overflow-auto">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Parts List Templates</h1>
          </div>
          <p className="text-gray-600">Create and manage reusable parts lists for different equipment categories</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white min-w-[160px]"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              {Object.values(filters).some(v => v) && (
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-2 px-4 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <X className="h-4 w-4" />
                  <span>Clear</span>
                </button>
              )}
            </div>

            <button
              onClick={onCreateTemplate}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex-shrink-0"
            >
              <Plus className="h-4 w-4" />
              <span>Create Template</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Template Name</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Category</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Description</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-700">Parts Count</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Created By</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTemplates.map((template) => (
                  <tr key={template.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div>
                        <span className="text-sm font-medium text-gray-900">{template.name}</span>
                        <p className="text-xs text-gray-500 mt-1">Modified: {template.last_modified}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {template.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-900">{template.description}</span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {template.parts_count} parts
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-900">{template.created_by}</span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => onEditTemplate && onEditTemplate(template.id)}
                          className="p-1 text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50 rounded-lg transition-colors"
                          title="Edit Template"
                        >
                          <Edit className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => handleDeleteTemplate(template.id, template.name)}
                          className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Template"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or create a new template.</p>
              <button
                onClick={onCreateTemplate}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Create Template</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateManagement;
