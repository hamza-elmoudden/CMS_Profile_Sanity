import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description: "Recommended: 50–60 characters",
      validation: (Rule) =>
        Rule.max(60).warning("Meta title should be under 60 characters"),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "Recommended: 150–160 characters",
      validation: (Rule) =>
        Rule.max(160).warning(
          "Meta description should be under 160 characters"
        ),
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      description:
        "Leave blank to auto-generate from the page URL. Override only when needed.",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https"] }).warning(
          "Must be a valid URL starting with http:// or https://"
        ),
    }),
    defineField({
      name: "noIndex",
      title: "No Index",
      type: "boolean",
      description: "Prevent search engines from indexing this page",
      initialValue: false,
    }),
    defineField({
      name: "ogTitle",
      title: "OG Title",
      type: "string",
      description:
        "Open Graph title — shown when shared on social. Falls back to Meta Title if blank.",
    }),
    defineField({
      name: "ogDescription",
      title: "OG Description",
      type: "text",
      rows: 3,
      description:
        "Open Graph description — shown when shared on social. Falls back to Meta Description if blank.",
    }),
    defineField({
      name: "ogImage",
      title: "OG Image",
      type: "image",
      description: "Recommended size: 1200×630px",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),
  ],
  options: {
    collapsible: true,
    collapsed: true,
  },
});
