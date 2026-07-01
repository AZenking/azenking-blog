import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'
import { POSTS_CONFIG } from '~/config'

const contentSchema = ({ image }: { image: Function }) =>
  z
    .object({
      title: z.string(),
      description: z.string(),
      pubDate: z.date(),
      tags: z.array(z.string()).optional(),
      updatedDate: z.date().optional(),
      author: z.string().default(POSTS_CONFIG.author),
      cover: image().optional(),
      ogImage: image().optional(),
      recommend: z.boolean().default(false),
      pinned: z.boolean().default(false),
      draft: z.boolean().default(false),
      comment: z.boolean().default(true),
      license: z.string().optional(),
    })
    .transform((data) => ({
      ...data,
      ogImage: POSTS_CONFIG.ogImageUseCover && data.cover ? data.cover : data.ogImage,
    }))

const posts = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './content/posts',
  }),
  schema: contentSchema,
})

const notes = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './content/notes',
  }),
  schema: contentSchema,
})

const projects = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './content/projects',
  }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string(),
      githubUrl: z.string(),
      website: z.string(),
      type: z.string(),
      icon: image().optional(),
      imageClass: z.string().optional(),
      star: z.number(),
      fork: z.number(),
      draft: z.boolean().default(false),
    }),
})

export const collections = { posts, notes, projects }
