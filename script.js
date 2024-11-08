// script.js
const image = document.getElementById('moving-image');
let posX = 50;  // Initial X position
let posY = 50;  // Initial Y position
let velX = 2;   // X velocity
let velY = 2.5; // Y velocity
const friction = 0.9; // Friction to simulate energy loss on collision

// Set initial position of the image
image.style.left = `${posX}px`;
image.style.top = `${posY}px`;

// Function to move and bounce the image
function animate() {
    // Update position
    posX += velX;
    posY += velY;

    // Get container boundaries
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;

    // Collision detection and response
    if (posX <= 0 || posX + image.width >= containerWidth) {
        velX = -velX * friction; // Reverse X direction and apply friction
        posX = posX <= 0 ? 0 : containerWidth - image.width; // Adjust position if it goes out of bounds
    }
    if (posY <= 0 || posY + image.height >= containerHeight) {
        velY = -velY * friction; // Reverse Y direction and apply friction
        posY = posY <= 0 ? 0 : containerHeight - image.height; // Adjust position if it goes out of bounds
    }

    // Update image position
    image.style.left = `${posX}px`;
    image.style.top = `${posY}px`;

    // Continue the animation
    requestAnimationFrame(animate);
}

// Start the animation
animate();

