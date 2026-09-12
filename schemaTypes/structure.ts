import { StructureBuilder } from "sanity/desk";
import { HomeIcon, UserIcon, DocumentTextIcon, CogIcon } from "@sanity/icons";

/**
 * Custom Studio structure.
 *
 * Singletons (homePage, aboutPage, siteSettings) are rendered as single
 * documents so editors can't accidentally create duplicates.
 */

// IDs for singleton documents — must match the first document created of each type
const SINGLETON_TYPES = new Set(["homePage", "aboutPage", "siteSettings"]);

const singletonListItem = (
  S: StructureBuilder,
  typeName: string,
  title: string,
  icon?: React.ComponentType
) =>
  S.listItem()
    .title(title)
    .id(typeName)
    .icon(icon)
    .child(
      S.document()
        .schemaType(typeName)
        .documentId(typeName) // fixed ID — guarantees single document
        .title(title)
    );

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Studio")
    .items([
      // ─── CONTENT ───────────────────────────────────────────────────────
      S.listItem()
        .title("Content")
        .child(
          S.list()
            .title("Content")
            .items([
              singletonListItem(S, "homePage", "Home Page"),
              singletonListItem(S, "aboutPage", "About Page"),
              S.divider(),
              S.documentTypeListItem("project").title("Projects"),
              S.documentTypeListItem("service").title("Services"),
              S.documentTypeListItem("experience").title("Experience"),
            ])
        ),

      // ─── BLOG ──────────────────────────────────────────────────────────
      S.listItem()
        .title("Blog")
        .child(
          S.list()
            .title("Blog")
            .items([
              S.documentTypeListItem("post").title("Posts"),
              S.documentTypeListItem("author").title("Authors"),
            ])
        ),

      // ─── TAXONOMY ──────────────────────────────────────────────────────
      S.listItem()
        .title("Taxonomy")
        .child(
          S.list()
            .title("Taxonomy")
            .items([
              S.documentTypeListItem("skill").title("Skills"),
              S.documentTypeListItem("category").title("Categories"),
              S.documentTypeListItem("tag").title("Tags"),
            ])
        ),

      // ─── SETTINGS ──────────────────────────────────────────────────────
      S.divider(),
      singletonListItem(S, "siteSettings", "Site Settings"),
    ]);

/**
 * Filter singletons out of the default document type list to prevent
 * editors from creating extras via the search or "New document" shortcut.
 */
export const defaultDocumentNode = (S: StructureBuilder) =>
  S.document().views([S.view.form()]);

export const singletonTypes = SINGLETON_TYPES;
