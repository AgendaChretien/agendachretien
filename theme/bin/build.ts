import StyleDictionary from "style-dictionary";
import { formattedVariables } from "style-dictionary/utils";

function kebabCase(str: string) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();
}

function getVariableName(path: string[]) {
  return kebabCase(path.slice(3).join(" "));
}

StyleDictionary.registerFormat({
  name: "css/variables2",
  format: ({ dictionary, options }) => {
    const { dark = false } = options;

    let content = formattedVariables({ dictionary, format: "css" });
    content = `:root {\n${content}\n}`;

    if (dark) {
      content = `@media (prefers-color-scheme: dark) {\n${content}\n}`;
    }

    return content;
  },
});

StyleDictionary.registerTransform({
  name: "color/rgb2",
  type: "value",
  filter: (token) => token.type === "color",
  transform: (token) => {
    const { rgb } = token.attributes as {
      rgb: { r: number; g: number; b: number; a: number };
    };

    return `${rgb.r} ${rgb.g} ${rgb.b}`;
  },
});

StyleDictionary.registerTransform({
  name: "name/sanitize",
  type: "name",
  transform: (token) => getVariableName(token.path),
});

StyleDictionary.registerTransform({
  name: "value/rgb-variable",
  type: "value",
  transitive: true,
  transform: (token) => `rgb(var(--${getVariableName(token.path)}))`,
});

async function main() {
  const sd = new StyleDictionary({
    source: ["theme/tokens.json"],
    platforms: {
      css: {
        transformGroup: "css",
        transforms: [
          "attribute/cti",
          "attribute/color",
          "color/rgb2",
          "name/sanitize",
        ],
        files: [
          {
            destination: "theme/dist/css/light.css",
            format: "css/variables2",
            filter: ({ path }) => path.includes("light"),
          },
          {
            destination: "theme/dist/css/dark.css",
            format: "css/variables2",
            options: { dark: true },
            filter: ({ path }) => path.includes("dark"),
          },
        ],
      },
      tailwind: {
        transforms: [
          "attribute/cti",
          "attribute/color",
          "name/sanitize",
          "value/rgb-variable",
        ],
        files: [
          {
            destination: "theme/dist/tailwind/colors.json",
            format: "json/flat",
            filter: ({ path }) =>
              path.includes("light") && path.includes("schemes"),
          },
        ],
      },
    },
  });

  sd.buildAllPlatforms();
}

main();
