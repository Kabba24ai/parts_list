import React from 'react';
import { ArrowLeft, FileText, Package, Box, Building2, CreditCard as Edit } from 'lucide-react';

interface TemplateViewProps {
  templateId: number;
  onBack: () => void;
  onEdit: (templateId: number) => void;
}

const TemplateView: React.FC<TemplateViewProps> = ({ templateId, onBack, onEdit }) => {
  const equipmentOptions = [
    { id: 'N/A', name: 'General Use (Supplies)', category: 'Supplies' },
    { id: 'EXC-001', name: 'CAT 320D Excavator', category: 'Excavators' },
    { id: 'EXC-002', name: 'John Deere 350G Excavator', category: 'Excavators' },
    { id: 'GEN-045', name: 'Kohler 150kW Generator', category: 'Generators' },
    { id: 'GEN-046', name: 'Cummins 200kW Generator', category: 'Generators' },
    { id: 'BUL-012', name: 'John Deere 650K Dozer', category: 'Bulldozers' },
    { id: 'BUL-013', name: 'CAT D6T Dozer', category: 'Bulldozers' },
    { id: 'LDR-023', name: 'CAT 950 Wheel Loader', category: 'Loaders' },
    { id: 'LDR-024', name: 'John Deere 644K Loader', category: 'Loaders' },
    { id: 'CMP-078', name: 'Atlas Copco GA30', category: 'Compressors' },
    { id: 'CMP-079', name: 'Ingersoll Rand R55', category: 'Compressors' }
  ];

  const mockTemplate = {
    id: templateId,
    name: 'Excavator Standard Maintenance',
    description: 'Standard maintenance parts for all excavator models',
    category: 'Excavators',
    assigned_equipment_ids: ['EXC-001', 'EXC-002'],
    created_date: '2024-01-15',
    last_modified: '2024-02-10',
    created_by: 'John Smith',
    parts: [
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
        id: 3,
        part_name: 'Air Filter Element',
        category: 'Excavators',
        equipment_name: 'CAT 320D Excavator',
        equipment_id: 'EXC-001',
        part_number: 'AF-2024-012',
        supplier: 'Atlas Copco',
        unit_cost: 67.25,
        stock_level: 4,
        min_stock: 2,
        dni: false
      },
      {
        id: 9,
        part_name: 'Custom Hydraulic Hose',
        category: 'Excavators',
        equipment_name: 'CAT 320D Excavator',
        equipment_id: 'EXC-001',
        part_number: 'CHH-2024-001',
        supplier: 'Parker Hannifin',
        unit_cost: 125.00,
        stock_level: 0,
        min_stock: 0,
        dni: true
      }
    ]
  };

  const assignedEquipment = equipmentOptions.filter(eq =>
    mockTemplate.assigned_equipment_ids.includes(eq.id)
  );

  const getStockBadge = (part: any) => {
    if (part.dni) {
      return {
        text: 'DNI',
        className: 'text-gray-700 bg-gray-100 border-gray-200'
      };
    }
    if (part.stock_level === 0) {
      return {
        text: 'Out of Stock',
        className: 'text-red-700 bg-red-100 border-red-200'
      };
    }
    if (part.stock_level < part.min_stock) {
      return {
        text: 'Buy Now',
        className: 'text-yellow-700 bg-yellow-100 border-yellow-200'
      };
    }
    return {
      text: 'In Stock',
      className: 'text-green-700 bg-green-100 border-green-200'
    };
  };

  const totalCost = mockTemplate.parts.reduce((sum, part) => sum + part.unit_cost, 0);

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <button
                  onClick={onBack}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg"
                >
                  <ArrowLeft className="h-6 w-6" />
                </button>
                <FileText className="h-8 w-8 text-blue-600" />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{mockTemplate.name}</h1>
                  <p className="text-gray-600 mt-1">{mockTemplate.description}</p>
                </div>
              </div>
              <button
                onClick={() => onEdit(templateId)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <Edit className="h-4 w-4" />
                <span>Edit Template</span>
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-600 mb-1">Category</p>
                <p className="font-semibold text-gray-900">{mockTemplate.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Parts</p>
                <p className="font-semibold text-gray-900">{mockTemplate.parts.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Value</p>
                <p className="font-semibold text-green-600">${totalCost.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Last Modified</p>
                <p className="font-semibold text-gray-900">{new Date(mockTemplate.last_modified).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-2 mb-4">
                  <Building2 className="h-5 w-5 text-gray-700" />
                  <h2 className="text-lg font-semibold text-gray-900">Assigned Equipment</h2>
                </div>

                <div className="space-y-3">
                  {assignedEquipment.map(equipment => (
                    <div
                      key={equipment.id}
                      className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="font-medium text-gray-900 text-sm">{equipment.name}</div>
                      <div className="text-xs text-gray-600 font-mono mt-1">{equipment.id}</div>
                      <div className="text-xs text-gray-500 mt-1">{equipment.category}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>
                      <span className="font-medium">Created:</span> {new Date(mockTemplate.created_date).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="font-medium">Created by:</span> {mockTemplate.created_by}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-2 mb-4">
                  <Package className="h-5 w-5 text-gray-700" />
                  <h2 className="text-lg font-semibold text-gray-900">Template Parts ({mockTemplate.parts.length})</h2>
                </div>

                <div className="space-y-3">
                  {mockTemplate.parts.map((part) => {
                    const stockBadge = getStockBadge(part);
                    return (
                      <div
                        key={part.id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{part.part_name}</h3>
                            <p className="text-sm text-gray-600">
                              {part.equipment_name} <span className="text-gray-400">•</span> {part.category}
                            </p>
                          </div>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${stockBadge.className}`}>
                            {stockBadge.text}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="flex items-center space-x-2 text-gray-600 mb-2">
                              <Box className="h-4 w-4" />
                              <span className="font-medium">Part Details</span>
                            </div>
                            <div className="pl-6 space-y-1 text-xs">
                              <div>
                                <span className="text-gray-600">Part #:</span>
                                <span className="ml-2 font-mono text-gray-900">{part.part_number}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Equipment ID:</span>
                                <span className="ml-2 font-mono text-gray-900">{part.equipment_id}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Supplier:</span>
                                <span className="ml-2 text-gray-900">{part.supplier}</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center space-x-2 text-gray-600 mb-2">
                              <Package className="h-4 w-4" />
                              <span className="font-medium">Inventory</span>
                            </div>
                            <div className="pl-6 space-y-1 text-xs">
                              <div>
                                <span className="text-gray-600">Unit Cost:</span>
                                <span className="ml-2 font-semibold text-green-600">${part.unit_cost.toFixed(2)}</span>
                              </div>
                              {!part.dni && (
                                <>
                                  <div>
                                    <span className="text-gray-600">On Hand:</span>
                                    <span className="ml-2 text-gray-900">{part.stock_level}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-600">Min Stock:</span>
                                    <span className="ml-2 text-gray-900">{part.min_stock}</span>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Total template value (parts only)
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    ${totalCost.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateView;
