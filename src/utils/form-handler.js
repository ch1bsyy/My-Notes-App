// Fungsi Form Handler untuk submit
export function handleFormSubmit(isEditing, currentId, title, body) {
  if (isEditing) {
    document.dispatchEvent(
      new CustomEvent('updateNote', {
        detail: { id: currentId, title, body },
      })
    );
  } else {
    document.dispatchEvent(
      new CustomEvent('addNote', { detail: { title, body } })
    );
  }
}
