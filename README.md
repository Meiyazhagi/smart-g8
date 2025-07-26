# Smart Rental System Frontend

A comprehensive vehicle rental platform with GPS-based mechanic support, built with Next.js, MongoDB, and modern web technologies.

## Features

### 🚗 **Multi-Role System**
- **Users**: Browse and book vehicles, emergency mechanic support, rate services
- **Vendors**: Manage vehicle fleet, track bookings, analytics dashboard
- **Mechanics**: Receive service requests, update availability, build reputation
- **Admins**: System oversight, approve mechanics, moderate reviews

### 🗺️ **GPS Integration**
- Real-time location tracking
- Find nearby mechanics using geolocation
- Especially useful for rural areas with limited service availability
- Google Maps integration for directions

### ⭐ **Community Features**
- Rate and review mechanics (1-5 stars)
- Community-driven feedback system
- Transparent mechanic ratings
- Help other users make informed decisions

### 🔧 **Emergency Support**
- One-click emergency mechanic finder
- Real-time availability status
- Contact mechanics directly
- GPS-based distance calculation

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Lucide React** - Icons

### Backend
- **Next.js API Routes** - Server-side logic
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Key Libraries
- **Geolocation API** - Location services
- **React Hook Form** - Form handling
- **Zod** - Schema validation

## Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
\`\`\`bash
git clone <repository-url>
cd smart-rental-system
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
\`\`\`

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
\`\`\`env
MONGODB_URI=mongodb://localhost:27017/smartrental
JWT_SECRET=your-super-secret-jwt-key-here
NEXTAUTH_URL=http://localhost:3000
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
\`\`\`

4. **Start MongoDB**
Make sure MongoDB is running on your system.

5. **Run the development server**
\`\`\`bash
npm run dev
\`\`\`

6. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## Database Models

### User
- Authentication and profile information
- Role-based access (user, vendor, mechanic, admin)
- Contact details and preferences

### Vehicle
- Vehicle details (make, model, year, type)
- Pricing and availability
- Features and images
- Geolocation data

### Booking
- Rental reservations
- Date ranges and pricing
- Status tracking
- Customer and vendor information

### Mechanic
- Business information and services
- Location and contact details
- Availability and working hours
- Approval status

### Review
- User feedback and ratings
- Service quality assessment
- Moderation status
- Helpful votes

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Vehicles
- `GET /api/vehicles` - List available vehicles
- `POST /api/vehicles` - Add new vehicle (vendors)

### Bookings
- `GET /api/bookings` - User/vendor bookings
- `POST /api/bookings` - Create new booking

### Mechanics
- `GET /api/mechanics` - Find mechanics (with GPS)
- `POST /api/mechanics` - Register as mechanic

### Reviews
- `GET /api/reviews` - Get reviews
- `POST /api/reviews` - Submit review

### Admin
- `GET /api/admin/users` - Manage users
- `GET /api/admin/mechanics` - Approve mechanics
- `POST /api/admin/mechanics/[id]/approve` - Approve mechanic

## Features in Detail

### User Dashboard
- **Browse Vehicles**: Search and filter available vehicles
- **My Bookings**: Track current and past rentals
- **Emergency Support**: GPS-based mechanic finder
- **Reviews**: Rate and review mechanics

### Vendor Dashboard
- **Fleet Management**: Add and manage vehicles
- **Booking Management**: Track customer reservations
- **Analytics**: Revenue and performance metrics
- **Customer Communication**: Direct contact with renters

### Admin Dashboard
- **Mechanic Approvals**: Review and approve mechanic applications
- **User Management**: Monitor all platform users
- **Review Moderation**: Moderate user reviews
- **System Analytics**: Platform-wide statistics

### Mechanic Features
- **Service Requests**: Receive emergency calls
- **Availability Management**: Update working status
- **Location Services**: GPS-based visibility
- **Reputation Building**: Collect reviews and ratings

## Deployment

### Environment Setup
1. Set up MongoDB Atlas or local MongoDB
2. Configure environment variables
3. Set up Google Maps API key
4. Configure email services (optional)

### Build and Deploy
\`\`\`bash
npm run build
npm start
\`\`\`

### Recommended Platforms
- **Vercel** - Seamless Next.js deployment
- **Netlify** - Alternative hosting
- **Railway** - Full-stack deployment
- **DigitalOcean** - VPS deployment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

---

**Smart Rental System** - Bridging the gap between vehicle users and mechanics through GPS technology and community feedback.
