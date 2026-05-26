# HelpNova

HelpNova is an AI-powered customer support chatbot platform that allows businesses to create and embed intelligent support assistants on their websites.

## Live Demo

https://help-nova.vercel.app

## Features

- AI-powered customer support using Google Gemini
- Custom business knowledge base
- MongoDB database integration
- User authentication
- Embeddable chatbot widget
- Live chatbot preview
- Dashboard for chatbot configuration
- Responsive UI built with Next.js and Tailwind CSS

## Tech Stack

- Next.js 16
- TypeScript
- Tailwind CSS
- MongoDB
- Mongoose
- Google Gemini API
- Vercel Deployment

## Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/HelpNova.git
cd HelpNova
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file:

```env
MONGODB_URL=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Embed Chatbot

Add the following script to your website:

```html
<script
src="https://help-nova.vercel.app/chatbot.js"
data-owner-id="YOUR_OWNER_ID">
</script>
```

## Screenshots

- Home Page
- <img width="1604" height="916" alt="Screenshot 2026-05-26 183355" src="https://github.com/user-attachments/assets/0505e48f-da2e-494f-9069-290fb49dc6a5" />

- Dashboard Configuration
- <img width="1896" height="916" alt="Screenshot 2026-05-26 182638" src="https://github.com/user-attachments/assets/63fc88aa-ffc2-484a-8744-010f22cfb0dc" />

- Embedded Chatbot
- <img width="1853" height="917" alt="Screenshot 2026-05-26 182724" src="https://github.com/user-attachments/assets/dc637514-ce89-40fa-8df7-c00f89eb0b63" />

- AI Chatbot Conversation
- <img width="1875" height="904" alt="Screenshot 2026-05-26 183038" src="https://github.com/user-attachments/assets/5bc9678c-19d3-4583-a1fc-4e064ce2b6ac" />


## Deployment

Deployed on Vercel:

https://help-nova.vercel.app

## Author

Ashlesha Mishra
B.Tech CSE (Data Science)
