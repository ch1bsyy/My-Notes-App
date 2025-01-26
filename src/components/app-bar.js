class AppBar extends HTMLElement {
  static get observedAttributes() {
    return ['title'];
  }

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
      width: 100%;
    }
    
    header {
      background: linear-gradient(90deg, #311D3F, #E23E57);
      padding: 20px;
      text-align: center;
    }
    
    h1 {
      font-size: 36px;
      font-weight: 600;
      color: white;
      text-transform: uppercase;
      letter-spacing: 2px;
    }

    @media (max-width: 768px) {
      header {
        padding: 18px;
      }
    
      h1 {
        font-size: 30px;
      }
    }

    @media (max-width: 480px) {
      header {
        padding: 16px;
      }
      
      h1 {
        font-size: 24px;
      }
    }
  `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._shadowRoot.appendChild(this._style);
    const title = this.getAttribute('title') || 'Notes App';
    this._shadowRoot.innerHTML += `
    <header>
    <h1>${title}</h1>
    </header>
    `;
  }
}

customElements.define('app-bar', AppBar);
