
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { dashboardAPI } from '../services/api';
import MetricCard from '../components/UI/MetricCard';
import Modal from '../components/UI/Modal';
import { 
  TrendingUp, 
  Package, 
  ArrowUpRight, 
  ArrowDownRight, 
  Users, 
  AlertTriangle,
  Calendar,
  Building,
  Filter
} from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState({});
  const [netMovementDetails, setNetMovementDetails] = useState(null);
  const [showNetMovementModal, setShowNetMovementModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    date_from: '',
    date_to: '',
    base_id: '',
    equipment_type: ''
  });

  useEffect(() => {
    fetchMetrics();
  }, [filters]);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const response = await dashboardAPI.getMetrics(filters);
      setMetrics(response.data);
    } catch (error) {
      console.error('Error fetching metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNetMovementClick = async () => {
    try {
      const response = await dashboardAPI.getNetMovementDetails(filters);
      setNetMovementDetails(response.data);
      setShowNetMovementModal(true);
    } catch (error) {
      console.error('Error fetching net movement details:', error);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const resetFilters = () => {
    setFilters({
      date_from: '',
      date_to: '',
      base_id: '',
      equipment_type: ''
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">
            Welcome back, {user?.username}. Here's your asset overview.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
          <div className="flex items-center mb-4">
            <Filter className="h-5 w-5 text-green-400 mr-2" />
            <h2 className="text-lg font-medium text-white">Filters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                From Date
              </label>
              <input
                type="date"
                name="date_from"
                value={filters.date_from}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                To Date
              </label>
              <input
                type="date"
                name="date_to"
                value={filters.date_to}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Base
              </label>
              <select
                name="base_id"
                value={filters.base_id}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">All Bases</option>
                <option value="1">Fort Alpha</option>
                <option value="2">Base Bravo</option>
                <option value="3">Outpost Charlie</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <MetricCard
            title="Opening Balance"
            value={metrics.openingBalance || 0}
            icon={Package}
            color="blue"
          />
          <MetricCard
            title="Closing Balance"
            value={metrics.closingBalance || 0}
            icon={Package}
            color="green"
          />
          <MetricCard
            title="Net Movement"
            value={metrics.netMovement || 0}
            subtitle="Click for details"
            icon={TrendingUp}
            color="purple"
            onClick={handleNetMovementClick}
          />
          <MetricCard
            title="Assigned Assets"
            value={metrics.assigned || 0}
            icon={Users}
            color="yellow"
          />
          <MetricCard
            title="Expended Assets"
            value={metrics.expended || 0}
            icon={AlertTriangle}
            color="red"
          />
          <MetricCard
            title="Total Purchases"
            value={metrics.purchases || 0}
            subtitle={`$${(metrics.purchasesCost || 0).toLocaleString()}`}
            icon={ArrowUpRight}
            color="green"
          />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-white mb-4 flex items-center">
              <ArrowUpRight className="h-5 w-5 text-green-400 mr-2" />
              Transfers In
            </h3>
            <div className="text-3xl font-bold text-green-400">
              {metrics.transfersIn || 0}
            </div>
            <p className="text-gray-400 text-sm mt-1">Assets received</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-white mb-4 flex items-center">
              <ArrowDownRight className="h-5 w-5 text-red-400 mr-2" />
              Transfers Out
            </h3>
            <div className="text-3xl font-bold text-red-400">
              {metrics.transfersOut || 0}
            </div>
            <p className="text-gray-400 text-sm mt-1">Assets sent</p>
          </div>
        </div>

        {/* Net Movement Modal */}
        <Modal
          isOpen={showNetMovementModal}
          onClose={() => setShowNetMovementModal(false)}
          title="Net Movement Details"
          size="xl"
        >
          {netMovementDetails && (
            <div className="space-y-6">
              {/* Purchases */}
              <div>
                <h4 className="text-lg font-medium text-white mb-3 flex items-center">
                  <Package className="h-5 w-5 text-green-400 mr-2" />
                  Purchases ({netMovementDetails.purchases?.length || 0})
                </h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-600">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Equipment
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Cost
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-600">
                      {netMovementDetails.purchases?.map((purchase, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                            {purchase.equipment_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                            {purchase.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                            ${purchase.total_cost?.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                            {new Date(purchase.purchase_date).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Transfers In */}
              <div>
                <h4 className="text-lg font-medium text-white mb-3 flex items-center">
                  <ArrowUpRight className="h-5 w-5 text-green-400 mr-2" />
                  Transfers In ({netMovementDetails.transfersIn?.length || 0})
                </h4>
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
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-600">
                      {netMovementDetails.transfersIn?.map((transfer, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                            {transfer.equipment_name} ({transfer.serial_number})
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                            {transfer.from_base_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                            {new Date(transfer.transfer_date).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Transfers Out */}
              <div>
                <h4 className="text-lg font-medium text-white mb-3 flex items-center">
                  <ArrowDownRight className="h-5 w-5 text-red-400 mr-2" />
                  Transfers Out ({netMovementDetails.transfersOut?.length || 0})
                </h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-600">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Asset
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          To
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-600">
                      {netMovementDetails.transfersOut?.map((transfer, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                            {transfer.equipment_name} ({transfer.serial_number})
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                            {transfer.to_base_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                            {new Date(transfer.transfer_date).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default DashboardPage;
