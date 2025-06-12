
import React, { useState } from 'react';
import { Plus, Package, Calendar, DollarSign } from 'lucide-react';

const PurchasesPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    equipment_type_id: '',
    base_id: '',
    quantity: '',
    unit_cost: '',
    supplier: '',
    purchase_date: new Date().toISOString().split('T')[0]
  });

  const [purchases] = useState([
    {
      id: 1,
      equipment_name: 'M4 Carbine',
      base_name: 'Fort Alpha',
      quantity: 50,
      unit_cost: 1200,
      total_cost: 60000,
      supplier: 'Defense Contractor Inc.',
      purchase_date: '2024-01-15',
      purchased_by_name: 'admin'
    },
    {
      id: 2,
      equipment_name: 'Night Vision Goggles',
      base_name: 'Base Bravo',
      quantity: 25,
      unit_cost: 3500,
      total_cost: 87500,
      supplier: 'Tactical Equipment Ltd.',
      purchase_date: '2024-01-10',
      purchased_by_name: 'commander'
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Purchase submitted:', formData);
    setShowForm(false);
    setFormData({
      equipment_type_id: '',
      base_id: '',
      quantity: '',
      unit_cost: '',
      supplier: '',
      purchase_date: new Date().toISOString().split('T')[0]
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Purchases</h1>
            <p className="text-gray-400">Manage equipment purchases and procurement records</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Purchase
          </button>
        </div>

        {/* Purchase Form */}
        {showForm && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">Record New Purchase</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Equipment Type
                </label>
                <select
                  name="equipment_type_id"
                  value={formData.equipment_type_id}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Equipment</option>
                  <option value="1">M4 Carbine</option>
                  <option value="2">Night Vision Goggles</option>
                  <option value="3">Body Armor</option>
                  <option value="4">Radio Set</option>
                  <option value="5">Medical Kit</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Base
                </label>
                <select
                  name="base_id"
                  value={formData.base_id}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Base</option>
                  <option value="1">Fort Alpha</option>
                  <option value="2">Base Bravo</option>
                  <option value="3">Outpost Charlie</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Unit Cost ($)
                </label>
                <input
                  type="number"
                  name="unit_cost"
                  value={formData.unit_cost}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Supplier
                </label>
                <input
                  type="text"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Purchase Date
                </label>
                <input
                  type="date"
                  name="purchase_date"
                  value={formData.purchase_date}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="md:col-span-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Record Purchase
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Purchase History */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white">Purchase History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-600">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Equipment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Base
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Unit Cost
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Total Cost
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Supplier
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Purchased By
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-600">
                {purchases.map((purchase) => (
                  <tr key={purchase.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Package className="h-5 w-5 text-green-400 mr-2" />
                        <span className="text-sm font-medium text-white">
                          {purchase.equipment_name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {purchase.base_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {purchase.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-green-400 mr-1" />
                        {purchase.unit_cost.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-green-400 mr-1" />
                        {purchase.total_cost.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {purchase.supplier}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-blue-400 mr-1" />
                        {new Date(purchase.purchase_date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {purchase.purchased_by_name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasesPage;
