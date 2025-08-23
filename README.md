# IoT Dashboard Client

A modern IoT Dashboard built with React 19 and Vite, designed for real-time monitoring and control of IoT devices.

## Features

- ⚡ **Fast Development**: Powered by Vite for lightning-fast development and building
- ⚛️ **Modern React**: Built with React 19 with latest features and hooks
- 🎨 **Modern Styling**: CSS with dark/light mode support and responsive design
- 🔧 **ESLint Integration**: Code quality and consistency with ESLint rules
- 📱 **Responsive Design**: Works seamlessly across desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v20.19+ or v22.12+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd IoT_Dashboard_Client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

## Project Structure

```
src/
  ├── assets/          # Static assets (images, icons, etc.)
  ├── components/      # Reusable React components
  ├── App.jsx         # Main application component
  ├── App.css         # Application-specific styles
  ├── index.css       # Global styles
  └── main.jsx        # Application entry point
```

## Technology Stack

- **Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.2
- **Bundler**: ESLint for code linting
- **Styling**: CSS with modern features and dark/light mode support

## Development

This project uses:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) - Uses Babel for Fast Refresh
- Modern CSS with CSS custom properties for theming
- ESLint configuration for code quality

## Future Enhancements

This is a starter template. Consider adding:

- State management (Redux Toolkit, Zustand, or Context API)
- Routing (React Router)
- UI component library (Material-UI, Chakra UI, or Ant Design)
- Data fetching library (React Query, SWR, or Apollo Client)
- Testing setup (Jest, Vitest, React Testing Library)
- IoT-specific libraries for device communication

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
