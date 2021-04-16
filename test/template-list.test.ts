import { html, fixture, expect } from '@open-wc/testing';

import { TemplateList } from '../src/TemplateList.js';
import '../template-list.js';

describe('TemplateList', () => {
  it('has a default title "Hey there" and counter 5', async () => {
    const el = await fixture<TemplateList>(html`<template-list></template-list>`);

    expect(el.title).to.equal('Hey there');
    expect(el.counter).to.equal(5);
  });

  it('increases the counter on button click', async () => {
    const el = await fixture<TemplateList>(html`<template-list></template-list>`);
    el.shadowRoot!.querySelector('button')!.click();

    expect(el.counter).to.equal(6);
  });

  it('can override the title via attribute', async () => {
    const el = await fixture<TemplateList>(html`<template-list title="attribute title"></template-list>`);

    expect(el.title).to.equal('attribute title');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<TemplateList>(html`<template-list></template-list>`);

    await expect(el).shadowDom.to.be.accessible();
  });
});
