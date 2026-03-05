import AnimatedList from '~/components/reactbits/AnimatedList'

type ArchiveItem = {
  date: string
  title: string
  url: string
}

type ArchiveGroup = {
  year: number
  posts: ArchiveItem[]
}

interface Props {
  groups: ArchiveGroup[]
}

const ArchiveGroupsList = ({ groups }: Props) => {
  if (groups.length === 0) {
    return <p className="mt-4 text-muted-foreground">No posts found yet.</p>
  }

  return (
    <div className="mt-6 space-y-8">
      {groups.map((group) => (
        <section key={group.year}>
          <h3 className="text-lg text-foreground font-medium">{group.year}</h3>
          <AnimatedList
            items={group.posts}
            className="mt-2 space-y-2"
            renderItem={(post) => (
              <article className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-4">
                <time dateTime={post.date} className="text-muted-foreground tabular-nums min-w-[11ch]">
                  {post.date}
                </time>
                <a href={post.url} className="hover:underline decoration-dashed underline-offset-4">
                  {post.title}
                </a>
              </article>
            )}
          />
        </section>
      ))}
    </div>
  )
}

export default ArchiveGroupsList
