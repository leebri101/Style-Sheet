import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { 
  requestPasswordReset,
  resetPassword,
  selectPasswordResetState,
  resetPasswordState
} from '../../store/authSlice';

function ResetPasswordPage({ mode = "request" }) {
  const dispatch = useDispatch();
  const { loading, error, success, emailSent } = useSelector(selectPasswordResetState);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleRequestReset = (e) => {
    e.preventDefault();
    dispatch(requestPasswordReset(email));
  };

  const handleConfirmReset = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ token, newPassword }));
  };

  // Reset state when component unmounts
  useEffect(() => {
    return () => dispatch(resetPasswordState());
  }, [dispatch]);

  return (
    <div className="password-reset-container">
      {mode === "request" ? (
        <>
          <h2>Reset Password</h2>
          {emailSent ? (
            <div className="success-message">
              Reset link sent to {email}. Please check your email.
            </div>
          ) : (
            <form onSubmit={handleRequestReset}>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
              {error && <div className="error-message">{error}</div>}
            </form>
          )}
        </>
      ) : (
        <>
          <h2>Set New Password</h2>
          {success ? (
            <div className="success-message">
              Password reset successfully! You can now login.
            </div>
          ) : (
            <form onSubmit={handleConfirmReset}>
              <div className="form-group">
                <label>Reset Token</label>
                <input
                  type="text"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength="8"
                />
              </div>
              <button type="submit" disabled={loading}>
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
              {error && <div className="error-message">{error}</div>}
            </form>
          )}
        </>
      )}
    </div>
  );
}

ResetPasswordPage.propTypes = {
  mode: PropTypes.oneOf(['request', 'confirm']),
};

export default ResetPasswordPage;
