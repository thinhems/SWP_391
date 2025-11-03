import { useState } from 'react';
import { Form, Field, ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faLock, 
  faEye, 
  faEyeSlash,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';

export default function LoginFormCard({ formikProps, onNavigateToRegister, onForgotPassword }) {
  const [showPassword, setShowPassword] = useState(false);
  // lấy các props từ Formik
  const { isSubmitting, status } = formikProps;

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow-xl sm:rounded-xl sm:px-10 border border-gray-100">
        {/* Form */}
        <Form className="space-y-6">
          {/* email field */}
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
                    placeholder="Nhập email của bạn"
                  />
                )}
              </Field>
            </div>
            <ErrorMessage name="email" component="div" className="mt-2 text-sm text-red-600 flex items-center">
              <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
              <ErrorMessage name="email" />
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
                    autoComplete="current-password"
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
              <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
              <ErrorMessage name="password" />
            </ErrorMessage>
          </div>
          {/* ghi nhớ login */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Field name="rememberMe">
                {({ field }) => (
                  <input
                    {...field}
                    id="rememberMe"
                    type="checkbox"
                    checked={field.value}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                )}
              </Field>
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                Ghi nhớ đăng nhập
              </label>
            </div>

            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm text-green-600 hover:text-green-500 font-medium transition-colors cursor-pointer"
            >
              Quên mật khẩu?
            </button>
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
            onClick={(e) => {
              if (isSubmitting) {
                e.preventDefault();
                return;
              }
            }}
            className={`cursor-pointer group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white transition-all duration-200 ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-lg hover:shadow-xl'
            }`}
          >
            {isSubmitting ? (
              <>
                <FontAwesomeIcon icon={faSpinner} className="animate-spin h-4 w-4 mr-2" />
                Đang đăng nhập...
              </>
            ) : (
              'Đăng nhập'
            )}
          </button>
        </Form>
        {/* register link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Chưa có tài khoản?{' '}
            <button
              type="button"
              onClick={onNavigateToRegister}
              className="font-medium text-green-600 hover:text-green-500 transition-colors cursor-pointer"
            >
              Đăng ký ngay
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}