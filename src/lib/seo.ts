const MIN_SEO_DESCRIPTION_LENGTH = 56

interface SeoDescriptionOptions {
  title: string
  description?: string
  tags?: string[]
  contentType: '文章' | '笔记'
}

export function getSeoDescription({ title, description, tags = [], contentType }: SeoDescriptionOptions) {
  const base = (description || title).trim()

  if (base.length >= MIN_SEO_DESCRIPTION_LENGTH) return base

  const tagText = tags.length > 0
    ? `，涉及 ${tags.slice(0, 3).join('、')} 等主题`
    : ''
  const separator = /[。！？.!?]$/.test(base) ? '' : '。'

  return `${base}${separator}这篇${contentType}${tagText}，记录问题背景、实践过程和个人复盘，方便后续检索与延伸阅读。`
}
