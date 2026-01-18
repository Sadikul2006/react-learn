import { useState } from "react";

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@company.com",
      phone: "+1 (555) 123-4567",
      role: "Software Engineer",
      department: "Engineering",
      status: "Active",
      joinDate: "2023-01-15"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@company.com",
      phone: "+1 (555) 987-6543",
      role: "Product Manager",
      department: "Product",
      status: "Active",
      joinDate: "2023-03-22"
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert@company.com",
      phone: "+1 (555) 456-7890",
      role: "UX Designer",
      department: "Design",
      status: "Active",
      joinDate: "2023-05-10"
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah@company.com",
      phone: "+1 (555) 234-5678",
      role: "HR Manager",
      department: "HR",
      status: "Inactive",
      joinDate: "2023-07-18"
    },
    {
      id: 5,
      name: "Michael Brown",
      email: "michael@company.com",
      phone: "+1 (555) 876-5432",
      role: "Marketing Specialist",
      department: "Marketing",
      status: "Pending",
      joinDate: "2023-09-05"
    }
  ]);

  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    status: "Active"
  });
  const [editIndex, setEditIndex] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterRole, setFilterRole] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterDepartment, setFilterDepartment] = useState("All");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.email) return;

    if (editIndex !== null) {
      const updated = [...employees];
      updated[editIndex] = { ...form, id: employees[editIndex].id, joinDate: employees[editIndex].joinDate };
      setEmployees(updated);
      setEditIndex(null);
    } else {
      const newEmployee = {
        ...form,
        id: employees.length + 1,
        joinDate: new Date().toISOString().split('T')[0]
      };
      setEmployees([...employees, newEmployee]);
    }

    setForm({ name: "", email: "", phone: "", role: "", department: "", status: "Active" });
    setShowAddForm(false);
  };

  const handleEdit = (index) => {
    setForm(employees[index]);
    setEditIndex(index);
    setShowAddForm(true);
  };

  const handleDelete = (index) => {
    const filtered = employees.filter((_, i) => i !== index);
    setEmployees(filtered);
  };

  const handleCancel = () => {
    setForm({ name: "", email: "", phone: "", role: "", department: "", status: "Active" });
    setEditIndex(null);
    setShowAddForm(false);
  };

  const handleStatusChange = (index, newStatus) => {
    const updated = [...employees];
    updated[index] = { ...updated[index], status: newStatus };
    setEmployees(updated);
  };

  // Get unique roles, departments, and statuses for filters
  const allRoles = ["All", ...new Set(employees.map(emp => emp.role))];
  const allDepartments = ["All", ...new Set(employees.map(emp => emp.department))];
  const allStatuses = ["All", "Active", "Inactive", "Pending"];

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(search.toLowerCase()) ||
                         emp.email.toLowerCase().includes(search.toLowerCase()) ||
                         emp.role.toLowerCase().includes(search.toLowerCase());
    const matchesRole = filterRole === "All" || emp.role === filterRole;
    const matchesStatus = filterStatus === "All" || emp.status === filterStatus;
    const matchesDepartment = filterDepartment === "All" || emp.department === filterDepartment;
    
    return matchesSearch && matchesRole && matchesStatus && matchesDepartment;
  });

  // Statistics
  const stats = {
    total: employees.length,
    active: employees.filter(emp => emp.status === "Active").length,
    inactive: employees.filter(emp => emp.status === "Inactive").length,
    pending: employees.filter(emp => emp.status === "Pending").length,
    // Get unique roles count
    roles: [...new Set(employees.map(emp => emp.role))].length,
    // Get unique departments count
    departments: [...new Set(employees.map(emp => emp.department))].length,
    // Add more stats as needed
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Inactive": return "bg-red-100 text-red-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleColor = (role) => {
    const colors = {
      "Software Engineer": "bg-blue-100 text-blue-800",
      "Product Manager": "bg-purple-100 text-purple-800",
      "UX Designer": "bg-pink-100 text-pink-800",
      "HR Manager": "bg-indigo-100 text-indigo-800",
      "Marketing Specialist": "bg-teal-100 text-teal-800",
    };
    return colors[role] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8 px-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">Employee Management</h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Manage your team members efficiently</p>
        </div>

        {/* Statistics Cards */}
     

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
                  {allRoles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              
              {/* Status Filter */}
              <div className="w-full sm:w-40">
                <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => filterStatus !== "All" && setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                >
                  {allStatuses.map((status) => (
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
                  placeholder="Search employees..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base"
                />
              </div>
              
              {/* Add New Employee Button */}
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
                      <span className="hidden sm:inline">Add New Employee</span>
                      <span className="sm:hidden">Add Employee</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Add/Edit Employee Form */}
          {showAddForm && (
            <div className="mb-8 p-4 sm:p-6 bg-gray-50 rounded-lg border border-gray-200 animate-fadeIn">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
                {editIndex !== null ? "Edit Employee" : "Add New Employee"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
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
                    placeholder="john@company.com"
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
                  <input
                    name="role"
                    placeholder="Software Engineer"
                    value={form.role}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <input
                    name="department"
                    placeholder="Engineering"
                    value={form.department}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base"
                  />
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
                  {editIndex !== null ? "Update Employee" : "Add Employee"}
                </button>
              </div>
            </div>
          )}

          {/* Employee Count */}
          <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
            <h3 className="text-base sm:text-lg font-semibold text-gray-700">Employees List</h3>
            <span className="text-xs sm:text-sm text-gray-500">
              {filteredEmployees.length} {filteredEmployees.length === 1 ? 'employee' : 'employees'} found
            </span>
          </div>

          {/* Responsive Table Container */}
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <div className="overflow-x-auto -mx-1 sm:mx-0">
              {/* Desktop Table View */}
              <div className="hidden md:block">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
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
                        Join Date
                      </th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredEmployees.length > 0 ? (
                      filteredEmployees.map((emp, index) => (
                        <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                                <span className="text-white font-semibold text-sm">
                                  {emp.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{emp.name}</div>
                                <div className="text-xs text-gray-500">ID: #{emp.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{emp.email}</div>
                            <div className="text-xs text-gray-500">{emp.phone}</div>
                          </td>
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                            <div className="space-y-1">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(emp.role)}`}>
                                {emp.role}
                              </span>
                              <div className="text-xs text-gray-500">{emp.department}</div>
                            </div>
                          </td>
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(emp.status)}`}>
                                {emp.status}
                              </span>
                              {/* <div className="ml-2">
                                <select
                                  value={emp.status}
                                  onChange={(e) => handleStatusChange(index, e.target.value)}
                                  className="text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                >
                                  <option value="Active">Active</option>
                                  <option value="Inactive">Inactive</option>
                                  <option value="Pending">Pending</option>
                                </select>
                              </div> */}
                            </div>
                          </td>
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {emp.joinDate}
                          </td>
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex flex-wrap gap-2">
                              <button
                                onClick={() => handleEdit(index)}
                                className="text-blue-600 hover:text-blue-900 flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-md hover:bg-blue-50 transition-colors text-xs sm:text-sm"
                              >
                                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(index)}
                                className="text-red-600 hover:text-red-900 flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-md hover:bg-red-50 transition-colors text-xs sm:text-sm"
                              >
                                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete
                              </button>
                            </div>
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
                            <p className="mt-3 sm:mt-4 text-base sm:text-lg font-medium">No employees found</p>
                            <p className="mt-1 sm:mt-1 text-sm">
                              {search || filterRole !== "All" || filterStatus !== "All" || filterDepartment !== "All"
                                ? "Try adjusting your filters or search term" 
                                : "Click 'Add New Employee' to get started"}
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
                {filteredEmployees.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {filteredEmployees.map((emp, index) => (
                      <div key={emp.id} className="p-3 sm:p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start">
                            <div className="h-12 w-12 flex-shrink-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white font-semibold">
                                {emp.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-sm font-medium text-gray-900">{emp.name}</h3>
                                <span className="text-xs text-gray-500">#{emp.id}</span>
                              </div>
                              <p className="text-xs text-gray-500 mt-1 break-all">{emp.email}</p>
                              <div className="flex flex-wrap items-center gap-2 mt-2">
                                <span className={`px-2 py-0.5 rounded text-xs font-medium ${getRoleColor(emp.role)}`}>
                                  {emp.role}
                                </span>
                                <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(emp.status)}`}>
                                  {emp.status}
                                </span>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {emp.department} • {emp.joinDate}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <select
                              value={emp.status}
                              onChange={(e) => handleStatusChange(index, e.target.value)}
                              className="text-xs border border-gray-300 rounded px-1 py-0.5 mb-1"
                            >
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
                              <option value="Pending">Pending</option>
                            </select>
                            <div className="flex gap-1">
                              <button
                                onClick={() => handleEdit(index)}
                                className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                                title="Edit"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDelete(index)}
                                className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                                title="Delete"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
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
                    <p className="mt-4 text-lg font-medium">No employees found</p>
                    <p className="mt-1 text-sm text-gray-500">
                      {search || filterRole !== "All" || filterStatus !== "All" || filterDepartment !== "All"
                        ? "Try adjusting your filters" 
                        : "Add your first employee"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Pagination/Info Footer */}
          {filteredEmployees.length > 0 && (
            <div className="mt-4 flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-gray-500">
              <div>
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredEmployees.length}</span> of{' '}
                <span className="font-medium">{filteredEmployees.length}</span> results
              </div>
              <div className="mt-2 sm:mt-0">
                {/* Add pagination buttons here if needed */}
              </div>
            </div>
          )}
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

export default AdminDashboard;