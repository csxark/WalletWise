import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, Briefcase, Target, PiggyBank, Wallet, Save, Edit3, X } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import { useAuth } from '../hooks/useAuth';

const UserProfile = () => {
  const { profile, updateProfile, loading, isPremium } = useProfile();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    phone: profile?.phone || '',
    date_of_birth: profile?.date_of_birth || '',
    occupation: profile?.occupation || '',
    monthly_income_target: profile?.monthly_income_target || 0,
    savings_goal: profile?.savings_goal || 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        date_of_birth: profile.date_of_birth || '',
        occupation: profile.occupation || '',
        monthly_income_target: profile.monthly_income_target || 0,
        savings_goal: profile.savings_goal || 0,
      });
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare the data, converting empty date string to null
      const updateData = {
        ...formData,
        date_of_birth: formData.date_of_birth === '' ? null : formData.date_of_birth,
      };
      
      await updateProfile(updateData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      full_name: profile?.full_name || '',
      phone: profile?.phone || '',
      date_of_birth: profile?.date_of_birth || '',
      occupation: profile?.occupation || '',
      monthly_income_target: profile?.monthly_income_target || 0,
      savings_goal: profile?.savings_goal || 0,
    });
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 dark:from-slate-200 dark:via-slate-100 dark:to-slate-50 bg-clip-text text-transparent">
            User Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 font-medium text-sm sm:text-base">
            Manage your account settings and preferences
          </p>
        </div>
        <div className="flex items-center space-x-1 text-blue-600 dark:text-slate-400">
          <Wallet className="h-5 w-5" />
          <span className="text-sm font-semibold">
            {isPremium ? 'Smart Account' : 'Standard Account'}
          </span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 backdrop-blur-sm">
        <div className="p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 lg:mb-8 gap-4">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 lg:h-16 lg:w-16 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-slate-600 dark:to-slate-700 rounded-2xl flex items-center justify-center shadow-lg">
                <User className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                  {profile?.full_name || 'User'}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base">{profile?.email}</p>
                {isPremium && (
                  <div className="flex items-center space-x-1 text-blue-600 dark:text-slate-400 mt-1">
                    <Wallet className="h-4 w-4" />
                    <span className="text-sm font-semibold">Smart Member</span>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-slate-600 dark:hover:bg-slate-700 text-white rounded-xl transition-colors font-medium text-sm lg:text-base"
            >
              {isEditing ? <X className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
              <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
            </button>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white font-medium text-sm lg:text-base"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white font-medium text-sm lg:text-base"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      value={formData.date_of_birth}
                      onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white font-medium text-sm lg:text-base"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                    Occupation
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.occupation}
                      onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white font-medium text-sm lg:text-base"
                      placeholder="Enter your occupation"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                    Monthly Income Target
                  </label>
                  <div className="relative">
                    <Target className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <span className="absolute left-12 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 font-semibold">₹</span>
                    <input
                      type="number"
                      min="0"
                      step="1000"
                      value={formData.monthly_income_target}
                      onChange={(e) => setFormData({ ...formData, monthly_income_target: parseFloat(e.target.value) || 0 })}
                      className="w-full pl-16 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white font-medium text-sm lg:text-base"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                    Savings Goal
                  </label>
                  <div className="relative">
                    <PiggyBank className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <span className="absolute left-12 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 font-semibold">₹</span>
                    <input
                      type="number"
                      min="0"
                      step="1000"
                      value={formData.savings_goal}
                      onChange={(e) => setFormData({ ...formData, savings_goal: parseFloat(e.target.value) || 0 })}
                      className="w-full pl-16 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white font-medium text-sm lg:text-base"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors font-medium text-sm lg:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 dark:from-slate-600 dark:via-slate-700 dark:to-slate-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 dark:hover:from-slate-700 dark:hover:via-slate-800 dark:hover:to-slate-900 disabled:from-gray-400 disabled:via-gray-500 disabled:to-gray-600 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg shadow-blue-500/25 dark:shadow-slate-700/25 hover:shadow-blue-500/40 dark:hover:shadow-slate-700/40 disabled:cursor-not-allowed text-sm lg:text-base"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  <span>{isSubmitting ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              <div className="space-y-4 lg:space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                    <p className="text-gray-900 dark:text-white font-semibold text-sm lg:text-base">{profile?.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <Phone className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="text-gray-900 dark:text-white font-semibold text-sm lg:text-base">
                      {profile?.phone || 'Not provided'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <Briefcase className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Occupation</p>
                    <p className="text-gray-900 dark:text-white font-semibold text-sm lg:text-base">
                      {profile?.occupation || 'Not provided'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 lg:space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <Target className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Monthly Income Target</p>
                    <p className="text-gray-900 dark:text-white font-semibold text-sm lg:text-base">
                      ₹{profile?.monthly_income_target?.toLocaleString('en-IN') || '0'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <PiggyBank className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Savings Goal</p>
                    <p className="text-gray-900 dark:text-white font-semibold text-sm lg:text-base">
                      ₹{profile?.savings_goal?.toLocaleString('en-IN') || '0'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date of Birth</p>
                    <p className="text-gray-900 dark:text-white font-semibold text-sm lg:text-base">
                      {profile?.date_of_birth ? new Date(profile.date_of_birth).toLocaleDateString() : 'Not provided'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;