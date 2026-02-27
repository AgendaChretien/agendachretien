import type { BlocksContent } from "@strapi/blocks-react-renderer";
import { describe, expect, it } from "vitest";

import { formatToText } from "./rich-text";

const baseImageNode: Extract<BlocksContent[number], { type: "image" }> = {
  type: "image",
  image: {
    name: "image.png",
    url: "https://example.com/image.png",
    width: 800,
    height: 600,
    hash: "image-hash",
    ext: ".png",
    mime: "image/png",
    size: 12345,
    provider: "local",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
  children: [{ type: "text", text: "" }],
};

describe("formatToText", () => {
  describe("paragraphs", () => {
    it("should format a simple paragraph", () => {
      const richText: BlocksContent = [
        {
          type: "paragraph",
          children: [{ type: "text", text: "Hello world" }],
        },
      ];

      expect(formatToText(richText)).toBe("Hello world");
    });

    it("should format multiple paragraphs", () => {
      const richText: BlocksContent = [
        {
          type: "paragraph",
          children: [{ type: "text", text: "First paragraph" }],
        },
        {
          type: "paragraph",
          children: [{ type: "text", text: "Second paragraph" }],
        },
      ];

      expect(formatToText(richText)).toBe("First paragraph\n\nSecond paragraph");
    });
  });

  describe("inline formatting", () => {
    it("should format bold text", () => {
      const richText: BlocksContent = [
        {
          type: "paragraph",
          children: [{ type: "text", text: "bold text", bold: true }],
        },
      ];

      expect(formatToText(richText)).toBe("bold text");
    });

    it("should format italic text", () => {
      const richText: BlocksContent = [
        {
          type: "paragraph",
          children: [{ type: "text", text: "italic text", italic: true }],
        },
      ];

      expect(formatToText(richText)).toBe("italic text");
    });

    it("should format strikethrough text", () => {
      const richText: BlocksContent = [
        {
          type: "paragraph",
          children: [{ type: "text", text: "strikethrough text", strikethrough: true }],
        },
      ];

      expect(formatToText(richText)).toBe("strikethrough text");
    });

    it("should format underlined text", () => {
      const richText: BlocksContent = [
        {
          type: "paragraph",
          children: [{ type: "text", text: "underlined text", underline: true }],
        },
      ];

      expect(formatToText(richText)).toBe("underlined text");
    });

    it("should format inline code", () => {
      const richText: BlocksContent = [
        {
          type: "paragraph",
          children: [{ type: "text", text: "code", code: true }],
        },
      ];

      expect(formatToText(richText)).toBe("code");
    });

    it("should combine bold and italic", () => {
      const richText: BlocksContent = [
        {
          type: "paragraph",
          children: [{ type: "text", text: "bold italic", bold: true, italic: true }],
        },
      ];

      expect(formatToText(richText)).toBe("bold italic");
    });

    it("should format mixed inline content", () => {
      const richText: BlocksContent = [
        {
          type: "paragraph",
          children: [
            { type: "text", text: "Normal " },
            { type: "text", text: "bold", bold: true },
            { type: "text", text: " and " },
            { type: "text", text: "italic", italic: true },
          ],
        },
      ];

      expect(formatToText(richText)).toBe("Normal bold and italic");
    });
  });

  describe("links", () => {
    it("should format a link", () => {
      const richText: BlocksContent = [
        {
          type: "paragraph",
          children: [
            {
              type: "link",
              url: "https://example.com",
              children: [{ type: "text", text: "Example" }],
            },
          ],
        },
      ];

      expect(formatToText(richText)).toBe("Example");
    });

    it("should format a link with formatted text", () => {
      const richText: BlocksContent = [
        {
          type: "paragraph",
          children: [
            {
              type: "link",
              url: "https://example.com",
              children: [{ type: "text", text: "Bold link", bold: true }],
            },
          ],
        },
      ];

      expect(formatToText(richText)).toBe("Bold link");
    });
  });

  describe("headings", () => {
    it("should format h1", () => {
      const richText: BlocksContent = [
        {
          type: "heading",
          level: 1,
          children: [{ type: "text", text: "Heading 1" }],
        },
      ];

      expect(formatToText(richText)).toBe("# Heading 1");
    });

    it("should format h2", () => {
      const richText: BlocksContent = [
        {
          type: "heading",
          level: 2,
          children: [{ type: "text", text: "Heading 2" }],
        },
      ];

      expect(formatToText(richText)).toBe("# Heading 2");
    });

    it("should format h3", () => {
      const richText: BlocksContent = [
        {
          type: "heading",
          level: 3,
          children: [{ type: "text", text: "Heading 3" }],
        },
      ];

      expect(formatToText(richText)).toBe("# Heading 3");
    });

    it("should format heading with formatted text", () => {
      const richText: BlocksContent = [
        {
          type: "heading",
          level: 2,
          children: [
            { type: "text", text: "Bold ", bold: true },
            { type: "text", text: "heading" },
          ],
        },
      ];

      expect(formatToText(richText)).toBe("# Bold heading");
    });
  });

  describe("lists", () => {
    it("should format unordered list", () => {
      const richText = [
        {
          type: "list",
          format: "unordered",
          children: [
            {
              type: "list-item",
              children: [
                {
                  type: "text",
                  text: "Item 1",
                },
              ],
            },
            {
              type: "list-item",
              children: [
                {
                  type: "text",
                  text: "Item 2",
                },
              ],
            },
          ],
        },
      ] satisfies BlocksContent;

      expect(formatToText(richText)).toBe("- Item 1\n- Item 2");
    });

    it("should format ordered list", () => {
      const richText = [
        {
          type: "list",
          format: "ordered",
          children: [
            {
              type: "list-item",
              children: [
                {
                  type: "text",
                  text: "First",
                },
              ],
            },
            {
              type: "list-item",
              children: [
                {
                  type: "text",
                  text: "Second",
                },
              ],
            },
          ],
        },
      ] satisfies BlocksContent;

      expect(formatToText(richText)).toBe("1. First\n2. Second");
    });
  });

  describe("quotes", () => {
    it("should format a quote", () => {
      const richText: BlocksContent = [
        {
          type: "quote",
          children: [{ type: "text", text: "A wise quote" }],
        },
      ];

      expect(formatToText(richText)).toBe("> A wise quote");
    });
  });

  describe("code blocks", () => {
    it("should format a code block", () => {
      const richText: BlocksContent = [
        {
          type: "code",
          children: [{ type: "text", text: "const x = 42;" }],
        },
      ];

      expect(formatToText(richText)).toBe("```\nconst x = 42;\n```");
    });
  });

  describe("images", () => {
    it("should format an image", () => {
      const richText: BlocksContent = [baseImageNode] satisfies BlocksContent;

      expect(formatToText(richText)).toBe("");
    });
  });

  describe("complex documents", () => {
    it("should format a complex document", () => {
      const richText = [
        {
          type: "heading",
          level: 1,
          children: [{ type: "text", text: "Welcome" }],
        },
        {
          type: "paragraph",
          children: [
            { type: "text", text: "This is " },
            { type: "text", text: "important", bold: true },
            { type: "text", text: " content." },
          ],
        },
        {
          type: "list",
          format: "unordered",
          children: [
            {
              type: "list-item",
              children: [
                {
                  type: "text",
                  text: "Point 1",
                },
              ],
            },
            {
              type: "list",
              format: "unordered",
              // indentLevel: 1,
              children: [
                {
                  type: "list-item",
                  children: [
                    {
                      type: "text",
                      text: "Subpoint 1",
                    },
                  ],
                },
                {
                  type: "list-item",
                  children: [
                    {
                      type: "text",
                      text: "Subpoint 2",
                    },
                  ],
                },
                {
                  type: "list",
                  format: "ordered",
                  // indentLevel: 2,
                  children: [
                    {
                      type: "list-item",
                      children: [
                        {
                          type: "text",
                          text: "SubSubPoint 1",
                        },
                      ],
                    },
                    {
                      type: "list-item",
                      children: [
                        {
                          type: "text",
                          text: "SubSubPoint 2",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "list-item",
                  children: [
                    {
                      type: "text",
                      text: "Subpoint 3",
                    },
                  ],
                },
              ],
            },
            {
              type: "list-item",
              children: [
                {
                  type: "text",
                  text: "Point 2",
                },
              ],
            },
            {
              type: "list-item",
              children: [
                {
                  type: "text",
                  text: "Point 3",
                },
              ],
            },
          ],
        },
      ] satisfies BlocksContent;

      expect(formatToText(richText)).toMatchInlineSnapshot(`
        "# Welcome

        This is important content.

        - Point 1
          - Subpoint 1
          - Subpoint 2
            1. SubSubPoint 1
            2. SubSubPoint 2
          - Subpoint 3
        - Point 2
        - Point 3"
      `);
    });
  });

  describe("empty content", () => {
    it("should handle empty array", () => {
      const richText: BlocksContent = [];

      expect(formatToText(richText)).toBe("");
    });
  });
});
