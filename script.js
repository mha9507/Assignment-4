document.querySelectorAll('.team-door').forEach(door => {
  door.addEventListener('click', () => {
    const closedDoor = door.querySelector('.door.closed');
    const openDoor = door.querySelector('.door.open');
    const bio = door.querySelector('.bio');

    const isOpen = door.classList.contains('open');

    if (isOpen) {
      // Close the door
      door.classList.remove('open');
      bio.style.display = 'none';
    } else {
      // Open the door
      door.classList.add('open');
      bio.style.display = 'block';
    }
  });
});
