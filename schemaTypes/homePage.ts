import {  defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  // Singleton — only one document of this type should exist.
  // Enforced via the Studio structure (see structure.ts).
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "sections", title: "Sections" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "heroSection",
      group: "hero",
    }),
    defineField({
      name: "featuredProjectsTitle",
      title: "Featured Projects — Section Title",
      type: "string",
      group: "sections",
      initialValue: "Selected Projects",
    }),
    defineField({
      name: "featuredServicesTitle",
      title: "Featured Services — Section Title",
      type: "string",
      group: "sections",
      initialValue: "What I Do",
    }),
    defineField({
      name: "featuredSkillsTitle",
      title: "Featured Skills — Section Title",
      type: "string",
      group: "sections",
      initialValue: "Tech Stack",
    }),
    defineField({
      name: "featuredPostsTitle",
      title: "Latest Posts — Section Title",
      type: "string",
      group: "sections",
      initialValue: "From the Blog",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Home Page" };
    },
  },
});
