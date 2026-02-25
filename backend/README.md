# KnowledgeAiAssist - Backend

The robust backend engine powering KnowledgeAiAssist, built with Node.js, Express, and Sequelize.

## 1. Approach

### Architecture Overview
The backend follows a strict **Service-Controller-Model** pattern to ensure a clean separation of concerns, scalability, and easy testing.
- **API Layer**: Express.js handles routing and HTTP requests.
- **Service Layer**: Contains the core business logic, including AI integration and complex data transformations.
- **Persistence Layer**: Sequelize ORM interacts with MySQL for reliable data management.
- **AI Integration**: Custom service integration with Gemini (Antigravity) and OpenAI for intelligent content features.

### Folder Structure
```text
backend/
├── config/             # Database & environment configurations
├── controllers/        # Request handlers (API entry points)
├── middleware/         # Auth, validation, and error-handling utilities
├── models/             # Sequelize entity definitions
├── routes/             # API route definitions
├── services/           # Core business logic & AI integrations
├── utils/              # Shared helper functions
└── index.js            # Application entry point
```

### Key Design Decisions
- **Service-Controller Pattern**: Moved logic out of controllers into services to make the code more modular and reusable.
- **JWT Authentication**: stateless authentication for security and scalability.
- **Association Management**: Implemented Many-to-Many relationships for Articles and Tags with a dedicated junction table.
- **Ownership Middleware**: Custom logic to ensure users can only modify their own content.

## 2. AI Usage (Mandatory)

This backend was developed using **Antigravity (Powered by Gemini)**, which served as the primary architectural consultant and code generation engine.

### Where AI Helped:
- **Scaffolding**: Rapidly generated the initial Express structure and middleware configuration.
- **Model Generation**: Assisted in defining complex Sequelize models and their associations.
- **AI Service Design**: Guided the implementation of the `ai.service.js` to handle both generative tasks and mock fallbacks.
- **Refactoring**: Suggested the shift to a Service-oriented architecture to improve code quality.

### Manual Review & Corrections:
- **Security Logic**: Manually reinforced the authentication middleware and ownership checks to prevent unauthorized access.
- **DB Associations**: Corrected lazy loading and cascade delete behaviors in Sequelize associations.
- **Error Handling**: Custom-built the error response structure to provide clean, user-friendly feedback.

## 3. Setup Instructions

### Prerequisites
- Node.js (v18+)
- MySQL Database

### Environment Variables
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
DB_HOST=localhost
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=knowledge_ai_assist
JWT_SECRET=your_super_secret_key
AI_API_KEY=your_gemini_or_openai_key
```

### Installation
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Ensure MySQL is running and the database exists.
4. Start the server: `npm start`
