import { defineArrayMember, defineField, defineType } from "sanity";
import { bodyField } from "./portableText";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "media", title: "Media" },
    { name: "links", title: "Links & Meta" },
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
      description: "Used in project cards and list views",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "description",
      title: "Full Description",
      group: "content",
      ...bodyField,
    }),
    defineField({
      name: "projectType",
      title: "Project Type",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Personal Project", value: "personal" },
          { title: "Client Work", value: "client" },
          { title: "Open Source", value: "opensource" },
          { title: "SaaS", value: "saas" },
          { title: "Side Project", value: "side" },
        ],
      },
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Idea", value: "idea" },
          { title: "In Progress", value: "inProgress" },
          { title: "Completed", value: "completed" },
          { title: "Archived", value: "archived" },
        ],
        layout: "radio",
      },
      initialValue: "inProgress",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "technologies",
      title: "Technologies",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "skill" }],
        }),
      ],
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "caption",
          title: "Caption",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      group: "media",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
      group: "links",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "liveUrl",
      title: "Live URL",
      type: "url",
      group: "links",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      group: "links",
      description: "Show in the featured projects section on the homepage",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      group: "links",
      initialValue: 0,
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
      group: "links",
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "date",
      group: "links",
      validation: (Rule) =>
        Rule.custom((endDate, context) => {
          const { startDate } = context.document as { startDate?: string };
          if (startDate && endDate && endDate < startDate) {
            return "End date must be after start date";
          }
          return true;
        }),
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
      subtitle: "status",
      media: "featuredImage",
    },
  },
  orderings: [
    {
      title: "Featured First",
      name: "featuredFirst",
      by: [
        { field: "featured", direction: "desc" },
        { field: "order", direction: "asc" },
      ],
    },
    {
      title: "Newest First",
      name: "startDateDesc",
      by: [{ field: "startDate", direction: "desc" }],
    },
  ],
});
