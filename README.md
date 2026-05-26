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

- Dashboard
- Live Preview
- Embedded Chatbot
- Settings Panel

## Deployment

Deployed on Vercel:

https://help-nova.vercel.app

## Author

Ashlesha Mishra
B.Tech CSE (Data Science)
