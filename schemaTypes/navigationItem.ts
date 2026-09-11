import { defineArrayMember, defineField, defineType } from "sanity";

export const navigationItem = defineType({
  name: "navigationItem",
  title: "Navigation Item",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "string",
      description: 'Use relative paths for internal links: "/projects"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "external",
      title: "Open in new tab",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
    }),
    defineField({
      name: "children",
      title: "Sub-items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", title: "Label", validation: (Rule) => Rule.required() }),
            defineField({ name: "url", type: "string", title: "URL", validation: (Rule) => Rule.required() }),
            defineField({ name: "external", type: "boolean", title: "Open in new tab", initialValue: false }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "url",
    },
  },
});
