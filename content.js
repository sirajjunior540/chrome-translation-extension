let tooltip;

function handleMouseover(event) {
  const word = getWordUnderCursor(event);
  if (word) {
    translateWord(word, event.pageX, event.pageY);
  }
}

function handleMouseup(event) {
  const selection = window.getSelection().toString().trim();
  if (selection) {
    translateWord(selection, event.pageX, event.pageY);
  }
}

function getWordUnderCursor(event) {
  const range = document.caretRangeFromPoint(event.clientX, event.clientY);
  range.expand('word');
  return range.toString().trim();
}

function translateWord(word, x, y) {
  const apiKey = '';
  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      q: word,
      target: 'ar'  // Always translate to Arabic
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    const translatedText = data.data.translations[0].translatedText;
    showTooltip(translatedText, x, y);
  })
  .catch(error => console.error('Error:', error));
}

function showTooltip(text, x, y) {
  if (tooltip) {
    tooltip.remove();
  }
  tooltip = document.createElement('div');
  tooltip.className = 'translate-tooltip';
  tooltip.innerText = text;
  tooltip.style.left = x + 'px';
  tooltip.style.top = y + 'px';
  document.body.appendChild(tooltip);

  document.addEventListener('mousemove', positionTooltip);
  const removeTooltip = () => {
    tooltip.remove();
    document.removeEventListener('click', removeTooltip);
  };

  document.addEventListener('click', removeTooltip);

  setTimeout(() => {
    tooltip.remove();
    document.removeEventListener('click', removeTooltip);
  }, 3000); // Tooltip will disappear after 3 seconds or on click, whichever comes first
}

function positionTooltip(event) {
  if (tooltip) {
    tooltip.style.left = event.pageX + 'px';
    tooltip.style.top = event.pageY + 'px';
  }
}

function stopTranslation() {
  const tooltip = document.querySelector('.translate-tooltip');
  if (tooltip) {
    tooltip.remove();
  }
}
