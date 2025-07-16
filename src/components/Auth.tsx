import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Wallet, Sparkles, Shield, AlertCircle, Target, PiggyBank, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

const passwordChecks = [
  { label: 'At least 8 characters', check: pw => pw.length >= 8 },
  { label: 'One uppercase letter', check: pw => /[A-Z]/.test(pw) },
  { label: 'One lowercase letter', check: pw => /[a-z]/.test(pw) },
  { label: 'One number', check: pw => /[0-9]/.test(pw) },
  { label: 'One special character', check: pw => /[^A-Za-z0-9]/.test(pw) }
];

const Auth = ({ onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [signUpStep, setSignUpStep] = useState(1); // NEW: two-page logic
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isResetMode, setIsResetMode] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const [profileData, setProfileData] = useState({
    full_name: '',
    monthly_income_target: '',
    savings_goal: ''
  });

  const { signUp, signIn, resetPassword, loading } = useAuth();
  const { isDark } = useTheme();

  useEffect(() => {
    setError('');
    setSuccess('');
  }, [email, password, confirmPassword, isSignUp, isResetMode, profileData, signUpStep]);

  const passwordStrength = passwordChecks.reduce((acc, item) => acc + (item.check(password) ? 1 : 0), 0);

  function handleModeSwitch(mode) {
    setError('');
    setSuccess('');
    setSignUpStep(1);
    if (mode === 'reset') {
      setIsResetMode(true); setIsSignUp(false);
    } else if (mode === 'signup') {
      setIsSignUp(true); setIsResetMode(false);
    } else {
      setIsSignUp(false); setIsResetMode(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(''); setSuccess('');

    if (isSignUp && !isResetMode) {
      if (signUpStep === 1) {
        if (!profileData.full_name.trim()) return setError('Please enter your full name');
        setSignUpStep(2); return;
      }
      if (!email.trim()) return setError('Please enter your email address');
      if (!password.trim()) return setError('Please enter your password');
      if (password !== confirmPassword) return setError('Passwords do not match');
      if (passwordStrength < passwordChecks.length)
        return setError('Password does not meet all requirements');
      const { error } = await signUp(email, password);
      if (error) return setError(error.message);
      setSuccess('Account created successfully! You can now sign in.');
      setIsSignUp(false);
      setEmail(''); setPassword(''); setConfirmPassword('');
      setProfileData({ full_name: '', monthly_income_target: '', savings_goal: '' });
      setSignUpStep(1);
      return;
    }

    if (isResetMode) {
      if (!email.trim()) return setError('Please enter your email address');
      const { error } = await resetPassword(email);
      if (error) setError(error.message);
      else { setSuccess('Password reset email sent! Check your inbox.'); setIsResetMode(false); }
      return;
    }

    if (!email.trim()) return setError('Please enter your email address');
    if (!password.trim()) return setError('Please enter your password');
    const { error } = await signIn(email, password);
    if (error) setError(error.message);
  }

  const handleSignUpBack = () => setSignUpStep(1);

  return (
    <div className={`min-h-screen w-full max-w-full flex items-center justify-center p-3 sm:p-4 lg:p-6 overflow-x-hidden ${
      isDark?'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900':'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl relative mx-auto flex flex-col max-h-[98vh] sm:max-h-[90vh] min-h-0">
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-600 dark:text-gray-300 shadow transition-all"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        )}
        <div className={`backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border p-4 sm:p-6 lg:p-8 flex-1 flex flex-col max-h-full ${
          isDark? 'bg-slate-800/95 border-slate-700/50':'bg-white/95 border-gray-200/50'
        }`}>
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className={`h-12 w-12 sm:h-16 sm:w-16 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-xl ${
                isDark
                  ? 'bg-gradient-to-br from-yellow-500 via-yellow-500 to-amber-500 shadow-yellow-500/25'
                  : 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 shadow-blue-500/25'
              }`}>
                <Wallet className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
            </div>
            <h1 className={`text-2xl sm:text-3xl font-bold bg-clip-text text-transparent ${
              isDark? 'bg-gradient-to-r from-yellow-400 via-yellow-300 to-amber-200':'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800'
            }`}>
              WalletWise
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1 sm:mt-2 font-medium text-sm sm:text-base">
              {isResetMode ? 'Reset your password'
                : isSignUp ? 'Create your smart account'
                : 'Welcome back'}
            </p>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg sm:rounded-xl flex items-start space-x-2 sm:space-x-3">
              <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 dark:text-red-300 text-xs sm:text-sm font-medium">{error}</p>
            </div>
          )}
          {success && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg sm:rounded-xl flex items-start space-x-2 sm:space-x-3">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-green-700 dark:text-green-300 text-xs sm:text-sm font-medium">{success}</p>
            </div>
          )}

          {/* Main Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 flex flex-col flex-1">
            {/* SIGNUP: STEP 1 */}
            {isSignUp && !isResetMode && signUpStep === 1 && (
              <div className="space-y-4 sm:space-y-6">
                <div className="text-center">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">
                    Personal Information
                  </h3>
                </div>
                {/* Full Name */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 uppercase tracking-wide">
                    FULL NAME *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    <input
                      type="text"
                      value={profileData.full_name}
                      onChange={e => setProfileData({ ...profileData, full_name: e.target.value })}
                      className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl focus:ring-2 focus:border-transparent font-medium text-sm sm:text-base ${
                        isDark? 'border-slate-600 bg-slate-700 text-white focus:ring-yellow-500'
                        :'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'
                      }`}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 uppercase tracking-wide">
                      MONTHLY INCOME TARGET
                    </label>
                    <div className="relative">
                      <Target className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      <span className="absolute left-10 sm:left-12 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 font-semibold text-sm sm:text-base">₹</span>
                      <input
                        type="number"
                        min="0"
                        step="1000"
                        value={profileData.monthly_income_target}
                        onChange={e => setProfileData({ ...profileData, monthly_income_target: e.target.value })}
                        className={`w-full pl-14 sm:pl-16 pr-3 sm:pr-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl focus:ring-2 focus:border-transparent font-medium text-sm sm:text-base ${
                          isDark?'border-slate-600 bg-slate-700 text-white focus:ring-yellow-500'
                          :'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'
                        }`}
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 uppercase tracking-wide">
                      SAVINGS GOAL
                    </label>
                    <div className="relative">
                      <PiggyBank className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      <span className="absolute left-10 sm:left-12 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 font-semibold text-sm sm:text-base">₹</span>
                      <input
                        type="number"
                        min="0"
                        step="1000"
                        value={profileData.savings_goal}
                        onChange={e => setProfileData({ ...profileData, savings_goal: e.target.value })}
                        className={`w-full pl-14 sm:pl-16 pr-3 sm:pr-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl focus:ring-2 focus:border-transparent font-medium text-sm sm:text-base ${
                          isDark?'border-slate-600 bg-slate-700 text-white focus:ring-yellow-500'
                          :'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'
                        }`}
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className={`w-full text-white py-3 sm:py-4 mt-2 rounded-lg sm:rounded-xl transition-all duration-200 font-bold text-sm sm:text-base lg:text-lg flex items-center justify-center space-x-2 sm:space-x-3 shadow-lg hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed ${
                    isDark
                      ? 'bg-gradient-to-r from-yellow-600 via-yellow-700 to-amber-800 hover:from-yellow-700 hover:via-yellow-800 hover:to-amber-900 shadow-yellow-500/25 hover:shadow-yellow-500/40'
                      : 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 shadow-blue-500/25 hover:shadow-blue-500/40'
                  }`}
                >
                  Next
                </button>
              </div>
            )}

            {/* SIGNUP: STEP 2 */}
            {isSignUp && !isResetMode && signUpStep === 2 && (
              <div className="space-y-4 sm:space-y-6">
                <div className="text-center">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">
                    Account Credentials
                  </h3>
                </div>
                {/* Email */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 uppercase tracking-wide">
                    EMAIL ADDRESS
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl focus:ring-2 focus:border-transparent font-medium text-sm sm:text-base ${
                        isDark?'border-slate-600 bg-slate-700 text-white focus:ring-yellow-500'
                        :'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'
                      }`}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                {/* Password + Checklist */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 uppercase tracking-wide">
                    PASSWORD
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      onFocus={() => setPasswordFocused(true)}
                      onBlur={() => setPasswordFocused(false)}
                      className={`w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl focus:ring-2 focus:border-transparent font-medium text-sm sm:text-base ${
                        isDark?'border-slate-600 bg-slate-700 text-white focus:ring-yellow-500'
                        :'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'
                      }`}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                    </button>
                  </div>
                  {/* Checklist only when focused */}
                  {passwordFocused && (
                    <div className="mt-2 flex flex-col space-y-1 text-xs">
                      {passwordChecks.map(({ label, check }) => (
                        <div key={label} className="flex items-center gap-1">
                          {check(password)
                            ? <span className="text-green-500 font-bold">✔</span>
                            : <span className="text-gray-500">•</span>}
                          <span className={check(password)
                            ? "text-green-500 font-medium"
                            : "text-gray-400"}>
                            {label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Password strength bar: optional/professional */}
                  <div className="mt-2 sm:mt-3">
                    <div className="flex space-x-1">
                      {[1,2,3,4,5].map(level=>(
                        <div key={level} className={`h-1.5 sm:h-2 flex-1 rounded-full transition-colors duration-200 ${
                          level<=passwordStrength
                            ? level<=2?'bg-red-500'
                            : level<=3?'bg-yellow-500'
                            : level<=4?'bg-blue-500'
                            : 'bg-green-500'
                          : 'bg-gray-200 dark:bg-gray-600'
                        }`}/>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 sm:mt-2">
                      Password strength: {
                        passwordStrength<=2?'Weak':passwordStrength<=3?'Fair':passwordStrength<=4?'Good':'Strong'
                      }
                    </p>
                  </div>
                </div>
                {/* Confirm Password */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 uppercase tracking-wide">
                    CONFIRM PASSWORD
                  </label>
                  <div className="relative">
                    <Shield className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      className={`w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl focus:ring-2 focus:border-transparent font-medium text-sm sm:text-base ${
                        isDark?'border-slate-600 bg-slate-700 text-white focus:ring-yellow-500'
                        :'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'
                      }`}
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                    </button>
                  </div>
                </div>
                {/* Back & Submit Buttons */}
                <div className="flex space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={handleSignUpBack}
                    className={`w-1/3 py-2 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base border ${
                      isDark?'text-yellow-400 border-yellow-600 hover:bg-yellow-900/20'
                      :'text-blue-700 border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`flex-1 text-white py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-200 font-bold text-sm sm:text-base flex items-center justify-center space-x-2 shadow-lg hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed ${
                      isDark
                        ? 'bg-gradient-to-r from-yellow-600 via-yellow-700 to-amber-800 hover:from-yellow-700 hover:via-yellow-800 hover:to-amber-900 shadow-yellow-500/25 hover:shadow-yellow-500/40'
                        : 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 shadow-blue-500/25 hover:shadow-blue-500/40'
                    } ${loading ? 'from-gray-400 via-gray-500 to-gray-600' : ''}`}
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white" />
                    ) : (
                      <>
                        <User className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span>Create Smart Account</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* SIGN IN & RESET PASSWORD */}
            {!isSignUp && (
              <>
                {/* Email */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 uppercase tracking-wide">
                    EMAIL ADDRESS
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl focus:ring-2 focus:border-transparent font-medium text-sm sm:text-base ${
                        isDark?'border-slate-600 bg-slate-700 text-white focus:ring-yellow-500'
                        :'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'
                      }`}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                {/* Password */}
                {!isResetMode && (
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 uppercase tracking-wide">
                      PASSWORD
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className={`w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl focus:ring-2 focus:border-transparent font-medium text-sm sm:text-base ${
                          isDark?'border-slate-600 bg-slate-700 text-white focus:ring-yellow-500'
                          :'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'
                        }`}
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                      </button>
                    </div>
                  </div>
                )}
                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-200 font-bold text-sm sm:text-base lg:text-lg flex items-center justify-center space-x-2 sm:space-x-3 shadow-lg hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed ${
                    isDark
                      ? 'bg-gradient-to-r from-yellow-600 via-yellow-700 to-amber-800 hover:from-yellow-700 hover:via-yellow-800 hover:to-amber-900 shadow-yellow-500/25 hover:shadow-yellow-500/40'
                      : 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 shadow-blue-500/25 hover:shadow-blue-500/40'
                  } ${loading ? 'from-gray-400 via-gray-500 to-gray-600' : ''}`}
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white" />
                  ) : (
                    <>
                      {isResetMode ? (
                        <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                      ) : (
                        <Wallet className="h-4 w-4 sm:h-5 sm:w-5" />
                      )}
                      <span>{isResetMode ? 'Send Reset Email' : 'Sign In'}</span>
                    </>
                  )}
                </button>
              </>
            )}
          </form>

          {/* Footer */}
          <div className="mt-6 sm:mt-8 text-center space-y-3 sm:space-y-4">
            {!isResetMode && (
              <button
                onClick={() => handleModeSwitch('reset')}
                className={`font-medium text-xs sm:text-sm transition-colors ${
                  isDark? 'text-yellow-400 hover:text-yellow-300':'text-blue-600 hover:text-blue-700'
                }`}
              >
                Forgot your password?
              </button>
            )}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center sm:space-x-2 text-xs sm:text-sm space-y-2 sm:space-y-0">
              <span className="text-gray-600 dark:text-gray-400">
                {isResetMode
                  ? 'Remember your password?'
                  : isSignUp
                  ? 'Already have an account?'
                  : "Don't have an account?"}
              </span>
              <button
                onClick={() => handleModeSwitch(isResetMode ? 'signin' : isSignUp ? 'signin' : 'signup')}
                className={`font-semibold transition-colors ${
                  isDark? 'text-yellow-400 hover:text-yellow-300':'text-blue-600 hover:text-blue-700'
                }`}
              >
                {isResetMode ? 'Sign In' : isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </div>
          </div>

          {/* Security Notice */}
          <div className={`mt-4 sm:mt-6 p-3 sm:p-4 border rounded-lg sm:rounded-xl ${
            isDark? 'bg-yellow-900/20 border-yellow-800':'bg-blue-50 border-blue-200'
          }`}>
            <div className="flex items-center space-x-2">
              <Shield className={`h-3 w-3 sm:h-4 sm:w-4 ${
                isDark ? 'text-yellow-400' : 'text-blue-600'
              }`} />
              <p className={`text-xs font-medium ${
                isDark ? 'text-yellow-300' : 'text-blue-700'
              }`}>
                Your data is protected with enterprise-grade security
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
