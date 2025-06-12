
import React, { useState } from 'react';
import { Plus, ArrowUpRight, ArrowDownRight, Clock, CheckCircle, XCircle } from 'lucide-react';

const TransfersPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    asset_id: '',
    from_base_id: '',
    to_base_id: '',
    transfer_date: new Date().toISOString().split('T')[0],
    reason: ''
  });

  const [transfers] = useState([
    {
      id: 1,
      equipment_name: 'M4 Carbine',
      serial_number: 'MC-001',
      from_base_name: 'Fort Alpha',
      to_base_name: 'Base Bravo',
      transfer_date: '2024-01-20',
      reason: 'Unit redeployment',
      status: 'Completed',
      transferred_by_name: 'commander'
    },
    {
      id: 2,
      equipment_name: 'Night Vision Goggles',
      serial_number: 'NVG-015',
      from_base_name: 'Base Bravo',
      to_base_name: 'Outpost Charlie',
      transfer_date: '2024-01-18',
      reason: 'Mission requirement',
      status: 'Pending',
      transferred_by_name: 'logistics'
    },
    {
      id: 3,
      equipment_name: 'Radio Set',
      serial_number: 'RS-042',
      from_base_name: 'Outpost Charlie',
      to_base_name: 'Fort Alpha',
      transfer_date: '2024-01-15',
      reason: 'Equipment upgrade',
      status: 'Cancelled',
      transferred_by_name: 'admin'
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Transfer submitted:', formData);
    setShowForm(false);
    setFormData({
      asset_id: '',
      from_base_id: '',
      to_base_id: '',
      transfer_date: new Date().toISOString().split('T')[0],
      reason: ''
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'Pending':
        return <Clock className="h-5 w-5 text-yellow-400" />;
      case 'Cancelled':
        return <XCircle className="h-5 w-5 text-red-400" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'text-green-400 bg-green-900';
      case 'Pending':
        return 'text-yellow-400 bg-yellow-900';
      case 'Cancelled':
        return 'text-red-400 bg-red-900';
      default:
        return 'text-gray-400 bg-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Asset Transfers</h1>
            <p className="text-gray-400">Manage asset transfers between bases</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Transfer
          </button>
        </div>

        {/* Transfer Form */}
        {showForm && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">Create New Transfer</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Asset
                </label>
                <select
                  name="asset_id"
                  value={formData.asset_id}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Asset</option>
                  <option value="1">M4 Carbine - MC-002</option>
                  <option value="2">Night Vision Goggles - NVG-016</option>
                  <option value="3">Body Armor - BA-025</option>
                  <option value="4">Radio Set - RS-043</option>
                  <option value="5">Medical Kit - MK-008</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  From Base
                </label>
                <select
                  name="from_base_id"
                  value={formData.from_base_id}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Source Base</option>
                  <option value="1">Fort Alpha</option>
                  <option value="2">Base Bravo</option>
                  <option value="3">Outpost Charlie</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  To Base
                </label>
                <select
                  name="to_base_id"
                  value={formData.to_base_id}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Destination Base</option>
                  <option value="1">Fort Alpha</option>
                  <option value="2">Base Bravo</option>
                  <option value="3">Outpost Charlie</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Transfer Date
                </label>
                <input
                  type="date"
                  name="transfer_date"
                  value={formData.transfer_date}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Reason for Transfer
                </label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter reason for transfer..."
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
                  Create Transfer
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Transfer History */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white">Transfer History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-600">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Asset
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    From
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Reason
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Transferred By
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-600">
                {transfers.map((transfer) => (
                  <tr key={transfer.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">
                        {transfer.equipment_name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {transfer.serial_number}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <ArrowUpRight className="h-4 w-4 text-red-400 mr-2" />
                        <span className="text-sm text-white">{transfer.from_base_name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <ArrowDownRight className="h-4 w-4 text-green-400 mr-2" />
                        <span className="text-sm text-white">{transfer.to_base_name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {new Date(transfer.transfer_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-white max-w-xs truncate">
                      {transfer.reason}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transfer.status)}`}>
                        {getStatusIcon(transfer.status)}
                        <span className="ml-1">{transfer.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {transfer.transferred_by_name}
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

export default TransfersPage;
