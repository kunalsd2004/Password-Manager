import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SessionManager = ({ children }) => {
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [sessionTimeout, setSessionTimeout] = useState(30 * 60 * 1000); // 30 minutes
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const updateActivity = () => {
      setLastActivity(Date.now());
      setShowWarning(false);
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, updateActivity, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActivity, true);
      });
    };
  }, []);

  useEffect(() => {
    const checkSession = () => {
      const timeSinceLastActivity = Date.now() - lastActivity;
      const warningTime = sessionTimeout - (5 * 60 * 1000); // 5 minutes before timeout

      if (timeSinceLastActivity >= sessionTimeout) {
        // Session expired
        localStorage.removeItem('token');
        navigate('/login');
        alert('Your session has expired. Please log in again.');
      } else if (timeSinceLastActivity >= warningTime) {
        // Show warning
        setShowWarning(true);
      }
    };

    const interval = setInterval(checkSession, 1000);
    return () => clearInterval(interval);
  }, [lastActivity, sessionTimeout, navigate]);

  const extendSession = () => {
    setLastActivity(Date.now());
    setShowWarning(false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      {children}
      
      {/* Session Warning Modal */}
      {showWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mb-4">
                <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Session Timeout Warning
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Your session will expire in 5 minutes due to inactivity. 
                Would you like to extend your session?
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={logout}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                >
                  Logout
                </button>
                <button
                  onClick={extendSession}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                >
                  Extend Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SessionManager;
