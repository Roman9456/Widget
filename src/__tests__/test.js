const { JSDOM } = require('jsdom');

const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Popover Widget Test</title>
  </head>
  <body>
    <button id="popover-button" class="btn" title="Test Title" data-content="Test Content">Click to toggle popover</button>
    
    <div id="popover">
      <h3>Title</h3>
      <p>Content</p>
    </div>
    
    <script src="../dist/main.js"></script>
    <script>
      document.getElementById('popover-button').addEventListener('click', function() {
        document.getElementById('popover').querySelector('h3').textContent = 'Test Title';
        document.getElementById('popover').querySelector('p').textContent = 'Test Content';
        document.getElementById('popover').style.display = 'block';
      });
    </script>
  </body>
  </html>
`;

describe('Popover Widget', () => {
  let window;

  beforeAll(async () => {
    const dom = new JSDOM(html, { runScripts: 'dangerously' });
    window = dom.window;

    // Wait for scripts to be loaded
    await new Promise(resolve => {
      window.setTimeout(resolve, 100); // Delay to ensure scripts have run
    });
  });

  it('should display popover with correct title and content when button is clicked', () => {
    const button = window.document.getElementById('popover-button');
    button.click();

    const popover = window.document.getElementById('popover');
    expect(popover.style.display).toBe('block');

    const popoverTitle = popover.querySelector('h3');
    const popoverContent = popover.querySelector('p');

    expect(popoverTitle.textContent).toBe('Test Title');
    expect(popoverContent.textContent).toBe('Test Content');
  });
});