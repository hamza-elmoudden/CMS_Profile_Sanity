# Sanity Studio — hamzaelmouddane.ma

Content management system for the personal portfolio and brand website of **Hamza Elmouddane**.

Built with [Sanity.io](https://sanity.io) · TypeScript · GROQ

---

## Table of Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Schema Architecture](#schema-architecture)
  - [Singletons](#singletons)
  - [Content Documents](#content-documents)
  - [Taxonomy Documents](#taxonomy-documents)
  - [Reusable Objects](#reusable-objects)
- [Studio Navigation](#studio-navigation)
- [GROQ Queries](#groq-queries)
- [Environment Variables](#environment-variables)
- [First-Time Setup](#first-time-setup)
- [Validation Rules](#validation-rules)
- [SEO Architecture](#seo-architecture)
- [Multilingual](#multilingual)
- [Adding a New Schema](#adding-a-new-schema)

---

## Quick Start

```bash
# Install dependencies
npm install

# Start the Studio locally
npm run dev

# Deploy the Studio to Sanity's hosted URL
npx sanity deploy
```

Studio runs at `http://localhost:3333` by default.

---

## Project Structure

```
sanity/
├── schemaTypes/
│   ├── documents/
│   │   ├── homePage.ts          # Singleton — /
│   │   ├── aboutPage.ts         # Singleton — /about
│   │   ├── projectsPage.ts      # Singleton — /projects
│   │   ├── postsPage.ts         # Singleton — /blog
│   │   ├── servicesPage.ts      # Singleton — /services
│   │   ├── siteSettings.ts      # Singleton — global config
│   │   ├── project.ts           # Individual project
│   │   ├── service.ts           # Individual service
│   │   ├── post.ts              # Blog post
│   │   ├── author.ts            # Author profile
│   │   ├── category.ts          # Blog category
│   │   ├── tag.ts               # Blog tag
│   │   ├── skill.ts             # Tech skill / tool
│   │   └── experience.ts        # Work experience entry
│   │
│   ├── objects/
│   │   ├── seo.ts               # Reusable SEO meta fields
│   │   ├── heroSection.ts       # Hero title + description + CTA
│   │   ├── socialLink.ts        # Platform + URL + label
│   │   ├── navigationItem.ts    # Nav label + URL + children
│   │   └── portableText.ts      # Rich text config + code blocks
│   │
│   └── index.ts                 # Registers all schemas
│
├── groq/
│   └── queries.ts               # All GROQ queries for Next.js
│
├── seed/
│   └── examples.ts              # Example document shapes for first setup
│
└── structure.ts                 # Custom Studio sidebar layout
```

---

## Schema Architecture

### Singletons

Singleton documents have a **fixed `_id`** equal to the schema type name. This means there can only ever be one of each. They are enforced through `structure.ts` — editors cannot create duplicates from the Studio UI.

| Document type  | Fixed `_id`    | URL         | Purpose                                     |
| -------------- | -------------- | ----------- | ------------------------------------------- |
| `homePage`     | `homePage`     | `/`         | Hero copy, section titles, SEO              |
| `aboutPage`    | `aboutPage`    | `/about`    | Biography, profile image, location, SEO     |
| `projectsPage` | `projectsPage` | `/projects` | Listing heading, filters, pinned items, SEO |
| `postsPage`    | `postsPage`    | `/blog`     | Listing heading, featured post, pinned, SEO |
| `servicesPage` | `servicesPage` | `/services` | Listing heading, CTA, process steps, SEO    |
| `siteSettings` | `siteSettings` | global      | Logo, nav, footer, social links, contact    |

### Content Documents

These support multiple documents and have slugs for public URLs.

#### `project` — `/projects/[slug]`

| Field              | Type          | Notes                                        |
| ------------------ | ------------- | -------------------------------------------- |
| `title`            | string        | Required                                     |
| `slug`             | slug          | Auto-generated from title. Required.         |
| `shortDescription` | text          | Max 200 chars. Used in cards.                |
| `description`      | Portable Text | Full rich-text content                       |
| `projectType`      | string (enum) | personal / client / opensource / saas / side |
| `status`           | string (enum) | idea / inProgress / completed / archived     |
| `technologies`     | reference[]   | References `skill` documents                 |
| `featuredImage`    | image         | With alt text (required) and caption         |
| `gallery`          | image[]       | Each with alt text (required)                |
| `githubUrl`        | url           | Optional                                     |
| `liveUrl`          | url           | Optional                                     |
| `featured`         | boolean       | Pin to homepage featured section             |
| `order`            | number        | Display order. Lower = first.                |
| `startDate`        | date          | Optional                                     |
| `endDate`          | date          | Must be after startDate                      |
| `seo`              | seo object    | Per-page SEO overrides                       |

#### `service` — `/services/[slug]`

| Field              | Type          | Notes                    |
| ------------------ | ------------- | ------------------------ |
| `title`            | string        | Required                 |
| `slug`             | slug          | Required                 |
| `shortDescription` | text          | Max 200 chars. Required. |
| `description`      | Portable Text | Full rich-text content   |
| `icon`             | string        | Icon key or class name   |
| `featured`         | boolean       | Show on homepage         |
| `order`            | number        | Display order            |
| `seo`              | seo object    | Per-page SEO overrides   |

#### `post` — `/blog/[slug]`

| Field          | Type          | Notes                                      |
| -------------- | ------------- | ------------------------------------------ |
| `title`        | string        | Required                                   |
| `slug`         | slug          | Required                                   |
| `excerpt`      | text          | Max 300 chars. Used in cards and RSS.      |
| `body`         | Portable Text | Full rich-text + code blocks + images      |
| `coverImage`   | image         | With alt text (required)                   |
| `author`       | reference     | References `author`. Required.             |
| `category`     | reference     | References `category`                      |
| `tags`         | reference[]   | References `tag` documents                 |
| `relatedPosts` | reference[]   | Max 4 references to other `post` documents |
| `featured`     | boolean       | Pin to top of listing                      |
| `publishedAt`  | datetime      | Required before publishing                 |
| `updatedAt`    | datetime      | Optional — shown on post if set            |
| `seo`          | seo object    | Per-page SEO overrides                     |

#### `author`

| Field         | Type     | Notes                         |
| ------------- | -------- | ----------------------------- |
| `name`        | string   | Required                      |
| `slug`        | slug     | Required                      |
| `role`        | string   | e.g. "Software Developer"     |
| `bio`         | text     |                               |
| `image`       | image    | With alt text (required)      |
| `socialLinks` | object[] | Each is a `socialLink` object |

#### `experience`

| Field          | Type          | Notes                        |
| -------------- | ------------- | ---------------------------- |
| `company`      | string        | Required                     |
| `position`     | string        | Required                     |
| `description`  | Portable Text |                              |
| `startDate`    | date          | Required                     |
| `endDate`      | date          | Leave blank for current role |
| `current`      | boolean       |                              |
| `technologies` | reference[]   | References `skill` documents |
| `order`        | number        |                              |

### Taxonomy Documents

Shared across content types. Manage these in the **Taxonomy** section of the Studio.

#### `skill`

| Field         | Type          | Notes                                                                             |
| ------------- | ------------- | --------------------------------------------------------------------------------- |
| `name`        | string        | Required. e.g. "NestJS"                                                           |
| `slug`        | slug          | Required                                                                          |
| `category`    | string (enum) | backend / frontend / database / devops / architecture / seo / ai / mobile / other |
| `description` | text          |                                                                                   |
| `icon`        | string        | Icon identifier. e.g. `devicon-nestjs-plain`                                      |
| `order`       | number        | Display order                                                                     |
| `featured`    | boolean       | Show in homepage skills section                                                   |

Referenced by: `project.technologies`, `service` (indirectly), `experience.technologies`

#### `category`

| Field         | Type       | Notes    |
| ------------- | ---------- | -------- |
| `title`       | string     | Required |
| `slug`        | slug       | Required |
| `description` | text       |          |
| `image`       | image      |          |
| `seo`         | seo object |          |

Referenced by: `post.category`

#### `tag`

| Field         | Type   | Notes    |
| ------------- | ------ | -------- |
| `title`       | string | Required |
| `slug`        | slug   | Required |
| `description` | text   |          |

Referenced by: `post.tags`

### Reusable Objects

Objects are embedded in documents — they are not standalone documents and cannot be queried on their own.

#### `seo`

Used on: `homePage`, `aboutPage`, `project`, `service`, `post`, `category`, and the three listing page singletons (which have expanded SEO fields inline rather than via this object).

| Field             | Type    | Notes                                       |
| ----------------- | ------- | ------------------------------------------- |
| `metaTitle`       | string  | Max 60 chars                                |
| `metaDescription` | text    | Max 160 chars                               |
| `canonicalUrl`    | url     | Optional — frontend auto-generates if blank |
| `noIndex`         | boolean | Defaults to false                           |
| `ogTitle`         | string  | Falls back to `metaTitle`                   |
| `ogDescription`   | text    | Falls back to `metaDescription`             |
| `ogImage`         | image   | With alt. Recommended: 1200 × 630 px.       |

#### `heroSection`

Used on: `homePage`

Fields: `title`, `description`, `ctaLabel`, `ctaUrl`, `secondaryCtaLabel`, `secondaryCtaUrl`, `image`

#### `socialLink`

Used on: `siteSettings.socialLinks`, `author.socialLinks`

Supported platforms: GitHub, LinkedIn, X, YouTube, Instagram, Facebook, Dev.to, Medium, Hashnode, Stack Overflow, Website, Other

#### `navigationItem`

Used on: `siteSettings.navigation`

Supports one level of nested `children` items for dropdown menus.

#### `portableText`

Full-featured Portable Text configuration shared across `post.body`, `project.description`, `service.description`, `aboutPage.biography`, `experience.description`.

Supports: headings (h2–h4), blockquote, bullet and numbered lists, bold, italic, inline code, underline, strikethrough, external links (with new-tab toggle), internal links (path string), code blocks (with language and filename), inline images (with required alt text).

---

## Studio Navigation

The sidebar is organised into four sections:

```
CONTENT
├── Home Page          (singleton)
├── About Page         (singleton)
├── ─────
├── Projects Page      (singleton)
├── Projects           (list)
├── ─────
├── Services Page      (singleton)
├── Services           (list)
├── ─────
└── Experience         (list)

BLOG
├── Blog Page          (singleton)
├── Posts              (list)
├── ─────
└── Authors            (list)

TAXONOMY
├── Skills
├── Categories
└── Tags

─────────────────────────────
Site Settings              (singleton)
```

---

## GROQ Queries

All queries live in `groq/queries.ts` and use explicit projections — the frontend never receives a full document blob.

| Export                  | Fetches                                          |
| ----------------------- | ------------------------------------------------ |
| `GET_HOME_PAGE`         | Home singleton with hero and SEO                 |
| `GET_ABOUT_PAGE`        | About singleton with biography and SEO           |
| `GET_PROJECTS_PAGE`     | Projects listing singleton with pinned refs      |
| `GET_POSTS_PAGE`        | Blog listing singleton with featured/pinned refs |
| `GET_SERVICES_PAGE`     | Services listing singleton with pinned refs      |
| `GET_PROJECTS`          | All projects ordered by featured, then order     |
| `GET_FEATURED_PROJECTS` | Featured projects only                           |
| `GET_PROJECT_BY_SLUG`   | Single project by slug with gallery and tech     |
| `GET_ALL_PROJECT_SLUGS` | Slug list for sitemap and `generateStaticParams` |
| `GET_SERVICES`          | All services ordered by order                    |
| `GET_SERVICE_BY_SLUG`   | Single service by slug                           |
| `GET_ALL_SERVICE_SLUGS` | Slug list for sitemap                            |
| `GET_POSTS`             | All posts ordered by publishedAt desc            |
| `GET_FEATURED_POSTS`    | Latest 3 featured posts                          |
| `GET_POST_BY_SLUG`      | Single post by slug with author, tags, related   |
| `GET_ALL_POST_SLUGS`    | Slug list for sitemap                            |
| `GET_CATEGORIES`        | All categories with post count                   |
| `GET_POSTS_BY_CATEGORY` | Posts filtered by category slug                  |
| `GET_SKILLS`            | All skills ordered by order                      |
| `GET_FEATURED_SKILLS`   | Featured skills only                             |
| `GET_EXPERIENCE`        | All experience entries ordered by startDate desc |
| `GET_SITE_SETTINGS`     | Global settings (nav, logo, social, footer)      |

**Usage in Next.js:**

```ts
import {sanityFetch} from '@/lib/sanity/client'
import {GET_PROJECTS} from '@/sanity/groq/queries'

const projects = await sanityFetch(GET_PROJECTS)

// With params (slug pages):
const project = await sanityFetch(GET_PROJECT_BY_SLUG, {slug: 'my-project'})
```

---

## Environment Variables

Create a `.env.local` file at the root of your **Next.js** project (not the Studio):

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

For the Studio itself (if running separately), create `.env`:

```env
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
```

Find your project ID at [sanity.io/manage](https://sanity.io/manage).

---

## First-Time Setup

Follow this order when populating the Studio for the first time. Some documents reference others, so create them in sequence.

**1. Taxonomy first** — create your Skills, then Categories, then Tags. Projects and posts reference these.

**2. Author** — create the Hamza Elmouddane author document. Posts require an author reference.

**3. Singletons** — open Site Settings and fill in the siteName, navigation, social links, and default OG image. Then open Home Page and About Page.

**4. Content** — create Projects, then Services, then Blog Posts.

**5. Listing page singletons** — open Projects Page, Blog Page, and Services Page last, after content exists so you can set pinned items.

Use `seed/examples.ts` as a reference for the expected shape of each document. The file is not imported automatically — it exists as a copy-paste reference.

---

## Validation Rules

| Field                                 | Rule                            |
| ------------------------------------- | ------------------------------- |
| `seo.metaTitle`                       | Max 60 chars (warning)          |
| `seo.metaDescription`                 | Max 160 chars (warning)         |
| `seo.canonicalUrl`                    | Must be http or https (warning) |
| `postsPage.metaTitle`                 | Required, 10–60 chars           |
| `postsPage.metaDescription`           | Required, 50–160 chars          |
| `projectsPage.metaTitle`              | Required, 10–60 chars           |
| `servicesPage.metaTitle`              | Required, 10–60 chars           |
| `project.shortDescription`            | Required, max 200 chars         |
| `project.endDate`                     | Must be after `startDate`       |
| `project.status`                      | Required                        |
| `service.shortDescription`            | Required, max 200 chars         |
| `post.excerpt`                        | Max 300 chars                   |
| `post.author`                         | Required reference              |
| `post.relatedPosts`                   | Max 4                           |
| `experience.startDate`                | Required                        |
| `experience.endDate`                  | Must be after `startDate`       |
| `socialLink.url`                      | Required, must be http or https |
| Image `alt` text                      | Required on all content images  |
| `*Page.pinnedProjects/Posts/Services` | Max 3, unique references        |

---

## SEO Architecture

Every public URL has access to the full set of SEO fields:

```
Title        → metaTitle → siteSettings.siteTitle → siteSettings.siteName
Description  → metaDescription → siteSettings.siteDescription
Canonical    → canonicalUrl → auto-generated from BASE_URL + path
OG Image     → ogImage → siteSettings.defaultOgImage
OG Title     → ogTitle → metaTitle
OG Desc      → ogDescription → metaDescription
Twitter Card → twitterCard (default: summary_large_image)
```

The fallback chain means you only need to fill in what differs from the global default. Most pages will only need `metaTitle` and `metaDescription`.

**JSON-LD structured data** is generated in Next.js (not stored in Sanity) using helpers in `nextjs/lib/sanity/jsonLd.ts`:

| Page             | Schema.org type(s)                  |
| ---------------- | ----------------------------------- |
| Home             | `Person` + `WebSite`                |
| Projects listing | `CollectionPage` + `BreadcrumbList` |
| Project detail   | `CreativeWork` + `BreadcrumbList`   |
| Services listing | `ItemList` + `BreadcrumbList`       |
| Service detail   | `Service` + `BreadcrumbList`        |
| Blog listing     | `Blog` + `BreadcrumbList`           |
| Blog post        | `BlogPosting` + `BreadcrumbList`    |

---

## Multilingual

The current architecture is single-language (English). It is designed so multilingual support can be added later without rewriting schemas.

**Recommended approach when ready:** `@sanity/document-internationalization` plugin — one document per language, linked by a shared translation metadata document.

```bash
npm install @sanity/document-internationalization
```

See `MULTILINGUAL.md` at the project root for the full migration guide, including GROQ query changes and Next.js `[lang]` routing.

---

## Adding a New Schema

**New document type:**

1. Create `schemaTypes/documents/myType.ts` using `defineType` / `defineField`
2. Import and add it to the `schemaTypes` array in `schemaTypes/index.ts`
3. Add a `S.documentTypeListItem` entry in `structure.ts`
4. Add a GROQ query in `groq/queries.ts`
5. Add a `generateMetadata` helper in `nextjs/lib/sanity/seo.ts` if the type has public pages
6. Add slug to `nextjs/app/sitemap.ts` if publicly indexable

**New singleton:**

Same as above, plus:

- Use `documentId: "myType"` (fixed ID) in `structure.ts`
- Add to the `SINGLETON_TYPES` set in `structure.ts`
- Use `*[_type == "myType"][0]` in the GROQ query (no slug needed)

**New reusable object:**

1. Create `schemaTypes/objects/myObject.ts` using `defineType` with `type: "object"`
2. Import and add it **before** the documents in `schemaTypes/index.ts`
3. Reference it in any document field as `type: "myObject"`
