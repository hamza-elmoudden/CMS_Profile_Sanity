import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Singleton document for the /blog/ listing page.
 */
export const postsPage = defineType({
  name: "postsPage",
  title: "Blog Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "seo", title: "SEO & Meta" },
    { name: "og", title: "Open Graph" },
    { name: "structured", title: "Structured Data" },
    { name: "settings", title: "Page Settings" },
  ],
  fields: [
    // ── Hero ──────────────────────────────────────────────────────────────
    defineField({
      name: "heading",
      title: "Page Heading",
      type: "string",
      group: "hero",
      initialValue: "Blog",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 2,
      group: "hero",
      initialValue:
        "Thoughts on backend engineering, architecture, and building products.",
    }),

    // ── SEO ───────────────────────────────────────────────────────────────
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      group: "seo",
      description: "Recommended: 50–60 characters.",
      initialValue: "Blog — Hamza Elmouddane",
      validation: (Rule) =>
        Rule.required().min(10).max(60).warning("Keep between 10 and 60 characters"),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      group: "seo",
      description: "Recommended: 140–160 characters.",
      initialValue:
        "Articles on NestJS, FastAPI, system design, and building scalable products — written by Hamza Elmouddane.",
      validation: (Rule) =>
        Rule.required().min(50).max(160).warning("Keep between 50 and 160 characters"),
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      group: "seo",
      description: "Leave blank — auto-generated as /blog/. Override only if needed.",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "noIndex",
      title: "No Index",
      type: "boolean",
      group: "seo",
      initialValue: false,
    }),

    // ── Open Graph ────────────────────────────────────────────────────────
    defineField({
      name: "ogTitle",
      title: "OG Title",
      type: "string",
      group: "og",
      description: "Falls back to Meta Title if blank.",
    }),
    defineField({
      name: "ogDescription",
      title: "OG Description",
      type: "text",
      rows: 3,
      group: "og",
      description: "Falls back to Meta Description if blank.",
    }),
    defineField({
      name: "ogImage",
      title: "OG Image",
      type: "image",
      group: "og",
      description: "Recommended: 1200 × 630 px.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "twitterCard",
      title: "Twitter Card Type",
      type: "string",
      group: "og",
      options: {
        list: [
          { title: "Summary Large Image (recommended)", value: "summary_large_image" },
          { title: "Summary", value: "summary" },
        ],
        layout: "radio",
      },
      initialValue: "summary_large_image",
    }),

    // ── Structured Data ───────────────────────────────────────────────────
    defineField({
      name: "structuredDataName",
      title: "Structured Data — Name",
      type: "string",
      group: "structured",
      initialValue: "Blog — Hamza Elmouddane",
    }),
    defineField({
      name: "structuredDataDescription",
      title: "Structured Data — Description",
      type: "text",
      rows: 2,
      group: "structured",
      initialValue:
        "A blog about backend engineering, NestJS, FastAPI, system design, and building scalable digital products.",
    }),

    // ── Page Settings ──────────────────────────────────────────────────────
    defineField({
      name: "postsPerPage",
      title: "Posts Per Page",
      type: "number",
      group: "settings",
      initialValue: 10,
      validation: (Rule) => Rule.min(1).max(50).integer(),
    }),
    defineField({
      name: "showCategoryFilter",
      title: "Show Category Filter",
      type: "boolean",
      group: "settings",
      initialValue: true,
    }),
    defineField({
      name: "showTagFilter",
      title: "Show Tag Filter",
      type: "boolean",
      group: "settings",
      initialValue: false,
    }),
    defineField({
      name: "pinnedPosts",
      title: "Pinned Posts",
      type: "array",
      group: "settings",
      description: "Posts pinned to the top of the listing. Max 3.",
      of: [defineArrayMember({ type: "reference", to: [{ type: "post" }] })],
      validation: (Rule) => Rule.max(3).unique(),
    }),
    defineField({
      name: "featuredPost",
      title: "Featured Post",
      type: "reference",
      to: [{ type: "post" }],
      group: "settings",
      description:
        "Single post shown in a hero card at the top of the listing. Leave blank to auto-use the latest featured post.",
    }),
    defineField({
      name: "newsletterCtaLabel",
      title: "Newsletter CTA Label",
      type: "string",
      group: "settings",
      description: "Optional. Label for a newsletter subscription call-to-action section.",
      initialValue: "Get new articles in your inbox",
    }),
    defineField({
      name: "newsletterCtaSubtext",
      title: "Newsletter CTA Subtext",
      type: "string",
      group: "settings",
      initialValue: "No spam. Unsubscribe any time.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Blog Page" };
    },
  },
});
