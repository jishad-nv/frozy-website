import React, { useState, useEffect } from 'react';
import { X, Lock, LogOut, Package, ShoppingCart, Users, Settings, Plus, Edit, Trash2, CheckCircle, Clock, Truck, ShieldAlert, DollarSign } from 'lucide-react';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ isOpen, onClose }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('frozy_admin_token'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'stats' | 'products' | 'orders' | 'customers'>('stats');

  const [stats, setStats] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);

  // Product modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    flavour: '',
    description: '',
    price: 199,
    stock: 25,
    category: 'signature',
    image: '/images/products/ChatGPT Image Sep 28, 2026, 01_17_29 PM.png'
  });
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (token) {
      fetchAdminData();
    }
  }, [token]);

  const fetchAdminData = async () => {
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      const [statsRes, prodRes, ordRes, custRes] = await Promise.all([
        fetch('/api/dashboard/stats', { headers }).then(r => r.json()),
        fetch('/api/products').then(r => r.json()), // products catalog can be viewed or fetched with token
        fetch('/api/orders', { headers }).then(r => r.json()),
        fetch('/api/customers', { headers }).then(r => r.json())
      ]);
      setStats(statsRes);
      setProducts(prodRes);
      setOrders(ordRes);
      setCustomers(custRes);
    } catch (err) {
      console.error('Failed to load admin data', err);
      // If token expired or unauthorized, logout
      setToken(null);
      localStorage.removeItem('frozy_admin_token');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        setToken(data.token);
        localStorage.setItem('frozy_admin_token', data.token);
        setPassword(''); // Clear password from state immediately
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Login connection error');
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('frozy_admin_token');
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', productForm.name);
    formData.append('flavour', productForm.flavour || productForm.name);
    formData.append('description', productForm.description);
    formData.append('price', productForm.price.toString());
    formData.append('stock', productForm.stock.toString());
    formData.append('category', productForm.category);
    if (selectedImageFile) {
      formData.append('image', selectedImageFile);
    } else {
      formData.append('image', productForm.image);
    }

    try {
      let res;
      const headers = { 'Authorization': `Bearer ${token}` };
      if (editingProduct) {
        res = await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers,
          body: formData
        });
      } else {
        res = await fetch('/api/products', {
          method: 'POST',
          headers,
          body: formData
        });
      }

      if (res.ok) {
        setIsProductModalOpen(false);
        setEditingProduct(null);
        setSelectedImageFile(null);
        fetchAdminData();
      }
    } catch (err) {
      console.error('Failed to save product', err);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchAdminData();
    } catch (err) {
      console.error('Failed to delete product', err);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ orderStatus: newStatus })
      });
      if (res.ok) fetchAdminData();
    } catch (err) {
      console.error('Failed to update order status', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-6xl bg-[#FFF8F5] text-neutral-900 rounded-3xl shadow-2xl border border-pink-200 overflow-hidden min-h-[600px] flex flex-col">
        {/* Header */}
        <div className="bg-[#8F2746] text-white p-5 px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/25 flex items-center justify-center font-creamy font-bold">
              FZ
            </div>
            <div>
              <h2 className="text-xl font-bold font-creamy">FROZY Admin Management Portal</h2>
              <p className="text-xs text-pink-200">Secure backend control center & order fulfillment</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!token ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <form onSubmit={handleLogin} className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-pink-100 space-y-5">
              <div className="text-center">
                <div className="w-14 h-14 bg-pink-100 text-pink-700 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold font-creamy text-neutral-900">Admin Authentication</h3>
                <p className="text-xs text-neutral-500 mt-1">Enter authorized credentials to access management console.</p>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">Admin Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-pink-600 bg-neutral-50"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-pink-600 bg-neutral-50"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-neutral-900 text-white text-xs font-bold tracking-wider hover:bg-black transition-all shadow-md"
              >
                SECURE ADMIN LOGIN
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-white border-r border-pink-100 p-5 flex flex-col justify-between">
              <div className="space-y-1.5">
                <button
                  onClick={() => setActiveTab('stats')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                    activeTab === 'stats' ? 'bg-[#8F2746] text-white shadow-md' : 'text-neutral-600 hover:bg-pink-50 hover:text-pink-900'
                  }`}
                >
                  <DollarSign className="w-4 h-4" />
                  <span>Dashboard Overview</span>
                </button>
                <button
                  onClick={() => setActiveTab('products')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                    activeTab === 'products' ? 'bg-[#8F2746] text-white shadow-md' : 'text-neutral-600 hover:bg-pink-50 hover:text-pink-900'
                  }`}
                >
                  <Package className="w-4 h-4" />
                  <span>Product Management</span>
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                    activeTab === 'orders' ? 'bg-[#8F2746] text-white shadow-md' : 'text-neutral-600 hover:bg-pink-50 hover:text-pink-900'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Order Fulfillment</span>
                </button>
                <button
                  onClick={() => setActiveTab('customers')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                    activeTab === 'customers' ? 'bg-[#8F2746] text-white shadow-md' : 'text-neutral-600 hover:bg-pink-50 hover:text-pink-900'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Customer Directory</span>
                </button>
              </div>

              <div className="pt-4 border-t border-neutral-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Main Area */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-[#FFF8F5]">
              {activeTab === 'stats' && stats && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold font-creamy text-neutral-900">Business Dashboard & Metrics</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-pink-100 flex flex-col justify-between">
                      <span className="text-xs font-bold text-neutral-400 uppercase">Total Sales Revenue</span>
                      <div className="text-2xl font-extrabold text-neutral-900 mt-2">₹{stats.totalSales}</div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-pink-100 flex flex-col justify-between">
                      <span className="text-xs font-bold text-neutral-400 uppercase">Total Orders</span>
                      <div className="text-2xl font-extrabold text-neutral-900 mt-2">{stats.totalOrders}</div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-pink-100 flex flex-col justify-between">
                      <span className="text-xs font-bold text-neutral-400 uppercase">Active Products</span>
                      <div className="text-2xl font-extrabold text-neutral-900 mt-2">{stats.activeProducts} / {stats.totalProducts}</div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-pink-100 flex flex-col justify-between">
                      <span className="text-xs font-bold text-neutral-400 uppercase">Total Customers</span>
                      <div className="text-2xl font-extrabold text-neutral-900 mt-2">{stats.totalCustomers}</div>
                    </div>
                  </div>

                  {/* Recent Orders Table */}
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-pink-100">
                    <h4 className="text-base font-bold font-creamy text-neutral-900 mb-4">Recent Orders</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-neutral-100 text-neutral-400 uppercase">
                            <th className="pb-3">Order ID</th>
                            <th className="pb-3">Customer</th>
                            <th className="pb-3">Amount</th>
                            <th className="pb-3">Status</th>
                            <th className="pb-3">Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-50">
                          {stats.recentOrders.map((ord: any) => (
                            <tr key={ord.id}>
                              <td className="py-3 font-mono font-bold text-pink-700">{ord.id}</td>
                              <td className="py-3 font-semibold text-neutral-800">{ord.customerName}</td>
                              <td className="py-3 font-bold tabular-nums">₹{ord.total}</td>
                              <td className="py-3">
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-pink-50 text-pink-800">
                                  {ord.orderStatus}
                                </span>
                              </td>
                              <td className="py-3 text-neutral-500">{new Date(ord.createdAt).toLocaleDateString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'products' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold font-creamy text-neutral-900">Product Catalog & Stock</h3>
                      <p className="text-xs text-neutral-500">Manage flavors, descriptions, pricing, and real inventory stock.</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingProduct(null);
                        setProductForm({ name: '', flavour: '', description: '', price: 199, stock: 25, category: 'signature', image: '/images/products/ChatGPT Image Sep 28, 2026, 01_17_29 PM.png' });
                        setIsProductModalOpen(true);
                      }}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-bold hover:bg-black shadow-md"
                    >
                      <Plus className="w-4 h-4 text-pink-300" />
                      <span>Add New Product</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {products.map((prod) => (
                      <div key={prod.id} className="bg-white p-5 rounded-3xl shadow-sm border border-pink-100 flex flex-col justify-between">
                        <div className="flex items-center gap-4">
                          <img src={prod.image} alt={prod.name} className="w-16 h-16 object-contain rounded-2xl bg-pink-50/50 p-1" />
                          <div>
                            <h4 className="text-sm font-bold text-neutral-900">{prod.name}</h4>
                            <p className="text-xs text-pink-700 font-medium">₹{prod.price}</p>
                            <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${prod.stock > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                              Stock: {prod.stock} units
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-neutral-100">
                          <button
                            onClick={() => {
                              setEditingProduct(prod);
                              setProductForm({
                                name: prod.name,
                                flavour: prod.flavour,
                                description: prod.description,
                                price: prod.price,
                                stock: prod.stock,
                                category: prod.category,
                                image: prod.image
                              });
                              setIsProductModalOpen(true);
                            }}
                            className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold flex items-center gap-1"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(prod.id)}
                            className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold font-creamy text-neutral-900">Order Fulfillment & Tracking</h3>
                    <p className="text-xs text-neutral-500">Update live order statuses and monitor customer deliveries.</p>
                  </div>

                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-pink-100">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-neutral-100 text-neutral-400 uppercase">
                            <th className="pb-3">Order ID</th>
                            <th className="pb-3">Customer</th>
                            <th className="pb-3">Address</th>
                            <th className="pb-3">Total</th>
                            <th className="pb-3">Payment</th>
                            <th className="pb-3">Status Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-50">
                          {orders.map((ord) => (
                            <tr key={ord.id}>
                              <td className="py-3 font-mono font-bold text-pink-700">{ord.id}</td>
                              <td className="py-3">
                                <div className="font-semibold text-neutral-900">{ord.customerName}</div>
                                <div className="text-[10px] text-neutral-500">{ord.phone}</div>
                              </td>
                              <td className="py-3 text-neutral-600 max-w-xs truncate">{ord.address}, {ord.city}</td>
                              <td className="py-3 font-bold tabular-nums">₹{ord.total}</td>
                              <td className="py-3">
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-100 text-neutral-800">
                                  {ord.paymentMethod} ({ord.paymentStatus})
                                </span>
                              </td>
                              <td className="py-3">
                                <select
                                  value={ord.orderStatus}
                                  onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                                  className="px-3 py-1.5 rounded-xl border border-neutral-300 text-xs font-bold bg-white focus:ring-2 focus:ring-pink-500"
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Confirmed">Confirmed</option>
                                  <option value="Processing">Processing</option>
                                  <option value="Out for Delivery">Out for Delivery</option>
                                  <option value="Delivered">Delivered</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'customers' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold font-creamy text-neutral-900">Customer Directory</h3>
                    <p className="text-xs text-neutral-500">Registered scoop lovers and purchase history records.</p>
                  </div>

                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-pink-100">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-neutral-100 text-neutral-400 uppercase">
                            <th className="pb-3">Name</th>
                            <th className="pb-3">Email</th>
                            <th className="pb-3">Phone</th>
                            <th className="pb-3">City</th>
                            <th className="pb-3">Orders</th>
                            <th className="pb-3">Total Spent</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-50">
                          {customers.map((cust) => (
                            <tr key={cust.id}>
                              <td className="py-3 font-semibold text-neutral-900">{cust.name}</td>
                              <td className="py-3 text-neutral-600">{cust.email}</td>
                              <td className="py-3 text-neutral-600">{cust.phone}</td>
                              <td className="py-3 text-neutral-600">{cust.city}</td>
                              <td className="py-3 font-bold">{cust.ordersCount}</td>
                              <td className="py-3 font-extrabold text-pink-700">₹{cust.totalSpent}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Add/Edit Product Modal */}
        {isProductModalOpen && (
          <div className="fixed inset-0 z-65 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-white rounded-3xl p-8 shadow-2xl border border-pink-100 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold font-creamy text-neutral-900">
                  {editingProduct ? 'Edit Product' : 'Create New Product'}
                </h3>
                <button onClick={() => setIsProductModalOpen(false)} className="text-neutral-400 hover:text-black">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Product Name</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Flavour Subtitle</label>
                  <input
                    type="text"
                    value={productForm.flavour}
                    onChange={(e) => setProductForm({ ...productForm, flavour: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">Stock Units</label>
                    <input
                      type="number"
                      required
                      value={productForm.stock}
                      onChange={(e) => setProductForm({ ...productForm, stock: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300"
                  >
                    <option value="signature">Signature & Velvet</option>
                    <option value="fruit">Real Fruit & Berries</option>
                    <option value="indulgent">Belgian Choco & Fudge</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Product Pint Image (PNG/JPG)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setSelectedImageFile(e.target.files[0]);
                      }
                    }}
                    className="w-full text-xs text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => setIsProductModalOpen(false)}
                    className="px-4 py-2 rounded-full border border-neutral-300 text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-full bg-neutral-900 text-white text-xs font-bold"
                  >
                    Save Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
