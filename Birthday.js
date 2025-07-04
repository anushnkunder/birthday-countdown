// Create stars
function createStars() {
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}

// Create shooting stars
function createShootingStars() {
    setInterval(() => {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        shootingStar.style.left = Math.random() * 100 + '%';
        shootingStar.style.top = Math.random() * 50 + '%';
        document.body.appendChild(shootingStar);
        
        setTimeout(() => {
            shootingStar.remove();
        }, 4000);
    }, 3000);
}

// Create meteor shower
function createMeteorShower() {
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const meteor = document.createElement('div');
            meteor.className = 'meteor';
            meteor.style.left = Math.random() * 100 + '%';
            meteor.style.top = Math.random() * 50 + '%';
            meteor.style.animationDelay = Math.random() * 1 + 's';
            document.body.appendChild(meteor);
            
            setTimeout(() => {
                meteor.remove();
            }, 3000);
        }, i * 200);
    }
}

// Fixed countdown timer
function startCountdown() {
    const timer = document.getElementById('timer');
    const countdown = document.getElementById('countdown');
    const presentButton = document.getElementById('presentButton');
    
    // Set target date to August 20, 2025 (or current year if we're past August 20)
    const currentYear = new Date().getFullYear();
    const currentDate = new Date();
    const targetDate = new Date(currentYear, 7, 20); // Month is 0-indexed, so 7 = August
    
   
    
    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;
        
        if (distance < 0) {
            clearInterval(interval);
            countdown.style.display = 'none';
            presentButton.style.display = 'block';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Create better formatted countdown display
        timer.innerHTML = `
            <div class="time-unit">
                <div class="time-number">${days.toString().padStart(2, '0')}</div>
                <div class="time-label">DAYS</div>
            </div>
            <div class="time-unit">
                <div class="time-number">${hours.toString().padStart(2, '0')}</div>
                <div class="time-label">HOURS</div>
            </div>
            <div class="time-unit">
                <div class="time-number">${minutes.toString().padStart(2, '0')}</div>
                <div class="time-label">MINUTES</div>
            </div>
            <div class="time-unit">
                <div class="time-number">${seconds.toString().padStart(2, '0')}</div>
                <div class="time-label">SECONDS</div>
            </div>
        `;
    }, 1000);
}

// Create confetti
function createConfetti() {
    const colors = ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4ecdc4', '#45b7d1', '#ff8a80'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 2 + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 50);
    }
}

// Type writer effect
function typeWriter(element, text, speed = 50) {
    return new Promise((resolve) => {
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(interval);
                resolve();
            }
        }, speed);
    });
}

// Story content
const storyParagraphs = [
    "In a small town called Davangere, where the stars seemed to shine just a little brighter, a special soul was born.",
    "Her journey led her to the coastal beauty of Karwar, where the ocean waves whispered secrets of distant galaxies.",
    "Among life's sweetest pleasures, she found joy in the golden richness of Kaju Katli and the tender sweetness of Gulab Jamun.",
    "Like stars that light up the darkest nights, she brought warmth and wonder to everyone around her.",
    "Her heart, vast as the cosmos itself, held dreams that sparkled like constellations in the infinite sky.",
    "Today, we celebrate not just another year, but the magnificent journey of a galaxy-hearted legend.",
    "May your birthday be filled with as much magic as you bring to this world, and may your dreams soar among the stars.",
    "Happy Birthday to someone who makes the universe a more beautiful place! ✨"
];

// Show story with typing effect
async function showStory() {
    const storyContainer = document.getElementById('storyContainer');
    const storyText = document.getElementById('storyText');
    
    storyContainer.style.display = 'block';
    
    for (let i = 0; i < storyParagraphs.length; i++) {
        const paragraph = document.createElement('div');
        paragraph.className = 'story-paragraph';
        storyText.appendChild(paragraph);
        
        await typeWriter(paragraph, storyParagraphs[i], 60);
        
        // Trigger meteor shower at "galaxy-hearted legend"
        if (storyParagraphs[i].includes('galaxy-hearted legend')) {
            createMeteorShower();
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Show cake after story
    setTimeout(() => {
        document.getElementById('cakeContainer').style.display = 'block';
        setTimeout(() => {
            document.getElementById('birthdayMessage').style.display = 'block';
        }, 1000);
    }, 2000);
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    createShootingStars();
    startCountdown();
    
    // For testing purposes, uncomment the lines below to skip countdown
    // document.getElementById('countdown').style.display = 'none';
    // document.getElementById('presentButton').style.display = 'block';
    
    document.getElementById('presentButton').addEventListener('click', () => {
        createConfetti();
        document.getElementById('presentButton').style.display = 'none';
        setTimeout(() => {
            showStory();
        }, 1000);
    });
});
