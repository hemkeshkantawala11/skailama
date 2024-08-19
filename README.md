# Skailama (V0)

This project is designed to handle video transcripts for users. It allows users to create projects (such as podcasts), add transcripts for different videos, and manage them effortlessly. This is the initial version (V0) of the project, with plans to integrate AI features for automatic transcript generation in future releases.
Also this version of the project is as per the assignment given by the company called **ZURA VENTURES** supported company called **SKAILAMA**.

## Table of Contents
1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Future Enhancements](#future-enhancements)
4. [Installation](#installation)
5. [Download Steps](#download-steps)
6. [Usage](#usage)
7. [Issues](#issues)
8. [Contribution](#contribution)

## Features
- **Project Creation**: Users can create new projects (e.g., podcasts) and add multiple video transcripts within each project.
- **Transcript Management**: Users can easily add and manage transcripts for different videos under their created projects.
- **Google Login with Firebase**: Firebase is implemented for Google login functionality (currently under development).
- **JWT Authentication**: Secure login system using JWT for user authentication.
- **MongoDB Integration**: MongoDB is used for database and data storage.
- **React Frontend**: The user interface is built using React.js for seamless and dynamic interaction.
- **Express Backend**: Backend API services are handled using Express.js.
- **Cookie-based Storage**: Cookies are used to store user data securely, avoiding local storage.
- **AI Transcription (Coming Soon)**: Users will soon be able to generate transcripts by providing a YouTube video link or uploading a video directly to the dashboard.

## Tech Stack
- **Frontend**: React.js
- **Backend**: Express.js (Node.js)
- **Database**: MongoDB
- **Authentication**: JWT-based system
- **Google Login**: Firebase (currently non-functional)
- **Storage**: Cookies for data storage (no use of local storage)

## Future Enhancements
- **AI-Powered Transcription**: Users will soon be able to get transcripts by:
  1. Providing a YouTube video link.
  2. Uploading videos to the dashboard for automatic transcript generation.
  
## Installation

To get a local copy up and running, follow these steps:

### Prerequisites
- Node.js installed on your machine
- MongoDB instance running locally or on a cloud service
- Firebase account for Google Authentication

### Steps to Run the Project
1. **Clone the repository**:
   \`\`\`bash
   git clone https://github.com/yourusername/project-repo.git
   \`\`\`

2. **Navigate to the project directory**:
   \`\`\`bash
   cd project-repo
   \`\`\`

3. **Install dependencies for both frontend and backend**:
   - Frontend dependencies:
     \`\`\`bash
     cd client
     npm install
     \`\`\`
   - Backend dependencies:
     \`\`\`bash
     cd ../server
     npm install
     \`\`\`

4. **Set up environment variables**:
   - Create a \`.env\` file in the root directory and provide the following keys:
     \`\`\`
     MONGO_URI=<Your MongoDB Connection String>
     JWT_SECRET=<Your JWT Secret>
     FIREBASE_API_KEY=<Your Firebase API Key>
     FIREBASE_AUTH_DOMAIN=<Your Firebase Auth Domain>
     \`\`\`

5. **Run the backend server**:
   \`\`\`bash
   cd server
   npm start
   \`\`\`

6. **Run the frontend application**:
   \`\`\`bash
   cd ../client
   npm start
   \`\`\`

7. **Access the application**:
   Open your browser and go to \`http://localhost:3000\` to interact with the frontend.

## Download Steps
1. Ensure that you have Node.js and MongoDB installed on your machine.
2. Clone the repository using the following command:
   \`\`\`bash
   git clone https://github.com/yourusername/project-repo.git
   \`\`\`
3. Follow the steps mentioned under [Installation](#installation) to set up and run the project.

## Usage
1. **Login**: Once the app is running, open the web app and log in using your credentials. Google login via Firebase will be added soon.
2. **Create Project**: After logging in, create a new project. You can name it according to your preference (e.g., "Podcast Project").
3. **Add Transcripts**: After creating a project, you can start adding transcripts for your videos. Each video should be associated with a transcript, which can be manually added.
4. **Manage Transcripts**: You can edit or delete the transcripts for each video inside the project.
5. **Upcoming AI Features**: In future versions, you will be able to generate transcripts automatically by:
   - Providing a YouTube video link.
   - Uploading a video directly from your dashboard.

## Issues
- If you face any issues, feel free to check the [issue tracker](https://github.com/hemkeshkantawala11/skailama/issues) and add issues over there. Contributions and pull requests are welcome.
- Also currently I have added an issue regarding the google authentication so please feel free to solve it and open the pull request.

## Contribution
To contribute, please fork the repository, create a feature branch, and submit a pull request. For major changes, open an issue first to discuss what you would like to change.

