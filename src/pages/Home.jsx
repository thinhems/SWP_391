import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Tương Lai Xanh
              <span className="highlight"> Di Chuyển Thông Minh</span>
            </h1>
            <p className="hero-subtitle">
              Khám phá giải pháp di chuyển bền vững với xe điện VinFast. 
              Thuê xe linh hoạt, chi phí tối ưu, thân thiện với môi trường.
            </p>
            <div className="hero-buttons">
              {isAuthenticated ? (
                <Link to="/dashboard" className="btn btn-primary btn-large">
                  Quản lý đặt xe
                </Link>
              ) : (
                <div className="button-group">
                  <Link to="/register" className="btn btn-primary btn-large">
                    Đăng ký ngay
                  </Link>
                  <Link to="/login" className="btn btn-outline btn-large">
                    Đăng nhập
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="hero-image">
            <div className="electric-car-illustration">
              🚗⚡
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Tại sao chọn Green Future?</h2>
            <p>Dịch vụ cho thuê xe điện hàng đầu với những ưu điểm vượt trội</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Xe điện đời mới</h3>
              <p>Đội xe VinFast mới nhất, công nghệ tiên tiến, hiệu suất cao</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌱</div>
              <h3>Thân thiện môi trường</h3>
              <p>Giảm khí thải, bảo vệ môi trường, góp phần phát triển bền vững</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Chi phí tối ưu</h3>
              <p>Gói thuê linh hoạt, giá cả cạnh tranh, không phí ẩn</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛠️</div>
              <h3>Hỗ trợ 24/7</h3>
              <p>Đội ngũ chuyên nghiệp, hỗ trợ toàn diện, chăm sóc tận tình</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Đặt xe dễ dàng</h3>
              <p>Ứng dụng thông minh, thủ tục đơn giản, thanh toán nhanh chóng</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔋</div>
              <h3>Trạm sạc rộng khắp</h3>
              <p>Mạng lưới trạm sạc toàn quốc, sạc nhanh, tiện lợi</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Packages Section */}
      <section className="packages-section">
        <div className="container">
          <div className="section-header">
            <h2>Gói dịch vụ linh hoạt</h2>
            <p>Chọn gói thuê phù hợp với nhu cầu của bạn</p>
          </div>
          <div className="packages-grid">
            <div className="package-card">
              <div className="package-header">
                <h3>Gói Ngày</h3>
                <div className="price">Từ 500k<span>/ngày</span></div>
              </div>
              <ul className="package-features">
                <li>✅ Xe điện VinFast mới</li>
                <li>✅ Bảo hiểm đầy đủ</li>
                <li>✅ Hỗ trợ 24/7</li>
                <li>✅ Miễn phí sạc</li>
              </ul>
              <Link to="/register" className="btn btn-outline">Chọn gói</Link>
            </div>
            <div className="package-card featured">
              <div className="package-badge">Phổ biến</div>
              <div className="package-header">
                <h3>Gói Tháng</h3>
                <div className="price">Từ 8tr<span>/tháng</span></div>
              </div>
              <ul className="package-features">
                <li>✅ Xe điện VinFast mới</li>
                <li>✅ Bảo hiểm đầy đủ</li>
                <li>✅ Hỗ trợ 24/7</li>
                <li>✅ Miễn phí sạc</li>
                <li>✅ Bảo dưỡng miễn phí</li>
                <li>✅ Giảm giá 20%</li>
              </ul>
              <Link to="/register" className="btn btn-primary">Chọn gói</Link>
            </div>
            <div className="package-card">
              <div className="package-header">
                <h3>Gói Năm</h3>
                <div className="price">Từ 80tr<span>/năm</span></div>
              </div>
              <ul className="package-features">
                <li>✅ Xe điện VinFast mới</li>
                <li>✅ Bảo hiểm đầy đủ</li>
                <li>✅ Hỗ trợ 24/7</li>
                <li>✅ Miễn phí sạc</li>
                <li>✅ Bảo dưỡng miễn phí</li>
                <li>✅ Giảm giá 30%</li>
                <li>✅ Ưu tiên đổi xe</li>
              </ul>
              <Link to="/register" className="btn btn-outline">Chọn gói</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Sẵn sàng bắt đầu hành trình xanh?</h2>
            <p>Tham gia cùng hàng nghìn khách hàng đã tin tưởng Green Future</p>
            <div className="cta-buttons">
              {isAuthenticated ? (
                <Link to="/dashboard" className="btn btn-white btn-large">
                  Quản lý đặt xe
                </Link>
              ) : (
                <Link to="/register" className="btn btn-white btn-large">
                  Đăng ký ngay
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
