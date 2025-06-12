
import React, { useState } from 'react';
import { Plus, Shield, User, Building, Edit, Trash2 } from 'lucide-react';

const UsersPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'Logistics Officer',
    base_id: ''
  });

  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'admin',
      email: 'admin@military.gov',
      role: 'Admin',
      base_id: null,
      base_name: 'All Bases',
      created_at: '2024-01-01'
    },
    {
      id: 2,
      username: 'commander',
      email: 'commander@military.gov',
      role: 'Base Commander',
      base_id: 1,
      base_name: 'Fort Alpha',
      created_at: '2024-01-02'
    },
    {
      id: 3,
      username: 'logistics',
      email: 'logistics@military.gov',
      role: 'Logistics Officer',
      base_id: 1,
      base_name: 'Fort Alpha',
      created_at: '2024-01-03'
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      // Update existing user
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...formData, base_name: getBaseName(formData.base_id) }
          : user
      ));
      setEditingUser(null);
    } else {
      // Create new user
      const newUser = {
        id: Date.now(),
        ...formData,
        base_name: getBaseName(formData.base_id),
        created_at: new Date().toISOString().split('T')[0]
      };
      setUsers([...users, newUser]);
    }
    
    setShowForm(false);
    setFormData({
      username: '',
      email: '',
      password: '',
      role: 'Logistics Officer',
      base_id: ''
    });
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      password: '', // Don't populate password for security
      role: user.role,
      base_id: user.base_id || ''
    });
    setShowForm(true);
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getBaseName = (baseId) => {
    const baseNames = {
      '1': 'Fort Alpha',
      '2': 'Base Bravo',
      '3': 'Outpost Charlie'
    };
    return baseNames[baseId] || 'All Bases';
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'Admin':
        return <Shield className="h-5 w-5 text-red-400" />;
      case 'Base Commander':
        return <Building className="h-5 w-5 text-yellow-400" />;
      case 'Logistics Officer':
        return <User className="h-5 w-5 text-blue-400" />;
      default:
        return <User className="h-5 w-5 text-gray-400" />;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin':
        return 'text-red-400 bg-red-900';
      case 'Base Commander':
        return 'text-yellow-400 bg-yellow-900';
      case 'Logistics Officer':
        return 'text-blue-400 bg-blue-900';
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
            <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
            <p className="text-gray-400">Manage users, roles, and access permissions</p>
          </div>
          <button
            onClick={() => {
              setEditingUser(null);
              setFormData({
                username: '',
                email: '',
                password: '',
                role: 'Logistics Officer',
                base_id: ''
              });
              setShowForm(true);
            }}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add User
          </button>
        </div>

        {/* User Form */}
        {showForm && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">
              {editingUser ? 'Edit User' : 'Add New User'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Password {editingUser && '(leave blank to keep current)'}
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required={!editingUser}
                  minLength="6"
                  className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="Admin">Admin</option>
                  <option value="Base Commander">Base Commander</option>
                  <option value="Logistics Officer">Logistics Officer</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Assigned Base {formData.role === 'Admin' && '(Optional for Admin)'}
                </label>
                <select
                  name="base_id"
                  value={formData.base_id}
                  onChange={handleChange}
                  required={formData.role !== 'Admin'}
                  className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Base</option>
                  <option value="1">Fort Alpha</option>
                  <option value="2">Base Bravo</option>
                  <option value="3">Outpost Charlie</option>
                </select>
              </div>

              <div className="md:col-span-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingUser(null);
                  }}
                  className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  {editingUser ? 'Update User' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Users Table */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white">System Users</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-600">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Assigned Base
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-600">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="h-8 w-8 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-white">
                            {user.username}
                          </div>
                          <div className="text-sm text-gray-400">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                        {getRoleIcon(user.role)}
                        <span className="ml-1">{user.role}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 text-blue-400 mr-2" />
                        <span className="text-sm text-white">{user.base_name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                          disabled={user.id === 1} // Prevent deleting admin
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Role Permissions Info */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-bold text-white mb-4">Role Permissions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-red-900 bg-opacity-20 border border-red-700 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Shield className="h-5 w-5 text-red-400 mr-2" />
                <span className="font-medium text-red-400">Admin</span>
              </div>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Full system access</li>
                <li>• Manage all users</li>
                <li>• Access all bases</li>
                <li>• System configuration</li>
              </ul>
            </div>

            <div className="bg-yellow-900 bg-opacity-20 border border-yellow-700 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Building className="h-5 w-5 text-yellow-400 mr-2" />
                <span className="font-medium text-yellow-400">Base Commander</span>
              </div>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Manage assigned base</li>
                <li>• Approve transfers</li>
                <li>• Asset assignments</li>
                <li>• Base personnel oversight</li>
              </ul>
            </div>

            <div className="bg-blue-900 bg-opacity-20 border border-blue-700 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <User className="h-5 w-5 text-blue-400 mr-2" />
                <span className="font-medium text-blue-400">Logistics Officer</span>
              </div>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Record purchases</li>
                <li>• Manage transfers</li>
                <li>• Asset tracking</li>
                <li>• Limited base access</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
