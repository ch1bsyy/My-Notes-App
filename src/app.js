import './components/index.js';
import './assets/style.css';
import {
  getNotes,
  getArchivedNotes,
  addNote,
  deleteNote,
  updateNote,
  archiveNote,
  unarchiveNote,
} from './data/notes-api.js';
import { gsap } from 'gsap';

document.addEventListener('DOMContentLoaded', () => {
  const notesList = document.querySelector('#notes-list');
  let showingArchivedNotes = false;

  // Fungsi untuk menambahkan catatan ke DOM
  const addNoteToDOM = (note) => {
    const noteItem = document.createElement('note-item');
    noteItem.note = note;
    notesList.appendChild(noteItem);

    // Animasi tambah catatan ke DOM
    gsap.from(noteItem, {
      scale: 0,
      duration: 0.5,
      ease: 'back.out(1.7)',
    });
  };

  // Render semua catatan (Aktif atau arsip sesuai status)
  const renderNotes = async () => {
    const notes = showingArchivedNotes
      ? await getArchivedNotes()
      : await getNotes();
    notesList.innerHTML = '';
    notes.forEach(addNoteToDOM);
  };

  // Panggil renderNotes untuk menampilkan catatan pada saat load
  renderNotes();

  // Event listener untuk mengedit catatan
  document.addEventListener('editNote', (event) => {
    const { id, title, body } = event.detail;
    const noteForm = document.querySelector('note-form');
    noteForm._isEditing = true;
    noteForm.noteData = { id, title, body };
    noteForm.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Animasi edit catatan
    gsap.fromTo(
      noteForm,
      { x: -5, scale: 1 },
      {
        x: 5,
        scale: 1.02,
        duration: 0.4,
        repeat: 3,
        yoyo: true,
        ease: 'power1.inOut',
        onComplete: () => {
          gsap.to(noteForm, {
            x: 0,
            scale: 1,
            duration: 0.2,
            ease: 'power1.out',
          });
        },
      }
    );
  });

  // Event listener untuk menghapus catatan
  document.addEventListener('deleteNote', async (event) => {
    const { id } = event.detail;
    const noteItemToRemove = event.target.closest('note-item');

    if (noteItemToRemove) {
      // Animasi hapus catatan
      gsap.to(noteItemToRemove, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => noteItemToRemove.remove(),
      });
    }

    const success = await deleteNote(id);
    if (success) {
      renderNotes();
    }
  });

  // Event listener untuk menambah catatan baru
  document.addEventListener('addNote', async (event) => {
    const newNote = await addNote(event.detail.title, event.detail.body);
    if (newNote) {
      renderNotes();
    }
  });

  // Event listener untuk memperbarui catatan
  document.addEventListener('updateNote', async (event) => {
    const { id, title, body } = event.detail;
    const updatedNote = await updateNote(id, title, body);
    if (updatedNote) {
      renderNotes();
    }

    // Reset form setelah pengeditan
    const noteForm = document.querySelector('note-form');
    noteForm._isEditing = false;
    noteForm.noteData = { id: null, title: '', body: '' };

    const formLabel = noteForm.shadowRoot.querySelector('#form-label');
    formLabel.textContent = 'Add New Note';
  });

  // Event listener untuk mengarsipkan catatan
  document.addEventListener('archiveNote', async (event) => {
    const { id } = event.detail;
    const noteItemToArchive = event.target.closest('note-item');

    if (noteItemToArchive) {
      // Animasi arsip catatan
      gsap.to(noteItemToArchive, {
        x: -200,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => noteItemToArchive.remove(),
      });
    }

    const success = await archiveNote(id);
    if (success) {
      renderNotes();
    }
  });

  document.addEventListener('unarchiveNote', async (event) => {
    const { id } = event.detail;
    const noteItemToUnarchive = event.target.closest('note-item');

    if (noteItemToUnarchive) {
      // Animasi unarchive catatan
      gsap.to(noteItemToUnarchive, {
        x: 200,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => noteItemToUnarchive.remove(),
      });
    }

    const success = await unarchiveNote(id);
    if (success) {
      renderNotes();
    }
  });

  // Tombol untuk menampilkan catatan aktif atau arsip
  const toggleButton = document.createElement('toggle-button');
  toggleButton.setAttribute('label', 'Show Archived Notes');

  toggleButton.addEventListener('toggle', () => {
    showingArchivedNotes = !showingArchivedNotes;
    toggleButton.setAttribute(
      'label',
      showingArchivedNotes ? 'Show Active Notes' : 'Show Archived Notes'
    );
    renderNotes();
  });

  notesList.parentNode.insertBefore(toggleButton, notesList);
});
