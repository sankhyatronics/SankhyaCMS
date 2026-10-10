# @sankhyatronics/sankhya-rich-editor

Lit web component (`<st-rich-editor>`) for **safe, template-driven HTML editing** (built for Handlebars HTML templates such as invoices). It loads an HTML document into an isolated iframe and lets non-technical users edit text and formatting in place through a toolbar, without breaking the template's layout or CSS.

```sh
npm install @sankhyatronics/sankhya-rich-editor
```

```ts
import '@sankhyatronics/sankhya-rich-editor'; // registers <st-rich-editor>
```

```html
<st-rich-editor id="editor" content="<h1>Hello</h1><p>Edit me</p>"></st-rich-editor>
<script>
  const editor = document.getElementById('editor');
  editor.addEventListener('rich-editor-change', (e) => console.log(e.detail.html));
  // later: editor.getHTML()
</script>
```

| Attribute / property | Description |
| --- | --- |
| `content` | HTML document to edit, as a string |
| `src` | Same-origin URL of a document to edit (wins over `content`) |
| `max-stack-size` | Undo/redo snapshots kept |

Events: `rich-editor-ready`, `rich-editor-change` (`detail.html`), `rich-editor-error`. Full API is in `custom-elements.json`.

## Editing

- Hover a section to get a bar with a drag handle, move up/down and delete. Drag the handle to reorder.
- The toolbar's **+ Section**, **+ Table** and **+ Image** add a block after the section being edited (or at the end). **Row/Col +/−** edit the table the caret is in.
- **Fill** (toolbar) sets the background of the element being edited — a table cell, paragraph, heading — and **No fill** removes it. The colour swatch on a section's hover bar fills the whole section, and ∅ clears it. Fills keep printing (`print-color-adjust: exact`).
- **Page font** (toolbar) sets one font for the whole document, overriding the template's own font rules; choose *Template's own font* to go back. It is stored as a `<style data-page-font>` in the saved HTML and is part of undo/redo.
- A "section" is a direct child of the body, or of the single wrapper element a template puts around its content.

## Notes

- The iframe is sandboxed (`allow-same-origin`, no scripts): template scripts do not run while editing, but are preserved in the output.
- The editor core keeps module-level state, so use one `<st-rich-editor>` per page.
- Handlebars block tags (`{{#if}}`, `{{#each}}`, `{{/each}}`, `{{else}}`) in `content` are protected while editing — so loops between `<tbody>` and `<tr>` stay in the table — and restored by `getHTML()`. Inline `{{Value}}` tags are plain text. Not applied to `src`.
