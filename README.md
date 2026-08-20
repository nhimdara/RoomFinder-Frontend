# 🏢 RoomFinder - Modern Student Housing & Rental Platform

A modern, production-grade student accommodation and landlord management web application built with React, Vite, Google Maps Platform, and modular enterprise architecture.

---

## 📁 Project Architecture & Structure

```
frontend/
│
├── public/
│   ├── images/
│   │   ├── rooms/           # Local fallback room photo assets
│   │   ├── logo.png         # Brand vector icons
│   │   └── placeholder.jpg  # Image load fallback
│   │
│   ├── favicon.svg          # Modern SVG favicon
│   └── favicon.ico
│
├── src/
│   │
│   ├── assets/
│   │   └── images/          # UI illustration vectors
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx       # Responsive header with role badges
│   │   │   ├── Footer.jsx       # Multi-column footer & newsletter
│   │   │   ├── Button.jsx       # Reusable button with variants & icons
│   │   │   ├── Modal.jsx        # Accessible dialog modal
│   │   │   ├── Loading.jsx      # Skeleton & spinner loader
│   │   │   ├── AuthModal.jsx    # Complete Login, Register, OTP modal
│   │   │   └── ToastContainer.jsx # Floating alerts
│   │   │
│   │   ├── room/
│   │   │   ├── RoomCard.jsx     # Listing card with price tag & wishlist
│   │   │   ├── RoomGrid.jsx     # Responsive CSS grid
│   │   │   ├── RoomImage.jsx    # Lazy loading photo component
│   │   │   ├── RoomAmenities.jsx # Icon-mapped amenities chips
│   │   │   ├── RoomOwner.jsx    # Superhost card with verification
│   │   │   └── InquiryModal.jsx # Interactive tour booking modal
│   │   │
│   │   ├── search/
│   │   │   ├── SearchBar.jsx     # Debounced campus/district search
│   │   │   ├── FilterSidebar.jsx # Explorer filter panel
│   │   │   ├── PriceFilter.jsx   # Monthly budget range slider
│   │   │   ├── LocationFilter.jsx # University vicinity selector
│   │   │   └── HeroSearch.jsx    # Landing search widget
│   │   │
│   │   └── map/
│   │       ├── RoomMap.jsx       # Map wrapper component
│   │       └── InteractiveMap.jsx # Real Google Maps with street/satellite tiles
│   │
│   ├── pages/
│   │   ├── Home.jsx             # Hero, popular hubs, testimonials
│   │   ├── Rooms.jsx            # Split/Grid/Map view room explorer
│   │   ├── RoomDetails.jsx      # 5-photo mosaic, rules, transit, sticky booking
│   │   ├── Login.jsx            # Standalone login view
│   │   ├── Register.jsx         # Standalone register view
│   │   ├── Favorites.jsx        # Bookmarked listings manager
│   │   ├── Profile.jsx          # Student account & tour tracker
│   │   ├── PostRoom.jsx         # 5-step room publishing wizard
│   │   ├── EditRoom.jsx         # Room editing portal
│   │   │
│   │   ├── owner/
│   │   │   ├── Dashboard.jsx    # Landlord analytics KPI overview
│   │   │   ├── MyRooms.jsx      # Property portfolio manager
│   │   │   ├── RoomManagement.jsx # Applications & inquiries reviewer
│   │   │   ├── OwnerDashboard.jsx
│   │   │   ├── MyListings.jsx
│   │   │   └── OwnerInquiries.jsx
│   │   │
│   │   ├── student/
│   │   │   ├── Dashboard.jsx    # Student saved rooms & application tracker
│   │   │   └── MyBookings.jsx   # Scheduled tour visits manager
│   │   │
│   │   └── admin/
│   │       └── AdminDashboard.jsx # Super Admin Landlord control & Email center
│   │
│   ├── layouts/
│   │   ├── MainLayout.jsx       # Navbar + Main Content + Footer
│   │   ├── AuthLayout.jsx       # Centered card authentication layout
│   │   └── DashboardLayout.jsx  # Dedicated control center layout
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx        # Route registry with role guards
│   │
│   ├── services/
│   │   ├── api.js               # Base client wrapper
│   │   ├── authService.js       # Auth, 6-digit OTP, & password reset
│   │   ├── roomService.js       # Property query & filter service
│   │   └── userService.js       # Profile management service
│   │
│   ├── context/
│   │   ├── AppContext.jsx       # Root global state & persistence
│   │   ├── AuthContext.jsx      # Auth session context
│   │   └── FavoriteContext.jsx  # Wishlist context
│   │
│   ├── hooks/
│   │   ├── useAuth.js           # Current user & auth helpers
│   │   ├── useRooms.js          # Room listing actions & filters
│   │   └── useDebounce.js       # Search input debouncer
│   │
│   ├── data/
│   │   ├── rooms.js             # Room listings & popular locations
│   │   ├── amenities.js         # Amenities catalog & icon mapping
│   │   └── mockRooms.js         # Initial mock database
│   │
│   ├── utils/
│   │   ├── formatPrice.js       # Currency formatting
│   │   ├── formatDate.js        # Dates & relative timestamps
│   │   └── distance.js          # Haversine distance to campus
│   │
│   ├── App.jsx                  # Root App provider stack
│   ├── main.jsx                 # Vite DOM entry
│   └── index.css                # Figma design tokens & typography
│
├── .env.example
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Quickstart

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Dev Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🔑 Demo Logins

- **🎓 Student / Seeker**: `alex.rivera@stanford.edu` (Alex Rivera)
- **🏠 Landlord / Owner**: `sarah.j@roomfinder.com` (Sarah Jenkins)
- **🛡️ Super Admin**: `admin@roomfinder.com` (Platform Super Admin)
