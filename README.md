# Resume Template Website

This repository hosts the codebase for a **Resume Template Website** built using **React**, **Tailwind CSS**, **RTK Query** for state management, and **Firebase** for the backend. The application allows users to easily create, customize, and store professional resumes using an intuitive, responsive interface.


## Features

- **User Authentication:** Secure user authentication using Firebase (Email, Google Sign-In).
- **Resume Builder:** A dynamic and customizable resume builder to create and edit resumes in real-time.
- **State Management:** Efficient data fetching and state management with RTK Query for handling the resume and user data.
- **Responsive Design:** Built with Tailwind CSS to ensure responsiveness across devices.
- **Firebase Integration:** Firestore is used for database management to store and retrieve user data and resumes securely.
- **Auto-Save:** Real-time saving of the user's progress, with updates immediately reflected in Firebase.
- **Preview & Export:** Preview the resume live and download it in PDF format.
  
## Technologies Used

- **Frontend:**
  - React: For building the user interface and handling the logic.
  - Tailwind CSS: For styling the application with a mobile-first, utility-first approach.
  - RTK Query: For state management and efficient data handling.
  
- **Backend:**
  - Firebase Authentication: For user sign-up and login functionality.
  - Firebase Firestore: To store and manage user resume data.
  
- **Tools:**
  - Vite: For fast development with an optimized build process.
  - Git & GitHub: Version control and collaboration.

## Getting Started

### Prerequisites

To run this project locally, you need the following installed on your system:
- **Node.js** (v14+)
- **npm** or **yarn**
- **Firebase Project** for Firebase authentication and Firestore database.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/UcheTheo/Resume.git
   cd Resume
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up Firebase:**
   - Create a Firebase project and add your app's Firebase config to a `.env` file in the root of the project.
   - `.env` file:
     ```bash
     REACT_APP_FIREBASE_API_KEY=your-api-key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
     REACT_APP_FIREBASE_PROJECT_ID=your-project-id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     REACT_APP_FIREBASE_APP_ID=your-app-id
     ```

4. **Run the application:**
   ```bash
   npm start
   # or
   yarn start
   ```

   The app should now be running on `http://localhost:3000`.

### Deployment

You can deploy the app using Firebase Hosting or any other hosting platform like Vercel or Netlify.

To deploy using Firebase Hosting:

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Log in to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase Hosting in your project:
   ```bash
   firebase init
   ```

4. Deploy the app:
   ```bash
   npm run build
   firebase deploy
   ```

## Folder Structure

```bash
├── public/               # Public assets
├── src/
│   ├── app/              # RTK Query setup and state management
│   ├── components/       # Reusable UI components
│   ├── features/         # RTK Query slices and resume-related logic
│   ├── firebase/         # Firebase configuration and services
│   ├── pages/            # Main application pages (Home, Dashboard, etc.)
│   └── styles/           # Tailwind and global styles
├── .env                  # Environment variables (Firebase config)
├── package.json          # Project metadata and dependencies
└── README.md             # Project documentation
```

## Contributing

Contributions are welcome! Please follow the standard Git workflow:

1. **Fork** this repository.
2. **Clone** the fork to your local machine.
3. Create a **new branch** for your feature or fix.
4. **Commit** your changes.
5. **Push** the branch to your fork.
6. Create a **pull request**.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Acknowledgments

- Thanks to the contributors of Firebase, React, Tailwind CSS, and RTK Query for providing the tools that power this project.
