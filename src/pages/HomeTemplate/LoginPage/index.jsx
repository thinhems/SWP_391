import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { Formik } from 'formik';
import * as Yup from 'yup';
import LoginHeader from './LoginHeader';
import LoginFormCard from './LoginFormCard';

// khởi tạo schema validation cho form đăng nhập
const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email('Email không hợp lệ')
    .required('Email là bắt buộc'),
  password: Yup.string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .required('Mật khẩu là bắt buộc'),
  rememberMe: Yup.boolean()
});

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated, loading, user } = useAuth();

  // nếu đã đăng nhập, chuyển hướng theo vai trò
  if (isAuthenticated && !loading) {
    if (user?.role === 'admin') return <Navigate to="/admin" replace />;
    if (user?.role === 'staff') return <Navigate to="/staff" replace />;
    return <Navigate to="/" replace />;
  }
  // giá trị ban đầu cho form đăng nhập
  const initialValues = {
    email: '',
    password: '',
    rememberMe: false
  };
  // hàm xử lý khi submit form đăng nhập
  const handleSubmit = async (values, { setSubmitting, setFieldError, setStatus }) => {
    setStatus(null);
    try {
      const result = await login({
        email: values.email,
        password: values.password,
        rememberMe: values.rememberMe
      });
      if (result.success) {
        const role = result?.data?.user?.role;
        if (role === 'admin') {
          navigate('/admin', { replace: true });
        } else if (role === 'staff') {
          navigate('/staff', { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      } else {
        // đăng nhập thất bại
        setStatus(result.message || 'Đăng nhập thất bại');
      }
    } catch (error) {
      console.error('Login error:', error);
      setStatus('Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  };
  // hàm chuyển hướng đến trang đăng ký
  const handleNavigateToRegister = () => {
    navigate('/register');
  };
  // hàm xử lý khi quên mật khẩu
  const handleForgotPassword = () => {
    alert('Chức năng quên mật khẩu sẽ được cập nhật sau!');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500 border-b-4 border-gray-300 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Đang kiểm tra đăng nhập...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <LoginHeader />
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <LoginFormCard
            formikProps={formikProps}
            onNavigateToRegister={handleNavigateToRegister}
            onForgotPassword={handleForgotPassword}
          />
        )}
      </Formik>
    </div>
  );
}