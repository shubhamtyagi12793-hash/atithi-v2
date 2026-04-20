# ✨ Tithi — Remember Every Moment

A local-first, serverless web app to track friends' birthdays and get AI-powered gift suggestions.

Built with React + Vite + Tailwind CSS. No cloud database. All data lives in your browser's LocalStorage.

---

## 🚀 How to Run Locally

### Prerequisites
Make sure you have **Node.js** installed. Check by running:
```bash
node -v
```
If not installed, download from [nodejs.org](https://nodejs.org).

### Steps

1. Open **Terminal** (Mac: press `Cmd + Space`, type "Terminal")
2. Navigate to this folder:
   ```bash
   cd ~/Desktop/Birthday\ App
   ```
3. Install dependencies (one time only):
   ```bash
   npm install
   ```
4. Start the app:
   ```bash
   npm run dev
   ```
5. Open your browser and go to: **http://localhost:5173**

---

## ✨ Features

| Feature | Description |
|---|---|
| 📋 Dashboard | Upcoming birthdays sorted by days remaining |
| ➕ Add / Edit | Name, birthday, relationship, and interests |
| 🎁 Gift Engine | 3 personalised gift ideas based on profile |
| 🛍️ Amazon Links | Each gift idea links to a live Amazon search |
| 🔔 Next Reminder | Banner showing who's birthday is coming up next |
| 🔍 Search | Filter by name or relationship |
| 💾 LocalStorage | All data saved in your browser — no cloud needed |

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── BirthdayCard.jsx     # Individual birthday row
│   ├── AddBirthdayForm.jsx  # Add / Edit modal
│   └── GiftSuggestions.jsx  # Gift ideas panel
├── hooks/
│   └── useBirthdays.js      # LocalStorage CRUD logic
├── utils/
│   └── birthdayUtils.js     # Date math + gift engine
├── App.jsx                  # Main layout
└── index.css                # Tailwind setup
```

---

## 🛠️ Tech Stack

- **React 18** — UI framework
- **Vite** — lightning-fast dev server
- **Tailwind CSS** — utility-first styling
- **Lucide React** — icons
- **LocalStorage** — browser-native persistence

---

*Built as a hobby project to learn end-to-end AI development. Non-monetized.*
