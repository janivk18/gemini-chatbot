# Gemini Chatbot SPA

A modern Single Page Application (SPA) built with vanilla HTML, CSS, and JavaScript that integrates Google's Gemini AI API to create an interactive chatbot interface.

## Features

- **Real-time Chat Interface**: Clean, responsive chat UI with smooth animations.
- **Gemini AI Integration**: Powered by Google's Gemini Pro model for intelligent responses.
- **Typing Indicator**: Animated dots show when the bot is generating a response.
- **Modern Design**: Gradient backgrounds, fade-in animations, and hover effects.
- **Responsive Layout**: Works on desktop and mobile devices.
- **Error Handling**: Graceful handling of API errors with user-friendly messages.

## Technologies Used

- HTML5
- CSS3 (with animations and gradients)
- JavaScript (ES6+ with async/await)
- Google Gemini API

## Setup Instructions

1. **Clone or Download**: Place the project files in a directory.

2. **Get Gemini API Key**:
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey).
   - Create a new API key.
   - Copy the key.

3. **Configure API Key**:
   - Open `script.js`.
   - Replace `'YOUR_API_KEY'` with your actual API key:
     ```javascript
     const API_KEY = 'your_actual_api_key_here';
     ```

4. **Run the Application**:
   - Open `index.html` in a web browser.
   - Start chatting with the bot!

## File Structure

```
gemini-chatbot/
├── index.html      # Main HTML structure
├── style.css       # Styling and animations
├── script.js       # JavaScript logic and API integration
├── document.txt    # Project documentation
├── README.md       # This file
└── TODO.md         # Development notes
```

## Usage

- Type your message in the input field.
- Press Enter or click the 🚀 button to send.
- The bot will respond with AI-generated text.
- Messages appear with smooth animations.

## API Reference

The app uses the Gemini Pro model via the following endpoint:
`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`

Request format:
```json
{
  "contents": [{
    "parts": [{
      "text": "Your message here"
    }]
  }]
}
```

## Contributing

Feel free to fork and improve the project. Suggestions welcome!

## License

This project is for educational purposes. Ensure compliance with Google's API terms of service.

## Deployment

To deploy online:
- Host on Netlify, Vercel, or GitHub Pages.
- Ensure API key is securely managed (not hardcoded in production).

For local development, simply open `index.html` in a browser.
