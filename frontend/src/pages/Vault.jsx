import React, { useState, useEffect } from 'react';
import { vaultAPI } from '../services/api';
import PasswordGenerator from '../components/PasswordGenerator';
import PasswordStrength from '../components/PasswordStrength';

const Vault = () => {
  const [vaultItems, setVaultItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showPasswordGenerator, setShowPasswordGenerator] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    username: '',
    password: '',
    url: '',
    notes: ''
  });

  useEffect(() => {
    fetchVaultItems();
  }, []);

  const fetchVaultItems = async () => {
    try {
      const response = await vaultAPI.getAll();
      setVaultItems(response.data);
    } catch (error) {
      console.error('Error fetching vault items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await vaultAPI.update(editingItem.id, formData);
      } else {
        await vaultAPI.create(formData);
      }
      setShowModal(false);
      setEditingItem(null);
      resetForm();
      fetchVaultItems();
    } catch (error) {
      console.error('Error saving vault item:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      username: item.username,
      password: item.password,
      url: item.url,
      notes: item.notes || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await vaultAPI.delete(id);
        fetchVaultItems();
      } catch (error) {
        console.error('Error deleting vault item:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      username: '',
      password: '',
      url: '',
      notes: ''
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const handlePasswordGenerated = (generatedPassword) => {
    setFormData(prev => ({ ...prev, password: generatedPassword }));
  };

  const togglePasswordVisibility = (itemId) => {
    setVaultItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, showPassword: !item.showPassword }
          : item
      )
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your vault...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Password Vault</h1>
          <p className="text-gray-600">Manage your secure passwords and credentials</p>
        </div>

        {/* Tools Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <PasswordGenerator onPasswordGenerated={handlePasswordGenerated} />
          <PasswordStrength password={currentPassword} />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setShowModal(true)}
              className="btn-primary"
            >
              Add New Password
            </button>
            <button
              onClick={() => setShowPasswordGenerator(!showPasswordGenerator)}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              {showPasswordGenerator ? 'Hide' : 'Show'} Password Generator
            </button>
          </div>
          <div className="text-sm text-gray-600">
            {vaultItems.length} password{vaultItems.length !== 1 ? 's' : ''} stored
          </div>
        </div>

        {/* Password Generator Toggle */}
        {showPasswordGenerator && (
          <div className="mb-6">
            <PasswordGenerator onPasswordGenerated={handlePasswordGenerated} />
          </div>
        )}

        {/* Vault Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vaultItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Username:</label>
                  <div className="flex items-center mt-1">
                    <span className="text-gray-900">{item.username}</span>
                    <button
                      onClick={() => copyToClipboard(item.username)}
                      className="ml-2 text-blue-500 hover:text-blue-700"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Password:</label>
                  <div className="flex items-center mt-1">
                    <span className="text-gray-900">
                      {item.showPassword ? item.password : '••••••••'}
                    </span>
                    <button
                      onClick={() => togglePasswordVisibility(item.id)}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      {item.showPassword ? 'Hide' : 'Show'}
                    </button>
                    <button
                      onClick={() => copyToClipboard(item.password)}
                      className="ml-2 text-blue-500 hover:text-blue-700"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                {item.url && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">URL:</label>
                    <div className="flex items-center mt-1">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700 truncate"
                      >
                        {item.url}
                      </a>
                    </div>
                  </div>
                )}

                {item.notes && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Notes:</label>
                    <p className="text-gray-900 mt-1 text-sm">{item.notes}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {vaultItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔒</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No passwords yet</h3>
            <p className="text-gray-600 mb-4">Start by adding your first secure password</p>
            <button
              onClick={() => setShowModal(true)}
              className="btn-primary"
            >
              Add Your First Password
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingItem ? 'Edit Password' : 'Add New Password'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({...formData, password: e.target.value});
                      setCurrentPassword(e.target.value);
                    }}
                    className="input-field flex-1"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordGenerator(!showPasswordGenerator)}
                    className="ml-2 px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Generate
                  </button>
                </div>
              </div>
              {showPasswordGenerator && (
                <div className="border-t pt-4">
                  <PasswordGenerator onPasswordGenerated={handlePasswordGenerated} />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL (optional)
                </label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({...formData, url: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (optional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="input-field"
                  rows="3"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingItem(null);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  {editingItem ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vault;
