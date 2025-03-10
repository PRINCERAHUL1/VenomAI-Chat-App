# VenomAI Chat App 🤖💬💻

VenomAI Chat App is a real-time chat application enhanced with AI-powered collaboration. It features secure authentication, messaging, project-based file and code history storage, collaborative coding, code execution and an AI chatbot for virtual assistance.

## 🚀 Features

- 🔐 **Secure Authentication:** JWT-based login and signup
- 💬 **Real-time Messaging:** WebSockets for instant chat updates
- 📂 **Project Collaboration:** Add file, edit code and store history inside each project
- ⚡ **Run Code in Web Container:** Execute project code in an in-browser environment
- 🤖 **AI-powered Chatbot:** AI chatbot to help you in your work

## 🛠️ Technologies Used 

- **Frontend**:
  - ![Vite](https://img.shields.io/badge/Framework-Vite-red?logo=vite&logoColor=white)
  - ![React.js](https://img.shields.io/badge/Library-React.js-blue?logo=react&logoColor=white)

- **Backend**:
  - ![Node.js](https://img.shields.io/badge/Runtime-Node.js-lightgreen?logo=node.js&logoColor=white)
  - ![Express.js](https://img.shields.io/badge/Framework-Express.js-black?logo=express&logoColor=white)
  - ![JWT](https://img.shields.io/badge/Auth-JWT-orange?logo=jsonwebtokens&logoColor=white)
  - ![WebSocket](https://img.shields.io/badge/Real--time-WebSocket-blue?logo=websocket&logoColor=white)

- **Database**:
  - ![MongoDB](https://img.shields.io/badge/Database-MongoDB-green?logo=mongodb&logoColor=white)
  - ![Redis](https://img.shields.io/badge/Caching-Redis-red?logo=redis&logoColor=white)


- **AI & Execution**:
  - ![Google Gemini API](https://img.shields.io/badge/AI-Google%20Gemini-blueviolet?logo=google&logoColor=white)
  - ![Web Container](https://img.shields.io/badge/Execution-Web%20Container-purple?logo=googlechrome&logoColor=white)

- **Deployment**:
  - ![Vercel](https://img.shields.io/badge/Deployment-Vercel-black?logo=vercel&logoColor=white)
  - ![Render](https://img.shields.io/badge/Deployment-Render-blue?logo=render&logoColor=white)
  

## 🎯 Installation

Follow these steps to set up the project on your local machine:

### 1️⃣ Clone the Repository
```bash
$ git clone https://github.com/PRINCERAHUL1/VenomAI-Chat-App.git
$ cd VenomAI-Chat-App
```

### 2️⃣ Install Backend Dependencies
```bash
$ cd backend
$ npm install
```

### 3️⃣ Install Frontend Dependencies
```bash
$ cd ../frontend
$ npm install
```


### 4️⃣ Set Up Environment Variables

#### Backend `.env` file
```
PORT=port_no
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
REDIS_PASSWORD=your_redis_password
AI_KEY=your_ai_key
```

#### Frontend `.env` file
```
VITE_API_URL=http://localhost:Backend_PORT
```

### 5️⃣ Start the Backend Server
```bash
$ cd backend
$ npm start
```

### 6️⃣ Start the Frontend
```bash
$ cd ../frontend
$ npm run dev
```

## 🤝 Contribution

Contributions are welcome! Follow these steps to contribute:
1. Fork the repository.
2. Create a new branch.
3. Commit your changes.
4. Push to the branch.
5. Open a Pull Request.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE)

## 📧 Contact 

Rahul Mandal - rmrahul258@gmail.com

