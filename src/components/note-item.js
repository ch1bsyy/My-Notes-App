import editIcon from '../assets/edit-icon.svg';
import trashIcon from '../assets/trash-icon.svg';
import archiveIcon from '../assets/archive-icon.svg';

class NoteItem extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
    this._updateStyle();
  }

  _updateStyle() {
    this._style.textContent = `
    :host {
      display: block;
      background-color: #fff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 0;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s, box-shadow 0.3s;
      width: 100%;
      max-width: 400px;
      
    }

    :host(:hover) {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    }

    .note-card {
      display: flex;
      flex-direction: column;
      padding: 20px;
      box-sizing: border-box;
    }

    .note-content {
      display: flex;
      flex-direction: column;
      overflow-wrap: break-word;
    }

    h2 {
      font-size: 1.5em;
      margin-bottom: 10px;
      color: #311D3F;
    }

    .text-body {
    max-height: 200px;
    overflow-y: auto;
    }

    p {
      font-size: 1em;
      color: #555;
      margin-bottom: 10px;
    }

    .note-footer {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-top: 10px;
    }

    .button-container {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      width: 100%;
      align-self: center;
      gap: 20px;
      margin-top: 10px;
    }

    button {
    border: none;
    cursor: pointer;
    background: transparent;
    padding: 10px;
    transition: transform 0.2s;
    display: flex;
    align-items: center;
    }

    button:hover {
    transform: scale(1.1);
    background-color: #311D3F;
    border-radius: 2px 12px
    
    }

    img {
    width: 20px;
    height: 20px;
    transition: transform 0.2s;
    }

    button:hover img {
    transform: scale(1.2);
    }

    .text-button {
    color: #E23E57;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    transition: color 0.3s;
    margin-left: 8px;
    }

    button:hover .text-button {
    color: #FF6B6B;
    }

    small {
      font-size: 0.8em;
      color: #999;
    }

    @media (max-width: 768px) {
      h2 {
        font-size: 1.3em;
      }

      p {
        font-size: 0.9em;
      }

      small {
        font-size: 0.7em;
      }

      button-container {
      gap: 10px;
      }

      button {
      padding: 8px;
      font-size: 0.9em;
      }
    }

    @media (max-width: 480px) {
      h2 {
        font-size: 1.1em;
      }

      p {
        font-size: 0.8em;
      }

      small {
        font-size: 0.6em;
      }

      button-container {
        gap: 8px;
        justify-content: center;
      }

      button {
      padding: 6px;
      font-size: 0.8em;
      }
    }  
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  _formatBody(body) {
    const formattedBody = body.replace(/\n/g, '<br>');
    return formattedBody;
  }

  set note(data) {
    this._emptyContent();
    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
     <div class="note-card">
        <div class="note-content">
          <h2>${data.title}</h2>
          <div class="text-body">
            <p>${this._formatBody(data.body)}</p>
          </div>
        </div>
        <div class="note-footer">
          <small>Created at: ${new Date(
            data.createdAt
          ).toLocaleDateString()}</small>
          <div class="button-container">
            <button class="edit-button" aria-label="Edit">
              <img src="${editIcon}" alt="Edit" width="16" height="16"/>
              <span class="text-button">Update</span>
            </button>
            <button class="delete-button" aria-label="Delete">
              <img src="${trashIcon}" alt="Delete" width="16" height="16"/>
              <span class="text-button">Delete</span>
            </button>
            <button class="archive-button" aria-label="Archive">
            <img src="${archiveIcon}" alt="Archive" width="16" height="16"/>
            <span class="text-button">
            ${data.archived ? 'Unarchive' : 'Archive'}
            </span>
            </button>
          </div>
        </div>
      </div>
    `;

    // Event listener untuk tombol edit
    this._shadowRoot
      .querySelector('.edit-button')
      .addEventListener('click', () => {
        this.dispatchEvent(
          new CustomEvent('editNote', {
            detail: { id: data.id, title: data.title, body: data.body },
            bubbles: true,
          })
        );
      });

    // Event listener untuk tombol hapus
    this._shadowRoot
      .querySelector('.delete-button')
      .addEventListener('click', () => {
        this.dispatchEvent(
          new CustomEvent('deleteNote', {
            detail: { id: data.id },
            bubbles: true,
          })
        );
      });

    //Event listener untuk tombol arsip
    const eventName = data.archived ? 'unarchiveNote' : 'archiveNote';
    this._shadowRoot
      .querySelector('.archive-button')
      .addEventListener('click', () => {
        this.dispatchEvent(
          new CustomEvent(eventName, {
            detail: { id: data.id },
            bubbles: true,
          })
        );
      });
  }
}

customElements.define('note-item', NoteItem);
