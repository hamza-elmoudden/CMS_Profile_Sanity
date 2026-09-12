import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  // Singleton — only one document of this type should exist.
  groups: [
    { name: "branding", title: "Branding", default: true },
    { name: "contact", title: "Contact" },
    { name: "social", title: "Social" },
    { name: "navigation", title: "Navigation" },
    { name: "seo", title: "Global SEO" },
  ],
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      group: "branding",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      group: "branding",
      description:
        'Used in the browser tab and default OG title. Example: "Hamza Elmouddane — Software Developer"',
    }),
    defineField({
      name: "siteDescription",
      title: "Site Description",
      type: "text",
      rows: 2,
      group: "branding",
      description: "Default meta description for pages without a custom one",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      group: "branding",
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
      name: "favicon",
      title: "Favicon",
      type: "image",
      group: "branding",
    }),
    defineField({
      name: "defaultOgImage",
      title: "Default OG Image",
      type: "image",
      group: "seo",
      description:
        "Fallback image used when a page has no custom OG image. Recommended: 1200×630px",
      options: { hotspot: true },
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      group: "contact",
      description: 'Example: "Morocco"',
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      group: "social",
      of: [defineArrayMember({ type: "socialLink" })],
    }),
    defineField({
      name: "navigation",
      title: "Main Navigation",
      type: "array",
      group: "navigation",
      of: [defineArrayMember({ type: "navigationItem" })],
    }),
    defineField({
      name: "footerText",
      title: "Footer Text",
      type: "string",
      group: "navigation",
      description:
        'Example: "© 2025 Hamza Elmouddane. All rights reserved."',
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
