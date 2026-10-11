# Demo Chat With 3D Avatar, Integrated with AI

---

Ini adalah proyek `Demo Chat With 3D Avatar, Integrated with AI`, dibuat dengan **Vite** dan menggunakan **React**, **Three.js** (melalui `@react-three/fiber`), serta **Ant Design** untuk komponen UI.

---

## Fitur Utama

-   **React 18**: Untuk antarmuka pengguna yang dinamis.
-   **Vite**: Alat build untuk pengembangan frontend.
-   **Three.js & React Three Fiber**: Integrasi 3D untuk visualisasi.
-   **Ant Design**: Komponen UI.
-   **Jotai**: Manajemen state yang fleksibel.
-   **Axios**: Klien HTTP berbasis Promise.
-   **React Router DOM**: Navigasi dalam aplikasi.
-   **Styled Components**: Styling komponen berbasis JavaScript.

---

## Instalasi

Untuk menjalankan proyek ini secara lokal:

1.  **Clone repositori:**
    ```bash
    git clone https://github.com/diardomarendikrista/demo-chat-with-avatar-ai
    cd demo-chat-with-avatar-ai
    ```
2.  **Instal dependensi:**
    ```bash
    npm install
    # atau yarn install / pnpm install
    ```

---

## Konfigurasi .env
Sebelum menjalankan aplikasi, Anda perlu membuat file `.env` di root proyek Anda dan menambahkan API-KEY Gemini Anda.
1. Buat file bernama `.env` di folder utama `demo-chat-with-avatar-ai`
2. Tambahkan baris berikut ke dalam file `.env` tersebut:
```
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
```
Pastikan untuk mengganti `YOUR_GEMINI_API_KEY_HERE` dengan API KEY Gemini Anda yang sebenarnya.

---

## Penggunaan

### Mode Pengembangan

```bash
npm run dev
# Aplikasi akan tersedia di http://localhost:3000
```


# Proyek Chat dengan Avatar 3D dan Integrasi AI

Proyek ini adalah aplikasi web chat interaktif yang menampilkan avatar 3D dan didukung oleh AI. Dibangun dengan tumpukan teknologi modern yang mencakup **React**, **Vite**, dan **Three.js** untuk rendering 3D. Aplikasi ini dirancang untuk berjalan dengan fungsi *serverless* di Netlify untuk menangani logika backend, seperti panggilan ke API AI.

![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0.5-purple?logo=vite)
![Three.js](https://img.shields.io/badge/Three.js-r172-black?logo=three.js)
![Netlify](https://img.shields.io/badge/Netlify-Deploy-cyan?logo=netlify)

---

## ✨ Fitur Utama

-   **React 18**: Untuk antarmuka pengguna yang dinamis.
-   **Vite**: Alat build untuk pengembangan frontend.
-   **Three.js & React Three Fiber**: Integrasi 3D untuk visualisasi.
-   **Ant Design**: Komponen UI.
-   **Jotai**: Manajemen state yang fleksibel.
-   **Axios**: Klien HTTP berbasis Promise.
-   **React Router DOM**: Navigasi dalam aplikasi.
-   **Styled Components**: Styling komponen berbasis JavaScript.

---

## 🛠️ Tech Stack

Berikut adalah daftar teknologi utama dan dependensi yang digunakan dalam proyek ini:

| Kategori              | Teknologi / Library                                                                                                                                                                                            |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Framework & UI** | `react`, `react-dom`, `antd`, `styled-components`                                                                                                                                                                |
| **Grafis 3D** | `three`, `@react-three/fiber`, `@react-three/drei`, `three-stdlib`                                                                                                                                               |
| **Manajemen State** | `jotai`                                                                                                                                                                                                        |
| **Networking** | `axios`                                                                                                                                                                                                        |
| **Routing** | `react-router-dom`                                                                                                                                                                                             |
| **Build & Tooling** | `vite`, `@vitejs/plugin-react`, `vite-jsconfig-paths`, `vite-plugin-environment`                                                                                                                                 |
| **Linting & Kualitas Kode** | `eslint`, `eslint-plugin-react`, `@eslint/js`, `globals`                                                                                                                                                  |
| **Deployment** | Netlify, Netlify Functions                                                                                                                                                                                     |

---

## 🚀 START!

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek ini di lingkungan lokal Anda.

### 1. Prasyarat

Pastikan Anda memiliki [Node.js](https://nodejs.org/) (disarankan versi LTS) dan [npm](https://www.npmjs.com/) (atau `yarn`/`pnpm`) terinstal di mesin Anda.

### 2. Kloning Repositori

```bash
git clone [https://github.com/diardomarendikrista/demo-chat-with-avatar-ai](https://github.com/diardomarendikrista/demo-chat-with-avatar-ai)
cd demo-chat-with-avatar-ai
```

### 3. Instalasi Dependensi

Jalankan perintah berikut untuk menginstal semua paket yang diperlukan:

```bash
npm install
# atau
yarn install
# atau
pnpm install
```

### 4. Konfigurasi Variabel Lingkungan

Aplikasi ini memerlukan kunci API untuk berinteraksi dengan layanan AI (misalnya, Google Gemini). Untuk menjalankan aplikasi secara lokal, Anda perlu mengatur variabel ini.

1.  Buat sebuah file baru di direktori utama (root) proyek Anda dan beri nama `.env`.

2.  Salin dan tempel baris berikut ke dalam file `.env` tersebut:

    ```env
    VITE_GEMINI_API_KEY=MASUKKAN_KUNCI_API_GEMINI_ANDA_DI_SINI
    ```

3.  Ganti `MASUKKAN_KUNCI_API_GEMINI_ANDA_DI_SINI` dengan kunci API Anda yang sebenarnya.

**Penting**: File `.env` ini seharusnya tidak pernah diunggah ke repositori Git publik. Kunci API yang ditangani di sisi klien dengan prefiks `VITE_` cocok untuk pengembangan, tetapi untuk produksi, praktik terbaik adalah menanganinya melalui fungsi *serverless* di mana kunci tersebut tidak akan terekspos di browser.

