// Door toggling logic
document.querySelectorAll('.team-door').forEach(door => {
  door.addEventListener('click', () => {
    const closedDoor = door.querySelector('.door.closed');
    const openDoor = door.querySelector('.door.open');
    const bio = door.querySelector('.bio');

    const isOpen = door.classList.contains('open');

    if (isOpen) {
      // Close the door
      door.classList.remove('open');
      closedDoor.style.display = 'block';
      openDoor.style.display = 'none';
      bio.style.display = 'none';
    } else {
      // Open the door
      door.classList.add('open');
      closedDoor.style.display = 'none';
      openDoor.style.display = 'block';
      bio.style.display = 'block';
    }
  });
});


// -----------------------------
// Custom Cursor + Trail
// -----------------------------

// Create main cursor dot
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

// Trail configuration
const trailCount = 15;
const trailDots = [];
let mouseX = 0;
let mouseY = 0;

// Initialize trail dots and append to DOM


for (let i = 0; i < trailCount; i++) {
  const dot = document.createElement('div');
  dot.classList.add('cursor-trail');
  // Brown/orange hues from 20 to ~50 degrees hue
  const hue = 20 + i * 2;
  dot.style.backgroundColor = `hsl(${hue}, 60%, 40%)`;
  dot.style.width = dot.style.height = `${15 - i}px`;
  dot.style.opacity = `${1 - i / trailCount}`;
  document.body.appendChild(dot);
  trailDots.push(dot);
}


// Store positions of each dot for animation
let positions = Array(trailCount).fill(null).map(() => ({ x: mouseX, y: mouseY }));

// Update mouse position
document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Move main cursor instantly
  cursor.style.left = `${mouseX}px`;
  cursor.style.top = `${mouseY}px`;
});

function animateTrail() {
  // First dot follows the mouse with smoothing
  positions[0].x += (mouseX - positions[0].x) * 0.3;
  positions[0].y += (mouseY - positions[0].y) * 0.3;

  // Each following dot follows the previous dot
  for (let i = 1; i < trailCount; i++) {
    positions[i].x += (positions[i - 1].x - positions[i].x) * 0.3;
    positions[i].y += (positions[i - 1].y - positions[i].y) * 0.3;
  }

  // Update dot positions and styles
  for (let i = 0; i < trailCount; i++) {
    const dot = trailDots[i];
    const pos = positions[i];

    dot.style.left = `${pos.x}px`;
    dot.style.top = `${pos.y}px`;
    dot.style.transform = `translate(-50%, -50%) scale(${1 - i / (trailCount * 1.5)})`;
    dot.style.opacity = `${(1 - i / trailCount) * 0.7}`;
  }

  requestAnimationFrame(animateTrail);
}

// Start animation loop
animateTrail();
