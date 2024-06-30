import './css/styles.css';

document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('popover-button');
  const popover = document.createElement('div');
  popover.id = 'popover';
  popover.innerHTML = '<h3>Popover title</h3><p>This is the popover content</p>';
  document.body.appendChild(popover);

  button.addEventListener('click', () => {
    const { top, left, width } = button.getBoundingClientRect();
    popover.style.top = `${top - popover.offsetHeight}px`;
    popover.style.left = `${left + width / 2 - popover.offsetWidth / 2}px`;
    popover.style.display = 'block';
  });

  document.addEventListener('click', (event) => {
    if (event.target !== button) {
      popover.style.display = 'none';
    }
  });
});