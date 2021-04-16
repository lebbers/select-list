import {
  LitElement,
  html,
  internalProperty,
  property,
  queryAssignedNodes,
  css,
} from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map.js';
import { SelectEvent } from './event/select.js';
import { ListItem } from './list-item.js';

function emptyItem() {
  return html`<li
    style=${styleMap({
      position: 'relative',
      display: 'block',
      padding: '.5rem 1rem',
      color: '#212529',
      textDecoration: 'none',
      backgroundColor: '#fff',
      border: '1px solid rgba(0,0,0,.125)',
    })}
  >
    No-items
  </li>`;
}

interface SelectedOptions {
  selectedOptions: string[];
  selectedElements: ListItem[];
}

export class SelectList extends LitElement {
  static styles = css`
    ul {
      display: flex;
      flex-direction: column;
      padding-left: 0;
      margin-bottom: 0;
      border-radius: 0.25rem;
    }

    list-item + list-item {
      border-top-width: 0;
    }
  `;
  // @property({ type: String }) src = "";

  @property({ type: Array }) data = [];

  @queryAssignedNodes('', true)
  private defaultSlotNodes?: Node[];

  @internalProperty()
  private childElements: Element[] = [];

  get defaultAssignedElements() {
    return this.defaultSlotNodes?.filter(node => node instanceof Element) || [];
  }

  handleSlotchange(event: Event) {
    const childNodes = (event.target as HTMLSlotElement)?.assignedElements({
      flatten: false,
    });
    this.childElements = childNodes;
  }

  private _boundSelect?: (event: Event) => void;

  private onSelect(event: Event) {
    event.stopImmediatePropagation();
    this.requestUpdate();

    this.dispatchEvent(new SelectEvent<SelectedOptions>({
      selectedOptions: this.selectedElements.map(e => e.value),
      selectedElements: this.selectedElements
    }));
  }

  async connectedCallback() {
    super.connectedCallback();

    this._boundSelect = this.onSelect.bind(this);
    this.renderRoot.addEventListener('select', this._boundSelect);
  }

  disconnectedCallback() {
    if (this._boundSelect) {
      this.renderRoot.removeEventListener('select', this._boundSelect);
    }
  }

  get selectedElements(): ListItem[] {
    // @ts-ignore
    return this.childElements.filter(el => el.selected && el instanceof ListItem);
  }

  get isEmpty() {
    return this.childElements.length === 0;
  }

  get infoItem() {
    const mono = styleMap({
      fontSize: '1rem',
      fontStyle: 'normal',
    });
    return html`<list-item disabled style=${styleMap({ textAlign: 'right' })}>
      <p>
        <span style=${mono}>${this.selectedElements.length}</span> of
        <span style=${mono}>${this.defaultAssignedElements.length}</span>
        selected
      </p>
    </list-item>`;
  }

  render() {
    return html`<ul>
      ${this.isEmpty ? emptyItem() : this.infoItem}
      <slot @slotchange=${this.handleSlotchange}></slot>
    </ul>`;
  }
}
