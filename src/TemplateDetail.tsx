import React, { useState, useMemo } from 'react';
import { Search, Plus, Trash2, Package, X, ArrowLeft, Save, FileText, GripVertical } from 'lucide-react';

interface TemplateDetailProps {
  templateId?: number | null;
  onBack: () => void;
  onSave: (templateData: any) => void;
  onCreatePart?: (templateId: number) => void;
}

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
  },
  {
    id: 4,
    part_name: 'Transmission Filter',
    category: 'Loaders',
    equipment_name: 'CAT 950 Wheel Loader',
    equipment_id: 'LDR-023',
    part_number: 'TF-2024-008',
    supplier: 'Parker Hannifin',
    unit_cost: 32.75,
    stock_level: 0,
    min_stock: 2,
    dni: false
  },
  {
    id: 5,
    part_name: 'Hydraulic Pump Seal',
    category: 'Bulldozers',
    equipment_name: 'John Deere 650K Dozer',
    equipment_id: 'BUL-012',
    part_number: 'HS-2024-015',
    supplier: 'John Deere',
    unit_cost: 89.50,
    stock_level: 3,
    min_stock: 1,
    dni: false
  },
  {
    id: 6,
    part_name: 'Shop Towels',
    category: 'Supplies',
    equipment_name: 'General Use',
    equipment_id: 'N/A',
    part_number: 'ST-2024-001',
    supplier: 'Industrial Supply Co.',
    unit_cost: 24.99,
    stock_level: 15,
    min_stock: 10,
    dni: false
  }
];

