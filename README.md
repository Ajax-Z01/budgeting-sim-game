# 💸 Budgeting Simulation Game

Sebuah game simulasi keuangan berbasis web yang mengajak pemain untuk mengelola uang dan stamina dalam kehidupan sehari-hari selama 3 bulan. Pemain harus membuat keputusan harian terkait makan, transportasi, dan aktivitas seperti bekerja, belajar, atau istirahat.

## 🎮 Fitur Utama

- Simulasi selama **3 bulan** dengan 30 hari per bulan.
- Pilihan harian seperti:
  - 🍽️ Makan: Masak sendiri / Makan di luar
  - 🚶 Transportasi: Jalan kaki / Motor / Taksi / Tidak keluar rumah
  - 🛠️ Kegiatan: Bekerja / Belajar / Istirahat
- Sistem stamina dan saldo yang saling memengaruhi.
- Catatan riwayat harian (day-by-day history).
- Mekanisme gaji bulanan berdasarkan jumlah hari bekerja.
- Event acak yang dapat memengaruhi kondisi pemain.
- Sistem pencapaian berdasarkan performa pemain.
- Efek suara dan musik latar untuk meningkatkan pengalaman bermain.

## 📊 Tujuan Game

Pemain diminta untuk bertahan hidup dan mengelola keuangan secara bijak selama 3 bulan. Keseimbangan antara stamina dan pengeluaran menjadi kunci agar tidak kehabisan uang atau kelelahan.

## 🛠️ Tech Stack

- Next.js + React
- TypeScript
- Tailwind CSS (via Flowbite)
- Flowbite React (UI Component Library)
- Zustand (State Management)
- Vercel (Deployment)

## 🚀 Cara Menjalankan

```bash
# 1. Clone repositori ini
git clone https://github.com/Ajax-Z01/budgeting-sim-game.git
cd budgeting-sim-game

# 2. Install dependencies
npm install

# 3. Jalankan secara lokal
npm run dev
```

Akses di: [http://localhost:3000](http://localhost:3000)

## 🗂️ Struktur Proyek

- `pages/game/page.tsx` — Halaman utama game.
- `components/game/GameController.tsx` — Logika dan alur permainan.
- `components/game/StatsPanel.tsx` — Panel statistik stamina & saldo.
- `components/game/elements/DailyChoices.tsx` — Komponen pilihan harian.
- `components/game/screens/GameOverScreen.tsx` — Layar akhir saat game over.
- `components/game/screens/GameFinishedScreen.tsx` — Layar akhir saat game selesai.
- `stores/GameStore.ts` — State global game menggunakan Zustand.

## 🧠 Tips Bermain

- Pilih strategi hemat dengan tetap menjaga stamina.
- Istirahat secara rutin untuk menghindari kelelahan.
- Bekerja penting untuk mendapatkan gaji di akhir bulan!
- Perhatikan event acak yang dapat memengaruhi kondisi finansial dan stamina.

## 🤝 Kontribusi

Pull request dan saran sangat diterima! 💬