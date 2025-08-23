<!-- IoT Dashboard Client - Custom Copilot Instructions -->

# 🚀 IoT Dashboard Development Plan

## Project Overview
Building an animated, real-time IoT dashboard with React 19 + Vite that monitors device readings with smooth animations and live data updates.

## Development Approach
- **Frontend-First**: Build complete UI with dummy data for demonstration
- **Iterative Development**: Build dashboard components one by one based on user specifications
- **User-Driven Structure**: User will specify sidebar categories, subcategories, and data requirements
- **Animation-First**: Every component should have smooth animations and transitions
- **Mock Data Ready**: Use realistic dummy data to simulate IoT device readings
- **Backend-Ready**: Structure components for easy backend integration later

## Current Status: ✅ Dashboard V1 Complete
- [x] Vite + React 19 project scaffolded
- [x] Development server running at http://localhost:5173
- [x] Blue theme with clean design (no glow effects)
- [x] Sidebar with 6 main categories implemented
- [x] Dashboard layout with metric cards and pie charts
- [x] Removed card animations (kept only for pie charts and IoT elements)
- [x] Ready for subcategory content development

## Next Phase: 🎯 Sidebar Categories & Subcategories
**Current Categories:**
1. **Dashboard** (no subcategories) ✅ Complete
2. **Blocks** (subcategories pending) 🔄 Awaiting content
3. **Utilities** (subcategories pending) 🔄 Awaiting content  
4. **Fire System** (subcategories pending) 🔄 Awaiting content
5. **Electrical System** (subcategories pending) 🔄 Awaiting content
6. **HelpDesk** (subcategories pending) 🔄 Awaiting content

**Waiting for user input on:**
- Subcategory names for each main category
- Data structure and content for each subcategory
- IoT-specific animation requirements

## Development Principles
- **Desktop-First Design**: Start with desktop layout, then adapt to mobile
- **Component-Based**: Create reusable, animated components with mock data
- **Demo-Ready**: Design components to showcase functionality with dummy readings
- **Performance-First**: Smooth animations without compromising performance
- **Responsive Adaptation**: Adapt desktop components for mobile screens
- **Touch-Friendly**: Ensure mobile interactions work properly when adapted
- **Scalable**: Easy to add new categories, subcategories, and data types
- **Cross-Device**: Perfect experience on desktop, tablet, and mobile
- **Backend-Ready**: Structure for easy real data integration later

## Technical Stack
- **Frontend**: React 19.1.1 with hooks and modern features
- **Build Tool**: Vite 7.1.2 for fast development
- **Styling**: CSS with animations, transitions, and responsive design
- **Mock Data**: Realistic dummy IoT sensor data for demonstration
- **State Management**: React hooks (useState, useEffect) for demo data
- **Future Backend**: Structure ready for real-time data integration

## Animation Strategy
- **Desktop-Optimized**: Rich animations leveraging desktop performance
- **Data Changes**: Smooth number counters, progress bars, charts with mock updates
- **Loading States**: Desktop-friendly skeleton loaders and spinners
- **Navigation**: Full sidebar for desktop, collapsible for smaller screens
- **Hover Interactions**: Rich hover effects, tooltips, desktop-specific animations
- **Responsive Adaptation**: Components that gracefully scale down to mobile
- **Simulated Real-time**: Mock data updates with pulse effects and transitions
- **Micro-interactions**: Desktop hover effects that adapt to touch on mobile
- **Demo Mode**: Automatic data changes to showcase animations across devices
