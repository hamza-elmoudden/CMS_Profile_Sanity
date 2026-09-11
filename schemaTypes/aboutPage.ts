import { defineField, defineType } from "sanity";
import { bodyField } from "./portableText";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  // Singleton — only one document of this type should exist.
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      group: "content",
      initialValue: "About Me",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "introduction",
      title: "Introduction",
      type: "text",
      rows: 4,
      group: "content",
      description: "Short intro shown at the top of the page",
    }),
    defineField({
      name: "biography",
      title: "Biography",
      group: "content",
      ...bodyField,
    }),
    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      group: "content",
      description: 'Example: "Morocco 🇲🇦"',
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "About Page" };
    },
  },
});
