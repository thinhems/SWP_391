// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
  
//   const { login, currentUser } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Redirect if already logged in
//   useEffect(() => {
//     if (currentUser) {
//       handleRedirectByRole(currentUser.role);
//     }
//   }, [currentUser]);

//   const handleRedirectByRole = (role) => {
//     const from = location.state?.from?.pathname || getRoleDefaultPath(role);
//     navigate(from, { replace: true });
//   };

//   const getRoleDefaultPath = (role) => {
//     switch (role) {
//       case 'staff':
//         return '/staff';
//       case 'admin':
//         return '/admin';
//       case 'renter':
//       default:
//         return '/';
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     // Clear error when user types
//     if (error) setError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validate form
//     if (!formData.email || !formData.password) {
//       setError('Vui lòng nhập đầy đủ email và mật khẩu');
//       return;
//     }

//     // Add password validation if needed
//     if (formData.password.length < 6) {
//       setError('Mật khẩu phải có ít nhất 6 ký tự');
//       return;
//     }

//     setError('');
//     setLoading(true);

//     try {
//       // Log the exact request being sent
//       console.log('Login request data:', {
//         email: formData.email,
//         password: formData.password,
//         password_length: formData.password.length
//       });
      
//       const result = await login(formData);
//       console.log('Login API response:', result);
      
//       if (result?.success) {
//         console.log('Login successful, user data:', result.data);
//         const { role } = result.data.user;
//         handleRedirectByRole(role);
//       } else {
//         console.error('Login failed:', result?.error || 'Đăng nhập thất bại');
//         setError(result?.error || 'Email hoặc mật khẩu không chính xác');
//         setLoading(false);
//       }
//     } catch (err) {
//       console.error('Login error full details:', err);
//       const errorMessage = err.response?.data?.message || 'Có lỗi xảy ra khi đăng nhập';
//       setError(errorMessage);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Đăng nhập vào tài khoản
//         </h2>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           {error && (
//             <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
//               <div className="flex">
//                 <div className="flex-shrink-0">
//                   <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <div className="ml-3">
//                   <p className="text-sm font-medium text-red-800">Đăng nhập thất bại</p>
//                   <p className="text-sm text-red-700 mt-1">{error}</p>
//                 </div>
//               </div>
//             </div>
//           )}
          
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Mật khẩu
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   autoComplete="current-password"
//                   required
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
//               >
//                 {loading ? (
//                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                 ) : null}
//                 {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
//               </button>
//             </div>
//           </form>

//           <div className="mt-6">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white text-gray-500">
//                   Chưa có tài khoản?
//                 </span>
//               </div>
//             </div>

//             <div className="mt-6">
//               <Link
//                 to="/register"
//                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Đăng ký ngay
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
