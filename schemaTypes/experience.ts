import { defineArrayMember, defineField, defineType } from "sanity";
import { bodyField } from "./portableText";

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({
      name: "company",
      title: "Company / Organisation",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "position",
      title: "Position / Role",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      ...bodyField,
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "date",
      description: "Leave blank if this is your current role",
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
      name: "current",
      title: "Current Role",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "technologies",
      title: "Technologies Used",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "skill" }],
        }),
      ],
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "position",
      subtitle: "company",
    },
  },
  orderings: [
    {
      title: "Most Recent First",
      name: "startDateDesc",
      by: [{ field: "startDate", direction: "desc" }],
    },
  ],
});
