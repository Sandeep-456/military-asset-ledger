
# Military Asset Management System

A comprehensive full-stack application for managing military assets with secure authentication, role-based access control, and real-time asset tracking.

## Features

### 🔐 Authentication & Security
- JWT-based authentication
- Role-based access control (RBAC)
- Password hashing with bcrypt
- Secure API endpoints

### 👥 User Roles
- **Admin**: Full system access, user management
- **Base Commander**: Access to assigned base data, transfer approvals
- **Logistics Officer**: Limited access for purchases and transfers

### 📊 Dashboard
- Real-time asset metrics
- Opening/Closing balance tracking
- Net movement calculations
- Interactive filters (Date, Base, Equipment Type)
- Detailed net movement breakdown modal

### 🏢 Asset Management
- **Purchases**: Record equipment purchases with supplier tracking
- **Transfers**: Manage asset transfers between bases
- **Assignments**: Assign assets to personnel
- **Expenditures**: Track consumed/damaged assets

### 🛠 Technical Stack

#### Frontend
- React 18 with JSX
- React Router DOM for navigation
- Context API for state management
- Axios for API communication
- Tailwind CSS for styling
- Lucide React for icons

#### Backend
- Node.js with Express
- SQLite database
- JWT authentication
- Winston logging
- Express Validator for input validation
- CORS enabled

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd military-asset-management
```

2. **Install dependencies**
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
```

3. **Set up environment variables**
```bash
cd server
cp .env.example .env
# Edit .env with your configuration
```

4. **Start the application**

In one terminal (Backend):
```bash
cd server
npm start
```

In another terminal (Frontend):
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

### Demo Credentials

| Role | Username | Password |
|------|----------|----------|
| Admin | admin | admin123 |
| Base Commander | commander | commander123 |
| Logistics Officer | logistics | logistics123 |

## Database Schema

### Core Tables
- **users**: User accounts with roles and base assignments
- **bases**: Military base information
- **equipment_types**: Equipment categories and specifications
- **assets**: Individual asset tracking
- **purchases**: Purchase records and supplier information
- **transfers**: Asset transfer history between bases
- **assignments**: Personnel asset assignments
- **expenditures**: Asset consumption/damage records
- **audit_logs**: Complete system activity logging

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get user profile

### Dashboard
- `GET /api/dashboard/metrics` - Dashboard metrics with filters
- `GET /api/dashboard/net-movement` - Detailed movement breakdown

### Assets (Future Implementation)
- `GET /api/assets` - List assets
- `POST /api/assets` - Create asset
- `PUT /api/assets/:id` - Update asset
- `DELETE /api/assets/:id` - Delete asset

## Security Features

### Authentication
- JWT tokens with 24-hour expiration
- Secure password hashing using bcrypt
- Protected routes with token validation

### Authorization
- Role-based access control middleware
- Base-specific data filtering
- Admin-only user management

### Logging & Auditing
- Complete API activity logging
- User action tracking with IP addresses
- Database audit logs for all operations

## Role Permissions

### Admin
- Full system access
- User management (create, edit, delete)
- Access to all bases and assets
- System configuration

### Base Commander
- Access to assigned base data only
- Asset transfer approvals
- Personnel assignments
- Base-specific reporting

### Logistics Officer
- Purchase recording
- Transfer requests
- Limited asset management
- Basic reporting

## Development

### Project Structure
```
/
├── src/                    # React frontend
│   ├── components/         # Reusable UI components
│   ├── contexts/          # React contexts (Auth)
│   ├── pages/             # Page components
│   ├── services/          # API services
│   └── App.jsx            # Main app component
├── server/                # Express backend
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── routes/           # API routes
│   ├── db/               # Database setup
│   └── server.js         # Main server file
└── README.md
```

### Key Features Implementation

#### Dashboard Metrics
- Real-time calculation of opening/closing balances
- Net movement tracking (Purchases + Transfers In - Transfers Out)
- Filtering by date range, base, and equipment type
- Interactive modal for detailed movement breakdown

#### Role-Based Access
- Middleware enforcement at API level
- Frontend route protection
- Data filtering based on user role and base assignment

#### Audit Logging
- Winston logger for application logs
- Database audit trails for all operations
- IP address and user agent tracking

## Future Enhancements

- [ ] Real-time notifications
- [ ] Advanced reporting with charts
- [ ] Barcode/QR code scanning
- [ ] Mobile application
- [ ] Integration with external systems
- [ ] Advanced search and filtering
- [ ] Bulk operations
- [ ] Data export capabilities

## Support

For technical support or feature requests, please contact the development team.

## License

This project is proprietary and confidential. Unauthorized copying or distribution is prohibited.
