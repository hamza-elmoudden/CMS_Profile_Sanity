import { defineField, defineType } from "sanity";

export const SKILL_CATEGORIES = [
  { title: "Backend", value: "backend" },
  { title: "Frontend", value: "frontend" },
  { title: "Database", value: "database" },
  { title: "DevOps", value: "devops" },
  { title: "Architecture", value: "architecture" },
  { title: "SEO", value: "seo" },
  { title: "AI / ML", value: "ai" },
  { title: "Mobile", value: "mobile" },
  { title: "Other", value: "other" },
];

export const skill = defineType({
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: SKILL_CATEGORIES },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      description:
        "Icon identifier — e.g. a Devicon class name like 'devicon-nestjs-plain' or a simple key like 'nestjs'",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Show on the homepage skills section",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
    },
  },
  orderings: [
    {
      title: "Category, then Name",
      name: "categoryName",
      by: [
        { field: "category", direction: "asc" },
        { field: "name", direction: "asc" },
      ],
    },
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
