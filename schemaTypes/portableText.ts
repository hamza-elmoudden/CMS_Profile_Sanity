import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Full-featured Portable Text block definition.
 * Import `portableTextFields` wherever you need a rich-text `body` field,
 * or use `portableText` as a standalone object type in object schemas.
 */

export const portableTextContent = defineArrayMember({
  type: "block",
  styles: [
    { title: "Normal", value: "normal" },
    { title: "Heading 2", value: "h2" },
    { title: "Heading 3", value: "h3" },
    { title: "Heading 4", value: "h4" },
    { title: "Quote", value: "blockquote" },
  ],
  lists: [
    { title: "Bullet", value: "bullet" },
    { title: "Numbered", value: "number" },
  ],
  marks: {
    decorators: [
      { title: "Bold", value: "strong" },
      { title: "Italic", value: "em" },
      { title: "Code", value: "code" },
      { title: "Underline", value: "underline" },
      { title: "Strike", value: "strike-through" },
    ],
    annotations: [
      {
        name: "link",
        type: "object",
        title: "Link",
        fields: [
          defineField({
            name: "href",
            type: "url",
            title: "URL",
            validation: (Rule) =>
              Rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
          }),
          defineField({
            name: "blank",
            type: "boolean",
            title: "Open in new tab",
            initialValue: false,
          }),
        ],
      },
      {
        name: "internalLink",
        type: "object",
        title: "Internal Link",
        fields: [
          defineField({
            name: "href",
            type: "string",
            title: "Path",
            description: 'Relative path, e.g. "/projects/my-project"',
          }),
        ],
      },
    ],
  },
});

/** Inline code block — embedded in the block content array */
export const codeBlock = defineArrayMember({
  type: "object",
  name: "codeBlock",
  title: "Code Block",
  fields: [
    defineField({
      name: "language",
      type: "string",
      title: "Language",
      options: {
        list: [
          "typescript",
          "javascript",
          "python",
          "go",
          "bash",
          "json",
          "yaml",
          "html",
          "css",
          "sql",
          "dockerfile",
          "plaintext",
        ].map((v) => ({ title: v, value: v })),
      },
      initialValue: "typescript",
    }),
    defineField({
      name: "code",
      type: "text",
      title: "Code",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "filename",
      type: "string",
      title: "Filename",
      description: "Optional filename to display above the block",
    }),
  ],
  preview: {
    select: { title: "language", subtitle: "filename" },
    prepare({ title, subtitle }) {
      return { title: subtitle || title, subtitle: title };
    },
  },
});

/** Image block embedded in Portable Text */
export const portableTextImage = defineArrayMember({
  type: "image",
  name: "inlineImage",
  title: "Image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      type: "string",
      title: "Alt Text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      type: "string",
      title: "Caption",
    }),
  ],
});

/**
 * Drop-in field definition for any document that needs a rich-text body.
 * Usage:
 *   defineField({ name: "body", ...bodyField })
 */
export const bodyField = {
  title: "Body",
  type: "array",
  of: [portableTextContent, codeBlock, portableTextImage],
} as const;

/** Standalone object type — use when you need to reference portableText by name */
export const portableText = defineType({
  name: "portableText",
  title: "Portable Text",
  type: "array",
  of: [portableTextContent, codeBlock, portableTextImage],
});
