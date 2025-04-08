# 💸 Budgeting Simulation Game

Sebuah game simulasi keuangan berbasis web yang mengajak pemain untuk mengelola uang dan stamina dalam kehidupan sehari-hari selama 3 bulan. Pemain harus membuat keputusan harian terkait makan, transportasi, dan aktivitas seperti bekerja, belajar, atau istirahat.

## 🎮 Fitur Utama

- Simulasi selama **3 bulan**
- Pilihan harian seperti:
  - 🍽️ Makan (Masak sendiri / Makan di luar)
  - 🚶 Transportasi (Jalan kaki / Motor / Taksi / Tidak keluar rumah)
  - 🛠️ Kegiatan (Bekerja / Belajar / Istirahat)
- Sistem stamina dan saldo yang saling memengaruhi
- Catatan riwayat harian (day-by-day history)
- Mekanisme gaji bulanan berdasarkan jumlah hari bekerja

## 📊 Tujuan Game

Pemain diminta untuk bertahan hidup dan mengelola keuangan secara bijak selama 3 bulan. Keseimbangan antara stamina dan pengeluaran menjadi kunci agar tidak kehabisan uang atau kelelahan.

## 🛠️ Tech Stack

- **Next.js + React**
- **Flowbite React** (UI Component Library)
- **TypeScript**
- **Tailwind CSS** (via Flowbite)

## 🚀 Cara Menjalankan

```bash
# 1. Clone repo ini
git clone https://github.com/Ajax-Z01/budgeting-simulation-game.git
cd budgeting-simulation-game

# 2. Install dependencies
npm install

# 3. Jalankan secara lokal
npm run dev
```

Akses di: http://localhost:3000

## 🗂️ Struktur Komponen Utama

- `game/page.tsx` — Halaman utama game
- `GameState.tsx` — State global game
- `GameController.tsx` — Logika dan flow permainan
- `DailyChoices.tsx` — Komponen pilihan harian
- `StatsPanel.tsx` — Panel statistik stamina & saldo
- `GameSummary.tsx` — Ringkasan akhir permainan

## 🧠 Tips Bermain

- Pilih strategi hemat dengan tetap menjaga stamina.
- Istirahat secara rutin untuk menghindari kelelahan.
- Bekerja penting untuk mendapatkan gaji di akhir bulan!

## 📝 Roadmap (To-Do)

- [x] Simulasi 3 bulan
- [x] Sistem stamina & pilihan harian
- [x] Gaji berdasarkan kerja
- [ ] Sistem event acak (kejutan baik/buruk)
- [ ] Visualisasi grafik pengeluaran
- [ ] Sistem leaderboard & pencapaian

## 🤝 Kontribusi

Pull request dan saran sangat diterima! 💬
