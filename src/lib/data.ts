import { getCollection, type CollectionEntry } from 'astro:content'

// 通用内容按时间排序
function contentSort<T extends { data: { updatedDate?: Date; pubDate: Date } }>(items: T[]): T[] {
  return items.slice().sort((a, b) => {
    const dateA = a.data.updatedDate ?? a.data.pubDate
    const dateB = b.data.updatedDate ?? b.data.pubDate
    return dateB.getTime() - dateA.getTime()
  })
}

export const postsSort = (posts: CollectionEntry<'posts'>[]) => contentSort(posts)
export const notesSort = (notes: CollectionEntry<'notes'>[]) => contentSort(notes)

// 获取所有非草稿文章，按时间排序
export async function getAllPosts(): Promise<CollectionEntry<'posts'>[]> {
  const allPosts = await getCollection('posts')
  return postsSort(allPosts.filter((post) => !post.data.draft))
}

export async function getAllNotes(): Promise<CollectionEntry<'notes'>[]> {
  const allNotes = await getCollection('notes')
  return notesSort(allNotes.filter((note) => !note.data.draft))
}

// 获取所有置顶文章
export async function getPinnedPosts(): Promise<CollectionEntry<'posts'>[]> {
  const allPosts = await getCollection('posts')
  const pinnedPosts = allPosts.filter((post) => post.data.pinned)
  return postsSort(pinnedPosts)
}

// 获取最新的固定数量的文章
export async function getNumPosts(size: number): Promise<CollectionEntry<'posts'>[]> {
  const allPosts = await getCollection('posts')
  return postsSort(allPosts.filter((post) => !post.data.draft)).slice(0, size)
}

// 获取标签
export async function getAllTags(): Promise<Record<string, number>> {
  const allPosts = await getAllPosts()
  const tags = allPosts.flatMap((post) => post.data.tags || [])
  return tags.reduce(
    (acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )
}

// 获取project
export async function getAllProjects(): Promise<CollectionEntry<'projects'>[]> {
  const allProjects = await getCollection('projects')
  return allProjects.filter((project) => !project.data.draft)
}
