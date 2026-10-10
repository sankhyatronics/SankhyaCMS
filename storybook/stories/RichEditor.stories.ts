import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '@sankhyatronics/sankhya-rich-editor';
import { restoreTemplateTags } from '@sankhyatronics/sankhya-rich-editor';

const INVOICE = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
  body { font-family: "Segoe UI", Arial, sans-serif; font-size: 10pt; color: #222; margin: 24px; }
  h1 { font-size: 20pt; margin: 0 0 4px; }
  .muted { color: #666; }
  table.lines { width: 100%; border-collapse: collapse; }
  table.lines th { text-align: left; font-size: 8pt; text-transform: uppercase; border-bottom: 1.5px solid #222; padding: 6px 4px; }
  table.lines td { border-bottom: 1px solid #ddd; padding: 6px 4px; }
  .num { text-align: right; }
</style>
</head>
<body>
  <div class="company">{{Company.Name}}</div>
  <div class="muted">{{Company.Address}}{{#if Company.State}}, {{Company.State}}{{/if}}</div>
  <h1>{{Invoice.Type}}</h1>
  <table class="meta">
    <tr><td>Number</td><td>{{Invoice.Number}}</td></tr>
    {{#if Invoice.DueDate}}<tr><td>Due</td><td>{{Invoice.DueDate}}</td></tr>{{/if}}
  </table>
  <table class="lines">
    <thead><tr><th>#</th><th>Description</th><th class="num">Qty</th><th class="num">Amount</th></tr></thead>
    <tbody>
      {{#each Lines}}
      <tr><td>{{No}}</td><td>{{Description}}</td><td class="num">{{Quantity}}</td><td class="num">{{Total}}</td></tr>
      {{/each}}
    </tbody>
  </table>
  <p class="muted">Total ({{Invoice.Currency}}): {{Invoice.Total}}</p>
</body>
</html>`;

const meta = {
  title: 'Components/RichEditor',
  component: 'st-rich-editor',
  tags: ['autodocs'],
  args: { content: INVOICE },
  render: (args) => html`
    <st-rich-editor
      .content=${args.content}
      .maxStackSize=${args.maxStackSize}
      style="height: 80vh"
      @rich-editor-change=${(e: CustomEvent<{ html: string }>) => {
        const out = document.getElementById('rich-editor-output');
        if (out) out.textContent = e.detail.html;
      }}
    ></st-rich-editor>
    <details style="margin: 12px">
      <summary>HTML output (block tags restored)</summary>
      <pre id="rich-editor-output" style="white-space: pre-wrap">${restoreTemplateTags(args.content ?? '')}</pre>
    </details>
  `
} satisfies Meta;

export default meta;
type Story = StoryObj;

/** A Handlebars invoice template: the `{{#each}}` / `{{#if}}` tags inside tables survive editing. */
export const InvoiceTemplate: Story = {};

export const PlainDocument: Story = {
  args: { content: '<!doctype html><html><body><h1>Hello</h1><p>Edit <b>me</b>.</p></body></html>' }
};
