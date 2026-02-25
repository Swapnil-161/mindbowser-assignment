# KnowledgeAiAssist - Frontend

A premium, AI-powered writing and knowledge-sharing interface built with React.

## 1. Approach

### Architecture Overview
The frontend is a modern SPA (Single Page Application) built with **React** and **Vite**, focusing on high performance and a rich user experience.
- **State Management**: React Context API (AuthContext) for secure user sessions.
- **UI Framework**: React-Bootstrap for core components, heavily customized with professional CSS.
- **Routing**: React Router DOM (v7) for seamless, context-aware navigation.
- **Rich Text Editing**: Powered by `react-quill-new` for a professional writing environment.

### Folder Structure
```text
frontend/
├── src/
│   ├── components/     # Reusable UI components (Navbar, Cards, Editor)
│   ├── context/        # React Contexts (Auth)
│   ├── pages/          # Main application views (Home, Dashboard, Create/Edit)
│   ├── services/       # API integration layer (Axios)
│   ├── assets/         # Static images and professional backgrounds
│   └── index.css       # Global design system & premium utility classes
└── index.html          # Entry HTML template
```

### Key Design Decisions
- **"Crispy" Design System**: Custom-built CSS system focusing on deep shadows, refined letter-spacing, and professional gradients.
- **Context-Aware Navigation**: Navbars that dynamically adjust based on the user's route (Auth pages vs. Platform pages).
- **Glassmorphism**: Applied to the navbar and various UI elements for a modern, high-end feel.
- **AI-Powered UX**: Integrated "Improve with AI" features directly into the writing flow with "Magic" gradient buttons.

## 2. AI Usage (Mandatory)

The frontend UI and UX were meticulously crafted with the help of **Antigravity (Powered by Gemini)**.

### Where AI Helped:
- **Component Scaffolding**: Generated the baseline structure for complex pages like the Dashboard and Article Editor.
- **Creative Styling**: Provided the CSS logic for glassmorphism, "crispy" article cards, and the AI "Magic" gradients.
- **Form Management**: Assisted in building robust validation and error handling for Login and Signup flows.
- **UI Ideas**: Suggested the "image-free" text-centric card layout to project a more professional, editorial feel.

### Manual Review & Corrections:
- **Scroll Logic**: Manually implemented and refined the scroll-aware navbar transitions on the Home page.
- **Aesthetic Refinement**: Corrected and adjusted AI-generated shadow intensities and color palettes to ensure a cohesive premium brand.
- **Responsive Layouts**: Manually tweaked Bootstrap grid behaviors to ensure perfect display on mobile and tablet devices.

## 3. Setup Instructions

### Prerequisites
- Node.js (v18+)
- Backend server running (see backend README)

### Environment Variables
Create a `.env` file in the `frontend/` directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Installation
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Visit `http://localhost:5173` to view the platform.
