import type { BlocksContent } from "@strapi/blocks-react-renderer";
import { form } from "motion/react-client";

type TextNode = {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
};

type LinkNode = {
  type: "link";
  url: string;
  children: TextNode[];
};

type InlineNode = TextNode | LinkNode;

type Block = BlocksContent[number];

function formatInlineNode(node: InlineNode): string {
  switch (node.type) {
    case "link":
      return node.children.map(formatInlineNode).join("");

    case "text":
      return node.text;
  }
}

function formatBlock(block: Block, level = 1): string {
  switch (block.type) {
    case "paragraph":
      return block.children.map(formatInlineNode).join("");

    case "heading":
      return `# ${block.children.map(formatInlineNode).join("")}`;

    case "list":
      return block.children
        .map((child, index) => {
          if (child.type === "list") {
            return formatBlock(child, level + 1);
          }

          const content = child.children.map(formatInlineNode).join("");

          const bullet = block.format === "ordered" ? `${index + 1}.` : "-";

          return `${"  ".repeat(level - 1)}${bullet} ${content}`;
        })
        .join("\n");

    case "quote":
      return block.children
        .map(formatInlineNode)
        .join("\n")
        .split("\n")
        .map((line) => `> ${line}`)
        .join("\n");

    case "code":
      return `\`\`\`\n${block.children
        .map((child) => (child.type === "text" ? child.text : ""))
        .join("")}\n\`\`\``;

    case "image":
    default:
      return "";
  }
}

export function formatToText(richText: BlocksContent): string {
  return richText.map((block) => formatBlock(block)).join("\n\n");
}
