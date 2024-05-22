var keywords = {
    'Tech': {
        'Health & Fitness': {
            'Description': 'Developing a mobile app for personalized fitness tracking and workout planning.',
            'Potential in Market': 'The fitness app market is growing rapidly with an increased focus on health and wellness.',
            'Demand': 'High demand, especially among individuals looking for convenient and customizable fitness solutions.',
            'Opportunities': 'Explore integration with wearable devices, incorporate AI for personalized recommendations.'
        },
        'E-commerce': {
            'Description': 'Starting an online platform for handmade and unique artisanal products.',
            'Potential in Market': 'E-commerce platforms for niche products have a growing market.',
            'Demand': 'Consumers seeking unique and personalized items.',
            'Opportunities': 'Emphasize the authenticity and story behind each product.'
        },
        'App': {
            'Description': 'Developing mobile applications to enhance productivity and entertainment.',
            'Potential in Market': 'Apps are widely used, and there is a constant demand for innovative solutions.',
            'Demand': 'Appealing to users looking for productivity tools or entertainment options on their mobile devices.',
            'Opportunities': 'Explore emerging technologies and user-friendly design.'
        },
        'Website': {
            'Description': 'Creating websites for various purposes, including e-commerce, blogs, and portfolios.',
            'Potential in Market': 'Websites are essential for businesses and individuals to establish an online presence.',
            'Demand': 'Catering to businesses, bloggers, and professionals seeking an online platform.',
            'Opportunities': 'Offer responsive design and SEO optimization for enhanced visibility.'
        },
        'Software': {
            'Description': 'Developing software solutions for project management, video editing, and data analysis.',
            'Potential in Market': 'There is a continuous need for efficient software in various industries.',
            'Demand': 'Appealing to businesses and professionals seeking tailored software solutions.',
            'Opportunities': 'Stay updated with industry trends and incorporate user feedback for improvement.'
        }
    },
    'Food': {
        'Fine Dining': {
            'Description': 'Opening an upscale fine dining restaurant with a focus on gourmet cuisine.',
            'Potential in Market': 'Fine dining experiences are sought after for special occasions.',
            'Demand': 'Catering to individuals looking for high-quality and unique dining experiences.',
            'Opportunities': 'Create a tasting menu and collaborate with local suppliers for fresh ingredients.'
        },
        'Healthy Meals': {
            'Description': 'Launching a delivery service for nutritious and balanced meals.',
            'Potential in Market': 'Growing demand for healthy meal options among busy individuals.',
            'Demand': 'Appealing to health-conscious consumers.',
            'Opportunities': 'Offer customizable meal plans and collaborate with fitness influencers for promotion.'
        },
        // ... More specific interests within Food
    },
    'Service': {
        'Business Strategy': {
            'Description': 'Providing consulting services for business strategy and growth.',
            'Potential in Market': 'Growing demand for strategic guidance among startups and small businesses.',
            'Demand': 'Entrepreneurs seeking expertise in planning and scaling their businesses.',
            'Opportunities': 'Specialize in specific industries or market segments.'
        },
        'Graphic Design': {
            'Description': 'Offering freelance graphic design services for branding and marketing.',
            'Potential in Market': 'Continuous demand for visually appealing content in the digital age.',
            'Demand': 'Businesses and individuals requiring professional graphic design for their brand.',
            'Opportunities': 'Build a diverse portfolio and collaborate with marketing agencies.'
        },
        // ... More specific interests within Service
    }
};

// Initialize user properties
// ... previous code from above (keywords, userProperties)

// Function to append a message to the chat box
function appendMessage(sender, message) {
    var chatBox = document.getElementById("chat-box");
    var messageElement = document.createElement("div");
    messageElement.className = sender === "bot" ? "bot-message" : "user-message";
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom
}

// Function to dynamically generate interest buttons based on the chosen domain
function generateInterestButtons(domain) {
    var interestButtonsContainer = document.getElementById("interest-buttons");
    interestButtonsContainer.innerHTML = ""; // Clear existing buttons

    if (keywords.hasOwnProperty(domain)) {
        for (var category in keywords[domain]) {
            var categoryButtons = keywords[domain][category].map((interest) => {
                return `<button onclick="selectInterest('<span class="math-inline">\{interest\}'\)"\></span>{interest}</button>`;
            }).join("");

            interestButtonsContainer.innerHTML += `<div>${category}: ${categoryButtons}</div>`;
        }

        // Display the interest buttons
        interestButtonsContainer.style.display = "flex";

        // Provide a message to guide the user
        appendMessage(
            "bot",
            `Great choice! Now, select an interest within the ${domain} domain.`
        );
    } else {
        appendMessage("bot", "Sorry, that domain is not currently available.");
    }
}

// Function to select an interest and provide business insights
function selectInterest(interest) {
    userProperties.interest = interest;

    // Clear any previous rating
    userProperties.rated = false;
    document.getElementById("rating-bar").style.display = "none";

    // Provide business insights for the selected interest
    provideBusinessInsights(userProperties.domain, userProperties.interest);
}

// Function to provide business insights based on the selected domain and interest
function provideBusinessInsights(domain, interest) {
    var insights = getBusinessInsights(domain, interest);

    // Display business insights in the chat
    appendMessage("bot", `Here are the insights for ${interest} in the ${domain} domain:`);
    appendMessage("bot", `Description: ${insights["Description"]}`);
    appendMessage("bot", `Potential in Market: ${insights["Potential in Market"]}`);
    appendMessage("bot", `Demand: ${insights["Demand"]}`);
    appendMessage("bot", `Opportunities: ${insights["Opportunities"]}`);

    // Ask for feedback after insights are shown
    askForRating();
}

// Function to get business insights from mock data (replace with actual data)
function getBusinessInsights(domain, interest) {
    if (keywords[domain] && keywords[domain][interest]) {
        return keywords[domain][interest];
    } else {
        return {
            "Description": "No information available for this interest.",
            "Potential in Market": "N/A",
            "Demand": "N/A",
            "Opportunities": "N/A"
        };
    }
}

// Function to ask for a rating and display a rating bar
function askForRating() {
    if (!userProperties.rated) {
        // Only ask for rating if haven't been rated before
        appendMessage(
            "bot",
            "Thanks for exploring this business idea! How would you rate it? (1-5 stars)"
        );
        document.getElementById("rating-bar").style.display = "flex";
    }
}

// Function to handle feedback and thank the user
function handleFeedback(rating) {
    userProperties.rated = true;

    // Display a thank you message based on the rating
    appendMessage("bot", rating >= 4 ? "Thank you for your positive feedback! We appreciate it." : "We are sorry to hear that. Your feedback is valuable, and we will strive to improve.");

    // Hide the rating bar after submitting feedback
    document.getElementById("rating-bar").style.display = "none";

    // Offer to explore other options or end the chat
    appendMessage(
        "bot",
        "Would you like to explore another business idea?"
    );
    appendMessage(
        "bot",
        "<button onclick='resetChat()'>Yes, Explore Another</button>" +
        "<button onclick='endChat()'>No, End Chat</button>"
    );
}

// ... other code from before (keywords, userProperties, appendMessage, etc.)

// Initial greeting from the bot
appendMessage("bot", "Hello! Welcome to your Business Idea Chatbot.");
appendMessage(
    "bot",
    "Let's explore different business ideas. Please choose a domain:"
);
document.getElementById("user-input-container").style.display = "flex";
