# 💸 Budgeting Simulation Game

A web-based financial simulation game where players manage their money and stamina in daily life over the course of 3 months. Players must make daily decisions regarding meals, transportation, and activities such as working, studying, or resting.

## 🎮 Key Features

- **3 months** of simulation with 30 days per month.
- Daily choices such as:
  - 🍽️ Meals: Cook at home / Eat out
  - 🚶 Transportation: Walk / Motorcycle / Taxi / Stay home
  - 🛠️ Activities: Work / Rest
- Stamina and balance system that affects each other.
- Daily history log (day-by-day).
- Monthly salary mechanism based on the number of workdays.
- Random events that may affect the player's condition.
- Achievement system based on player performance.
- Sound effects and background music to enhance the gameplay experience.

## 📊 Game Objective

The player is tasked with surviving and managing finances wisely for 3 months. Balancing stamina and expenses is key to avoid running out of money or becoming too tired.

## 🛠️ Tech Stack

- Next.js + React
- TypeScript
- Tailwind CSS (via Flowbite)
- Flowbite React (UI Component Library)
- Zustand (State Management)
- Vercel (Deployment)

## 🚀 How to Run

```bash
# 1. Clone this repository
git clone https://github.com/Ajax-Z01/budgeting-sim-game.git
cd budgeting-sim-game

# 2. Install dependencies
npm install

# 3. Run locally
npm run dev
```

Access it at: [http://localhost:3000](http://localhost:3000)

## 🗂️ Project Structure

- `pages/game/page.tsx` — Main game page.
- `components/game/GameController.tsx` — Game logic and flow.
- `components/game/StatsPanel.tsx` — Stamina & balance stats panel.
- `components/game/elements/DailyChoices.tsx` — Daily choices component.
- `components/game/screens/GameOverScreen.tsx` — Game over screen.
- `components/game/screens/GameFinishedScreen.tsx` — Game finished screen.
- `stores/GameStore.ts` — Global game state using Zustand.

## 🧠 Gameplay Tips

- Choose a frugal strategy while maintaining stamina.
- Rest regularly to avoid exhaustion.
- Working is crucial to earn a salary at the end of the month!
- Pay attention to random events that may affect your financial and stamina status.

## 🤝 Contributing

Pull requests and suggestions are welcome! 💬
