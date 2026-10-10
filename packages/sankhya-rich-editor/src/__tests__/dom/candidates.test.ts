import { describe, it, expect } from "vitest";
import { isEditableCandidate } from "../../dom/candidates";

describe("dom.candidates isEditableCandidate", () => {
  it("returns false for null", () => {
    expect(isEditableCandidate(null)).toBe(false);
  });

  it("disallows structural and form tags", () => {
    const tags = [
      "html",
      "head",
      "body",
      "script",
      "style",
      "link",
      "meta",
      "noscript",
      "input",
      "textarea",
      "select",
    ];
    tags.forEach((t) => {
      const el = document.createElement(t);
      expect(isEditableCandidate(el)).toBe(false);
    });
  });

  it("allows common content containers", () => {
    const tags = [
      "p",
      "div",
      "section",
      "article",
      "header",
      "footer",
      "span",
      "h1",
      "li",
      "pre",
      "code",
    ];
    tags.forEach((t) => {
      const el = document.createElement(t);
      expect(isEditableCandidate(el)).toBe(true);
    });
  });
});

import { resolveEditTarget } from "../../dom/candidates";

describe("resolveEditTarget", () => {
  const make = (html: string) => {
    const host = document.createElement("div");
    host.innerHTML = html;
    return host;
  };

  it("edits text containers such as cells and paragraphs", () => {
    const host = make("<table><tbody><tr><td>x</td></tr></tbody></table><p>y</p>");
    expect(resolveEditTarget(host.querySelector("td"))).not.toBeNull();
    expect(resolveEditTarget(host.querySelector("p"))).not.toBeNull();
  });

  it("ignores tables, rows and lists", () => {
    const host = make("<table><tbody><tr><td>x</td></tr></tbody></table><ul><li>a</li></ul>");
    for (const sel of ["table", "tbody", "tr", "ul"]) {
      expect(resolveEditTarget(host.querySelector(sel))).toBeNull();
    }
    expect(resolveEditTarget(host.querySelector("li"))).not.toBeNull();
  });

  it("ignores containers that hold other blocks but not inline wrappers", () => {
    const host = make("<div id='a'><p>x</p></div><div id='b'><b>x</b> text</div>");
    expect(resolveEditTarget(host.querySelector("#a"))).toBeNull();
    expect(resolveEditTarget(host.querySelector("#b"))).not.toBeNull();
  });
});
