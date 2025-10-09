import { useState } from 'react';
import { Form, Field, ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEye, 
  faEyeSlash, 
  faSpinner,
  faUser,
  faEnvelope,
  faPhone,
  faLock
} from '@fortawesome/free-solid-svg-icons';

export default function RegisterFormCard({
  formikProps,
  onNavigateToLogin
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // lấy các props từ Formik
  const { isSubmitting, status } = formikProps;

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow-xl sm:rounded-xl sm:px-10 border border-gray-100">
        {/* Form */}
        <Form className="space-y-6">
          {/* họ tên field */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
              Họ và tên <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faUser} className="h-4 w-4 text-gray-400" />
              </div>
              <Field name="fullName">
                {({ field, meta }) => (
                  <input
                    {...field}
                    id="fullName"
                    type="text"
                    autoComplete="name"
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                      meta.touched && meta.error 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="Nhập họ và tên đầy đủ"
                  />
                )}
              </Field>
            </div>
            <ErrorMessage name="fullName" component="div" className="mt-2 text-sm text-red-600 flex items-center">
              {msg => msg && (
                <div className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  {msg}
                </div>
              )}
            </ErrorMessage>
          </div>
          {/* email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4 text-gray-400" />
              </div>
              <Field name="email">
                {({ field, meta }) => (
                  <input
                    {...field}
                    id="email"
                    type="email"
                    autoComplete="email"
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                      meta.touched && meta.error 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="Nhập địa chỉ email"
                  />
                )}
              </Field>
            </div>
            <ErrorMessage name="email" component="div" className="mt-2 text-sm text-red-600 flex items-center">
              {msg => msg && (
                <div className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  {msg}
                </div>
              )}
            </ErrorMessage>
          </div>
          {/* phone field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faPhone} className="h-4 w-4 text-gray-400" />
              </div>
              <Field name="phone">
                {({ field, meta }) => (
                  <input
                    {...field}
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                      meta.touched && meta.error 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="Nhập số điện thoại"
                  />
                )}
              </Field>
            </div>
            <ErrorMessage name="phone" component="div" className="mt-2 text-sm text-red-600 flex items-center">
              {msg => msg && (
                <div className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  {msg}
                </div>
              )}
            </ErrorMessage>
          </div>
          {/* password field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Mật khẩu <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faLock} className="h-4 w-4 text-gray-400" />
              </div>
              <Field name="password">
                {({ field, meta }) => (
                  <input
                    {...field}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    className={`block w-full pl-10 pr-12 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                      meta.touched && meta.error 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="Nhập mật khẩu"
                  />
                )}
              </Field>
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon 
                  icon={showPassword ? faEyeSlash : faEye} 
                  className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" 
                />
              </button>
            </div>
            <ErrorMessage name="password" component="div" className="mt-2 text-sm text-red-600 flex items-center">
              {msg => msg && (
                <div className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  {msg}
                </div>
              )}
            </ErrorMessage>
          </div>
          {/* xác nhận password field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Xác nhận mật khẩu <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faLock} className="h-4 w-4 text-gray-400" />
              </div>
              <Field name="confirmPassword">
                {({ field, meta }) => (
                  <input
                    {...field}
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    className={`block w-full pl-10 pr-12 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                      meta.touched && meta.error 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="Nhập lại mật khẩu"
                  />
                )}
              </Field>
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <FontAwesomeIcon 
                  icon={showConfirmPassword ? faEyeSlash : faEye} 
                  className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" 
                />
              </button>
            </div>
            <ErrorMessage name="confirmPassword" component="div" className="mt-2 text-sm text-red-600 flex items-center">
              {msg => msg && (
                <div className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  {msg}
                </div>
              )}
            </ErrorMessage>
          </div>
          {/* điều khoản */}
          <div className="flex items-start">
            <Field name="agreeToTerms">
              {({ field, meta }) => (
                <input
                  {...field}
                  id="agreeToTerms"
                  type="checkbox"
                  checked={field.value}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-1"
                />
              )}
            </Field>
            <div className='flex flex-col ml-2'>
              <div>
                <label htmlFor="agreeToTerms" className="ml-3 block text-sm text-gray-700">
                  Tôi đồng ý với{' '}
                  <button type="button" className="text-green-600 hover:text-green-500 font-medium cursor-pointer">
                    Điều khoản và Điều kiện
                  </button>{' '}
                  và{' '}
                  <button type="button" className="text-green-600 hover:text-green-500 font-medium cursor-pointer">
                    Chính sách Bảo mật
                  </button>{' '}
                  <span className="text-red-500">*</span>
                </label>
              </div>
              <div className='-ml-4'>
                <ErrorMessage name="agreeToTerms" component="div" className="ml-7 text-sm text-red-600" />
              </div>
            </div>
          </div>
          
          {/* thông báo lỗi */}
          {status && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                {status}
              </p>
            </div>
          )}
          {/* nút submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`cursor-pointer w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white transition-all duration-200 ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-lg hover:shadow-xl'
            }`}
          >
            {isSubmitting ? (
              <>
                <FontAwesomeIcon icon={faSpinner} className="animate-spin h-4 w-4 mr-2" />
                Đang đăng ký...
              </>
            ) : (
              'Đăng ký tài khoản'
            )}
          </button>
          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Đã có tài khoản?{' '}
              <button
                type="button"
                onClick={onNavigateToLogin}
                className="font-medium text-green-600 hover:text-green-500 transition-colors cursor-pointer"
              >
                Đăng nhập ngay
              </button>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}