import type {
  AnalyticsConfig,
  CommentConfig,
  FriendLinkItem,
  FriendsConfig,
  Link,
  PhotosConfig,
  PostConfig,
  ProjectConfig,
  Site,
  SocialLink,
  TagsConfig,
} from '~/types'

//--- Readme Page Config ---
export const SITE: Site = {
  title: 'Ethan Yang',
  description: 'Ethan Young 的个人博客，记录前端开发、工程实践、产品构建、工具配置、生活观察和持续迭代的日常思考。',
  website: 'https://www.ethyoung.me/',
  lang: 'zh-CN',
  base: '/',
  author: 'Ethan',
  ogImage: '/og-image.webp',
  transition: false,
}

export const HEADER_LINKS: Link[] = [
  {
    name: '文章',
    url: '/posts',
  },
  {
    name: '项目',
    url: '/projects',
  },
  {
    name: '照片',
    url: '/photos',
  },
  {
    name: '朋友',
    url: '/friends',
  },
]

export const FOOTER_LINKS: Link[] = [
  {
    name: '首页',
    url: '/',
  },
  {
    name: '标签',
    url: '/tags',
  },
  {
    name: '照片',
    url: '/photos',
  },
  {
    name: '朋友',
    url: '/friends',
  },
]

// get icon https://icon-sets.iconify.design/
export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'github',
    url: 'https://github.com/yy921010',
    icon: 'icon-[ri--github-fill]',
  },
]

//--- Posts Page Config ---
export const POSTS_CONFIG: PostConfig = {
  title: '文章',
  description: 'Ethan Young 的文章归档，收录前端开发、工程实践、工具配置、技术复盘、项目构建和生活总结等长篇内容。',
  introduce: '在这里，我分享了我在编程、技术和生活方面的见解和经验。希望你能在这里找到有价值的内容，并与我一起成长！',
  author: 'Ethan',
  postPageConfig: {
    size: 10,
  },
  tagsPageConfig: {
    size: 10,
  },
  ogImageUseCover: false,
  imageDarkenInDark: true,
  prevPageText: '<--',
  nextPageText: '-->',
  nextPostText: '上一篇',
  prevPostText: '下一篇',
  wordCountView: true,
}

export const COMMENT_CONFIG: CommentConfig = {
  enabled: true,
  system: 'gitalk',
  gitalk: {
    clientID: import.meta.env.PUBLIC_GITHUB_CLIENT_ID,
    clientSecret: import.meta.env.PUBLIC_GITHUB_CLIENT_SECRET,
    repo: 'Sandy',
    owner: 'yy921010',
    admin: ['yy921010'],
    language: 'en-US',
    perPage: 5,
    pagerDirection: 'last',
    createIssueManually: false,
    distractionFreeMode: false,
    enableHotKey: true,
  },
}

export const TAGS_CONFIG: TagsConfig = {
  title: '标签',
  description: 'Ethan Young 博客的主题索引，按标签浏览前端技术文章、工程笔记、工具配置、生活总结和项目记录。',
  introduce: '按主题浏览文章归档，快速找到前端开发、工程实践、工具配置和生活记录相关内容。',
}

export const PROJECTS_CONFIG: ProjectConfig = {
  title: '项目',
  description: 'Ethan Young 的项目作品集，展示个人产品、开源工具、前端实验、界面设计和长期维护的构建记录。',
  introduce: '这里展示了一些个人产品、开源工具、前端实验和持续迭代中的项目记录。',
}

export const PHOTOS_CONFIG: PhotosConfig = {
  title: '照片',
  description: 'Ethan Young 的照片日志，记录日常生活、城市片段、旅行观察、空间细节和个人视角下的影像归档。',
  introduce: '这里记录了我在日常生活中拍摄的一些照片，包括城市片段、旅行观察和个人视角下的影像归档。',
}

export const FRIENDS_CONFIG: FriendsConfig = {
  title: '朋友',
  description: 'Ethan Young 的友链目录，收录持续写作、分享前端技术、设计、生活记录和产品观察的朋友站点。',
  introduce: '一些我常逛并且推荐的朋友站点。如果你想交换友链，欢迎联系我。',
}

export const FRIEND_LINKS: FriendLinkItem[] = [
  {
    name: '花墨',
    url: 'https://flowersink.com',
    description: '一个喜欢写作、分享生活的已婚前端的个人网站',
    avatar: 'https://api.flowersink.com/img/logo.png',
    tags: ['Blog', 'Frontend'],
  },
  {
    name: '我要去巴萨',
    url: 'https://www.coyoteoutdoor.space:8095/',
    description: '技术分享博客',
    avatar: '',
    tags: ['Blog', 'Tech'],
  },
  {
    name: '敖武的博客',
    url: 'https://z.wiki',
    description: '啦啦啦',
    avatar: '',
    tags: ['Blog'],
  },
  {
    name: '张洪Heo',
    url: 'https://blog.zhheo.com/',
    description: '分享设计与科技生活',
    avatar: 'https://bu.dusays.com/2022/12/28/63ac2812183aa.png',
    tags: ['Blog', 'Design'],
  },
  {
    name: '凌飞阁',
    url: 'https://llingfei.com',
    description: '烂柯山与浮云齐，突星骑石凌飞鸟。',
    avatar: 'https://llingfei.com/tx.jpg',
    tags: ['Blog'],
  },
  {
    name: 'xiaoming728',
    url: 'https://xiaoming728.com',
    description: '',
    avatar: 'https://xiaoming728.com/upload/logo.jpg',
    tags: ['Blog'],
  },
]

export const ANALYTICS_CONFIG: AnalyticsConfig = {
  vercount: {
    enabled: true,
  },
  umami: {
    enabled: false,
    websiteId: '429836ac-5c85-4598-91e3-cfa81e8205b4',
    serverUrl: 'https://cloud.umami.is/script.js',
  },
}
