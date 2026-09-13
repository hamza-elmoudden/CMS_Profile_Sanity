import { defineArrayMember, defineField, defineType } from "sanity";
import { bodyField } from "./portableText";

export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "meta", title: "Meta & Relations" },
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
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      group: "content",
      description: "Short summary shown in post cards and RSS feeds",
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
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
        defineField({
          name: "caption",
          title: "Caption",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Body",
      group: "content",
      ...bodyField,
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      group: "meta",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      group: "meta",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "meta",
      of: [defineArrayMember({ type: "reference", to: [{ type: "tag" }] })],
    }),
    defineField({
      name: "relatedPosts",
      title: "Related Posts",
      type: "array",
      group: "meta",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "post" }],
        }),
      ],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      group: "meta",
      description: "Pin to the top of the blog listing",
      initialValue: false,
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      group: "meta",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          // Only required when the post is "published" (has a live URL),
          // but we can't know that here, so make it a warning instead.
          if (!value) return "Consider setting a publish date";
          return true;
        }),
    }),
    defineField({
      name: "updatedAt",
      title: "Last Updated At",
      type: "datetime",
      group: "meta",
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
      subtitle: "publishedAt",
      media: "coverImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle
          ? new Date(subtitle).toLocaleDateString("en-GB")
          : "Draft",
        media,
      };
    },
  },
  orderings: [
    {
      title: "Published — Newest First",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
