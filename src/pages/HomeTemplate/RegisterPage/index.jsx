import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { Formik } from 'formik';
import * as Yup from 'yup';
import RegisterHeader from './RegisterHeader';
import RegisterFormCard from './RegisterFormCard';
// khởi tạo schema validation cho form đăng ký
const registerValidationSchema = Yup.object({
  fullName: Yup.string()
    .min(2, 'Họ tên phải có ít nhất 2 ký tự')
    .max(50, 'Họ tên không được vượt quá 50 ký tự')
    .required('Họ và tên là bắt buộc'),
  email: Yup.string()
    .email('Email không hợp lệ')
    .required('Email là bắt buộc'),
  phone: Yup.string()
    .matches(/^[0-9]{10,11}$/, 'Số điện thoại phải có 10-11 chữ số')
    .required('Số điện thoại là bắt buộc'),
  password: Yup.string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .matches(/^(?=.*[a-zA-Z])(?=.*\d)/, 'Mật khẩu phải chứa ít nhất 1 chữ cái và 1 số')
    .required('Mật khẩu là bắt buộc'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Mật khẩu xác nhận không khớp')
    .required('Xác nhận mật khẩu là bắt buộc'),
  agreeToTerms: Yup.boolean()
    .oneOf([true], 'Bạn phải đồng ý với điều khoản và điều kiện')
    .required('Bạn phải đồng ý với điều khoản và điều kiện')
});

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, isAuthenticated, loading } = useAuth();
  // nếu đã đăng nhập, chuyển hướng đến trang dashboard
  if (isAuthenticated && !loading) {
    return <Navigate to="/staff" replace />;
  }
  // giá trị ban đầu cho form đăng ký
  const initialValues = {
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  };
  // hàm xử lý khi submit form đăng ký
  const handleSubmit = async (values, { setSubmitting, setFieldError, setStatus }) => {
    setStatus(null);
    console.log('Register form values:', values); // log giá trị form
    try {
      const result = await register({
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        password: values.password
      });
      if (result.success) {
        alert('Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.');
        navigate('/login');
      } else {
        if (result.errors) {
          Object.keys(result.errors).forEach(field => {
            setFieldError(field, result.errors[field]);
          });
        } else {
          setStatus(result.message || 'Đăng ký thất bại');
        }
      }
    } catch (error) {
      console.error('Register error:', error);
      setStatus('Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  };
  // hàm chuyển hướng đến trang đăng nhập
  const handleNavigateToLogin = () => {
    navigate('/login');
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
      <RegisterHeader />
      <Formik
        initialValues={initialValues}
        validationSchema={registerValidationSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <RegisterFormCard
            formikProps={formikProps}
            onNavigateToLogin={handleNavigateToLogin}
          />
        )}
      </Formik>
    </div>
  );
}