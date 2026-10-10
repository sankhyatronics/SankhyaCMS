import { describe, it, expect } from "vitest";
import { protectTemplateTags, restoreTemplateTags } from "../../templateSyntax";
import { sanitizeHtml } from "../../utils/sanitize";

const TEMPLATE = `<!doctype html><html><head><meta charset="utf-8"><style>td{color:red}</style></head><body>
<table class="meta"><tr><td>Number</td><td>{{Invoice.Number}}</td></tr>
{{#if Invoice.DueDate}}<tr><td>Due</td><td>{{Invoice.DueDate}}</td></tr>{{/if}}</table>
<table class="lines"><thead><tr><th>#</th></tr></thead><tbody>
{{#each Lines}}
<tr><td>{{No}}</td><td colspan="2">{{Description}}</td></tr>
{{/each}}
</tbody></table>
<div>{{Company.Address}}{{#if Company.State}}, {{Company.State}}{{/if}}</div>
</body></html>`;

describe("template syntax protection", () => {
  it("round-trips block tags and leaves inline values alone", () => {
    const protectedHtml = protectTemplateTags(TEMPLATE);
    expect(protectedHtml).not.toMatch(/\{\{[#/]/);
    expect(protectedHtml).toContain("{{Invoice.Number}}");
    expect(restoreTemplateTags(protectedHtml)).toBe(TEMPLATE);
  });

  it("keeps loop tags inside the table once parsed (unprotected they escape it)", () => {
    const parse = (html: string) => new DOMParser().parseFromString(html, "text/html");

    const raw = parse(TEMPLATE);
    expect(raw.querySelector(".lines tbody")!.innerHTML).not.toContain("#each");

    const doc = parse(protectTemplateTags(TEMPLATE));
    const tbody = doc.querySelector(".lines tbody")!;
    expect(tbody.innerHTML).toContain("st-tpl:");
    expect(restoreTemplateTags(doc.body.innerHTML)).toContain("{{#each Lines}}");
    expect(restoreTemplateTags(tbody.innerHTML)).toMatch(/\{\{#each Lines\}\}[\s\S]*<tr>[\s\S]*\{\{\/each\}\}/);
  });

  it("survives the undo/redo sanitizer: tables, colspan and protected tags", () => {
    const clean = sanitizeHtml(protectTemplateTags(TEMPLATE), document);
    expect(clean).toContain("<table");
    expect(clean).toContain("<tbody>");
    expect(clean).toContain('colspan="2"');
    expect(restoreTemplateTags(clean)).toContain("{{/each}}");
    expect(restoreTemplateTags(clean)).toContain("{{#if Invoice.DueDate}}");
  });
});
