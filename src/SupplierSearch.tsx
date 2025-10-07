import React, { useState, useMemo } from 'react';
import { Search, X, Package, Phone, Mail, MapPin, Building2, User } from 'lucide-react';

interface Supplier {
  name: string;
  address: string;
  phone: string;
  contact: string;
  email: string;
}

interface Part {
  id: number;
  part_name: string;
  category: string;
  equipment_name: string;
  equipment_id: string;
  part_number: string;
  supplier: string;
  unit_cost: number;
  stock_level: number;
  min_stock: number;
  dni: boolean;
}

interface SupplierSearchProps {
  onClose: () => void;
  onViewPart?: (partId: number) => void;
}

const SupplierSearch: React.FC<SupplierSearchProps> = ({ onClose, onViewPart }) => {
  const suppliers: Supplier[] = [
    {
      name: 'Atlas Copco',
      address: '2200 Dagen Blvd, Rock Hill, SC 29730',
      phone: '(803) 817-7000',
      contact: 'Emma Davis',
      email: 'emma.davis@atlascopco.com'
    },
    {
      name: 'Caterpillar Inc.',
      address: '100 NE Adams St, Peoria, IL 61629',
      phone: '(309) 675-1000',
      contact: 'Mike Johnson',
      email: 'mike.johnson@cat.com'
    },
    {
      name: 'Industrial Supply Co.',
      address: '1500 Manufacturing Way, Detroit, MI 48201',
      phone: '(313) 555-0123',
      contact: 'Lisa Anderson',
      email: 'lisa.anderson@industrialsupply.com'
    },
    {
      name: 'John Deere',
      address: '1 John Deere Pl, Moline, IL 61265',
      phone: '(309) 765-8000',
      contact: 'Robert Chen',
      email: 'robert.chen@johndeere.com'
    },
    {
      name: 'Kohler Power',
      address: '444 Highland Dr, Kohler, WI 53044',
      phone: '(920) 457-4441',
      contact: 'Tom Rodriguez',
      email: 'tom.rodriguez@kohler.com'
    },
    {
      name: 'Mobil 1',
      address: '5959 Las Colinas Blvd, Irving, TX 75039',
      phone: '(972) 444-1000',
      contact: 'Jennifer Martinez',
      email: 'jennifer.martinez@mobil1.com'
    },
    {
      name: 'Parker Hannifin',
      address: '6035 Parkland Blvd, Cleveland, OH 44124',
      phone: '(216) 896-3000',
      contact: 'Sarah Williams',
      email: 'sarah.williams@parker.com'
    },
    {
      name: 'Simple Green',
      address: '15922 Pacific Coast Hwy, Huntington Beach, CA 92649',
      phone: '(714) 540-4200',
      contact: 'David Thompson',
      email: 'david.thompson@simplegreen.com'
    }
  ];

  const parts: Part[] = [
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
    },
    {
      id: 7,
      part_name: 'Multi-Purpose Grease',
      category: 'Supplies',
      equipment_name: 'General Use',
      equipment_id: 'N/A',
      part_number: 'GR-2024-003',
      supplier: 'Mobil 1',
      unit_cost: 8.75,
      stock_level: 3,
      min_stock: 5,
      dni: false
    },
    {
      id: 8,
      part_name: 'Heavy Duty Cleaner',
      category: 'Supplies',
      equipment_name: 'General Use',
      equipment_id: 'N/A',
      part_number: 'CL-2024-007',
      supplier: 'Simple Green',
      unit_cost: 12.50,
      stock_level: 0,
      min_stock: 3,
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
    },
    {
      id: 10,
      part_name: 'Specialty Engine Part',
      category: 'Generators',
      equipment_name: 'Kohler 150kW Generator',
      equipment_id: 'GEN-045',
      part_number: 'SEP-2024-002',
      supplier: 'Kohler Power',
      unit_cost: 750.00,
      stock_level: 0,
      min_stock: 0,
      dni: true
    },
    {
      id: 11,
      part_name: 'Rebuilt Transmission',
      category: 'Loaders',
      equipment_name: 'CAT 950 Wheel Loader',
      equipment_id: 'LDR-023',
      part_number: 'RT-2024-003',
      supplier: 'Caterpillar Inc.',
      unit_cost: 8500.00,
      stock_level: 0,
      min_stock: 0,
      dni: true
    },
    {
      id: 12,
      part_name: 'Custom Wiring Harness',
      category: 'Compressors',
      equipment_name: 'Atlas Copco GA30',
      equipment_id: 'CMP-078',
      part_number: 'CWH-2024-004',
      supplier: 'Atlas Copco',
      unit_cost: 450.00,
      stock_level: 0,
      min_stock: 0,
      dni: true
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);

  const filteredSuppliers = useMemo(() => {
    if (!searchTerm) return suppliers;

    const term = searchTerm.toLowerCase();
    return suppliers.filter(supplier =>
      supplier.name.toLowerCase().includes(term) ||
      supplier.contact.toLowerCase().includes(term) ||
      supplier.email.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  const supplierParts = useMemo(() => {
    if (!selectedSupplier) return [];

    return parts
      .filter(part => part.supplier === selectedSupplier)
      .sort((a, b) => {
        const categoryCompare = a.category.localeCompare(b.category);
        if (categoryCompare !== 0) return categoryCompare;

        const equipmentCompare = a.equipment_name.localeCompare(b.equipment_name);
        if (equipmentCompare !== 0) return equipmentCompare;

        return a.part_name.localeCompare(b.part_name);
      });
  }, [selectedSupplier]);

  const getStockBadge = (part: Part) => {
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

  const selectedSupplierInfo = suppliers.find(s => s.name === selectedSupplier);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Building2 className="h-8 w-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Supplier Search</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex">
          <div className="w-1/3 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search suppliers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredSuppliers.map((supplier) => (
                <button
                  key={supplier.name}
                  onClick={() => setSelectedSupplier(supplier.name)}
                  className={`w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    selectedSupplier === supplier.name ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                  }`}
                >
                  <div className="font-semibold text-gray-900 mb-1">{supplier.name}</div>
                  <div className="text-xs text-gray-600 space-y-0.5">
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {supplier.contact}
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-3 w-3 mr-1" />
                      {supplier.phone}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            {selectedSupplier ? (
              <>
                {selectedSupplierInfo && (
                  <div className="p-6 border-b border-gray-200 bg-gray-50">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{selectedSupplierInfo.name}</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-gray-600 font-medium">Address</div>
                          <div className="text-gray-900">{selectedSupplierInfo.address}</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <User className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-gray-600 font-medium">Contact</div>
                          <div className="text-gray-900">{selectedSupplierInfo.contact}</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Phone className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-gray-600 font-medium">Phone</div>
                          <div className="text-gray-900">{selectedSupplierInfo.phone}</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Mail className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-gray-600 font-medium">Email</div>
                          <div className="text-gray-900">{selectedSupplierInfo.email}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-4 border-b border-gray-200 bg-white">
                  <h4 className="font-semibold text-gray-900">
                    Parts from {selectedSupplier} ({supplierParts.length})
                  </h4>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  {supplierParts.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No parts found for this supplier.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {supplierParts.map((part) => {
                        const stockBadge = getStockBadge(part);
                        return (
                          <div
                            key={part.id}
                            className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <h5 className="font-semibold text-gray-900">{part.part_name}</h5>
                                <p className="text-sm text-gray-600">
                                  {part.equipment_name} <span className="text-gray-400">•</span> {part.category}
                                </p>
                              </div>
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${stockBadge.className}`}>
                                {stockBadge.text}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <div className="space-y-1">
                                <div className="text-gray-600">
                                  <span className="font-medium">Part #:</span> <span className="font-mono">{part.part_number}</span>
                                </div>
                                <div className="text-gray-600">
                                  <span className="font-medium">Equipment ID:</span> <span className="font-mono">{part.equipment_id}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-green-600">${part.unit_cost.toFixed(2)}</div>
                                {!part.dni && (
                                  <div className="text-xs text-gray-500">
                                    Stock: {part.stock_level} / Min: {part.min_stock}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-lg">Select a supplier to view parts</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupplierSearch;
