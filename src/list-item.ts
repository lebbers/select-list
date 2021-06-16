import { LitElement, html, property, css } from 'lit-element';
import { SelectEvent } from './event/select.js';

export interface OptionValue {
  value: string;
  selected: boolean;
}

export interface ListItemProps {
  value: string;
  selected: boolean;
  disabled: boolean;
}

export class ListItem extends LitElement implements ListItemProps {
  static styles = css`
    :host {
      border: 1px solid rgba(0, 0, 0, 0.125);
      border-top-width: 0;
    }
    :host(:first-child) {
      border-top: 1px solid rgba(0, 0, 0, 0.125);
    }
    button {
      position: relative;
      width: 100%;
      background-color: white;
      padding: 0.5rem 1rem;
      color: #212529;
      border: 0;
      text-align: inherit;
      text-decoration: none;
      display: block;
      cursor: default;
    }
    button[disabled] {
      cursor: default;
    }
    button:hover:not(:disabled) {
      cursor: pointer;
      background-color: whitesmoke;
    }
    button[aria-selected]:not(:disabled) {
      background-color: lightblue;
    }
  `;

  @property({ type: String }) value = '';

  @property({ type: Boolean }) selected = false;

  @property({ type: Boolean }) disabled = false;

  onSelect() {
    this.selected = !this.selected;

    this.dispatchEvent(
      new SelectEvent<OptionValue>({
        value: this.value,
        selected: this.selected,
      })
    );
  }

  render() {
    return html`<button
      @click=${this.onSelect}
      ?aria-selected=${this.selected}
      ?disabled=${this.disabled}
    >
      <slot></slot>
    </button>`;
  }
}
