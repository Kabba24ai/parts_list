import React, { useState } from 'react';
import { ArrowLeft, Save, X, Package, DollarSign } from 'lucide-react';

interface PartDetailProps {
  partId?: number | null;
  templateId?: number | null;
  onBack: () => void;
  onSave: (partData: any) => void;
}

const PartDetail: React.FC<PartDetailProps> = ({ partId = null, templateId = null, onBack, onSave }) => {
  const [formData, setFormData] = useState({
    part_name: '',
    current_stock: '',
    min_stock: '',
    dni: false,
    description: '',
    general_supply_item: false,
    template_id: templateId || null,
    part_number_1: '',
    cost_1: '',
    supplier_1: '',
    part_number_2: '',
    cost_2: '',
    supplier_2: '',
    part_number_3: '',
    cost_3: '',
    supplier_3: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const isEdit = !!partId;

  const availableTemplates = [
    { id: 1, name: 'Excavator Standard Maintenance', category: 'Excavators' },
    { id: 2, name: 'Generator Maintenance Parts', category: 'Generators' },
    { id: 3, name: 'Compressor Service Kit', category: 'Compressors' },
    { id: 4, name: 'Loader Basic Parts', category: 'Loaders' },
    { id: 5, name: 'Dozer Maintenance Template', category: 'Bulldozers' },
    { id: 6, name: 'General Supplies', category: 'Supplies' }
  ];

  const suppliers = [
    {
      name: 'Caterpillar Inc.',
      address: '100 NE Adams St, Peoria, IL 61629',
      phone: '(309) 675-1000',
      contact: 'Mike Johnson',
      email: 'mike.johnson@cat.com'
    },
    {
      name: 'Parker Hannifin',
      address: '6035 Parkland Blvd, Cleveland, OH 44124',
      phone: '(216) 896-3000',
      contact: 'Sarah Williams',
      email: 'sarah.williams@parker.com'
    },
    {
      name: 'Kohler Power',
      address: '444 Highland Dr, Kohler, WI 53044',
      phone: '(920) 457-4441',
      contact: 'Tom Rodriguez',
      email: 'tom.rodriguez@kohler.com'
    },
    {
      name: 'Atlas Copco',
      address: '2200 Dagen Blvd, Rock Hill, SC 29730',
      phone: '(803) 817-7000',
      contact: 'Emma Davis',
      email: 'emma.davis@atlascopco.com'
    },
    {
      name: 'John Deere',
      address: '1 John Deere Pl, Moline, IL 61265',
      phone: '(309) 765-8000',
      contact: 'Robert Chen',
      email: 'robert.chen@johndeere.com'
    },
    {
      name: 'Industrial Supply Co.',
      address: '1500 Manufacturing Way, Detroit, MI 48201',
      phone: '(313) 555-0123',
      contact: 'Lisa Anderson',
      email: 'lisa.anderson@industrialsupply.com'
    }
  ];


  const [templateInfo, setTemplateInfo] = useState<any>(null);

  React.useEffect(() => {
    if (templateId) {
      const mockTemplate = {
        id: templateId,
        name: 'Excavator Standard Maintenance'
      };

      setTemplateInfo(mockTemplate);
      setFormData(prev => ({
        ...prev,
        template_id: templateId
      }));
    }
  }, [templateId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    if (name === 'dni' && checked) {
      setFormData(prev => ({
        ...prev,
        current_stock: '',
        min_stock: '',
        dni: true
      }));
    }

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.part_name.trim()) newErrors.part_name = 'Part name is required';

    if (!formData.dni) {
      if (formData.current_stock === '' || parseInt(formData.current_stock) < 0) newErrors.current_stock = 'Current stock must be 0 or greater';
      if (formData.min_stock === '' || parseInt(formData.min_stock) < 0) newErrors.min_stock = 'Minimum stock must be 0 or greater';
    }

    if (!formData.part_number_1.trim()) newErrors.part_number_1 = 'Primary part number is required';
    if (!formData.supplier_1) newErrors.supplier_1 = 'Primary supplier is required';
    if (!formData.cost_1 || parseFloat(formData.cost_1) <= 0) newErrors.cost_1 = 'Primary cost is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    setLoading(true);
    setTimeout(() => {
      onSave(formData);
      setLoading(false);
    }, 1000);
  };

  const getSelectedSupplier = (supplierName: string) => {
    return suppliers.find(sup => sup.name === supplierName);
  };

  const renderSupplierDetails = (supplierNumber: number) => {
    const supplierName = formData[`supplier_${supplierNumber}` as keyof typeof formData];
    const supplier = getSelectedSupplier(supplierName as string);

    if (!supplier) {
      return (
        <div className="w-full px-2 py-2 bg-gray-50 border border-gray-200 rounded text-gray-500 text-xs text-center h-20 flex items-center justify-center">
          Select supplier to view details
        </div>
      );
    }

    return (
      <div className="w-full px-2 py-2 bg-blue-50 border border-blue-200 rounded text-xs">
        <div className="font-medium text-blue-900 mb-1">{supplier.name}</div>
        <div className="space-y-0.5 text-blue-800">
          <div className="truncate">{supplier.address}</div>
          <div>{supplier.phone}</div>
          <div>{supplier.contact}</div>
        </div>
      </div>
    );
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
            <Package className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              {isEdit ? 'Edit Part' : 'Create New Part'}
            </h1>
          </div>
          <p className="text-gray-600 ml-14">
            {isEdit ? 'Update part information with alternative suppliers' : 'Add a new part with up to 3 alternative suppliers'}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="space-y-4">
            {templateInfo && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-blue-900">Adding part to template:</span>
                  <span className="text-sm text-blue-800">{templateInfo.name}</span>
                </div>
              </div>
            )}

            <div className="grid gap-4" style={{ gridTemplateColumns: '2fr 2fr 1fr 1fr 120px' }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Part Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="part_name"
                  value={formData.part_name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.part_name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter part name"
                />
                {errors.part_name && (
                  <p className="text-red-500 text-xs mt-1">{errors.part_name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assign to List
                  {templateId && <span className="text-blue-600 text-xs ml-2">(From Template)</span>}
                </label>
                {templateId ? (
                  <div className="w-full px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-gray-900 text-sm">
                    {templateInfo?.name || 'Loading...'}
                  </div>
                ) : (
                  <select
                    name="template_id"
                    value={formData.template_id || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="">None (Optional)</option>
                    {availableTemplates.map(template => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Stock {!formData.dni && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="number"
                  min="0"
                  name="current_stock"
                  value={formData.current_stock}
                  onChange={handleInputChange}
                  disabled={formData.dni}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    formData.dni ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white'
                  } ${
                    errors.current_stock ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={formData.dni ? 'N/A' : '0'}
                />
                {errors.current_stock && (
                  <p className="text-red-500 text-xs mt-1">{errors.current_stock}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Min Stock {!formData.dni && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="number"
                  min="0"
                  name="min_stock"
                  value={formData.min_stock}
                  onChange={handleInputChange}
                  disabled={formData.dni}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    formData.dni ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white'
                  } ${
                    errors.min_stock ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={formData.dni ? 'N/A' : '0'}
                />
                {errors.min_stock && (
                  <p className="text-red-500 text-xs mt-1">{errors.min_stock}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 whitespace-nowrap">Do Not Inventory</label>
                <div className="flex items-center h-10 px-3">
                  <input
                    type="checkbox"
                    name="dni"
                    checked={formData.dni}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                    title="Do Not Inventory - Check if this part is ordered as needed only"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={1}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Enter part description"
                />
              </div>
              <div className="flex items-center gap-2 pt-7">
                <input
                  type="checkbox"
                  id="general_supply_item"
                  name="general_supply_item"
                  checked={formData.general_supply_item}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="general_supply_item" className="text-sm font-medium text-gray-700 cursor-pointer whitespace-nowrap">
                  General Supply Item
                </label>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6" style={{ paddingTop: '30px', paddingBottom: '30px' }}>
              {[1, 2, 3].map(num => (
                <div key={num} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="space-y-4">
                    <div className="grid gap-3" style={{ gridTemplateColumns: '2.5fr 1fr' }}>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {num === 1 ? 'Part Number' : `Alt ${num - 1} Part Number`} {num === 1 && <span className="text-red-500">*</span>}
                        </label>
                        <input
                          type="text"
                          name={`part_number_${num}`}
                          value={formData[`part_number_${num}` as keyof typeof formData]}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors font-mono text-sm bg-white ${
                            errors[`part_number_${num}`] ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder={num === 1 ? 'Primary part number' : 'Alternative part number'}
                        />
                        {errors[`part_number_${num}`] && (
                          <p className="text-red-500 text-xs mt-1">{errors[`part_number_${num}`]}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Cost {num === 1 && <span className="text-red-500">*</span>}
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <input
                            type="number"
                            step="0.01"
                            max="1000000"
                            name={`cost_${num}`}
                            value={formData[`cost_${num}` as keyof typeof formData]}
                            onChange={handleInputChange}
                            className={`w-full pl-8 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white ${
                              errors[`cost_${num}`] ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="0.00"
                          />
                        </div>
                        {errors[`cost_${num}`] && (
                          <p className="text-red-500 text-xs mt-1">{errors[`cost_${num}`]}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {num === 1 ? 'Select Supplier' : 'Select Supplier'} {num === 1 && <span className="text-red-500">*</span>}
                      </label>
                      <select
                        name={`supplier_${num}`}
                        value={formData[`supplier_${num}` as keyof typeof formData]}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white ${
                          errors[`supplier_${num}`] ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">{num === 1 ? 'Select primary supplier' : 'Select alt supplier'}</option>
                        {suppliers.map(supplier => (
                          <option key={supplier.name} value={supplier.name}>{supplier.name}</option>
                        ))}
                      </select>
                      {errors[`supplier_${num}`] && (
                        <p className="text-red-500 text-xs mt-1">{errors[`supplier_${num}`]}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Supplier Details</label>
                      {renderSupplierDetails(num)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={onBack}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Save className="h-4 w-4" />
              {loading ? 'Saving...' : (isEdit ? 'Update Part' : 'Create Part')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartDetail;
