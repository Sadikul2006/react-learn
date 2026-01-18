import React, { useState } from 'react';

const SimpleLoginPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (username && password) {
      if (isAdmin) {
        alert(`Admin Login Successful!\nUsername: ${username}`);
      } else {
        alert(`User Login Successful!\nUsername: ${username}`);
      }
    } else {
      alert('Please enter username and password');
    }
  };

  const fillDemo = () => {
    if (isAdmin) {
      setUsername('admin');
      setPassword('admin123');
    } else {
      setUsername('user');
      setPassword('user123');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>
            {isAdmin ? '🔐 Admin Login' : '👤 User Login'}
          </h2>
          <div style={styles.roleIndicator}>
            <span style={styles.roleText}>
              {isAdmin ? 'Administrator Access' : 'Regular User Access'}
            </span>
          </div>
        </div>

        {/* Role Switch */}
        <div style={styles.roleSwitch}>
          <button
            onClick={() => setIsAdmin(false)}
            style={{
              ...styles.roleButton,
              ...(!isAdmin ? styles.activeButton : styles.inactiveButton)
            }}
          >
            User
          </button>
          <button
            onClick={() => setIsAdmin(true)}
            style={{
              ...styles.roleButton,
              ...(isAdmin ? styles.activeButton : styles.inactiveButton)
            }}
          >
            Admin
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              placeholder="Enter username"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="Enter password"
            />
          </div>

          {/* Demo Button */}
          <button
            type="button"
            onClick={fillDemo}
            style={styles.demoButton}
          >
            Fill Demo Credentials
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              ...styles.loginButton,
              backgroundColor: isAdmin ? '#dc2626' : '#2563eb'
            }}
          >
            {isAdmin ? 'Login as Admin' : 'Login as User'}
          </button>
        </form>

        {/* Demo Info */}
        <div style={styles.demoInfo}>
          <p style={styles.demoTitle}>Demo Credentials:</p>
          <p>Admin: admin / admin123</p>
          <p>User: user / user123</p>
        </div>
      </div>
    </div>
  );
};

// Inline CSS - Simple aur clean
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f3f4f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  },
  loginBox: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '40px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px'
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '10px'
  },
  roleIndicator: {
    backgroundColor: '#e5e7eb',
    padding: '6px 12px',
    borderRadius: '20px',
    display: 'inline-block'
  },
  roleText: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: '500'
  },
  roleSwitch: {
    display: 'flex',
    backgroundColor: '#f3f4f6',
    borderRadius: '8px',
    padding: '4px',
    marginBottom: '30px'
  },
  roleButton: {
    flex: 1,
    padding: '10px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  activeButton: {
    backgroundColor: 'white',
    color: '#1f2937',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  },
  inactiveButton: {
    backgroundColor: 'transparent',
    color: '#6b7280'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151'
  },
  input: {
    padding: '12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s ease'
  },
  demoButton: {
    padding: '12px',
    backgroundColor: '#f3f4f6',
    color: '#4b5563',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  loginButton: {
    padding: '14px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  demoInfo: {
    marginTop: '30px',
    padding: '15px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#6b7280',
    textAlign: 'center',
    border: '1px solid #e5e7eb'
  },
  demoTitle: {
    fontWeight: '600',
    marginBottom: '8px',
    color: '#374151'
  }
};

export default SimpleLoginPage;