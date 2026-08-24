import { describe, expect, it } from "vitest";
import {
  parseNumberedLine,
  renumberText,
  transformDeleteNumbering,
  transformEnter,
  transformIndent,
  transformInsertNumbering,
} from "../src/model";

describe("number parser", () => {
  it("requires a trailing period", () => {
    expect(parseNumberedLine("1. item")?.number).toBe("1.");
    expect(parseNumberedLine("    1.2.3. item")?.number).toBe("1.2.3.");
    expect(parseNumberedLine("1 item")).toBeNull();
    expect(parseNumberedLine("1.2 item")).toBeNull();
  });
});

describe("renumbering", () => {
  it("recalculates a contiguous hierarchical block", () => {
    const input = [
      "7. Alpha",
      "    9.4. Beta",
      "        8.8.8. Gamma",
      "    3.2. Delta",
      "4. Epsilon",
    ].join("\n");
    expect(renumberText(input)).toBe([
      "1. Alpha",
      "  1.1. Beta",
      "    1.1.1. Gamma",
      "  1.2. Delta",
      "2. Epsilon",
    ].join("\n"));
  });

  it("normalizes legacy four-space levels to a fixed content rhythm", () => {
    const input = "1. Alpha\n    1.1. Beta\n        1.1.1. Gamma";
    expect(renumberText(input)).toBe("1. Alpha\n  1.1. Beta\n    1.1.1. Gamma");
  });

  it("keeps every hierarchy step at exactly two raw spaces", () => {
    const input = [
      "9. Root",
      "    8.8. Child",
      "        7.7.7. Grandchild",
      "            6.6.6.6. Great-grandchild",
    ].join("\n");
    expect(renumberText(input)).toBe([
      "1. Root",
      "  1.1. Child",
      "    1.1.1. Grandchild",
      "      1.1.1.1. Great-grandchild",
    ].join("\n"));
  });

  it("keeps separate blocks independent", () => {
    expect(renumberText("9. One\nplain text\n8. Two")).toBe("1. One\nplain text\n1. Two");
  });
});

describe("editing transforms", () => {
  it("Enter creates the next sibling with a final period", () => {
    const input = "1. Root\n    1.1. Child";
    const cursor = input.length;
    const result = transformEnter(input, { anchor: cursor, head: cursor });
    expect(result?.text).toBe("1. Root\n  1.1. Child\n  1.2. ");
    expect(result?.selection.anchor).toBe(result?.text.length);
  });

  it("Tab indents the current item and its subtree", () => {
    const input = "1. Alpha\n2. Beta\n    2.1. Child\n3. Gamma";
    const cursor = input.indexOf("Beta");
    const result = transformIndent(input, { anchor: cursor, head: cursor }, "indent");
    expect(result?.text).toBe("1. Alpha\n  1.1. Beta\n    1.1.1. Child\n2. Gamma");
  });

  it("Shift+Tab outdents the current item and its subtree", () => {
    const input = "1. Alpha\n  1.1. Beta\n    1.1.1. Child\n  1.2. Delta";
    const cursor = input.indexOf("Beta");
    const result = transformIndent(input, { anchor: cursor, head: cursor }, "outdent");
    expect(result?.text).toBe("1. Alpha\n2. Beta\n  2.1. Child\n  2.2. Delta");
  });

  it("Shift+Tab on a root item converts it to plain text and lifts its subtree", () => {
    const input = "1. Alpha\n    1.1. Child\n2. Beta";
    const cursor = input.indexOf("Alpha");
    const result = transformIndent(input, { anchor: cursor, head: cursor }, "outdent");
    expect(result?.text).toBe("Alpha\n1. Child\n2. Beta");
    expect(result?.selection.anchor).toBe(0);
  });

  it("supports a multi-line selection", () => {
    const input = "1. Alpha\n2. Beta\n    2.1. Child\n3. Gamma";
    const anchor = input.indexOf("2. Beta");
    const head = input.indexOf("3. Gamma");
    const result = transformIndent(input, { anchor, head }, "indent");
    expect(result?.text).toBe("1. Alpha\n  1.1. Beta\n    1.1.1. Child\n2. Gamma");
  });

  it("inserts numbering on selected plain-text lines", () => {
    const input = "Alpha\nBeta";
    const result = transformInsertNumbering(input, { anchor: 0, head: input.length });
    expect(result?.text).toBe("1. Alpha\n2. Beta");
  });

  it("deletes numbering and renumbers the neighboring block", () => {
    const input = "1. Alpha\n2. Beta";
    const result = transformDeleteNumbering(input, { anchor: 0, head: input.indexOf("\n") });
    expect(result?.text).toBe("Alpha\n1. Beta");
  });
});
