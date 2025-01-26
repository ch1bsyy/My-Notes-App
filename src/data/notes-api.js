import Swal from 'sweetalert2';
const BASE_URL = 'https://notes-api.dicoding.dev/v2';
const loadingIndicator = document.querySelector('loading-indicator');

// Mengambil daftar catatan (non-arsip)
async function getNotes() {
  loadingIndicator.show();
  try {
    const response = await fetch(`${BASE_URL}/notes`);
    const result = await response.json();
    if (result.status === 'success') {
      return result.data;
    }
    throw new Error(result.message);
  } catch (error) {
    console.error('Error fetching notes:', error);
    Swal.fire({
      icon: 'error',
      title: 'Failed to Load Notes',
      text: error.message || 'An unknown error occured',
      confirmButtonText: 'Retry',
    });
    return [];
  } finally {
    loadingIndicator.hide();
  }
}

// Mengambil catatan yang diarsipkan
async function getArchivedNotes() {
  loadingIndicator.show();
  try {
    const response = await fetch(`${BASE_URL}/notes/archived`);
    const result = await response.json();

    if (result.status === 'success') {
      return result.data;
    }
    throw new Error(result.message);
  } catch (error) {
    console.error('Error fetching archived notes:', error);
    Swal.fire({
      icon: 'error',
      title: 'Failed to Load Archived Notes',
      text: error.message || 'An unknown error occurred',
      confirmButtonText: 'Retry',
    });
    return [];
  } finally {
    loadingIndicator.hide();
  }
}

// Arsipkan catatan berdasarkan ID
async function archiveNote(noteId) {
  loadingIndicator.show();
  try {
    const response = await fetch(`${BASE_URL}/notes/${noteId}/archive`, {
      method: 'POST',
    });
    const result = await response.json();
    if (result.status === 'success') {
      console.log(result.message);
      return true;
    }
    throw new Error(result.message);
  } catch (error) {
    console.error('Error archiving note:', error);
    Swal.fire({
      icon: 'error',
      title: 'Failed to Archive Note',
      text: error.message || 'An unknown error occurred',
      confirmButtonText: 'Retry',
    });
    return false;
  } finally {
    loadingIndicator.hide();
  }
}

// Unarsip catatan berdasarkan ID
async function unarchiveNote(noteId) {
  loadingIndicator.show();
  try {
    const response = await fetch(`${BASE_URL}/notes/${noteId}/unarchive`, {
      method: 'POST',
    });
    const result = await response.json();
    if (result.status === 'success') {
      console.log(result.message);
      return true;
    }
    throw new Error(result.message);
  } catch (error) {
    console.error('Error unarchiving note:', error);
    Swal.fire({
      icon: 'error',
      title: 'Failed to Unarchive Note',
      text: error.message || 'An unknown error occurred',
      cancelButtonText: 'Retry',
    });
    return false;
  } finally {
    loadingIndicator.hide();
  }
}

// Menambahkan catatan baru
async function addNote(title, body) {
  loadingIndicator.show();
  try {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body }),
    });
    const result = await response.json();
    if (result.status === 'success') {
      return result.data;
    }
    throw new Error(result.message);
  } catch (error) {
    console.error('Error adding note:', error);
    Swal.fire({
      icon: 'error',
      title: 'Failed to Add Note',
      text: error.message || 'An unknown error occured',
      confirmButtonText: 'Retry',
    });
  } finally {
    loadingIndicator.hide();
  }
}

// Menghapus catatan berdasarkan ID
async function deleteNote(noteId) {
  loadingIndicator.show();
  try {
    const response = await fetch(`${BASE_URL}/notes/${noteId}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    if (result.status === 'success') {
      console.log(result.message);
      return true;
    }
    throw new Error(result.message);
  } catch (error) {
    console.error('Error deleting note:', error);
    Swal.fire({
      icon: 'error',
      title: 'Failed to Delete Note',
      text: error.message || 'An unknown error occurred',
      confirmButtonText: 'Retry',
    });
    return false;
  } finally {
    loadingIndicator.hide();
  }
}

// Memperbarui catatan dengan deleteNote dan addNote
async function updateNote(noteId, title, body) {
  loadingIndicator.show();
  try {
    const deleteSuccess = await deleteNote(noteId);
    if (deleteSuccess) {
      const newNote = await addNote(title, body);
      return newNote;
    }
    throw new Error('Failed to delete the existing note');
  } catch (error) {
    console.error('Error updating note:', error);
    Swal.fire({
      icon: 'error',
      title: 'Failed to Update Note',
      text: error.message || 'An unknown error occurred',
      confirmButtonText: 'Retry',
    });
  } finally {
    loadingIndicator.hide();
  }
}

export {
  getNotes,
  getArchivedNotes,
  addNote,
  deleteNote,
  updateNote,
  archiveNote,
  unarchiveNote,
};
