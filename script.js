document.addEventListener('DOMContentLoaded', function() {
  const noteText = document.getElementById('note-text');
  const addDividerBtn = document.getElementById('add-divider');
  const clearAllBtn = document.getElementById('clear-all');

  if (localStorage.getItem('notes')) {
      noteText.value = localStorage.getItem('notes');
  }

  noteText.focus();

  addDividerBtn.addEventListener('click', addDivider);

  noteText.addEventListener('keydown', function(event) {
      if (event.key === 'Enter' && event.shiftKey) {
          event.preventDefault();
          addDivider();
      }

      if (event.key === 'Backspace' && event.shiftKey) {
          clearAll();
      }
  });

  function addDivider() {
      const cursorPosition = noteText.selectionStart;
      const noteContent = noteText.value;
      const textBeforeCursor = noteContent.substring(0, cursorPosition);
      const textAfterCursor = noteContent.substring(cursorPosition);
      const updatedNote = textBeforeCursor + '\n----------\n' + textAfterCursor;
      noteText.value = updatedNote;
      localStorage.setItem('notes', updatedNote);
      const newPosition = textBeforeCursor.length + 12;
      noteText.setSelectionRange(newPosition, newPosition);
      noteText.focus();
  }

  function clearAll() {
      noteText.value = '';
      localStorage.removeItem('notes');
      noteText.focus();
  }

  clearAllBtn.addEventListener('click', clearAll);
});


