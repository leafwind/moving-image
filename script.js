// script.js

const images = document.querySelectorAll('.moving-image'); // Select all existing images
const speedMultiplier = window.speedMultiplier || 1;

const imageData = Array.from(images).map((image) => {
    // Assign a random size between 50px and 150px
    const randomSize = Math.floor(Math.random() * 100) + 50;
    image.style.width = `${randomSize}px`;
    image.style.height = 'auto'; // Keep aspect ratio

    return {
        posX: Math.random() * window.innerWidth,
        posY: Math.random() * window.innerHeight,
        velX: (Math.random() - 0.5) * 5 * speedMultiplier,
        velY: (Math.random() - 0.5) * 5 * speedMultiplier,
        angle: 0,
        rotationSpeed: (Math.random() - 0.5) * 10 * speedMultiplier
    };
});

const friction = 0.9; // Friction to simulate energy loss on collision
const repelDistance = 100; // Distance within which images are repelled from click
// 排斥速度
const repelStrength = 5 * speedMultiplier;   // Strength of the repelling force

// Function to animate each image
function animate() {
    images.forEach((image, index) => {
        // Get current image data
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
            velX = -velX * friction;
            posX = posX <= 0 ? 0 : containerWidth - image.width;
        }
        if (posY <= 0 || posY + image.height >= containerHeight) {
            velY = -velY * friction;
            posY = posY <= 0 ? 0 : containerHeight - image.height;
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

// Add a click event listener to repel nearby images
document.addEventListener('click', (event) => {
    const clickX = event.clientX;
    const clickY = event.clientY;

    images.forEach((image, index) => {
        const { posX, posY } = imageData[index];
        const dx = posX - clickX;
        const dy = posY - clickY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < repelDistance) {
            // Calculate repelling force proportional to the distance
            const force = repelStrength / distance;

            // Update velocities based on repelling force
            imageData[index].velX += force * dx * speedMultiplier;
            imageData[index].velY += force * dy * speedMultiplier;
        }
    });
});

// Start the animation
animate();
