document.addEventListener('DOMContentLoaded', function() {
  const noteText = document.getElementById('note-text');
  const addDividerBtn = document.getElementById('add-divider');
  const clearAllBtn = document.getElementById('clear-all');

  // Load notes from localStorage if available
  if (localStorage.getItem('notes')) {
      noteText.value = localStorage.getItem('notes');
  }

  noteText.focus();

  addDividerBtn.addEventListener('click', addDivider);

  noteText.addEventListener('keydown', function(event) {
      if (event.key === 'Enter' && event.shiftKey) {
          event.preventDefault(); // Prevent default newline behavior
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

      // Update textarea value
      noteText.value = updatedNote;

      // Store the updated note in localStorage
      localStorage.setItem('notes', updatedNote);

      // Set the cursor position below the divider
      const newPosition = textBeforeCursor.length + 12; // Set position below '----------'
      noteText.setSelectionRange(newPosition, newPosition);
      noteText.focus();
  }

  function clearAll() {
      // Clear textarea value
      noteText.value = '';

      // Clear notes from localStorage
      localStorage.removeItem('notes');

      noteText.focus();
  }

  clearAllBtn.addEventListener('click', clearAll);
});


