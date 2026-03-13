# Notes App (Technical Test)

This project is a mobile application built with **React Native (Expo)** as part of a technical assessment.

The application allows users to create notes, organize them by category, and view a summary of notes.

The UI implementation follows the provided **Figma design**.

---

# Features

• Create new notes with category selection  
• View recently created notes grouped by category  
• Summary page displaying number of notes per category  
• Settings page with app information options  
• Delete all notes functionality  
• Persistent local storage using AsyncStorage  
• Responsive layout for different device sizes  

---

# Tech Stack

- React Native
- Expo
- TypeScript
- AsyncStorage
- Expo Router

---

# Runtime Environment & SDK VERSION

| Tool | Version |
|-----|------|
| Node.js | v18.x |
| Expo SDK | 54 |
| React Native | 0.81 |
| TypeScript | 5.9.2 |
| Package Manager | npm |

Development Environment:

| Tool | Version |
|-----|------|
| Operating System | macOS Sequoia |
| Xcode | 26.3 |
| iOS | 26.3 |
| Android Emulator | API 36 |

---

# Installation

1. Clone the repository:
```bash
git clone https://github.com/desmond9986/merquri-notes.git
```
2. Install dependencies
 ```bash
npm install
```

3. Start the app
```bash
npx expo start
```
4. Run the application
```bash
i → open iOS simulator
a → open Android emulator
```

---

# Future Improvements

- Complete remaining screens  
- Allow editing notes  
- Allow deleting individual notes  
- Move all text into a translation file  
- Add test cases  
- Standardize padding and spacing into a shared configuration file