const TemplateDetail: React.FC<TemplateDetailProps> = ({ templateId = null, onBack, onSave, onCreatePart }) => {
  const [templateData, setTemplateData] = useState({
    name: '',
    description: '',
    assigned_equipment_ids: [] as string[]
  });

  const [templateParts, setTemplateParts] = useState<any[]>([]);
  const [availableParts] = useState(mockParts);
  const [showAddPartsModal, setShowAddPartsModal] = useState(false);
  const [selectedParts, setSelectedParts] = useState<number[]>([]);
  const [partsFilter, setPartsFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const isEdit = !!templateId;

  const categories = ['Bulldozers', 'Compressors', 'Excavators', 'Generators', 'Loaders', 'Supplies'];

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

  const getTemplateCategory = () => {
    if (templateData.assigned_equipment_ids.length === 0) return 'Not Assigned';
    const firstEquipment = equipmentOptions.find(eq => eq.id === templateData.assigned_equipment_ids[0]);
    return firstEquipment?.category || 'Not Assigned';
  };

  React.useEffect(() => {
    if (templateId) {
      const mockTemplateData = {
        name: 'Excavator Standard Maintenance',
        description: 'Standard maintenance parts for all excavator models',
        assigned_equipment_ids: ['EXC-001', 'EXC-002'],
        parts: [mockParts[0]]
      };

      setTemplateData({
        name: mockTemplateData.name,
        description: mockTemplateData.description,
        assigned_equipment_ids: mockTemplateData.assigned_equipment_ids
      });
      setTemplateParts(mockTemplateData.parts);
    }
  }, [templateId]);

  const handleTemplateDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setTemplateData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const filteredAvailableParts = useMemo(() => {
    return availableParts.filter(part => {
      const matchesSearch = !partsFilter ||
        part.part_name.toLowerCase().includes(partsFilter.toLowerCase()) ||
        part.part_number.toLowerCase().includes(partsFilter.toLowerCase());

      const matchesCategory = !categoryFilter || part.category === categoryFilter;

      const notInTemplate = !templateParts.find(tp => tp.id === part.id);

      return matchesSearch && matchesCategory && notInTemplate;
    });
  }, [availableParts, partsFilter, categoryFilter, templateParts]);

  const handleAddPartsToTemplate = () => {
    const partsToAdd = selectedParts.map(partId => {
      const part = availableParts.find(p => p.id === partId);
      return { ...part };
    });

    setTemplateParts(prev => [...prev, ...partsToAdd]);
    setSelectedParts([]);
    setShowAddPartsModal(false);
    setPartsFilter('');
    setCategoryFilter('');
  };

  const handleRemovePartFromTemplate = (partId: number) => {
    setTemplateParts(prev => prev.filter(part => part.id !== partId));
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();

    if (draggedItem === null) return;

    const draggedPart = templateParts[draggedItem];
    const newParts = [...templateParts];

    newParts.splice(draggedItem, 1);
    newParts.splice(dropIndex, 0, draggedPart);

    setTemplateParts(newParts);
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handlePartSelection = (partId: number) => {
    setSelectedParts(prev => {
      if (prev.includes(partId)) {
        return prev.filter(id => id !== partId);
      } else {
        return [...prev, partId];
      }
    });
  };

  const validateTemplate = () => {
    const newErrors: Record<string, string> = {};

    if (!templateData.name.trim()) newErrors.name = 'Template name is required';
    if (templateData.assigned_equipment_ids.length === 0) newErrors.equipment = 'At least one equipment must be assigned';
    if (templateParts.length === 0) newErrors.parts = 'At least one part must be added to the template';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveTemplate = () => {
    if (!validateTemplate()) return;

    setLoading(true);
    setTimeout(() => {
      const templateToSave = {
        ...templateData,
        parts: templateParts,
        parts_count: templateParts.length
      };
      onSave(templateToSave);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <div className="flex-1 p-6 overflow-auto">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <button
              onClick={onBack}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <FileText className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              {isEdit ? 'Edit Template' : 'Create New Template'}
            </h1>
          </div>
          <p className="text-gray-600 ml-14">
            {isEdit ? 'Update template information and manage parts list' : 'Create a reusable parts list template for equipment maintenance'}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Template Information</h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Template Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={templateData.name}
                onChange={handleTemplateDataChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter template name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-blue-600 text-xs">(Auto-assigned from Equipment)</span>
              </label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm">
                {getTemplateCategory()}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={templateData.description}
              onChange={handleTemplateDataChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Enter template description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assigned Equipment IDs <span className="text-red-500">*</span>
            </label>
            {errors.equipment && (
              <p className="text-red-500 text-sm mb-2">{errors.equipment}</p>
            )}
            <div className="space-y-2 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-3">
              {categories.map(category => {
                const categoryEquipment = equipmentOptions.filter(eq => eq.category === category);
                if (categoryEquipment.length === 0) return null;

                return (
                  <div key={category} className="mb-4 last:mb-0">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">{category}</h3>
                    <div className="space-y-1">
                      {categoryEquipment.map(equipment => (
                        <label key={equipment.id} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                          <input
                            type="checkbox"
                            checked={templateData.assigned_equipment_ids.includes(equipment.id)}
                            onChange={(e) => {
                              const currentCategory = getTemplateCategory();

                              if (e.target.checked) {
                                if (currentCategory !== 'Not Assigned' && currentCategory !== equipment.category) {
                                  alert(`You can only assign equipment from the same category. Current category: ${currentCategory}`);
                                  return;
                                }
                                setTemplateData(prev => ({
                                  ...prev,
                                  assigned_equipment_ids: [...prev.assigned_equipment_ids, equipment.id]
                                }));
                              } else {
                                setTemplateData(prev => ({
                                  ...prev,
                                  assigned_equipment_ids: prev.assigned_equipment_ids.filter(id => id !== equipment.id)
                                }));
                              }
                            }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-900">
                            {equipment.name} <span className="text-gray-500 font-mono text-xs">({equipment.id})</span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Select one or more equipment. All equipment must be from the same category.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Template Parts</h2>
              <p className="text-sm text-gray-600">Parts included in this template ({templateParts.length} parts)</p>
            </div>
            <div className="flex items-center gap-2">
              {onCreatePart && templateId && (
                <button
                  onClick={() => onCreatePart(templateId)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create New Part</span>
                </button>
              )}
              <button
                onClick={() => setShowAddPartsModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Existing Parts</span>
              </button>
            </div>
          </div>

          {errors.parts && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{errors.parts}</p>
            </div>
          )}

          {templateParts.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No parts added yet</h3>
              <p className="text-gray-600 mb-4">Add parts to this template.</p>
              <button
                onClick={() => setShowAddPartsModal(true)}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Parts</span>
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 w-8"></th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Part Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Part Number</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Unit Cost</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {templateParts.map((part, index) => (
                    <tr
                      key={part.id}
                      className={`transition-colors ${
                        draggedItem === index ? 'opacity-50' : 'hover:bg-gray-50'
                      }`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, index)}
                      onDragEnd={handleDragEnd}
                    >
                      <td className="py-3 px-4">
                        <div className="cursor-move text-gray-400 hover:text-gray-600">
                          <GripVertical className="h-4 w-4" />
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-medium text-gray-900">{part.part_name}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-mono text-gray-700">{part.part_number}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {part.category}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-medium text-green-600">${part.unit_cost.toFixed(2)}</span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleRemovePartFromTemplate(part.id)}
                          className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove from template"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={onBack}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
          >
            <X className="h-4 w-4" />
            Cancel
          </button>
          <button
            onClick={handleSaveTemplate}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Save className="h-4 w-4" />
            {loading ? 'Saving...' : (isEdit ? 'Update Template' : 'Save Template')}
          </button>
        </div>

        {showAddPartsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Add Parts to Template</h2>
                <button
                  onClick={() => {
                    setShowAddPartsModal(false);
                    setSelectedParts([]);
                    setPartsFilter('');
                    setCategoryFilter('');
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search parts..."
                      value={partsFilter}
                      onChange={(e) => setPartsFilter(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white min-w-[160px]"
                  >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                {selectedParts.length > 0 && (
                  <p className="text-sm text-gray-600 mt-2">{selectedParts.length} parts selected</p>
                )}
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {filteredAvailableParts.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No parts available to add.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredAvailableParts.map(part => (
                      <div
                        key={part.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedParts.includes(part.id)
                            ? 'border-blue-300 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handlePartSelection(part.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={selectedParts.includes(part.id)}
                            onChange={() => handlePartSelection(part.id)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-sm font-medium text-gray-900">{part.part_name}</h3>
                                <p className="text-xs text-gray-500">{part.part_number} • {part.supplier}</p>
                              </div>
                              <div className="text-right">
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {part.category}
                                </span>
                                <p className="text-sm font-medium text-green-600 mt-1">${part.unit_cost.toFixed(2)}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowAddPartsModal(false);
                    setSelectedParts([]);
                    setPartsFilter('');
                    setCategoryFilter('');
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPartsToTemplate}
                  disabled={selectedParts.length === 0}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
                >
                  Add {selectedParts.length} Part{selectedParts.length !== 1 ? 's' : ''} to Template
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateDetail;
