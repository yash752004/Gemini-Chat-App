# 💬 Gemini-Style Conversational AI Chat App (Frontend Only)

This is a fully functional, responsive frontend application that simulates a conversational AI experience (similar to Google's Gemini). Built with **React**, **Redux**, **Material UI**, **React Hook Form + Zod**, it includes OTP-based login, chatroom management, AI-style replies, image messaging, and beautiful modern UX features.

---

## 🚀 Features

### 🔐 Authentication

- OTP-based Login/Signup
- Country code selection (via [RESTCountries API](https://restcountries.com/))
- Input validation with React Hook Form + Zod
- Simulated OTP send/verify using `setTimeout`

### 💬 Chatroom Dashboard

- View list of chatrooms
- Create/Delete chatrooms
- Toast notifications for actions
- Debounced search to filter chatrooms
- Responsive & accessible design
- Dark Mode toggle

### 🧠 Chat Interface

- Send messages as user (text or image)
- Fake AI replies with typing indicator
- Auto-scroll to latest message
- Infinite reverse scroll with dummy messages
- Copy-to-clipboard on hover
- Base64 preview for image uploads

---

## 🧱 Tech Stack

| Purpose              | Stack / Tool                         |
|----------------------|--------------------------------------|
| Framework            | React (CRA)                          |
| State Management     | Redux Toolkit                        |
| Styling              | Material UI                          |
| Form Handling        | React Hook Form + Zod                |
| Data Persistence     | localStorage                         |
| Notifications        | react-toastify                       |
| HTTP Client          | axios                                |
| Debounce/Throttle    | lodash.debounce                      |
| Routing              | React Router DOM                     |
| Image Upload         | Local base64 (no backend required)   |

---

## 📂 Folder Structure

src/
├── assets/ # Icons, logos, etc.
├── components/ # Reusable UI components (e.g. ChatBubble)
├── features/ # Redux slices (auth, chat, ui)
├── hooks/ # Custom hooks
├── layouts/ # Layout wrappers (if any)
├── pages/ # Route-level views (Login, Dashboard, Chatroom)
├── services/ # API calls (RESTCountries)
├── store/ # Redux store setup
├── theme/ # MUI theme customization
├── utils/ # Helper functions (debounce, throttle, etc.)
├── validation/ # Zod schemas
├── App.jsx
└── index.js

yaml
Copy
Edit

---

## 🛠️ How Core Features Work

### 🔄 Throttling AI Messages
Simulated using `setTimeout` with randomized delay (e.g., 1200–2000ms) to mimic AI thinking.

```js
setTimeout(() => {
  dispatch(addMessage({ ...fakeAiReply }));
}, 1200 + Math.random() * 1000);
📜 Infinite Scroll
On scroll to top, reverse load 20 dummy messages from top using loadDummyMessages() action.

🧭 Form Validation
Zod is used with react-hook-form to provide detailed validation and error messages for:

Phone + country code

OTP code input

🌐 Country Code API
Data is fetched from:
"https://restcountries.com/v3.1/all?fields=name,idd"
Parsed into:

js
Copy
Edit
{ name: "India", code: "+91" }
🧪 Local Development
bash
Copy
Edit
# 1. Clone repo
git clone https://github.com/your-username/gemini-chat-frontend.git

# 2. Install dependencies
npm install

# 3. Start development server
npm start
📸 Screenshots (Optional but encouraged)
Include screenshots for:

OTP Login page

Chatroom Dashboard with theme toggle

Chat Interface (showing AI typing, image messages, etc.)

🔮 Possible Enhancements
Hook up to actual AI API (Gemini/ChatGPT)

Use Firebase or MongoDB for real message storage

Add user registration/profile settings

Add socket-based real-time messaging

Add emoji support & markdown rendering

📄 License
MIT License. You can freely use and modify this project for educational and non-commercial purposes.

👨‍💻 Author
Yash Patel
Full Stack Developer — Ahmedabad, Gujarat
🌐 Portfolio
🔗 LinkedIn

This project is a frontend-only simulation meant to demonstrate full-stack ready skills like UI design, state management, form handling, and scalable architecture — all without requiring a backend.

markdown
Copy
Edit

---

✅ Done!

You now have a polished, production-ready frontend project with:

- All **core logic & UI completed**
- Clean **Redux architecture**
- Full **component-based layout**
- Complete **README** for GitHub

Let me know if you’d like me to:

- Extract reusable components (`ChatBubble`, `MessageList`, `UploadImageButton`)
- Help deploy it (e.g., **Vercel**, **Netlify**)
- Add polish or animations (e.g., **Framer Motion**)
- Create a backend (e.g., Firebase, Node.js + MongoDB)

Ready to take it to the next level when you are!