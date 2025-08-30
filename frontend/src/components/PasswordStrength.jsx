import React from 'react';

const PasswordStrength = ({ password }) => {
  const analyzePassword = (password) => {
    if (!password) return { score: 0, feedback: [], strength: 'None' };

    let score = 0;
    const feedback = [];

    // Length check
    if (password.length >= 8) {
      score += 1;
    } else {
      feedback.push('Password should be at least 8 characters long');
    }

    if (password.length >= 12) {
      score += 1;
    }

    if (password.length >= 16) {
      score += 1;
    }

    // Character variety checks
    if (/[a-z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Include lowercase letters');
    }

    if (/[A-Z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Include uppercase letters');
    }

    if (/[0-9]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Include numbers');
    }

    if (/[^A-Za-z0-9]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Include special characters');
    }

    // Common patterns check
    if (/(.)\1{2,}/.test(password)) {
      score -= 1;
      feedback.push('Avoid repeated characters');
    }

    if (/123|abc|qwe|password|admin/i.test(password)) {
      score -= 2;
      feedback.push('Avoid common patterns');
    }

    // Determine strength level
    let strength = 'Weak';
    if (score >= 6) strength = 'Strong';
    else if (score >= 4) strength = 'Good';
    else if (score >= 2) strength = 'Fair';

    return { score: Math.max(0, score), feedback, strength };
  };

  const result = analyzePassword(password);

  const getStrengthColor = (strength) => {
    switch (strength) {
      case 'Strong': return 'bg-green-500';
      case 'Good': return 'bg-blue-500';
      case 'Fair': return 'bg-yellow-500';
      case 'Weak': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 6) return 'bg-green-500';
    if (score >= 4) return 'bg-blue-500';
    if (score >= 2) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h4 className="text-lg font-semibold mb-3">Password Strength</h4>
      
      {password && (
        <>
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Strength:</span>
              <span className={`px-2 py-1 rounded text-white text-sm font-medium ${getStrengthColor(result.strength)}`}>
                {result.strength}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${getScoreColor(result.score)}`}
                style={{ width: `${Math.min(100, (result.score / 6) * 100)}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-600 mt-1">
              Score: {result.score}/6
            </div>
          </div>

          {result.feedback.length > 0 && (
            <div className="mt-3">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Suggestions:</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                {result.feedback.map((suggestion, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.score >= 4 && (
            <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded">
              <p className="text-sm text-green-700">
                ✅ Good password! This meets most security requirements.
              </p>
            </div>
          )}
        </>
      )}

      {!password && (
        <p className="text-gray-500 text-sm">
          Enter a password to analyze its strength
        </p>
      )}
    </div>
  );
};

export default PasswordStrength;
