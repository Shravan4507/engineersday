# 🎓 Engineers' Day 2025

> **Innovate. Create. Celebrate.**

A modern, interactive web application built for Engineers' Day 2025 celebration at Zeal College. This project showcases three exciting engineering events with a beautiful, responsive interface and real-time Firebase integration.

🌐 **Live Demo**: [https://shravan4507.github.io/engineersday/](https://shravan4507.github.io/engineersday/)

*Last updated: September 19, 2025 - Dynamic registration system with Firebase integration*

## ✨ Features

### 🎯 **Three Featured Events**
- **Code Cooking** - Fast-paced coding challenge for developers
- **Prompt Engineering** - AI interaction and prompt design competition  
- **Technical Poster** - Hand-crafted poster presentation on tech topics

### 🚀 **Modern Tech Stack**
- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: CSS3 with modern animations and gradients
- **3D Graphics**: Three.js with React Three Fiber
- **Backend**: Firebase Firestore for real-time data
- **Deployment**: GitHub Pages with automated CI/CD

### 🎨 **User Experience**
- **Dark/Light Theme** toggle with smooth transitions
- **Interactive 3D Orb** animation (dark mode only)
- **Responsive Design** for all device sizes
- **Real-time Registration** with Firebase integration
- **Toast Notifications** for user feedback
- **Smooth Scrolling** navigation
- **Countdown Timer** to event day

### 🔥 **Firebase Integration**
- Real-time event data synchronization
- User registration management
- Live participant count tracking
- Comprehensive error handling
- Development testing tools

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 19, TypeScript, Vite |
| **Styling** | CSS3, Custom animations |
| **3D Graphics** | Three.js, React Three Fiber, OGL |
| **Backend** | Firebase Firestore |
| **State Management** | React Context API |
| **Routing** | React Router DOM |
| **Deployment** | GitHub Pages, GitHub Actions |
| **Code Quality** | ESLint, TypeScript strict mode |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project (optional, for full functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shravan4507/engineersday.git
   cd engineersday
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Firebase Setup (Optional)

For full functionality including real-time data and registrations:

1. **Create Firebase project** at [Firebase Console](https://console.firebase.google.com/)
2. **Enable Firestore Database**
3. **Add Firebase config** to `src/firebase/config.ts`
4. **Update Firestore rules** (see [FIRESTORE_SETUP.md](./FIRESTORE_SETUP.md))

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── CountdownSection.tsx
│   ├── EventsSection.tsx
│   ├── HomeSection.tsx
│   ├── Navbar.tsx
│   ├── Orb.tsx          # 3D animated orb
│   └── ...
├── contexts/            # React Context providers
│   └── ThemeContext.tsx
├── firebase/            # Firebase configuration & services
│   ├── config.ts
│   ├── eventService.ts
│   └── initDatabase.ts
├── hooks/               # Custom React hooks
│   └── useTheme.ts
├── assets/              # Images and static assets
└── App.tsx              # Main application component
```

## 🎨 Key Components

### **HomeSection**
- Hero banner with animated title
- Event statistics display
- Call-to-action buttons

### **EventsSection** 
- Dynamic event cards with Firebase integration
- Event-specific icons and gradients
- Real-time participant tracking
- Registration modal integration

### **Orb Component**
- Interactive 3D sphere using Three.js
- Hover effects and smooth animations
- Theme-aware visibility

### **RegistrationModal**
- Multi-step registration form
- Event pre-selection
- Firebase data persistence
- Form validation and error handling

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run deploy` | Deploy to GitHub Pages |

## 🎯 Events Details

### Code Cooking 🍳
- **Duration**: 2 hours
- **Format**: Solo or Duo participation
- **Focus**: Creativity, functionality, code quality
- **Max Participants**: 50

### Prompt Engineering 🤖
- **Duration**: ~1 hour  
- **Format**: Solo participation
- **Focus**: Clarity, creativity, impact
- **Max Participants**: 30

### Technical Poster 📊
- **Duration**: 15-30 minutes
- **Format**: Solo participation
- **Themes**: AI, Cloud Computing, Cybersecurity
- **Max Participants**: 25

## 🌐 Deployment

The application is automatically deployed to GitHub Pages using GitHub Actions:

1. **Push to main branch** triggers deployment
2. **Build process** compiles TypeScript and optimizes assets
3. **Deploy to gh-pages** branch
4. **Live at**: `https://shravan4507.github.io/engineersday/`

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend Development**: React + TypeScript
- **3D Graphics**: Three.js integration
- **Backend Integration**: Firebase Firestore
- **UI/UX Design**: Modern responsive design
- **Deployment**: GitHub Pages + Actions

## 🆘 Support

For support and questions:
- 📧 Email: [Your Email]
- 🐛 Issues: [GitHub Issues](https://github.com/shravan4507/engineersday/issues)
- 📖 Documentation: [FIRESTORE_SETUP.md](./FIRESTORE_SETUP.md)

---

**Built with ❤️ for Engineers' Day 2025 | Zeal College**
