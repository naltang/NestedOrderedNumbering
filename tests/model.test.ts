import { describe, expect, it } from "vitest";
import {
  parseNumberedLine,
  protectedLines,
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

  it("continues one numbered block across blank lines", () => {
    expect(renumberText("9. One\n\n8. Two")).toBe("1. One\n\n2. Two");
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

  it("Enter on an empty numbered item exits numbering with one plain blank line", () => {
    const input = "1. First\n2. Second\n3. ";
    const result = transformEnter(input, { anchor: input.length, head: input.length });
    const expected = "1. First\n2. Second\n";
    expect(result?.text).toBe(expected);
    expect(result?.selection).toEqual({ anchor: expected.length, head: expected.length });
  });

  it("renumbers following items after an empty numbered item exits numbering", () => {
    const input = "1. First\n2. \n3. Third";
    const cursor = input.indexOf("2. ") + "2. ".length;
    const result = transformEnter(input, { anchor: cursor, head: cursor });
    const expected = "1. First\n\n2. Third";
    const blankLineStart = expected.indexOf("\n") + 1;
    expect(result?.text).toBe(expected);
    expect(result?.selection).toEqual({ anchor: blankLineStart, head: blankLineStart });
  });

  it("Enter removes an empty nested prefix and its indentation", () => {
    const input = "1. Root\n  1.1.    ";
    const result = transformEnter(input, { anchor: input.length, head: input.length });
    expect(result?.text).toBe("1. Root\n");
    expect(result?.selection.anchor).toBe(result?.text.length);
  });

  it("Tab indents the current item and its subtree", () => {
    const input = "1. Alpha\n2. Beta\n    2.1. Child\n3. Gamma";
    const cursor = input.indexOf("Beta");
    const result = transformIndent(input, { anchor: cursor, head: cursor }, "indent");
    expect(result?.text).toBe("1. Alpha\n  1.1. Beta\n    1.1.1. Child\n2. Gamma");
  });

  it("restores a downstream root number when an inserted item becomes a child", () => {
    const input = "1. First\n\n2. Second";
    const cursor = input.indexOf("\n");
    const entered = transformEnter(input, { anchor: cursor, head: cursor });
    expect(entered?.text).toBe("1. First\n2. \n\n3. Second");

    const indented = entered && transformIndent(entered.text, entered.selection, "indent");
    expect(indented?.text).toBe("1. First\n  1.1. \n\n2. Second");
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

  it("insert numbering leaves blank separator lines blank", () => {
    const input = "Alpha\n\nBeta";
    const result = transformInsertNumbering(input, { anchor: 0, head: input.length });
    expect(result?.text).toBe("1. Alpha\n\n2. Beta");
  });

  it("derives depth relative to indentation rather than absolute columns", () => {
    // The 7-column "b" line would distort the absolute GCD unit to 1 and push
    // the shallower "c" to depth 3; relative ordering keeps it a sibling of "a".
    const input = "1. Root\n   1.1. a\n      1.1.1. b\n   1.2. c";
    expect(renumberText(input)).toBe(
      "1. Root\n  1.1. a\n    1.1.1. b\n  1.2. c",
    );
  });

  it("keeps deeper items nested under the current indentation context", () => {
    // The second 4-column line must nest under the intervening 2-column line,
    // not inherit the depth of the earlier 4-column line that shares its column.
    const input = "1. Root\n    1.1. A\n  1.2. B\n    1.2.1. C";
    expect(renumberText(input)).toBe(
      "1. Root\n  1.1. A\n  1.2. B\n    1.2.1. C",
    );
  });
});

describe("protected regions", () => {
  const fenced = [
    "```bash",
    "7. echo first",
    "8. echo second",
    "9. echo third",
    "```",
    "",
    "4. Real item",
  ].join("\n");

  it("renumbers nothing inside a fenced code block", () => {
    expect(renumberText(fenced)).toBe(
      "```bash\n7. echo first\n8. echo second\n9. echo third\n```\n\n1. Real item",
    );
  });

  it("treats a fence as a boundary so blocks on both sides stay independent", () => {
    expect(renumberText("4. Above\n```\ncode\n```\n9. Below")).toBe(
      "1. Above\n```\ncode\n```\n1. Below",
    );
  });

  it("does not join blocks across a blank line inside a fence", () => {
    expect(renumberText("1. Above\n```\n\n```\n1. Below")).toBe(
      "1. Above\n```\n\n```\n1. Below",
    );
  });

  it("protects a display math block", () => {
    const input = "$$\n7. x_1\n8. x_2\n$$\n\n9. After";
    expect(renumberText(input)).toBe("$$\n7. x_1\n8. x_2\n$$\n\n1. After");
  });

  it("protects YAML frontmatter", () => {
    const input = "---\ntitle: Demo\n4. stale key\n---\n\n9. Body";
    expect(renumberText(input)).toBe("---\ntitle: Demo\n4. stale key\n---\n\n1. Body");
  });

  it("keeps numbering active when a leading --- has no closing delimiter", () => {
    // An unterminated `---` is a thematic break, not frontmatter, so the note
    // must not be treated as protected from end to end.
    const input = "---\n\n4. Alpha\n5. Beta";
    expect(renumberText(input)).toBe("---\n\n1. Alpha\n2. Beta");
  });

  it("protects an unterminated fence through the end of the document", () => {
    const input = "1. Above\n```\n5. never closed";
    expect(renumberText(input)).toBe(input);
  });

  it("protects the remainder after a tilde fence", () => {
    expect(renumberText("1. Above\n~~~\n7. x")).toBe("1. Above\n~~~\n7. x");
  });

  it("closes a longer fence only with an equally long or longer run", () => {
    const input = "````\n7. inside\n```\n8. still inside\n````\n\n9. After";
    expect(renumberText(input)).toBe("````\n7. inside\n```\n8. still inside\n````\n\n1. After");
  });

  it("leaves Enter inside a fence to the default editor behavior", () => {
    const lines = fenced.split("\n");
    const cursor = input2offset(lines, lines.indexOf("8. echo second"), "8. echo ");
    expect(transformEnter(fenced, { anchor: cursor, head: cursor })).toBeNull();
  });

  it("leaves Tab inside a fence to the default editor behavior", () => {
    const lines = fenced.split("\n");
    const cursor = input2offset(lines, lines.indexOf("8. echo second"), "8. echo ");
    expect(transformIndent(fenced, { anchor: cursor, head: cursor }, "indent")).toBeNull();
    expect(transformIndent(fenced, { anchor: cursor, head: cursor }, "outdent")).toBeNull();
  });

  it("never numbers fence delimiters when inserting numbering", () => {
    const input = "```bash\necho hi\n```\n\nnotes";
    const result = transformInsertNumbering(input, { anchor: 0, head: input.length });
    expect(result?.text).toBe("```bash\necho hi\n```\n\n1. notes");
  });

  it("keeps a code block intact while numbering the prose around it", () => {
    // The fence is a block boundary, so the prose after it restarts at 1.
    const input = "Steps:\n\n```bash\n7. echo first\n8. echo second\n```\n\nDone.";
    const result = transformInsertNumbering(input, { anchor: 0, head: input.length });
    expect(result?.text).toBe("1. Steps:\n\n```bash\n7. echo first\n8. echo second\n```\n\n1. Done.");
  });

  it("does not delete numbering inside a fence", () => {
    const result = transformDeleteNumbering(fenced, { anchor: 0, head: fenced.length });
    expect(result?.text).toBe(
      "```bash\n7. echo first\n8. echo second\n9. echo third\n```\n\nReal item",
    );
  });

  it("reports protected line numbers for decoration", () => {
    expect([...protectedLines(fenced)]).toEqual([0, 1, 2, 3, 4]);
  });
});

function input2offset(lines: string[], line: number, prefix: string): number {
  return lines.slice(0, line).reduce((total, value) => total + value.length + 1, 0) + prefix.length;
}
