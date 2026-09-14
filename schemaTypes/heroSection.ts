import {defineField, defineType} from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Example: "Software Developer & Entrepreneur in Morocco"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description:
        'Example: "I build scalable web applications, backend systems, and digital products using modern technologies."',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Button Label',
      type: 'string',
      description: 'Example: "View Projects"',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'CTA Button URL',
      type: 'string',
      description: 'Example: "/projects"',
    }),
    defineField({
      name: 'secondaryCtaLabel',
      title: 'Secondary CTA Label',
      type: 'string',
    }),
    defineField({
      name: 'secondaryCtaUrl',
      title: 'Secondary CTA URL',
      type: 'string',
    }),
    // defineField({
    //   name: "image",
    //   title: "Hero Image",
    //   type: "image",
    //   options: { hotspot: true },
    //   fields: [
    //     defineField({
    //       name: "alt",
    //       title: "Alt Text",
    //       type: "string",
    //       validation: (Rule) => Rule.required(),
    //     }),
    //   ],
    // }),
  ],
})
