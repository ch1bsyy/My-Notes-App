import { validateInput, validateTitleLength } from '../utils/validation.js';
import { handleFormSubmit } from '../utils/form-handler.js';

class NoteForm extends HTMLElement {
  static get observedAttributes() {
    return ['button-label'];
  }

  _shadowRoot = null;
  _style = null;
  _isEditing = false;
  _currentId = null;
  _maxTitleLength = 50;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
    this._updateStyle();
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'button-label') {
      this.render();
    }
  }

  _updateStyle() {
    this._style.textContent = `
    :host {
      display: block;
      margin-bottom: 30px;
    }

    h2 {
      font-size: 22px;
      margin-bottom: 20px;
      text-align: center;
      letter-spacing: 1.1px;
    }

    form {
      background-color: #fff;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3 ease;
      max-width: 600px;
      margin: 0 auto;
    }

    form:hover {
      transform: translateY(-4px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
      }

    div {
      margin-bottom: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    label {
    font-weight: bold;
    margin-bottom: 8px;
    width: 100%;

    }

    input, textarea {
      width: 100%;
      padding: 12px;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-size: 16px;
      background-color: #f9f9f9;
      transition: border-color 0.3s ease;
      box-sizing: border-box;
    }

    input:focus, textarea:focus {
      border-color: #88304E;
      outline: none;
      background-color: #fff;
    }

    button {
      width: 100%;
      padding: 12px;
      background-color: #88304E;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    button:hover {
      background-color: #522546;
    }

    .error {
      color: red;
      font-weight: bold;
      font-size: 12px;
      margin-top: 5px;
    }
    
    @media (max-width: 768px) {
      h2 {
      font-size: 20px;
      }

      form {
        padding: 20px;
        max-width: 400px;
        }
      
      input, textarea, button {
        padding: 10px;
        font-size: 14px;
        max-width: 100%;
        }
      }

    @media (max-width: 480px) {
      h2 {
      font-size: 18px;
      }
      
      form {
        padding: 15px;
        max-width: 300px;
      }

      input, textarea, button {
        padding: 8px;
        font-size: 12px;
      }
    }  
  `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  _addRealtimeValidation() {
    const titleInput = this._shadowRoot.querySelector('#title');
    const bodyTextarea = this._shadowRoot.querySelector('#body');

    // Event blur untuk validasi saat input kehilangan fokus
    titleInput.addEventListener('blur', () => {
      const isTitleValid = validateInput(titleInput, 'Title is required.');
      if (isTitleValid) {
        validateTitleLength(titleInput, this._maxTitleLength);
      }
    });

    bodyTextarea.addEventListener('blur', () => {
      validateInput(bodyTextarea, 'Content is required.');
    });

    // Event input untuk membatasi karakter di title secara real-time
    titleInput.addEventListener('input', () => {
      validateTitleLength(titleInput, this._maxTitleLength);
    });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._shadowRoot.appendChild(this._style);
    const buttonLabel =
      this.getAttribute('button-label') ||
      (this._isEditing ? 'Update Note' : 'Add Note');

    this._shadowRoot.innerHTML += `
      <h2 id="form-label">${this._isEditing ? 'Edit Note' : 'Add New Note'}</h2>
      <form id="note-form">
        <div>
          <label for="title">Title</label>
          <input type="text" id="title" maxlength="${
            this._maxTitleLength
          }" required />
          <span class="error"></span>
        </div>
        <div>
          <label for="body">Content</label>
          <textarea id="body" rows="5" placeholder="Write your note here..." required></textarea>
          <span class="error"></span>
        </div>
        <button id="submit-btn" type="submit">${buttonLabel}</button>
      </form>
    `;

    this._addRealtimeValidation();

    this._shadowRoot
      .querySelector('form')
      .addEventListener('submit', (event) => {
        event.preventDefault();

        const title = this._shadowRoot.querySelector('#title').value;
        const body = this._shadowRoot.querySelector('#body').value;

        handleFormSubmit(this._isEditing, this._currentId, title, body);

        this._isEditing = false;
        this._shadowRoot.querySelector('form').reset();
        this.render();
      });
  }

  // Metode untuk mengisi form dengan data catatan yang ada
  set noteData(data) {
    this._isEditing = true;
    this._currentId = data.id;
    this.render();
    this._shadowRoot.querySelector('#title').value = data.title;
    this._shadowRoot.querySelector('#body').value = data.body;
  }
}

customElements.define('note-form', NoteForm);
