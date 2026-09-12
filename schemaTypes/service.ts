import { defineField, defineType } from "sanity";
import { bodyField } from "./portableText";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 2,
      group: "content",
      description: "Used in service cards and list views",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "description",
      title: "Full Description",
      group: "content",
      ...bodyField,
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      group: "content",
      description:
        "Icon identifier or SVG string. Example: 'nestjs', 'backend', 'api'",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      group: "content",
      description: "Show on the homepage",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      group: "content",
      initialValue: 0,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
