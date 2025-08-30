# AI-Powered Incident Triage Assistant - React Frontend

A modern, responsive React frontend for the AI-Powered Incident Triage Assistant. Built with React 18, Tailwind CSS, and comprehensive testing.

## 🚀 Features

- **Modern React Architecture**: Built with React 18, hooks, and functional components
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **State Management**: Context API with useReducer for predictable state updates
- **Real-time Updates**: Automatic refresh and optimistic updates
- **Form Validation**: Client-side validation with error handling
- **Loading States**: Comprehensive loading indicators and skeleton screens
- **Error Handling**: Graceful error handling with user-friendly messages
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- **Testing**: Unit tests, integration tests, and E2E tests with Cypress

## 🏗️ Architecture

### Component Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.js       # Navigation header
│   ├── SeverityBadge.js # Severity indicator component
│   ├── CategoryBadge.js # Category indicator component
│   ├── LoadingSpinner.js # Loading indicator
│   ├── IncidentCard.js # Incident list item
│   └── __tests__/      # Component unit tests
├── pages/              # Page components
│   ├── Dashboard.js    # Main dashboard
│   ├── CreateIncident.js # Incident creation form
│   └── IncidentDetail.js # Incident detail view
├── context/            # React Context
│   └── IncidentContext.js # Global state management
├── services/           # API services
│   ├── incidentService.js # API client
│   └── __tests__/      # Service unit tests
└── cypress/            # E2E tests
    └── e2e/            # Cypress test files
```

### Technology Stack

- **React 18**: Latest React with hooks and concurrent features
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API communication
- **React Hot Toast**: Toast notifications
- **Lucide React**: Modern icon library
- **Jest & React Testing Library**: Unit testing
- **Cypress**: End-to-end testing

## 📋 Prerequisites

- Node.js 16+ 
- npm or yarn
- Go backend running on `http://localhost:8080`

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:8080/api/v1
```

### 3. Start Development Server

```bash
npm start
```

The application will start on `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

### 5. Run Tests

```bash
# Unit tests
npm test

# Unit tests with coverage
npm run test:coverage

# E2E tests (requires app to be running)
npm run test:e2e

# Open Cypress UI
npm run cypress:open
```

## 🧪 Testing Strategy

### Unit Tests

- **Components**: Test individual component rendering and behavior
- **Services**: Test API service functions with mocked responses
- **Context**: Test state management and actions
- **Coverage**: Maintain 80%+ code coverage

### Integration Tests

- **API Integration**: Test service layer with real API calls
- **Context Integration**: Test component interactions with context
- **Form Validation**: Test form submission and validation flows

### E2E Tests

- **User Journeys**: Complete user workflows from start to finish
- **Cross-browser**: Test in multiple browsers
- **Responsive**: Test on different screen sizes
- **Accessibility**: Test keyboard navigation and screen readers

## 📱 User Interface

### Dashboard

- **Statistics Cards**: Real-time incident statistics
- **Search & Filter**: Advanced filtering by severity, category, and text
- **Incident Grid**: Responsive grid layout for incident cards
- **Quick Actions**: Create new incidents and refresh data

### Create Incident

- **Form Validation**: Real-time validation with helpful error messages
- **AI Processing Notice**: Inform users about AI analysis
- **Character Count**: Live character count for description field
- **Loading States**: Visual feedback during submission

### Incident Detail

- **AI Insights**: Display AI-generated severity and category
- **Metadata**: Show creation date, affected service, and timestamps
- **Actions**: Edit, delete, and export incident data
- **Quick Actions**: Create similar incidents and export details

## 🎨 Design System

### Colors

- **Primary**: Blue (#3B82F6) for main actions and branding
- **Severity Colors**: 
  - Low: Green (#10B981)
  - Medium: Yellow (#F59E0B)
  - High: Red (#EF4444)
  - Critical: Dark Red (#7C2D12)

### Typography

- **Headings**: Inter font family for clear hierarchy
- **Body**: System font stack for optimal readability
- **Code**: Monospace font for technical content

### Components

- **Cards**: Consistent card design with subtle shadows
- **Buttons**: Primary and secondary button styles
- **Badges**: Color-coded severity and category badges
- **Forms**: Clean form design with proper spacing

## 🔧 Development

### Code Style

- **ESLint**: Enforce consistent code style
- **Prettier**: Automatic code formatting
- **Husky**: Pre-commit hooks for quality checks

### Performance

- **Code Splitting**: Lazy loading for route-based code splitting
- **Memoization**: React.memo and useMemo for performance optimization
- **Bundle Analysis**: Webpack bundle analyzer for optimization

### Accessibility

- **ARIA Labels**: Proper accessibility attributes
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Compatible with screen readers
- **Color Contrast**: WCAG AA compliant color contrast

## 🚀 Deployment

### Build Process

```bash
# Install dependencies
npm install

# Run tests
npm run test:coverage

# Build for production
npm run build

# Serve build files
npx serve -s build
```

### Environment Variables

- `REACT_APP_API_URL`: Backend API URL
- `REACT_APP_ENVIRONMENT`: Environment (development, staging, production)

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 📊 Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🔒 Security

- **Input Validation**: Client-side validation for all forms
- **XSS Prevention**: React's built-in XSS protection
- **HTTPS**: Secure communication with backend
- **Environment Variables**: Secure handling of sensitive data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

### Development Guidelines

- Follow React best practices
- Write comprehensive tests
- Maintain accessibility standards
- Update documentation
- Follow the established code style

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the test examples

---

**Built with ❤️ using React and modern web technologies**
