
import React, { useState } from 'react';
import { Plus, User, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';

const AssignmentsPage = () => {
  const [activeTab, setActiveTab] = useState('assignments');
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  const [showExpenditureForm, setShowExpenditureForm] = useState(false);
  
  const [assignmentData, setAssignmentData] = useState({
    asset_id: '',
    assigned_to: '',
    assignment_date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const [expenditureData, setExpenditureData] = useState({
    asset_id: '',
    reason: '',
    expenditure_date: new Date().toISOString().split('T')[0],
    description: ''
  });

  const [assignments] = useState([
    {
      id: 1,
      equipment_name: 'M4 Carbine',
      serial_number: 'MC-003',
      assigned_to: 'Sgt. Johnson',
      assigned_by_name: 'commander',
      assignment_date: '2024-01-22',
      status: 'Active',
      notes: 'Field operations deployment'
    },
    {
      id: 2,
      equipment_name: 'Night Vision Goggles',
      serial_number: 'NVG-017',
      assigned_to: 'Cpl. Smith',
      assigned_by_name: 'logistics',
      assignment_date: '2024-01-20',
      return_date: '2024-01-25',
      status: 'Returned',
      notes: 'Night patrol duty'
    }
  ]);

  const [expenditures] = useState([
    {
      id: 1,
      equipment_name: 'Body Armor',
      serial_number: 'BA-026',
      expended_by_name: 'admin',
      expenditure_date: '2024-01-18',
      reason: 'Combat Loss',
      description: 'Damaged beyond repair during training exercise'
    },
    {
      id: 2,
      equipment_name: 'Medical Kit',
      serial_number: 'MK-009',
      expended_by_name: 'commander',
      expenditure_date: '2024-01-15',
      reason: 'Consumed',
      description: 'Medical supplies used in emergency response'
    }
  ]);

  const handleAssignmentSubmit = (e) => {
    e.preventDefault();
    console.log('Assignment submitted:', assignmentData);
    setShowAssignmentForm(false);
    setAssignmentData({
      asset_id: '',
      assigned_to: '',
      assignment_date: new Date().toISOString().split('T')[0],
      notes: ''
    });
  };

  const handleExpenditureSubmit = (e) => {
    e.preventDefault();
    console.log('Expenditure submitted:', expenditureData);
    setShowExpenditureForm(false);
    setExpenditureData({
      asset_id: '',
      reason: '',
      expenditure_date: new Date().toISOString().split('T')[0],
      description: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Assignments & Expenditures</h1>
            <p className="text-gray-400">Manage asset assignments to personnel and track expenditures</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowAssignmentForm(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Assignment
            </button>
            <button
              onClick={() => setShowExpenditureForm(true)}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Record Expenditure
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('assignments')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'assignments'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Assignments
          </button>
          <button
            onClick={() => setActiveTab('expenditures')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'expenditures'
                ? 'bg-red-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Expenditures
          </button>
        </div>

        {/* Assignment Form */}
        {showAssignmentForm && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">New Asset Assignment</h2>
            <form onSubmit={handleAssignmentSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Asset
                </label>
                <select
                  name="asset_id"
                  value={assignmentData.asset_id}
                  onChange={(e) => setAssignmentData({...assignmentData, asset_id: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Asset</option>
                  <option value="1">M4 Carbine - MC-004</option>
                  <option value="2">Night Vision Goggles - NVG-018</option>
                  <option value="3">Body Armor - BA-027</option>
                  <option value="4">Radio Set - RS-044</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Assigned To
                </label>
                <input
                  type="text"
                  name="assigned_to"
                  value={assignmentData.assigned_to}
                  onChange={(e) => setAssignmentData({...assignmentData, assigned_to: e.target.value})}
                  required
                  placeholder="Personnel name, rank, ID"
                  className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Assignment Date
                </label>
                <input
                  type="date"
                  name="assignment_date"
                  value={assignmentData.assignment_date}
                  onChange={(e) => setAssignmentData({...assignmentData, assignment_date: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Notes
                </label>
                <input
                  type="text"
                  name="notes"
                  value={assignmentData.notes}
                  onChange={(e) => setAssignmentData({...assignmentData, notes: e.target.value})}
                  placeholder="Assignment purpose or notes"
                  className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAssignmentForm(false)}
                  className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Create Assignment
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Expenditure Form */}
        {showExpenditureForm && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">Record Asset Expenditure</h2>
            <form onSubmit={handleExpenditureSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Asset
                </label>
                <select
                  name="asset_id"
                  value={expenditureData.asset_id}
                  onChange={(e) => setExpenditureData({...expenditureData, asset_id: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select Asset</option>
                  <option value="1">M4 Carbine - MC-005</option>
                  <option value="2">Night Vision Goggles - NVG-019</option>
                  <option value="3">Body Armor - BA-028</option>
                  <option value="4">Medical Kit - MK-010</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Reason
                </label>
                <select
                  name="reason"
                  value={expenditureData.reason}
                  onChange={(e) => setExpenditureData({...expenditureData, reason: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select Reason</option>
                  <option value="Combat Loss">Combat Loss</option>
                  <option value="Damaged">Damaged</option>
                  <option value="Consumed">Consumed</option>
                  <option value="Missing">Missing</option>
                  <option value="End of Life">End of Life</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Expenditure Date
                </label>
                <input
                  type="date"
                  name="expenditure_date"
                  value={expenditureData.expenditure_date}
                  onChange={(e) => setExpenditureData({...expenditureData, expenditure_date: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={expenditureData.description}
                  onChange={(e) => setExpenditureData({...expenditureData, description: e.target.value})}
                  required
                  rows={3}
                  placeholder="Detailed description of expenditure circumstances"
                  className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="md:col-span-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowExpenditureForm(false)}
                  className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Record Expenditure
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Content based on active tab */}
        {activeTab === 'assignments' && (
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="px-6 py-4 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">Asset Assignments</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-600">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Asset
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Assigned To
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Assignment Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Return Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Notes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Assigned By
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-600">
                  {assignments.map((assignment) => (
                    <tr key={assignment.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">
                          {assignment.equipment_name}
                        </div>
                        <div className="text-sm text-gray-400">
                          {assignment.serial_number}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <User className="h-4 w-4 text-blue-400 mr-2" />
                          <span className="text-sm text-white">{assignment.assigned_to}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-blue-400 mr-2" />
                          <span className="text-sm text-white">
                            {new Date(assignment.assignment_date).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {assignment.return_date 
                          ? new Date(assignment.return_date).toLocaleDateString()
                          : '-'
                        }
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          assignment.status === 'Active' 
                            ? 'text-green-400 bg-green-900' 
                            : 'text-gray-400 bg-gray-700'
                        }`}>
                          {assignment.status === 'Active' ? (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          ) : (
                            <Calendar className="h-3 w-3 mr-1" />
                          )}
                          {assignment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-white max-w-xs truncate">
                        {assignment.notes || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {assignment.assigned_by_name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'expenditures' && (
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="px-6 py-4 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">Asset Expenditures</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-600">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Asset
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Reason
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Recorded By
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-600">
                  {expenditures.map((expenditure) => (
                    <tr key={expenditure.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">
                          {expenditure.equipment_name}
                        </div>
                        <div className="text-sm text-gray-400">
                          {expenditure.serial_number}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-red-400 bg-red-900">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          {expenditure.reason}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-red-400 mr-2" />
                          <span className="text-sm text-white">
                            {new Date(expenditure.expenditure_date).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-white max-w-xs truncate">
                        {expenditure.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {expenditure.expended_by_name}
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
  );
};

export default AssignmentsPage;
