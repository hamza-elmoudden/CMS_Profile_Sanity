/**
 * GROQ queries for hamzaelmouddane.ma
 *
 * All projections are explicit — the frontend never receives the full document.
 * Import the individual query string and pass it to `client.fetch(QUERY)`.
 */

// ─── SEO Fragment ────────────────────────────────────────────────────────────

export const SEO_FRAGMENT = /* groq */ `
  seo {
    metaTitle,
    metaDescription,
    canonicalUrl,
    noIndex,
    ogTitle,
    ogDescription,
    ogImage { asset->{ url }, alt }
  }
`;

// ─── Image Fragment ───────────────────────────────────────────────────────────

export const IMAGE_FRAGMENT = /* groq */ `
  asset->{ url, metadata { dimensions, lqip } },
  alt,
  caption
`;

// ─── Skill Fragment ───────────────────────────────────────────────────────────

export const SKILL_FRAGMENT = /* groq */ `
  _id,
  name,
  "slug": slug.current,
  category,
  icon,
  featured,
  order
`;

// ─── Home Page ────────────────────────────────────────────────────────────────

export const GET_HOME_PAGE = /* groq */ `
  *[_type == "homePage"][0] {
    hero {
      title,
      description,
      ctaLabel,
      ctaUrl,
      secondaryCtaLabel,
      secondaryCtaUrl,
      image { ${IMAGE_FRAGMENT} }
    },
    featuredProjectsTitle,
    featuredServicesTitle,
    featuredSkillsTitle,
    featuredPostsTitle,
    ${SEO_FRAGMENT}
  }
`;

// ─── About Page ───────────────────────────────────────────────────────────────

export const GET_ABOUT_PAGE = /* groq */ `
  *[_type == "aboutPage"][0] {
    title,
    introduction,
    biography,
    profileImage { ${IMAGE_FRAGMENT} },
    location,
    ${SEO_FRAGMENT}
  }
`;

// ─── Projects ────────────────────────────────────────────────────────────────

export const GET_PROJECTS = /* groq */ `
  *[_type == "project"] | order(featured desc, order asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    featuredImage { ${IMAGE_FRAGMENT} },
    projectType,
    status,
    featured,
    startDate,
    endDate,
    technologies[]-> { ${SKILL_FRAGMENT} },
    githubUrl,
    liveUrl
  }
`;

export const GET_FEATURED_PROJECTS = /* groq */ `
  *[_type == "project" && featured == true] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    featuredImage { ${IMAGE_FRAGMENT} },
    technologies[]-> { ${SKILL_FRAGMENT} },
    githubUrl,
    liveUrl
  }
`;

export const GET_PROJECT_BY_SLUG = /* groq */ `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    description,
    featuredImage { ${IMAGE_FRAGMENT} },
    gallery[] { ${IMAGE_FRAGMENT} },
    technologies[]-> { ${SKILL_FRAGMENT} },
    projectType,
    status,
    githubUrl,
    liveUrl,
    featured,
    startDate,
    endDate,
    ${SEO_FRAGMENT}
  }
`;

// For sitemap generation
export const GET_ALL_PROJECT_SLUGS = /* groq */ `
  *[_type == "project"] { "slug": slug.current }
`;

// ─── Services ────────────────────────────────────────────────────────────────

export const GET_SERVICES = /* groq */ `
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    icon,
    featured,
    order
  }
`;

export const GET_SERVICE_BY_SLUG = /* groq */ `
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    description,
    icon,
    ${SEO_FRAGMENT}
  }
`;

export const GET_ALL_SERVICE_SLUGS = /* groq */ `
  *[_type == "service"] { "slug": slug.current }
`;

// ─── Blog Posts ───────────────────────────────────────────────────────────────

export const GET_POSTS = /* groq */ `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage { ${IMAGE_FRAGMENT} },
    publishedAt,
    featured,
    author-> { name, "slug": slug.current, image { ${IMAGE_FRAGMENT} } },
    category-> { title, "slug": slug.current },
    tags[]-> { title, "slug": slug.current }
  }
`;

export const GET_FEATURED_POSTS = /* groq */ `
  *[_type == "post" && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage { ${IMAGE_FRAGMENT} },
    publishedAt,
    category-> { title, "slug": slug.current }
  }
`;

export const GET_POST_BY_SLUG = /* groq */ `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    body,
    coverImage { ${IMAGE_FRAGMENT} },
    publishedAt,
    updatedAt,
    author-> { name, "slug": slug.current, role, bio, image { ${IMAGE_FRAGMENT} }, socialLinks },
    category-> { title, "slug": slug.current },
    tags[]-> { title, "slug": slug.current },
    relatedPosts[]-> {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      coverImage { ${IMAGE_FRAGMENT} },
      publishedAt
    },
    ${SEO_FRAGMENT}
  }
`;

export const GET_ALL_POST_SLUGS = /* groq */ `
  *[_type == "post"] { "slug": slug.current }
`;

// ─── Categories ───────────────────────────────────────────────────────────────

export const GET_CATEGORIES = /* groq */ `
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    image { ${IMAGE_FRAGMENT} },
    "postCount": count(*[_type == "post" && references(^._id)])
  }
`;

export const GET_POSTS_BY_CATEGORY = /* groq */ `
  *[_type == "post" && category->slug.current == $categorySlug] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage { ${IMAGE_FRAGMENT} },
    publishedAt,
    author-> { name, "slug": slug.current },
    tags[]-> { title, "slug": slug.current }
  }
`;

// ─── Skills ───────────────────────────────────────────────────────────────────

export const GET_SKILLS = /* groq */ `
  *[_type == "skill"] | order(order asc) {
    ${SKILL_FRAGMENT},
    description
  }
`;

export const GET_FEATURED_SKILLS = /* groq */ `
  *[_type == "skill" && featured == true] | order(order asc) {
    ${SKILL_FRAGMENT}
  }
`;

// ─── Experience ───────────────────────────────────────────────────────────────

export const GET_EXPERIENCE = /* groq */ `
  *[_type == "experience"] | order(startDate desc) {
    _id,
    company,
    position,
    description,
    startDate,
    endDate,
    current,
    technologies[]-> { ${SKILL_FRAGMENT} },
    order
  }
`;

// ─── Site Settings ────────────────────────────────────────────────────────────

export const GET_SITE_SETTINGS = /* groq */ `
  *[_type == "siteSettings"][0] {
    siteName,
    siteTitle,
    siteDescription,
    logo { ${IMAGE_FRAGMENT} },
    defaultOgImage { asset->{ url }, alt },
    email,
    phone,
    location,
    socialLinks,
    navigation,
    footerText
  }
`;
