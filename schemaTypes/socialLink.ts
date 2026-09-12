import { defineField, defineType } from "sanity";

export const SOCIAL_PLATFORMS = [
  { title: "GitHub", value: "github" },
  { title: "LinkedIn", value: "linkedin" },
  { title: "X (Twitter)", value: "x" },
  { title: "YouTube", value: "youtube" },
  { title: "Instagram", value: "instagram" },
  { title: "Facebook", value: "facebook" },
  { title: "Dev.to", value: "devto" },
  { title: "Medium", value: "medium" },
  { title: "Hashnode", value: "hashnode" },
  { title: "Stack Overflow", value: "stackoverflow" },
  { title: "Website", value: "website" },
  { title: "Other", value: "other" },
];

export const socialLink = defineType({
  name: "socialLink",
  title: "Social Link",
  type: "object",
  fields: [
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      options: {
        list: SOCIAL_PLATFORMS,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (Rule) =>
        Rule.required().uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description:
        'Optional display label. Defaults to the platform name if blank. Example: "@hamzaelmouddane"',
    }),
  ],
  preview: {
    select: {
      title: "platform",
      subtitle: "url",
    },
  },
});
