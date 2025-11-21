import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

// Validation schema với Yup
const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Tên phải có ít nhất 2 ký tự')
    .max(50, 'Tên không được quá 50 ký tự')
    .required('Vui lòng nhập họ và tên'),
  email: Yup.string()
    .email('Email không hợp lệ')
    .required('Vui lòng nhập email'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Số điện thoại phải có 10 chữ số')
    .required('Vui lòng nhập số điện thoại'),
  subject: Yup.string()
    .min(5, 'Chủ đề phải có ít nhất 5 ký tự')
    .max(100, 'Chủ đề không được quá 100 ký tự')
    .required('Vui lòng nhập chủ đề'),
  message: Yup.string()
    .min(10, 'Nội dung phải có ít nhất 10 ký tự')
    .max(500, 'Nội dung không được quá 500 ký tự')
    .required('Vui lòng nhập nội dung tin nhắn')
});

export default function ContactForm() {
  const initialValues = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Xử lý gửi form
    alert(`Cảm ơn ${values.name}! Chúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi sớm nhất.`);
    resetForm();
    setSubmitting(false);
  };

  return (
    <div className="py-5 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mt-6 mb-4">
            Để Lại <span style={{ color: '#188f49' }}>Lời Nhắn</span>
          </h2>
          <p className="text-lg text-gray-600">
            Điền thông tin bên dưới, chúng tôi sẽ liên hệ lại trong 24 giờ
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-green-300 p-8 md:p-12">
          <Formik
            initialValues={initialValues}
            validationSchema={contactSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Họ và Tên <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="text"
                      name="name"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.name && touched.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      style={{ focusRingColor: '#188f49' }}
                      onFocus={(e) => e.target.style.borderColor = '#188f49'}
                      onBlur={(e) => {
                        if (!errors.name) e.target.style.borderColor = '#d1d5db';
                      }}
                      placeholder="Nguyễn Văn A"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.email && touched.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      onFocus={(e) => e.target.style.borderColor = '#188f49'}
                      onBlur={(e) => {
                        if (!errors.email) e.target.style.borderColor = '#d1d5db';
                      }}
                      placeholder="email@example.com"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Số Điện Thoại <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="tel"
                      name="phone"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.phone && touched.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      onFocus={(e) => e.target.style.borderColor = '#188f49'}
                      onBlur={(e) => {
                        if (!errors.phone) e.target.style.borderColor = '#d1d5db';
                      }}
                      placeholder="0123456789"
                    />
                    <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Chủ Đề <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="text"
                      name="subject"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.subject && touched.subject ? 'border-red-500' : 'border-gray-300'
                      }`}
                      onFocus={(e) => e.target.style.borderColor = '#188f49'}
                      onBlur={(e) => {
                        if (!errors.subject) e.target.style.borderColor = '#d1d5db';
                      }}
                      placeholder="Tư vấn thuê xe"
                    />
                    <ErrorMessage name="subject" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                </div>

                {/* Message */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nội Dung <span className="text-red-500">*</span>
                  </label>
                  <Field
                    as="textarea"
                    name="message"
                    rows="6"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all resize-none ${
                      errors.message && touched.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    onFocus={(e) => e.target.style.borderColor = '#188f49'}
                    onBlur={(e) => {
                      if (!errors.message) e.target.style.borderColor = '#d1d5db';
                    }}
                    placeholder="Nhập nội dung tin nhắn của bạn..."
                  />
                  <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-4 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: '#188f49' }}
                    onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = '#146b39')}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#188f49'}
                  >
                    <FontAwesomeIcon icon={faPaperPlane} />
                    <span>{isSubmitting ? 'Đang gửi...' : 'Gửi Tin Nhắn'}</span>
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
