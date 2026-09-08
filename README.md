# fieldwork SSE Console — User Onboard

A modern, responsive, mobile-first web application built with **React**, **TanStack Start & Router**, **Tailwind CSS**, and **Firebase Authentication**.

---

## 🚀 Features

- **Email & Password Authentication**: Full user creation and session handling via the Firebase Web SDK.
- **Client-Side Form Validation**: Comprehensive inline error checking on registration and detail review screens.
- **Protected Routing**: Secures the Details & Validation page against unauthenticated access.
- **Password Security**: In-memory password state during flow transition; passwords are never persisted to insecure storage or unmasked unexpectedly.
- **Responsive Layout**: Designed mobile-first, looking sleek on mobile phones, tablets, and desktop workstations.

---

## 📋 Application Flow

```text
Registration Page (/) 
        ↓ (Name, Email, Password)
Firebase Auth (createUserWithEmailAndPassword + updateProfile)
        ↓
Details & Validation Page (/details) 
        ↓ (Prefilled: Name, Password, Email | Demo: Mobile, Username)
Client-Side 5-Field Validation (Validate button)
        ↓
Success State ("Credentials validated")
        ↓
Logout (signOut via Firebase + Redirect to /)
```

---

## 🛠️ Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) / React 19
- **Routing**: [TanStack Router](https://tanstack.com/router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) & custom design tokens
- **Icons**: Lucide React
- **Authentication**: Firebase Web SDK v11 (Authentication with Email/Password)

---

## ⚙️ Setup & Installation

### 1. Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9+ or v10+)

### 2. Clone the Repository & Install Dependencies
```bash
git clone <repository-url>
cd form-zen-path-main
npm install
```

---

## 🔥 Firebase Configuration Setup

Follow these steps to connect your Firebase project:

### Step 1: Create a Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add project** and name your project (e.g., `sse-console-app`).
3. Follow the on-screen steps to complete project creation.

### Step 2: Enable Email/Password Authentication
1. In the Firebase Console, go to **Build** → **Authentication** in the left sidebar.
2. Click **Get started**.
3. Under the **Sign-in method** tab, click on **Email/Password**.
4. Enable the **Email/Password** toggle (keep Email link / passwordless disabled).
5. Click **Save**.

### Step 3: Register a Web App & Obtain Credentials
1. In your Firebase Project Overview page, click the **Web icon (`</>`)** to add a web application.
2. Enter an app nickname (e.g., `fieldwork-web`) and click **Register app**.
3. Under the `firebaseConfig` section in SDK setup, locate the configuration keys.

### Step 4: Configure Environment Variables
Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Open `.env` and fill in your Firebase values:

```env
VITE_FIREBASE_API_KEY="AIzaSy..."
VITE_FIREBASE_AUTH_DOMAIN="your-app.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="your-app-id"
VITE_FIREBASE_STORAGE_BUCKET="your-app.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="1234567890"
VITE_FIREBASE_APP_ID="1:1234567890:web:abcdef"
VITE_FIREBASE_MEASUREMENT_ID="G-XXXXXXXXXX"
```

---

## 💻 Running the Application

### Start Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000` (or the port displayed in your terminal).

### Production Build
```bash
npm run build
npm run preview
```

---

## 🔍 Validation Rules

The application enforces the following client-side validation rules:

| Field | Validation Rule | Example Error Message |
| :--- | :--- | :--- |
| **Name** | Required; alphabetic characters and spaces only (no numbers or special characters). | `"Name can contain only letters and spaces."` |
| **Password** | Required; must contain at least 1 alphabetic character and at least 1 number. | `"Password must contain at least one letter and one number."` |
| **Mobile Number** | Required; digits only; exactly 10 digits. | `"Mobile number must contain exactly 10 digits."` |
| **Username** | Required; alphanumeric; allows at most one special character; no spaces. | `"Username can contain letters, numbers, and one special character."` |
| **Email** | Required; standard valid email format (`user@domain.tld`). | `"Please enter a valid email address."` |

---

## 🔒 Password Security Note

- The user's plaintext password is **never** saved in any persistent database (such as Firestore or LocalStorage).
- Passwords are encrypted and authenticated directly by Firebase Authentication.
- During the registration-to-details transition, the password is held strictly in temporary in-memory state for seamless verification.
- Passwords are automatically masked with a secure show/hide toggle for user convenience.
