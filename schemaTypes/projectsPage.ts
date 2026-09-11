import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Singleton document for the /projects/ listing page.
 *
 * Controls:
 *  - Page-level SEO (title, description, OG image, canonical, noIndex)
 *  - Open Graph / Twitter card metadata
 *  - Structured data inputs (name, description) for JSON-LD CreativeWork list
 *  - Hero copy shown at the top of the listing page
 *  - Optional featured projects override (pinned order independent of the
 *    `featured` flag on individual project documents)
 *  - Pagination hint (projects per page)
 *  - Filter/category labels the frontend can use to build the UI
 */
export const projectsPage = defineType({
  name: "projectsPage",
  title: "Projects Page",
  type: "document",
  // Singleton — enforced via structure.ts (documentId: "projectsPage")
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "seo", title: "SEO & Meta" },
    { name: "og", title: "Open Graph" },
    { name: "structured", title: "Structured Data" },
    { name: "settings", title: "Page Settings" },
  ],
  fields: [
    // ── Hero ────────────────────────────────────────────────────────────────
    defineField({
      name: "heading",
      title: "Page Heading",
      type: "string",
      group: "hero",
      description: 'Displayed as the visible <h1> on the page. Example: "Projects"',
      initialValue: "Projects",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 2,
      group: "hero",
      description:
        "Short paragraph shown below the heading on the listing page.",
      initialValue:
        "A selection of the products, tools, and systems I have built.",
    }),

    // ── SEO ─────────────────────────────────────────────────────────────────
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      group: "seo",
      description:
        "Shown in the browser tab and search results. Recommended: 50–60 characters.",
      initialValue: "Projects — Hamza Elmouddane",
      validation: (Rule) =>
        Rule.required()
          .min(10)
          .max(60)
          .warning("Keep between 10 and 60 characters for best results"),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      group: "seo",
      description: "Shown in search result snippets. Recommended: 140–160 characters.",
      initialValue:
        "Browse the projects built by Hamza Elmouddane — scalable web applications, backend systems, and digital products using NestJS, FastAPI, React, and more.",
      validation: (Rule) =>
        Rule.required()
          .min(50)
          .max(160)
          .warning("Keep between 50 and 160 characters"),
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      group: "seo",
      description:
        "Leave blank — the frontend auto-generates https://hamzaelmouddane.ma/projects/. Override only if needed.",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https"] }).warning(
          "Must start with http:// or https://"
        ),
    }),
    defineField({
      name: "noIndex",
      title: "No Index",
      type: "boolean",
      group: "seo",
      description: "Block search engines from indexing this page.",
      initialValue: false,
    }),

    // ── Open Graph ──────────────────────────────────────────────────────────
    defineField({
      name: "ogTitle",
      title: "OG Title",
      type: "string",
      group: "og",
      description: "Shown when the page is shared on social media. Falls back to Meta Title.",
    }),
    defineField({
      name: "ogDescription",
      title: "OG Description",
      type: "text",
      rows: 3,
      group: "og",
      description:
        "Shown when shared on social media. Falls back to Meta Description.",
    }),
    defineField({
      name: "ogImage",
      title: "OG Image",
      type: "image",
      group: "og",
      description:
        "Image shown when the page is shared. Recommended: 1200 × 630 px.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Describe the image for accessibility and social cards.",
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

    // ── Structured Data ─────────────────────────────────────────────────────
    defineField({
      name: "structuredDataName",
      title: "Structured Data — Name",
      type: "string",
      group: "structured",
      description:
        'Used in JSON-LD CollectionPage schema "name" field. Example: "Projects by Hamza Elmouddane"',
      initialValue: "Projects by Hamza Elmouddane",
    }),
    defineField({
      name: "structuredDataDescription",
      title: "Structured Data — Description",
      type: "text",
      rows: 2,
      group: "structured",
      description:
        "Used in JSON-LD CollectionPage schema 'description' field. Keep it factual.",
      initialValue:
        "A collection of web applications, backend systems, and digital products built by Hamza Elmouddane.",
    }),

    // ── Page Settings ────────────────────────────────────────────────────────
    defineField({
      name: "projectsPerPage",
      title: "Projects Per Page",
      type: "number",
      group: "settings",
      description: "How many projects to show per page when pagination is enabled.",
      initialValue: 9,
      validation: (Rule) =>
        Rule.min(1).max(50).integer().warning("Keep between 1 and 50"),
    }),
    defineField({
      name: "showFilters",
      title: "Show Filter Bar",
      type: "boolean",
      group: "settings",
      description: "Display the project-type / status filter bar on the listing page.",
      initialValue: true,
    }),
    defineField({
      name: "filterLabels",
      title: "Filter Labels",
      type: "object",
      group: "settings",
      description:
        "Customise the label text for each filter option. Useful for translated sites.",
      fields: [
        defineField({ name: "all", title: '"All" label', type: "string", initialValue: "All" }),
        defineField({ name: "personal", title: '"Personal" label', type: "string", initialValue: "Personal" }),
        defineField({ name: "client", title: '"Client Work" label', type: "string", initialValue: "Client Work" }),
        defineField({ name: "opensource", title: '"Open Source" label', type: "string", initialValue: "Open Source" }),
        defineField({ name: "saas", title: '"SaaS" label', type: "string", initialValue: "SaaS" }),
        defineField({ name: "side", title: '"Side Project" label', type: "string", initialValue: "Side Project" }),
      ],
    }),
    defineField({
      name: "pinnedProjects",
      title: "Pinned Projects",
      type: "array",
      group: "settings",
      description:
        "Projects pinned to the top of the listing regardless of their individual order/featured values. Max 3.",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "project" }],
        }),
      ],
      validation: (Rule) => Rule.max(3).unique(),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Projects Page" };
    },
  },
});
