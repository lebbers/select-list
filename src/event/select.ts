export class SelectEvent<T> extends CustomEvent<T> {
  constructor(value: T) {
    super("select", {
      detail: value,
      composed: true,
      bubbles: true
    });
  }
}
