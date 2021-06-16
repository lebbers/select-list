import { html, TemplateResult } from 'lit-html';
import '../select-list.js';
import { ListItemProps } from '../src/list-item.js';

export default {
  title: 'ListItem',
  component: 'list-item',
  argTypes: {
    value: { control: 'text', defaultValue: 'Hello World', },
    disabled: { control: 'boolean' },
    selected: { control: 'boolean' },
  }
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}
interface Slottable {
  slot?: TemplateResult
}

const Template: Story<ListItemProps> = ({
  value = 'Hello world',
  disabled = false,
  selected = false,
}: ListItemProps & Slottable) => html`
  <list-item
    selected=${selected}
    disabled=${disabled}
    value=${value}
  >
    ${value}
  </list-item>
`;

export const Simple = Template.bind({});
