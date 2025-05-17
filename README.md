# 🧠 CodeIt Quiz App

An interactive web app for learning **HTML**, **CSS**, and **JavaScript** by solving live coding exercises.  
Built with modern tools: **Vite + React + TypeScript + Tailwind CSS + shadcn/ui**.

---

## 🚀 Demo

> Coming soon – deploy using Vercel or GitHub Pages!

---

## 📚 Features

- 🧠 14+ auto-validated questions for HTML/CSS/JS
- 📦 Separate code editors for HTML, CSS, and JavaScript
- 🧪 Custom validators per question (checks structure, color, logic, alerts, etc.)
- 💡 Toggleable hints and full solution reveal
- ✅ Works with `alert()` and `prompt()` using iframe proxying
- 🖼 Real-time preview
- 🎨 Responsive modern UI using Tailwind + shadcn/ui

---

## ⚙️ Tech Stack

| Tool           | Description                                  |
|----------------|----------------------------------------------|
| [Vite](https://vitejs.dev/)         | Blazing fast dev server & bundler |
| [React](https://react.dev/)         | Frontend UI framework             |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript       |
| [Tailwind CSS](https://tailwindcss.com/)     | Utility-first styling        |
| [shadcn/ui](https://ui.shadcn.com/)         | Styled component library      |
| [Bun](https://bun.sh/) (optional)  | Fast JavaScript runtime & bundler |

---

## 🧑‍💻 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/xbeji/codeit-quiz-app.git
cd codeit-quiz-app
```

### 2. Install dependencies

Using Bun:
```bash
bun install
```

Using NPM:
```bash
npm install
```

### 3. Start development server

```bash
bun run dev
# or
npm run dev
```

Then open `http://localhost:5173` in your browser.

---

## 🗂 Project Structure

```
src/
├── components/       # UI components (code editor, buttons, layout)
├── data/             # (Optional) Question JSON or static assets
├── hooks/            # Custom hooks
├── lib/              # Utility libraries (e.g. validation)
├── pages/            # App screens/pages
├── utils/            # Reusable helpers
├── App.tsx           # App entry component
├── main.tsx          # Vite entry point
├── App.css           # Global styles
├── index.css         # Tailwind base
```

---

## 📋 Sample Question Format

```ts
{
  question: "Add a button that alerts 'Hello World'",
  hint: "Use <button> with onclick and define function sayHi()",
  solution: {
    html: '<button onclick="sayHi()">Click Me</button>',
    js: 'function sayHi() { alert("Hello World"); }'
  },
  validate: (doc) => {
    const btn = doc.querySelector("button");
    return btn && btn.textContent.includes("Click") ? true : "Button missing or incorrect";
  }
}
```

---

## 🧪 Validation

Custom validators are written in JS/TS and test:

- DOM structure (HTML)
- CSS styles (e.g. colors, shadows)
- JS behavior (`alert`, `prompt`, loops, etc.)
- Expected output inside iframe

---

## 📦 Build for Production

```bash
bun run build
# or
npm run build
```

Then deploy `/dist` to Vercel, GitHub Pages, Netlify, etc.

---

## 📬 Feedback / Contributions

Have suggestions or want to add more questions?

- Open an issue or PR
- Tweet me [@xbeji](https://twitter.com/xbeji) 🇸🇦

---

## 🛡 License

MIT — free to use, modify, and share ✌️

---

## 🇸🇦 Note for Saudi Students

سويت هذا الموقع كتمارين تفاعلية للـ HTML و CSS و JavaScript  
جربوه وعلّقوا إذا عندكم ملاحظات أو إضافات! الله يوفقكم 💪
