
const GEMINI_API_KEY = 'AIzaSyBbn3M7ubK_jYQrnbGCQhSbe8si3NGdMlw';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const clearButton = document.getElementById('clear-button');
const darkModeButton = document.getElementById('dark-mode-button');
const scrollToBottomButton = document.getElementById('scroll-to-bottom');

window.addEventListener('load', () => {
    displayMessage("Hello! I'm your Gemini chatbot. How can I help you today?", 'bot');
    userInput.focus();

    // Create neural network nodes and connections for AI-themed background
    const particlesContainer = document.querySelector('.particles');
    const nodes = [];
    for (let i = 0; i < 15; i++) {
        const node = document.createElement('div');
        node.classList.add('node');
        node.style.left = Math.random() * 100 + '%';
        node.style.top = Math.random() * 100 + '%';
        node.style.animationDelay = Math.random() * 5 + 's';
        particlesContainer.appendChild(node);
        nodes.push(node);
    }

    // Create connections between nodes
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            if (Math.random() > 0.8) { // Random connections
                const connection = document.createElement('div');
                connection.classList.add('connection');
                const x1 = parseFloat(nodes[i].style.left);
                const y1 = parseFloat(nodes[i].style.top);
                const x2 = parseFloat(nodes[j].style.left);
                const y2 = parseFloat(nodes[j].style.top);
                const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
                const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
                connection.style.width = distance + '%';
                connection.style.left = x1 + '%';
                connection.style.top = y1 + '%';
                connection.style.transform = `rotate(${angle}deg)`;
                connection.style.animationDelay = Math.random() * 3 + 's';
                particlesContainer.appendChild(connection);
            }
        }
    }
});

clearButton.addEventListener('click', () => {
    chatMessages.innerHTML = '';
});

darkModeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeButton.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

chatMessages.addEventListener('scroll', () => {
    const isAtBottom = chatMessages.scrollTop + chatMessages.clientHeight >= chatMessages.scrollHeight - 10;
    scrollToBottomButton.style.display = isAtBottom ? 'none' : 'block';
});

scrollToBottomButton.addEventListener('click', () => {
    chatMessages.scrollTo({ top: chatMessages.scrollHeight, behavior: 'smooth' });
});

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;

    // Display user message
    displayMessage(message, 'user');
    userInput.value = '';

    // Show typing indicator
    showTypingIndicator();

    // Send to Gemini API
    fetchGeminiResponse(message);
}

function displayMessage(text, sender) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message-container', sender + '-container');

    const avatar = document.createElement('div');
    avatar.classList.add('avatar');
    avatar.textContent = sender === 'user' ? '👤' : '🤖';

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender + '-message');
    messageDiv.textContent = text;

    const timestamp = document.createElement('div');
    timestamp.classList.add('timestamp');
    timestamp.textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    messageContainer.appendChild(avatar);
    messageContainer.appendChild(messageDiv);
    messageContainer.appendChild(timestamp);

    chatMessages.appendChild(messageContainer);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    typingIndicator.style.display = 'flex';
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    typingIndicator.style.display = 'none';
}

async function fetchGeminiResponse(prompt) {
    try {
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            })
        });

        if (!response.ok) {
            let errorMessage = 'Sorry, I encountered an error. ';
            if (response.status === 400) {
                errorMessage += 'Bad request. Please check your API key and try again.';
            } else if (response.status === 401) {
                errorMessage += 'Unauthorized. Please check your API key.';
            } else if (response.status === 403) {
                errorMessage += 'Forbidden. Your API key may not have the required permissions.';
            } else if (response.status === 429) {
                errorMessage += 'Too many requests. Please wait and try again.';
            } else {
                errorMessage += 'Please try again later.';
            }
            console.error('API Error:', response.status, response.statusText);
            throw new Error(errorMessage);
        }

        const data = await response.json();
        const botResponse = data.candidates[0].content.parts[0].text;
        hideTypingIndicator();
        displayMessage(botResponse, 'bot');
    } catch (error) {
        console.error('Error:', error);
        hideTypingIndicator();
        displayMessage(error.message || 'Sorry, I encountered an error. Please try again.', 'bot');
    }
}

// Add interactivity to particles
const particles = document.querySelectorAll('.particle');
particles.forEach(particle => {
    particle.addEventListener('mouseover', () => {
        particle.style.transform = 'scale(1.5)';
        particle.style.background = 'rgba(255, 255, 255, 0.8)';
    });
    particle.addEventListener('mouseout', () => {
        particle.style.transform = 'scale(1)';
        particle.style.background = document.body.classList.contains('dark-mode') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)';
    });
});
