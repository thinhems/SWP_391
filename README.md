# SWP 391 Frontend

A React.js frontend application with axios integration for API communication.

## Features

- ⚛️ React 18 with modern hooks
- 🌐 Axios for HTTP requests with interceptors
- 🛣️ React Router for navigation
- 🔐 Authentication system with Context API
- 📱 Responsive design
- 🎨 Modern CSS styling
- 🔧 Pre-configured services for API communication

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd SWP_391
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp env.example .env
   ```

4. Update the `.env` file with your API URL:
   ```
   REACT_APP_API_URL=http://localhost:3001/api
   ```

5. Start the development server:
   ```bash
   npm start
   ```

The application will open at `http://localhost:3000`.

## Project Structure

```
src/
├── components/          # Reusable components
│   └── Navbar.js       # Navigation component
├── contexts/           # React contexts
│   └── AuthContext.js  # Authentication context
├── pages/              # Page components
│   ├── Home.js         # Home page
│   ├── Login.js        # Login page
│   ├── Register.js     # Registration page
│   └── Dashboard.js    # Dashboard page
├── services/           # API services
│   ├── api.js          # Axios configuration
│   ├── authService.js  # Authentication services
│   └── dataService.js  # Generic data services
├── App.js              # Main app component
├── App.css             # App styles
├── index.js            # Entry point
└── index.css           # Global styles
```

## Services

### API Service (`services/api.js`)
- Pre-configured axios instance
- Request/response interceptors
- Automatic token handling
- Error handling

### Auth Service (`services/authService.js`)
- User login/register
- Token management
- Authentication state

### Data Service (`services/dataService.js`)
- Generic CRUD operations
- Search functionality
- Error handling

## Usage Examples

### Making API Calls

```javascript
import { dataService } from './services/dataService';

// Get all items
const result = await dataService.getAll('/users');

// Create new item
const newItem = await dataService.create('/users', userData);

// Update item
const updated = await dataService.update('/users', id, updateData);

// Delete item
const deleted = await dataService.delete('/users', id);
```

### Authentication

```javascript
import { useAuth } from './contexts/AuthContext';

const { user, login, logout, isAuthenticated } = useAuth();

// Login
const result = await login({ email, password });

// Check authentication
if (isAuthenticated) {
  // User is logged in
}
```

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Environment Variables

- `REACT_APP_API_URL` - Backend API URL (default: http://localhost:3001/api)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
