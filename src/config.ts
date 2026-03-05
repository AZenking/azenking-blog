import type {
  AnalyticsConfig,
  CommentConfig,
  FriendLinkItem,
  FriendsConfig,
  GithubConfig,
  Link,
  PhotosConfig,
  PostConfig,
  ProjectConfig,
  Site,
  SkillsShowcaseConfig,
  SocialLink,
  TagsConfig,
} from '~/types'

//--- Readme Page Config ---
export const SITE: Site = {
  title: 'Ethan Yang',
  description:
    '👋 大家好，我是 Ethan Young，一名常驻南京的程序员，也是一位在生活中持续迭代的普通人',
  website: 'https://ethyoung.me/',
  lang: 'en',
  base: '/',
  author: 'Ethan',
  ogImage: '/og-image.webp',
  transition: false,
}

export const HEADER_LINKS: Link[] = [
  {
    name: 'Posts',
    url: '/posts',
  },
  {
    name: 'Projects',
    url: '/projects',
  },
  {
    name: 'Photos',
    url: '/photos',
  },
  {
    name: 'Friends',
    url: '/friends',
  },
]

export const FOOTER_LINKS: Link[] = [
  {
    name: 'Readme',
    url: '/',
  },
  {
    name: 'Tags',
    url: '/tags',
  },
  {
    name: 'Photos',
    url: '/photos',
  },
  {
    name: 'Friends',
    url: '/friends',
  },
]

// get icon https://icon-sets.iconify.design/
export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'github',
    url: 'https://github.com/Ethan Yang',
    icon: 'icon-[ri--github-fill]',
    count: 20,
  }
]

/**
 * SkillsShowcase 配置接口 / SkillsShowcase configuration type
 * @property {boolean} SKILLS_ENABLED  - 是否启用SkillsShowcase功能 / Whether to enable SkillsShowcase features
 * @property {Object} SKILLS_DATA - 技能展示数据 / Skills showcase data
 * @property {string} SKILLS_DATA.direction - 技能展示方向 / Skills showcase direction
 * @property {Object} SKILLS_DATA.skills - 技能展示数据 / Skills showcase data
 * @property {string} SKILLS_DATA.skills.icon - 技能图标 / Skills icon
 * @property {string} SKILLS_DATA.skills.name - 技能名称 / Skills name
 * get icon https://icon-sets.iconify.design/
 */
export const SKILLSSHOWCASE_CONFIG: SkillsShowcaseConfig = {
  SKILLS_ENABLED: true,
  SKILLS_DATA: [
    {
      direction: 'left',
      skills: [
        {
          name: 'JavaScript',
          icon: 'icon-[skill-icons--javascript]',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
        },
        {
          name: 'CSS',
          icon: 'icon-[skill-icons--css]',
          url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
        },
        {
          name: 'HTML',
          icon: 'icon-[skill-icons--html]',
          url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
        },
        {
          name: 'TypeScript',
          icon: 'icon-[skill-icons--typescript]',
          url: 'https://www.typescriptlang.org/',
        },
        {
          name: 'Vue',
          icon: 'icon-[skill-icons--vuejs-dark]',
          url: 'https://vuejs.org/',
        },
        {
          name: 'Sass',
          icon: 'icon-[skill-icons--sass]',
          url: 'https://sass-lang.com/',
        },
      ],
    },
  ],
}

/**
 * GitHub配置 / GitHub configuration
 *
 * @property {boolean} ENABLED - 是否启用GitHub功能 / Whether to enable GitHub features
 * @property {string} GITHUB_USERNAME - GITHUB用户名 / GitHub username
 * @property {boolean} TOOLTIP_ENABLED - 是否开启Tooltip功能 / Whether to enable Github Tooltip features
 */

export const GITHUB_CONFIG: GithubConfig = {
  ENABLED: true,
  GITHUB_USERNAME: 'yy921010',
  TOOLTIP_ENABLED: true,
}

//--- Posts Page Config ---
export const POSTS_CONFIG: PostConfig = {
  title: 'Posts',
  description: 'Ethan Yang',
  introduce: '在这里，我分享了我在编程、技术和生活方面的见解和经验。希望你能在这里找到有价值的内容，并与我一起成长！',
  author: 'Ethan',
  homePageConfig: {
    size: 2,
    type: 'compact',
  },
  postPageConfig: {
    size: 10,
    type: 'image',
    coverLayout: 'right',
  },
  tagsPageConfig: {
    size: 10,
    type: 'time-line',
  },
  ogImageUseCover: false,
  postType: 'metaOnly',
  imageDarkenInDark: true,
  readMoreText: 'vi .',
  prevPageText: '<--',
  nextPageText: '-->',
  tocText: '目录',
  backToPostsText: 'cd ..',
  nextPostText: '上一篇',
  prevPostText: '下一篇',
  recommendText: 'REC',
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
  title: 'Tags',
  description: 'All tags of Posts',
  introduce: 'All the tags for posts are here, you can click to filter them.',
}

export const PROJECTS_CONFIG: ProjectConfig = {
  title: 'Projects',
  description: '这里展示了我的一些项目示例。',
  introduce: '这里展示了我的一些项目示例。',
}

export const PHOTOS_CONFIG: PhotosConfig = {
  title: 'Photos',
  description: '这里记录了我在日常生活中拍摄的一些照片。',
  introduce: '这里记录了我在日常生活中拍摄的一些照片。',
}

export const FRIENDS_CONFIG: FriendsConfig = {
  title: 'Friends',
  description: '这里展示了一些我关注的朋友和博客。',
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
    websiteId: 'Your websiteId in umami',
    serverUrl: 'https://cloud.umami.is/script.js',
  },
}
