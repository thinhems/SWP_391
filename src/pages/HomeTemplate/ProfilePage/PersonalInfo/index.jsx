import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ProfileInformationSection from './ProfileInformationSection';
import PasswordChangeSection from './PasswordChangeSection';
import { useAuth } from '../../../../contexts/AuthContext';

export default function PersonalInfo({ user }) {
  // state hiển thị thông báo msg
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
   // state loading + show password
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const { updateProfile, changePassword } = useAuth();
  // Validation schema cho profile form
  const profileValidationSchema = Yup.object({
    name: Yup.string()
      .required('Vui lòng nhập họ tên')
      .min(2, 'Họ tên phải có ít nhất 2 ký tự')
      .max(100, 'Họ tên không được vượt quá 100 ký tự'),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Số điện thoại phải có 10 chữ số'),
    address: Yup.string()
      .max(200, 'Địa chỉ không được vượt quá 200 ký tự')
  });

  // Formik cho profile form
  const profileFormik = useFormik({
    initialValues: {
      name: user?.name || '',
      phone: user?.phone || '',
      address: user?.address || ''
    },
    validationSchema: profileValidationSchema,
    onSubmit: async (values) => {
      setProfileLoading(true);
      setMessage({ type: '', text: '' });

      try {
        await updateProfile(user.id, values);
        
        setMessage({ type: 'success', text: 'Cập nhật thông tin thành công!' });
        setIsEditing(false);
      } catch (error) {
        setMessage({ type: 'error', text: 'Có lỗi xảy ra. Vui lòng thử lại!' });
      } finally {
        setProfileLoading(false);
      }
    }
  });

  // handle edit profile
  const handleEditProfile = () => {
    setIsEditing(true);
  };

  // handle cancel edit profile
  const handleCancelEdit = () => {
    setIsEditing(false);
    profileFormik.resetForm();
  };
  
  // Validation schema cho password form
  const passwordValidationSchema = Yup.object({
    currentPassword: Yup.string()
      .required('Vui lòng nhập mật khẩu hiện tại'),
    newPassword: Yup.string()
      .required('Vui lòng nhập mật khẩu mới')
      .min(6, 'Mật khẩu mới phải có ít nhất 6 ký tự'),
    confirmPassword: Yup.string()
      .required('Vui lòng xác nhận mật khẩu mới')
      .oneOf([Yup.ref('newPassword')], 'Mật khẩu xác nhận không khớp')
  });

  // Formik cho password form
  const passwordFormik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: passwordValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      setPasswordLoading(true);
      setMessage({ type: '', text: '' });

      try {
        // Chuẩn bị data theo format API yêu cầu
        await changePassword(user.id, {
          CurrentPassword: values.currentPassword,
          NewPassword: values.newPassword,
          ConfirmNewPassword: values.confirmPassword
        });
        
        setMessage({ type: 'success', text: 'Đổi mật khẩu thành công!' });
        resetForm();
      } catch (error) {
        setMessage({ 
          type: 'error', 
          text: error.response?.data?.message || error.response?.data?.title || 'Có lỗi xảy ra. Vui lòng thử lại!' 
        });
      } finally {
        setPasswordLoading(false);
      }
    }
  });

  // handle show/hide password
  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
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
          formik={profileFormik}
          handleEditProfile={handleEditProfile}
          handleCancelEdit={handleCancelEdit}
        />
        <PasswordChangeSection 
          loading={passwordLoading}
          showPasswords={showPasswords}
          formik={passwordFormik}
          togglePasswordVisibility={togglePasswordVisibility}
        />
      </div>
    </div>
  );
};
