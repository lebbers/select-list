import { html, fixture, expect } from '@open-wc/testing';

import { SelectList } from '../src/select-list.js';
import '../select-list.js';

describe('SelectList', () => {
  it('default renders as expected', async () => {
    const el = await fixture<SelectList>(
      html`<select-list></select-list>`
    );

    expect(el).shadowDom.to.equal(
      '<ul><list-item>No items</list-items></ul>',
      {
        ignoreTags: ['slot'],
      }
    );
    expect(el).dom.to.equal('<select-list></select-list>');
  });

  it('with item renders as expected', async () => {
    const el = await fixture<SelectList>(
      html`<select-list><list-item value="1">One</list-item></select-list>`
    );

    expect(el).shadowDom.to.equal(
      '<ul><list-item>One</list-item><list-item>Number of slot elements: 1</list-item></ul>',
      {
        ignoreTags: ['slot'],
      }
    );
    expect(el).dom.to.equal('<select-list></select-list>');
  });

  it('can override the title via attribute', async () => {
    const el = await fixture<SelectList>(
      html`<select-list title="attribute title"></select-list>`
    );

    expect(el.title).to.equal('attribute title');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<SelectList>(
      html`<select-list></select-list>`
    );

    await expect(el).shadowDom.to.be.accessible();
  });
});
