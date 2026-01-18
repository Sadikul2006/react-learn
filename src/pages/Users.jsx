import { useState } from "react";

const Users = () => {
  // Mock user data with different roles and departments
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Admin User",
      email: "admin@company.com",
      phone: "+1 (555) 111-1111",
      role: "Admin",
      department: "Administration",
      status: "Active",
      joinDate: "2023-01-15",
      permissions: ["view", "edit", "delete", "add"]
    },
    {
      id: 2,
      name: "Manager User",
      email: "manager@company.com",
      phone: "+1 (555) 222-2222",
      role: "Manager",
      department: "Operations",
      status: "Active",
      joinDate: "2023-03-22",
      permissions: ["view", "edit"]
    },
    {
      id: 3,
      name: "Employee User",
      email: "employee@company.com",
      phone: "+1 (555) 333-3333",
      role: "Employee",
      department: "Engineering",
      status: "Active",
      joinDate: "2023-05-10",
      permissions: ["view"]
    },
    {
      id: 4,
      name: "John Doe",
      email: "john@company.com",
      phone: "+1 (555) 444-4444",
      role: "Employee",
      department: "Sales",
      status: "Inactive",
      joinDate: "2023-07-18",
      permissions: ["view"]
    },
    {
      id: 5,
      name: "Jane Smith",
      email: "jane@company.com",
      phone: "+1 (555) 555-5555",
      role: "Employee",
      department: "Marketing",
      status: "Pending",
      joinDate: "2023-09-05",
      permissions: ["view"]
    },
    {
      id: 6,
      name: "Sarah Johnson",
      email: "sarah@company.com",
      phone: "+1 (555) 666-6666",
      role: "Manager",
      department: "Human Resources",
      status: "Active",
      joinDate: "2023-10-15",
      permissions: ["view", "edit"]
    },
    {
      id: 7,
      name: "Michael Brown",
      email: "michael@company.com",
      phone: "+1 (555) 777-7777",
      role: "Admin",
      department: "IT",
      status: "Active",
      joinDate: "2023-11-20",
      permissions: ["view", "edit", "delete", "add"]
    }
  ]);

  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Employee",
    department: "",
    status: "Active",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterRole, setFilterRole] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterDepartment, setFilterDepartment] = useState("All");
  
  // Current user role (you can get this from authentication/context)
  const [currentUserRole] = useState("Employee"); // Change this to test different roles
  // Options: "Admin", "Manager", "Employee"

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.email) return;

    if (editIndex !== null) {
      const updated = [...users];
      updated[editIndex] = { 
        ...form, 
        id: users[editIndex].id, 
        joinDate: users[editIndex].joinDate,
        permissions: getPermissionsByRole(form.role)
      };
      setUsers(updated);
      setEditIndex(null);
    } else {
      const newUser = {
        ...form,
        id: users.length + 1,
        joinDate: new Date().toISOString().split('T')[0],
        permissions: getPermissionsByRole(form.role)
      };
      setUsers([...users, newUser]);
    }

    setForm({ name: "", email: "", phone: "", role: "Employee", department: "", status: "Active" });
    setShowAddForm(false);
  };

  const handleEdit = (index) => {
    if (!hasPermission("edit")) return;
    setForm(users[index]);
    setEditIndex(index);
    setShowAddForm(true);
  };

  const handleDelete = (index) => {
    if (!hasPermission("delete")) return;
    const filtered = users.filter((_, i) => i !== index);
    setUsers(filtered);
  };

  const handleCancel = () => {
    setForm({ name: "", email: "", phone: "", role: "Employee", department: "", status: "Active" });
    setEditIndex(null);
    setShowAddForm(false);
  };

  const handleStatusChange = (index, newStatus) => {
    if (!hasPermission("edit")) return;
    const updated = [...users];
    updated[index] = { ...updated[index], status: newStatus };
    setUsers(updated);
  };

  const getPermissionsByRole = (role) => {
    switch(role) {
      case "Admin": return ["view", "edit", "delete", "add"];
      case "Manager": return ["view", "edit"];
      case "Employee": return ["view"];
      default: return ["view"];
    }
  };

  const hasPermission = (permission) => {
    const currentUser = users.find(user => user.role === currentUserRole);
    return currentUser?.permissions?.includes(permission) || false;
  };

  // Get all unique departments for filter
  const allDepartments = ["All", ...new Set(users.map(user => user.department))];
  const roleOptions = ["All", "Admin", "Manager", "Employee"];
  const statusOptions = ["All", "Active", "Inactive", "Pending"];

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) ||
                         user.email.toLowerCase().includes(search.toLowerCase()) ||
                         user.department?.toLowerCase().includes(search.toLowerCase());
    const matchesRole = filterRole === "All" || user.role === filterRole;
    const matchesStatus = filterStatus === "All" || user.status === filterStatus;
    const matchesDepartment = filterDepartment === "All" || user.department === filterDepartment;
    
    return matchesSearch && matchesRole && matchesStatus && matchesDepartment;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Inactive": return "bg-red-100 text-red-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "Admin": return "bg-purple-100 text-purple-800";
      case "Manager": return "bg-blue-100 text-blue-800";
      case "Employee": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getDepartmentColor = (department) => {
    const colors = {
      "Administration": "bg-purple-100 text-purple-800",
      "Engineering": "bg-blue-100 text-blue-800",
      "Sales": "bg-green-100 text-green-800",
      "Marketing": "bg-pink-100 text-pink-800",
      "Operations": "bg-yellow-100 text-yellow-800",
      "Human Resources": "bg-indigo-100 text-indigo-800",
      "IT": "bg-teal-100 text-teal-800"
    };
    return colors[department] || "bg-gray-100 text-gray-800";
  };

  const getCurrentUserColor = (role) => {
    return currentUserRole === role ? "ring-2 ring-offset-2 ring-blue-500" : "";
  };

  // Calculate statistics
  const stats = {
    total: users.length,
    active: users.filter(u => u.status === "Active").length,
    inactive: users.filter(u => u.status === "Inactive").length,
    pending: users.filter(u => u.status === "Pending").length,
    admin: users.filter(u => u.role === "Admin").length,
    manager: users.filter(u => u.role === "Manager").length,
    employee: users.filter(u => u.role === "Employee").length,
    departments: [...new Set(users.map(u => u.department))].length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Header with Current User Info */}
        <div className="mb-6 sm:mb-8 px-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">User Management</h1>
              <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
                Manage system users and their permissions
              </p>
            </div>
            <div className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center ${getCurrentUserColor(currentUserRole)}`}>
                  <span className="text-white font-semibold text-sm">
                    {currentUserRole.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Logged in as</p>
                  <p className="text-sm text-gray-600">{currentUserRole} Role</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 md:p-6 mb-6 sm:mb-8">
          {/* Search, Filters and Add Button Row */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 sm:mb-8">
            {/* Left Side - Filters */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              {/* Role Filter */}
              <div className="w-full sm:w-40">
                <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Role</label>
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                >
                  {roleOptions.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              
              {/* Status Filter */}
              <div className="w-full sm:w-40">
                <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Department Filter */}
              <div className="w-full sm:w-40">
                <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Department</label>
                <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                >
                  {allDepartments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Right Side - Search and Add Button */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              {/* Search Bar */}
              <div className="relative w-full sm:w-56 lg:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search users..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base"
                />
              </div>
              
              {/* Add New User Button - Only show if user has 'add' permission */}
              {hasPermission("add") && (
                <div className="w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setShowAddForm(!showAddForm);
                      setEditIndex(null);
                      if (showAddForm) {
                        handleCancel();
                      }
                    }}
                    className={`flex items-center justify-center w-full sm:w-auto px-3 sm:px-4 py-2.5 sm:py-2.5 rounded-lg font-medium transition-colors ${
                      showAddForm
                        ? "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {showAddForm ? (
                      <>
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Cancel
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="hidden sm:inline">Add New User</span>
                        <span className="sm:hidden">Add User</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Add/Edit User Form - Only show if user has 'add' or 'edit' permission */}
          {showAddForm && (hasPermission("add") || hasPermission("edit")) && (
            <div className="mb-8 p-4 sm:p-6 bg-gray-50 rounded-lg border border-gray-200 animate-fadeIn">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
                {editIndex !== null ? "Edit User" : "Add New User"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    name="name"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    name="phone"
                    placeholder="+1 (555) 123-4567"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Employee">Employee</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base"
                  >
                    <option value="">Select Department</option>
                    <option value="Administration">Administration</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Operations">Operations</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="IT">IT</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                <button
                  onClick={handleCancel}
                  className="w-full sm:w-auto px-4 sm:px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!form.name || !form.email}
                  className={`w-full sm:w-auto px-4 sm:px-5 py-2.5 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                    !form.name || !form.email
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {editIndex !== null ? "Update User" : "Add User"}
                </button>
              </div>
            </div>
          )}

          {/* User Count */}
          <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
            <h3 className="text-base sm:text-lg font-semibold text-gray-700">Users List</h3>
            <span className="text-xs sm:text-sm text-gray-500">
              {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'} found
            </span>
          </div>

          {/* Permission Notice for Employee Role */}
          {currentUserRole === "Employee" && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start">
                <svg className="h-5 w-5 text-blue-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm text-blue-800 font-medium">View Only Mode</p>
                  <p className="text-xs text-blue-700">As an Employee, you can only view user information. Edit, delete, and add functionalities are restricted.</p>
                </div>
              </div>
            </div>
          )}

          {/* Responsive Table Container */}
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <div className="overflow-x-auto -mx-1 sm:mx-0">
              {/* Desktop Table View */}
              <div className="hidden md:block">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role & Department
                      </th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Joined
                      </th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user, index) => (
                        <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className={`h-10 w-10 flex-shrink-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 ${getCurrentUserColor(user.role)}`}>
                                <span className="text-white font-semibold text-sm">
                                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                <div className="text-xs text-gray-500">ID: #{user.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{user.email}</div>
                            <div className="text-xs text-gray-500">{user.phone}</div>
                          </td>
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                            <div className="space-y-1">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(user.role)}`}>
                                {user.role}
                              </span>
                              <div className="text-xs text-gray-500">{user.department}</div>
                            </div>
                          </td>
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}>
                                {user.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.joinDate}
                          </td>
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-gray-600 hover:text-gray-900 flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-md hover:bg-gray-50 transition-colors text-xs sm:text-sm">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-4 sm:px-6 py-8 sm:py-12 text-center">
                          <div className="text-gray-500">
                            <svg className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <p className="mt-3 sm:mt-4 text-base sm:text-lg font-medium">No users found</p>
                            <p className="mt-1 sm:mt-1 text-sm">
                              {search || filterRole !== "All" || filterStatus !== "All" || filterDepartment !== "All"
                                ? "Try adjusting your filters or search term" 
                                : hasPermission("add") 
                                  ? "Click 'Add New User' to get started" 
                                  : "No users available"}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden">
                {filteredUsers.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {filteredUsers.map((user, index) => (
                      <div key={user.id} className="p-3 sm:p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start">
                            <div className={`h-12 w-12 flex-shrink-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 ${getCurrentUserColor(user.role)}`}>
                              <span className="text-white font-semibold">
                                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-sm font-medium text-gray-900">{user.name}</h3>
                                <span className="text-xs text-gray-500">#{user.id}</span>
                              </div>
                              <p className="text-xs text-gray-500 mt-1 break-all">{user.email}</p>
                              {user.phone && (
                                <p className="text-xs text-gray-500 mt-1">{user.phone}</p>
                              )}
                              <div className="flex flex-wrap items-center gap-2 mt-2">
                                <span className={`px-2 py-0.5 rounded text-xs font-medium ${getRoleColor(user.role)}`}>
                                  {user.role}
                                </span>
                                <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(user.status)}`}>
                                  {user.status}
                                </span>
                                {user.department && (
                                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${getDepartmentColor(user.department)}`}>
                                    {user.department}
                                  </span>
                                )}
                              </div>
                              <span className="text-xs text-gray-500 mt-1">
                                {user.joinDate}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            {hasPermission("edit") ? (
                              <select
                                value={user.status}
                                onChange={(e) => handleStatusChange(index, e.target.value)}
                                className="text-xs border border-gray-300 rounded px-1 py-0.5 mb-1"
                              >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Pending">Pending</option>
                              </select>
                            ) : (
                              <span className="text-xs text-gray-500 mb-1">Read-only</span>
                            )}
                            <div className="flex gap-1">
                              {hasPermission("edit") ? (
                                <button
                                  onClick={() => handleEdit(index)}
                                  className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                                  title="Edit"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>
                              ) : (
                                <button
                                  disabled
                                  className="text-gray-400 p-1 rounded cursor-not-allowed"
                                  title="Edit permission required"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>
                              )}
                              {hasPermission("delete") ? (
                                <button
                                  onClick={() => handleDelete(index)}
                                  className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                                  title="Delete"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              ) : (
                                <button
                                  disabled
                                  className="text-gray-400 p-1 rounded cursor-not-allowed"
                                  title="Delete permission required"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p className="mt-4 text-lg font-medium">No users found</p>
                    <p className="mt-1 text-sm text-gray-500">
                      {search || filterRole !== "All" || filterStatus !== "All" || filterDepartment !== "All"
                        ? "Try adjusting your filters" 
                        : "No users available"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Users;