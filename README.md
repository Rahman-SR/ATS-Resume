# ATS Resume Builder

A modern, responsive, and secure resume building application designed to generate professional, single-page, ATS-friendly PDFs. Built with React, Vite, and Supabase.

## 🌟 Key Features

1. **Perfect A4 PDF Export**: The application features a meticulously calculated, strict A4 layout. This guarantees that your exported resumes fit perfectly onto a single page—preventing awkward formatting splits, text overflow, or rogue blank pages commonly found in other builders.
2. **Multiple Premium Templates**: Choose between 4 distinct, modern designs:
   - *Modern Colored*: A professional 40/60 split with a colored sidebar.
   - *Classic Plain*: A clean, traditional layout.
   - *Minimalist*: A whitespace-heavy, modern tech design.
   - *Elegant Dark*: A bold, premium look with a dark header.
3. **Secure User Authentication**: Integrated with Supabase, the app provides a seamless and secure Email/Password authentication flow. While anyone can use the builder, downloading the final PDF is securely gatekept for authenticated users only.
4. **Cloud History & Versioning**: Never lose your progress. Once logged in, every resume you generate is automatically saved to your cloud history. You can easily view your dashboard to load, edit, or delete past resumes.
5. **Server-Side IP Rate Limiting**: Features a custom Postgres SQL Secure Function (RPC) that tracks IP addresses via `x-forwarded-for` headers, enforcing a strict rate limit of 100 downloads per 15 minutes to prevent API abuse.
6. **Fully Mobile Responsive**: Build your resume on the go. The interface automatically stacks on smaller devices, providing a full-width form and a horizontally scrollable A4 preview wrapper, ensuring a flawless user experience across phones, tablets, and desktops.

## 🚀 Tech Stack

* **Frontend**: React (Vite)
* **Styling**: Vanilla CSS with CSS Variables for easy theme customization
* **Backend & Auth**: Supabase (PostgreSQL, GoTrue Auth)
* **PDF Generation**: html2pdf.js
* **Icons**: lucide-react

## 💻 Getting Started

To run this project locally:

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Set up your `.env` file with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. *Optional Backend Setup*: To enable the Rate Limiting and History features, ensure you have set up the `resumes` and `rate_limits` tables in your Supabase SQL editor, as well as the `save_resume_rate_limited` RPC function.
5. Start the development server using `npm run dev`.
6. Open [http://localhost:5173](http://localhost:5173) in your browser.
