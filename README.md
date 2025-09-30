Culinary AI Assistant 🍳🤖
Welcome to the Culinary AI Assistant, an intelligent web application designed to be your personal kitchen helper. This app uses the power of generative AI to help you discover new recipes based on the ingredients you already have. Just upload a photo of your ingredients, and let the AI chef do the rest!

This project is a full-stack application built with a modern technology stack, showcasing best practices in web development, API design, and AI integration.

🌟 Core Features
Secure User Authentication: Full user registration and login system using secure JWTs.

AI Ingredient Recognition: Users can upload a photo of their ingredients, which are then identified by the Gemini Vision AI.

Dynamic AI Recipe Generation: Based on the identified ingredients, our AI Chef (powered by the Gemini Language Model) generates a unique, delicious recipe complete with a description, prep/cook times, and step-by-step instructions.

Professional, Responsive UI: A modern and clean user interface built with React that looks great on both desktop and mobile devices.

Fully Containerized: The entire application (Frontend, Backend, Database) is containerized with Docker for easy setup, consistency, and deployment.

💻 Technology Stack
Frontend:

React (with Vite): A powerful JavaScript library for building user interfaces.

CSS Modules: For component-scoped, maintainable styling.

Axios: For clean and reliable communication with the backend API.

Backend:

Node.js & Express: For building a robust and scalable RESTful API.

PostgreSQL: A powerful, open-source relational database.

JWT (JSON Web Tokens): For secure, stateless user authentication.

Multer: For handling image file uploads.

AI Integration:

Google Gemini AI:

Vision Model: For identifying ingredients from images.

Language Model: For generating creative and structured recipes.

DevOps & Deployment:

Docker & Docker Compose: For containerizing the entire application stack.

🚀 Getting Started
Thanks to Docker, running this project locally is incredibly simple.

Prerequisites:

You must have Docker Desktop installed and running on your machine.

Installation & Launch:

Clone the repository:

git clone [https://github.com/Anshika03singh/culinary-ai-assistant.git](https://github.com/Anshika03singh/culinary-ai-assistant.git)
cd culinary-ai-assistant

Create your environment file:

In the backend folder, create a file named .env.

You will need to add your own DATABASE_URL, JWT_SECRET, and GEMINI_API_KEY.

Launch the application:

Run the following command from the root of the project:

docker-compose up --build

That's it!

The application will be available at http://localhost:5173.
