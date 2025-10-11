import React, { useState } from 'react';
import ProfileInformationSection from './ProfileInformationSection';
import PasswordChangeSection from './PasswordChangeSection';

export default function PersonalInfo({ user }) {
  // state hiển thị thông báo msg
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth || '',
    gender: user?.gender || ''
  });
  // password change state
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  // handle cập nhật lại value form
  const handleProfileChange = (e) => {
    setProfileForm({
      ...profileForm,
      [e.target.name]: e.target.value
    });
  };
  // handle edit profile
  const handleEditProfile = () => {
    setIsEditing(true);
  };
  // handle cancle edit profile
  const handleCancelEdit = () => {
    setIsEditing(false);
    setProfileForm({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      dateOfBirth: user?.dateOfBirth || '',
      gender: user?.gender || ''
    });
  };
  // handle save profile
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // fake call API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage({ type: 'success', text: 'Cập nhật thông tin thành công!' });
      setIsEditing(false);
    } catch (error) {
      setMessage({ type: 'error', text: 'Có lỗi xảy ra. Vui lòng thử lại!' });
    } finally {
      setProfileLoading(false);
    }
  };

  // handle cập nhật value cho form password
  const handlePasswordChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value
    });
  };
  // handle show/hide password
  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };
  // handle submit đổi mật khẩu
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordLoading(true);
    setMessage({ type: '', text: '' });

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({ type: 'error', text: 'Mật khẩu mới không khớp!' });
      setPasswordLoading(false);
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Mật khẩu mới phải có ít nhất 6 ký tự!' });
      setPasswordLoading(false);
      return;
    }

    try {
      // fake call API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage({ type: 'success', text: 'Đổi mật khẩu thành công!' });
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      setMessage({ type: 'error', text: 'Có lỗi xảy ra. Vui lòng thử lại!' });
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* msg thông báo */}
      {message.text && (
        <div className={`mb-6 p-4 rounded-lg border ${
          message.type === 'success' 
            ? 'bg-green-50 border-green-200 text-green-800'
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <div className="flex items-center">
            {message.type === 'success' ? (
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {message.text}
          </div>
        </div>
      )}
      {/* main contain */}
      <div className="space-y-8">
        <ProfileInformationSection 
          user={user}
          isEditing={isEditing}
          loading={profileLoading}
          profileForm={profileForm}
          handleProfileChange={handleProfileChange}
          handleEditProfile={handleEditProfile}
          handleCancelEdit={handleCancelEdit}
          handleSaveProfile={handleSaveProfile}
        />
        <PasswordChangeSection 
          loading={passwordLoading}
          showPasswords={showPasswords}
          passwordForm={passwordForm}
          handlePasswordChange={handlePasswordChange}
          togglePasswordVisibility={togglePasswordVisibility}
          handleChangePassword={handleChangePassword}
        />
      </div>
    </div>
  );
};
