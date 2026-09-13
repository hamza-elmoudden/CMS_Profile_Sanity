// Objects (reusable)
import {heroSection} from './heroSection'
import {seo} from './seo'
import {socialLink} from './socialLink'
import {navigationItem} from './navigationItem'
import {portableText} from './portableText'

// Documents
import {homePage} from './homePage'
import {aboutPage} from './aboutPage'
import {project} from './project'
import {service} from './service'
import {post} from './post'
import {author} from './author'
import {category} from './category'
import {tag} from './tag'
import {skill} from './skill'
import {experience} from './experience'
import {siteSettings} from './siteSettings'

// pages
import {postsPage} from './postsPage'
import {projectsPage} from './projectsPage'

import {contacts} from './contact'

export const schemaTypes = [
  // Objects — registered first so documents can reference them
  seo,
  heroSection,
  socialLink,
  navigationItem,
  portableText,

  // Singletons
  homePage,
  aboutPage,
  siteSettings,

  // Content
  project,
  service,
  post,
  author,
  experience,

  // Pages
  projectsPage,
  postsPage,

  // Taxonomy
  category,
  tag,
  skill,

  //
  contacts,
]
