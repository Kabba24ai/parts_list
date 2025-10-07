import React, { useState } from 'react';
import { ArrowLeft, Package, DollarSign, Box, AlertCircle, Pencil, X, Check } from 'lucide-react';

interface PartViewProps {
  partId: number;
  onBack: () => void;
}

const PartView: React.FC<PartViewProps> = ({ partId, onBack }) => {
  const [editingPrice, setEditingPrice] = useState<number | null>(null);
  const [editedPrice, setEditedPrice] = useState<string>('');

  const mockPart = {
    id: partId,
    part_name: 'Hydraulic Filter',
    category: 'Excavators',
    equipment_items: [
      { name: 'CAT 320D Excavator', id: 'EXC-001' },
      { name: 'CAT 330F', id: 'EXC-003' },
      { name: 'Komatsu PC200', id: 'EXC-004' }
    ],
    description: 'High-performance hydraulic filter designed for heavy-duty excavator operations',
    general_supply_item: false,
    current_stock: 12,
    min_stock: 5,
    dni: false,
    part_numbers: [
      {
        part_number: 'HF-2024-001',
        cost: 45.99,
        supplier: 'Caterpillar Inc.',
        supplier_details: {
          address: '100 NE Adams St, Peoria, IL 61629',
          phone: '(309) 675-1000',
          contact: 'Mike Johnson',
          email: 'mike.johnson@cat.com'
        }
      },
      {
        part_number: 'HF-ALT-2024-001',
        cost: 42.50,
        supplier: 'Parker Hannifin',
        supplier_details: {
          address: '6035 Parkland Blvd, Cleveland, OH 44124',
          phone: '(216) 896-3000',
          contact: 'Sarah Williams',
          email: 'sarah.williams@parker.com'
        }
      },
      {
        part_number: 'HF-ALT2-2024-001',
        cost: 48.75,
        supplier: 'John Deere',
        supplier_details: {
          address: '1 John Deere Pl, Moline, IL 61265',
          phone: '(309) 765-8000',
          contact: 'Robert Chen',
          email: 'robert.chen@johndeere.com'
        }
      }
    ],
    template: 'Excavator Standard Maintenance'
  };

  const getStockBadge = () => {
    if (mockPart.dni) {
      return {
        text: 'DNI',
        className: 'text-gray-700 bg-gray-100 border-gray-200'
      };
    }
    if (mockPart.current_stock === 0) {
      return {
        text: 'Out of Stock',
        className: 'text-red-700 bg-red-100 border-red-200'
      };
    }
    if (mockPart.current_stock < mockPart.min_stock) {
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

  const stockBadge = getStockBadge();

  const handleEditPrice = (index: number, currentPrice: number) => {
    setEditingPrice(index);
    setEditedPrice(currentPrice.toString());
  };

  const handleSavePrice = (index: number) => {
    const price = parseFloat(editedPrice);
    if (!isNaN(price) && price > 0) {
      console.log(`Saving price for part number ${index}:`, price);
      alert(`Price updated to $${price.toFixed(2)}`);
      setEditingPrice(null);
      setEditedPrice('');
    }
  };

  const handleCancelEdit = () => {
    setEditingPrice(null);
    setEditedPrice('');
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {editingPrice !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-96">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Edit Price</h3>
              <button
                onClick={handleCancelEdit}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={editedPrice}
                  onChange={(e) => setEditedPrice(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                  placeholder="0.00"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSavePrice(editingPrice);
                    } else if (e.key === 'Escape') {
                      handleCancelEdit();
                    }
                  }}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCancelEdit}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSavePrice(editingPrice)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Check className="h-4 w-4" />
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-6">
          <div className="mb-6">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Parts</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
              <div className="flex items-center gap-3 mb-2">
                <Package className="h-8 w-8 text-white" />
                <h1 className="text-3xl font-bold text-white">{mockPart.part_name}</h1>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Inventory Status</h2>
                  <div className="space-y-4">
                    {!mockPart.dni && (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Current Stock</span>
                          <span className="text-lg font-bold text-gray-900">{mockPart.current_stock}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Minimum Stock</span>
                          <span className="text-lg font-bold text-gray-900">{mockPart.min_stock}</span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                      <span className="text-sm text-gray-600">Status</span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${stockBadge.className}`}>
                        {stockBadge.text}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Part Details</h2>
                  <div className="space-y-3">
                    {mockPart.description && (
                      <div>
                        <span className="text-sm text-gray-600 block mb-1">Description</span>
                        <p className="text-sm text-gray-900">{mockPart.description}</p>
                      </div>
                    )}
                    {mockPart.general_supply_item && (
                      <div className="flex items-center gap-2 pt-2">
                        <Box className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-600">General Supply Item</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Supplier Information</h2>
                <div className="grid grid-cols-3 gap-6">
                  {mockPart.part_numbers.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            {index === 0 ? 'Part Number' : `Alt ${index} Part Number`}
                          </label>
                          <p className="text-sm font-mono font-medium text-gray-900">{item.part_number}</p>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Cost</label>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-green-600" />
                            <p className="text-lg font-bold text-green-600">{item.cost.toFixed(2)}</p>
                            <button
                              onClick={() => handleEditPrice(index, item.cost)}
                              className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                              title="Edit price"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Supplier</label>
                          <p className="text-sm font-medium text-gray-900">{item.supplier}</p>
                        </div>

                        <div className="pt-3 border-t border-gray-200">
                          <label className="block text-xs font-medium text-gray-500 mb-2">Supplier Details</label>
                          <div className="space-y-2 text-xs text-gray-600">
                            <div>
                              <span className="font-medium">Address:</span>
                              <p className="mt-0.5">{item.supplier_details.address}</p>
                            </div>
                            <div>
                              <span className="font-medium">Phone:</span>
                              <p className="mt-0.5">{item.supplier_details.phone}</p>
                            </div>
                            <div>
                              <span className="font-medium">Contact:</span>
                              <p className="mt-0.5">{item.supplier_details.contact}</p>
                            </div>
                            <div>
                              <span className="font-medium">Email:</span>
                              <p className="mt-0.5">{item.supplier_details.email}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Part Assignment</h2>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <label className="block text-xs font-medium text-gray-500 mb-2">Category</label>
                    <p className="text-base font-medium text-gray-900">{mockPart.category}</p>
                  </div>
                  {mockPart.template && (
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <label className="block text-xs font-medium text-gray-500 mb-2">Parts List</label>
                      <p className="text-base font-medium text-gray-900">{mockPart.template}</p>
                    </div>
                  )}
                </div>
              </div>

              {mockPart.equipment_items && mockPart.equipment_items.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Equipment Assignment</h2>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Equipment Name</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Equipment ID</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {mockPart.equipment_items.map((item, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-mono font-medium bg-gray-100 text-gray-800 border">
                                {item.id}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartView;
