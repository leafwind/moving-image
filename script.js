// script.js

// Get all images with the class "moving-image"
const images = document.querySelectorAll('.moving-image');

// Array to store position, velocity, and angle for each image
const imageData = Array.from(images).map(() => ({
    posX: Math.random() * window.innerWidth,  // Random starting X position
    posY: Math.random() * window.innerHeight, // Random starting Y position
    velX: (Math.random() - 0.5) * 5,          // Random X velocity
    velY: (Math.random() - 0.5) * 5,          // Random Y velocity
    angle: 0,                                 // Initial rotation angle
    rotationSpeed: (Math.random() - 0.5) * 10 // Random rotation speed
}));

const friction = 0.9; // Friction to simulate energy loss on collision

// Function to animate each image
function animate() {
    images.forEach((image, index) => {
        // Destructure current image data
        let { posX, posY, velX, velY, angle, rotationSpeed } = imageData[index];

        // Update position
        posX += velX;
        posY += velY;

        // Update rotation angle
        angle += rotationSpeed;

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

        // Apply position and rotation to the image
        image.style.left = `${posX}px`;
        image.style.top = `${posY}px`;
        image.style.transform = `rotate(${angle}deg)`;

        // Update the image data for the next frame
        imageData[index] = { posX, posY, velX, velY, angle, rotationSpeed };
    });

    // Continue the animation
    requestAnimationFrame(animate);
}

// Start the animation
animate();
