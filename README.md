# ATS Resume Builder

A modern, responsive, and secure resume building application designed to generate professional, single-page, ATS-friendly PDFs. Built with React, Vite, and Supabase.

## 🌟 Key Features

1. **Perfect A4 PDF Export**: The application features a meticulously calculated, strict A4 layout. This guarantees that your exported resumes fit perfectly onto a single page—preventing awkward formatting splits, text overflow, or rogue blank pages commonly found in other builders.
2. **ATS-Friendly Templates**: Choose between multiple modern templates (e.g., Classic Plain, Modern Colored). The typography and layout have been specifically optimized for readability and compatibility with Applicant Tracking Systems.
3. **Secure User Authentication**: Integrated with Supabase, the app provides a seamless and secure Email/Password authentication flow. While anyone can test the builder for free, downloading the final PDF is securely gatekept for authenticated users only.
4. **Cloud History & Versioning**: Never lose your progress. Once logged in, every resume you generate is automatically saved to your cloud history. You can easily view your dashboard to load, edit, or delete past resumes.
5. **Fully Mobile Responsive**: Build your resume on the go. The interface automatically stacks on smaller devices, providing a full-width form and a horizontally scrollable A4 preview wrapper, ensuring a flawless user experience across phones, tablets, and desktops.

## 🚀 Tech Stack

* **Frontend**: React (Vite)
* **Styling**: Vanilla CSS with CSS Variables for easy theme customization
* **Backend & Auth**: Supabase (PostgreSQL, GoTrue Auth)
* **PDF Generation**: html2pdf.js

## 💻 Getting Started

To run this project locally:

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Start the development server using `npm run dev`.
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

*(Note: Supabase credentials are required for authentication and history features. You can provide them via `.env` variables: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`)*
