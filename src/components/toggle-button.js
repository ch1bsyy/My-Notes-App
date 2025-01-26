class ToggleButton extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
    this._updateStyle();
    this.render();
  }

  _updateStyle() {
    this._style.textContent = `
        :host {
          display: flex;
          justify-content: center;
          margin: 10px 0;

        }

        button {
          background-color: #522546;
          color: #fff;
          border: none;
          padding: 10px 15px;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.3s;
          font-size: 1rem;
        }

        button:hover {
          outline: none;
          background-color: #88304E;
          transform: scale(1.05);
        }
        `;
  }

  render() {
    this._shadowRoot.innerHTML = '';
    this._shadowRoot.appendChild(this._style);

    this.button = document.createElement('button');
    this.button.textContent = this.getAttribute('label') || 'Toggle';

    this.button.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('toggle', { bubbles: true }));
    });

    this._shadowRoot.appendChild(this.button);
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['label'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'label') {
      this.button.textContent = newValue;
    }
  }
}

customElements.define('toggle-button', ToggleButton);
