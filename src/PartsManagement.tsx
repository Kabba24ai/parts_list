import React, { useState, useMemo } from 'react';
import { Search, Plus, Eye, Trash2, Package, CreditCard as Edit, X, ArrowLeft, Save, AlertCircle, DollarSign, Building2 } from 'lucide-react';
import SupplierSearch from './SupplierSearch';

// Master Parts List Component
const PartsManagement = ({ onCreatePart, onEditPart, onViewPart }) => {
  const [parts, setParts] = useState([
    {
      id: 3,
      part_name: 'Air Filter Element',
      category: 'Compressors',
      equipment_name: 'Atlas Copco GA30',
      equipment_id: 'CMP-078',
      equipment_items: [
        { name: 'Atlas Copco GA30', id: 'CMP-078' }
      ],
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
      equipment_items: [
        { name: 'CAT 320D Excavator', id: 'EXC-001' },
        { name: 'CAT 330F', id: 'EXC-003' },
        { name: 'Komatsu PC200', id: 'EXC-004' }
      ],
      part_number: 'CHH-2024-001',
      supplier: 'Parker Hannifin',
      unit_cost: 125.00,
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
      equipment_items: [
        { name: 'Atlas Copco GA30', id: 'CMP-078' },
        { name: 'Ingersoll Rand R55', id: 'CMP-079' }
      ],
      part_number: 'CWH-2024-004',
      supplier: 'Atlas Copco',
      unit_cost: 450.00,
      stock_level: 0,
      min_stock: 0,
      dni: true
    },
    {
      id: 2,
      part_name: 'Engine Oil Filter',
      category: 'Generators',
      equipment_name: 'Kohler 150kW Generator',
      equipment_id: 'GEN-045',
      equipment_items: [
        { name: 'Kohler 150kW Generator', id: 'GEN-045' },
        { name: 'Cummins 200kW Generator', id: 'GEN-046' }
      ],
      part_number: 'OF-2024-005',
      supplier: 'Kohler Power',
      unit_cost: 28.50,
      stock_level: 8,
      min_stock: 3,
      dni: false
    },
    {
      id: 8,
      part_name: 'Heavy Duty Cleaner',
      category: 'Supplies',
      equipment_name: 'General Use',
      equipment_id: 'N/A',
      equipment_items: [
        { name: 'General Use', id: 'N/A' }
      ],
      part_number: 'CL-2024-007',
      supplier: 'Simple Green',
      unit_cost: 12.50,
      stock_level: 0,
      min_stock: 3,
      dni: false
    },
    {
      id: 1,
      part_name: 'Hydraulic Filter',
      category: 'Excavators',
      equipment_name: 'CAT 320D Excavator',
      equipment_id: 'EXC-001',
      equipment_items: [
        { name: 'CAT 320D Excavator', id: 'EXC-001' },
        { name: 'CAT 330F', id: 'EXC-003' },
        { name: 'Komatsu PC200', id: 'EXC-004' }
      ],
      part_number: 'HF-2024-001',
      supplier: 'Caterpillar Inc.',
      unit_cost: 45.99,
      stock_level: 12,
      min_stock: 5,
      dni: false
    },
    {
      id: 5,
      part_name: 'Hydraulic Pump Seal',
      category: 'Bulldozers',
      equipment_name: 'John Deere 650K Dozer',
      equipment_id: 'BUL-012',
      equipment_items: [
        { name: 'John Deere 650K Dozer', id: 'BUL-012' }
      ],
      part_number: 'HS-2024-015',
      supplier: 'John Deere',
      unit_cost: 89.50,
      stock_level: 3,
      min_stock: 1,
      dni: false
    },
    {
      id: 7,
      part_name: 'Multi-Purpose Grease',
      category: 'Supplies',
      equipment_name: 'General Use',
      equipment_id: 'N/A',
      equipment_items: [
        { name: 'General Use', id: 'N/A' }
      ],
      part_number: 'GR-2024-003',
      supplier: 'Mobil 1',
      unit_cost: 8.75,
      stock_level: 3,
      min_stock: 5,
      dni: false
    },
    {
      id: 11,
      part_name: 'Rebuilt Transmission',
      category: 'Loaders',
      equipment_name: 'CAT 950 Wheel Loader',
      equipment_id: 'LDR-023',
      equipment_items: [
        { name: 'CAT 950 Wheel Loader', id: 'LDR-023' },
        { name: 'John Deere 644K Loader', id: 'LDR-024' }
      ],
      part_number: 'RT-2024-003',
      supplier: 'Caterpillar Inc.',
      unit_cost: 8500.00,
      stock_level: 0,
      min_stock: 0,
      dni: true
    },
    {
      id: 6,
      part_name: 'Shop Towels',
      category: 'Supplies',
      equipment_name: 'General Use',
      equipment_id: 'N/A',
      equipment_items: [
        { name: 'General Use', id: 'N/A' }
      ],
      part_number: 'ST-2024-001',
      supplier: 'Industrial Supply Co.',
      unit_cost: 24.99,
      stock_level: 15,
      min_stock: 10,
      dni: false
    },
    {
      id: 10,
      part_name: 'Specialty Engine Part',
      category: 'Generators',
      equipment_name: 'Kohler 150kW Generator',
      equipment_id: 'GEN-045',
      equipment_items: [
        { name: 'Kohler 150kW Generator', id: 'GEN-045' }
      ],
      part_number: 'SEP-2024-002',
      supplier: 'Kohler Power',
      unit_cost: 750.00,
      stock_level: 0,
      min_stock: 0,
      dni: true
    },
    {
      id: 4,
      part_name: 'Transmission Filter',
      category: 'Loaders',
      equipment_name: 'CAT 950 Wheel Loader',
      equipment_id: 'LDR-023',
      equipment_items: [
        { name: 'CAT 950 Wheel Loader', id: 'LDR-023' },
        { name: 'John Deere 644K Loader', id: 'LDR-024' }
      ],
      part_number: 'TF-2024-008',
      supplier: 'Parker Hannifin',
      unit_cost: 32.75,
      stock_level: 0,
      min_stock: 2,
      dni: false
    }
  ]);

  const [filters, setFilters] = useState({
    search: '',
    category: '',
    equipmentId: '',
    stockStatus: ''
  });

  const [showStockModal, setShowStockModal] = useState(false);
  const [editingPart, setEditingPart] = useState(null);
  const [newStockLevel, setNewStockLevel] = useState('');
  const [showSupplierSearch, setShowSupplierSearch] = useState(false);

  const categories = ['Bulldozers', 'Compressors', 'Excavators', 'Generators', 'Loaders', 'Supplies'];
  const equipmentOptions = [
    { id: 'CMP-078', name: 'Atlas Copco GA30' },
    { id: 'EXC-001', name: 'CAT 320D Excavator' },
    { id: 'LDR-023', name: 'CAT 950 Wheel Loader' },
    { id: 'BUL-013', name: 'CAT D6T Dozer' },
    { id: 'GEN-046', name: 'Cummins 200kW Generator' },
    { id: 'N/A', name: 'General Use (Supplies)' },
    { id: 'CMP-079', name: 'Ingersoll Rand R55' },
    { id: 'EXC-002', name: 'John Deere 350G Excavator' },
    { id: 'LDR-024', name: 'John Deere 644K Loader' },
    { id: 'BUL-012', name: 'John Deere 650K Dozer' },
    { id: 'GEN-045', name: 'Kohler 150kW Generator' }
  ];

  const getStockStatus = (part) => {
    if (part.dni) return 'dni';
    if (part.stock_level === 0) return 'out-of-stock';
    if (part.stock_level < part.min_stock) return 'buy-now';
    return 'in-stock';
  };

  const getStockBadge = (part) => {
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

  const filteredParts = useMemo(() => {
    const filtered = parts.filter(part => {
      const matchesSearch = !filters.search ||
        part.part_name.toLowerCase().includes(filters.search.toLowerCase()) ||
        part.part_number.toLowerCase().includes(filters.search.toLowerCase()) ||
        part.equipment_name.toLowerCase().includes(filters.search.toLowerCase()) ||
        part.supplier.toLowerCase().includes(filters.search.toLowerCase());

      const matchesCategory = !filters.category || part.category === filters.category;
      const matchesEquipmentId = !filters.equipmentId || part.equipment_id === filters.equipmentId;

      let matchesStockStatus = true;
      if (filters.stockStatus) {
        const stockStatus = getStockStatus(part);
        matchesStockStatus = stockStatus === filters.stockStatus;
      }

      return matchesSearch && matchesCategory && matchesEquipmentId && matchesStockStatus;
    });

    // Sort by: Category (alphabetical), then Equipment Name, then Part Name
    return filtered.sort((a, b) => {
      // First, sort by category
      const categoryCompare = a.category.localeCompare(b.category);
      if (categoryCompare !== 0) return categoryCompare;

      // Then, sort by equipment name
      const equipmentCompare = a.equipment_name.localeCompare(b.equipment_name);
      if (equipmentCompare !== 0) return equipmentCompare;

      // Finally, sort by part name
      return a.part_name.localeCompare(b.part_name);
    });
  }, [parts, filters]);

  const stats = useMemo(() => {
    return parts.reduce((acc, part) => {
      const stockStatus = getStockStatus(part);
      acc[stockStatus] = (acc[stockStatus] || 0) + 1;
      acc.total = (acc.total || 0) + 1;
      return acc;
    }, {});
  }, [parts]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ search: '', category: '', equipmentId: '', stockStatus: '' });
  };

  const handleStockClick = (part) => {
    if (part.dni) return;
    setEditingPart(part);
    setNewStockLevel(part.stock_level.toString());
    setShowStockModal(true);
  };

  const closeStockModal = () => {
    setShowStockModal(false);
    setEditingPart(null);
    setNewStockLevel('');
  };

  const updateStock = () => {
    if (editingPart && newStockLevel !== '') {
      const updatedStock = parseInt(newStockLevel, 10);
      if (!isNaN(updatedStock) && updatedStock >= 0) {
        setParts(prev => prev.map(part =>
          part.id === editingPart.id
            ? { ...part, stock_level: updatedStock }
            : part
        ));
        closeStockModal();
      }
    }
  };

  const handleViewPart = (partId) => {
    onViewPart?.(partId) || alert(`Navigating to Part Details for Part ID: ${partId}`);
  };

  const handleEditPart = (partId) => {
    onEditPart?.(partId) || alert(`Opening Edit Part form for Part ID: ${partId}`);
  };

  const handleDeletePart = (partId, partName) => {
    if (window.confirm(`Are you sure you want to delete "${partName}"? This action cannot be undone.`)) {
      setParts(prev => prev.filter(part => part.id !== partId));
      alert(`Part "${partName}" has been deleted.`);
    }
  };

  const handleCreatePart = () => {
    onCreatePart?.() || alert('Navigate to Create Part form');
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <div className="flex-1 p-6 overflow-auto">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <Package className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Parts Management</h1>
          </div>
          <p className="text-gray-600">Manage parts inventory across all equipment</p>
        </div>

        <div className="grid grid-cols-5 gap-4 mb-6">
          <button
            onClick={() => handleFilterChange('stockStatus', '')}
            className={`bg-white rounded-xl p-4 shadow-sm border transition-all hover:shadow-md ${
              filters.stockStatus === '' ? 'border-gray-400 bg-gray-50' : 'border-gray-100 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Total</p>
                <p className="text-2xl font-bold text-gray-700 mt-1">{stats.total || 0}</p>
              </div>
              <Package className="h-6 w-6 text-gray-600 opacity-80" />
            </div>
          </button>

          <button
            onClick={() => handleFilterChange('stockStatus', filters.stockStatus === 'in-stock' ? '' : 'in-stock')}
            className={`bg-white rounded-xl p-4 shadow-sm border transition-all hover:shadow-md ${
              filters.stockStatus === 'in-stock' ? 'border-green-300 bg-green-50' : 'border-gray-100 hover:border-green-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">In Stock</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{stats['in-stock'] || 0}</p>
              </div>
              <Package className="h-6 w-6 text-green-600 opacity-80" />
            </div>
          </button>

          <button
            onClick={() => handleFilterChange('stockStatus', filters.stockStatus === 'buy-now' ? '' : 'buy-now')}
            className={`bg-white rounded-xl p-4 shadow-sm border transition-all hover:shadow-md ${
              filters.stockStatus === 'buy-now' ? 'border-yellow-300 bg-yellow-50' : 'border-gray-100 hover:border-yellow-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Buy Now</p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">{stats['buy-now'] || 0}</p>
              </div>
              <Package className="h-6 w-6 text-yellow-600 opacity-80" />
            </div>
          </button>

          <button
            onClick={() => handleFilterChange('stockStatus', filters.stockStatus === 'out-of-stock' ? '' : 'out-of-stock')}
            className={`bg-white rounded-xl p-4 shadow-sm border transition-all hover:shadow-md ${
              filters.stockStatus === 'out-of-stock' ? 'border-red-300 bg-red-50' : 'border-gray-100 hover:border-red-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600 mt-1">{stats['out-of-stock'] || 0}</p>
              </div>
              <Package className="h-6 w-6 text-red-600 opacity-80" />
            </div>
          </button>

          <button
            onClick={() => handleFilterChange('stockStatus', filters.stockStatus === 'dni' ? '' : 'dni')}
            className={`bg-white rounded-xl p-4 shadow-sm border transition-all hover:shadow-md ${
              filters.stockStatus === 'dni' ? 'border-gray-400 bg-gray-50' : 'border-gray-100 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">DNI</p>
                <p className="text-2xl font-bold text-gray-700 mt-1">{stats['dni'] || 0}</p>
              </div>
              <Package className="h-6 w-6 text-gray-600 opacity-80" />
            </div>
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search parts, equipment, suppliers..."
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

              <select
                value={filters.equipmentId}
                onChange={(e) => handleFilterChange('equipmentId', e.target.value)}
                className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white min-w-[200px]"
              >
                <option value="">All Equipment</option>
                {equipmentOptions.map(equipment => (
                  <option key={equipment.id} value={equipment.id}>
                    {equipment.name} - {equipment.id}
                  </option>
                ))}
              </select>

              <button
                onClick={() => handleFilterChange('category', filters.category === 'Supplies' ? '' : 'Supplies')}
                className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                  filters.category === 'Supplies'
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                Quick: Supplies
              </button>

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

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowSupplierSearch(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg font-medium transition-colors flex-shrink-0"
              >
                <Building2 className="h-4 w-4" />
                <span>Supplier Search</span>
              </button>

              <button
                onClick={handleCreatePart}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex-shrink-0"
              >
                <Plus className="h-4 w-4" />
                <span>Add Part</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Part Name</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Category</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Equipment Name</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-700">Equipment ID</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Part Number</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Supplier</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-700">Unit Cost</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-700">Stock</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredParts.map((part) => {
                  const stockBadge = getStockBadge(part);
                  return (
                    <tr key={part.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <span className="text-sm font-medium text-gray-900">{part.part_name}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-900">{part.category}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-900">
                          {part.equipment_items && part.equipment_items.length > 0 ? (
                            <>
                              {part.equipment_items[0].name}
                              {part.equipment_items.length > 1 && <span className="text-blue-600 font-semibold ml-1">+</span>}
                            </>
                          ) : (
                            part.equipment_name
                          )}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-mono font-medium bg-gray-100 text-gray-800 border">
                          {part.equipment_id}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm font-mono text-gray-900">{part.part_number}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-900">{part.supplier}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-sm font-medium text-green-600">${part.unit_cost.toFixed(2)}</span>
                      </td>
                      <td className="py-3 px-3">
                        {part.dni ? (
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${stockBadge.className}`}>
                            {stockBadge.text}
                          </span>
                        ) : (
                          <button
                            onClick={() => handleStockClick(part)}
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border cursor-pointer hover:opacity-80 transition-opacity ${stockBadge.className}`}
                            title="Click to update stock level"
                          >
                            {stockBadge.text}
                          </button>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleViewPart(part.id)}
                            className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Part Details"
                          >
                            <Eye className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => handleEditPart(part.id)}
                            className="p-1 text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50 rounded-lg transition-colors"
                            title="Edit Part"
                          >
                            <Edit className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => handleDeletePart(part.id, part.part_name)}
                            className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Part"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredParts.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No parts found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or add new parts.</p>
              <button
                onClick={handleCreatePart}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Part</span>
              </button>
            </div>
          )}
        </div>

        {showStockModal && editingPart && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Update Stock</h2>
                <button
                  onClick={closeStockModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-1">{editingPart.part_name}</p>
                <p className="text-xs text-gray-500">{editingPart.part_number}</p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity on Hand
                </label>
                <input
                  type="number"
                  min="0"
                  value={newStockLevel}
                  onChange={(e) => setNewStockLevel(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-lg font-medium"
                  placeholder="0"
                  autoFocus
                />
                <p className="text-xs text-gray-500 mt-1">
                  Minimum stock: {editingPart.min_stock}
                </p>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={closeStockModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={updateStock}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}

        {showSupplierSearch && (
          <SupplierSearch
            onClose={() => setShowSupplierSearch(false)}
            onViewPart={onViewPart}
          />
        )}
      </div>
    </div>
  );
};

export default PartsManagement;
