import type { ImageMetadata } from 'astro'

/**
 * 站点基础信息类型 / Site basic information type
 * @description 包含站点标题和描述 / Contains site title and description
 * @property {string} title - 站点标题 / Site title
 * @property {string} base - 站点基础路径 / Site base path
 * @property {string} description - 站点描述 / Site description
 * @property {string} author - 作者名称 / Author name
 * @property {string} website - 网站地址 / Website address
 * @property {string} ogImage - OGP 图片地址 / OGP image address
 * @property {boolean} transition - 是否启用过渡动画 / Whether to enable transition animation
 */
export type Site = {
  title: string
  base: string
  description: string
  lang: string
  author: string
  website: string
  ogImage: string
  transition: boolean
}

export interface PostListPageConfig {
  size: number
}

/**
 * 文章配置接口 / Post configuration interface
 * @description 用于配置博客文章相关的全局设置 / Used to configure global settings for blog posts
 * @property {string} title - 文章标题 / Post title
 * @property {string} description - 文章描述 / Post description
 * @property {string} introduce - 文章介绍 / Post introduce
 * @property {string} author - 作者名称 / Author name
 * @property {PostListPageConfig} postPageConfig - 文章列表页分页配置 / Posts list page configuration
 * @property {PostListPageConfig} tagsPageConfig - 标签页分页配置 / Tags list page configuration
 * @property {boolean} ogImageUseCover - 是否使用文章封面图作为OGP图片 / Whether to use the article cover image as the OGP image
 * @property {boolean} imageDarkenInDark - 是否在暗黑模式下对图片进行暗化处理 / Whether to darken images in dark mode
 * @property {string} prevPageText - 上一页按钮文本 / Previous page button text
 * @property {string} nextPageText - 下一页按钮文本 / Next page button text
 * @property {string} nextPostText - 下一篇文章按钮文本 / Next post button text
  * @property {string} prevPostText - 上一篇文章按钮文本 / Previous post button text
 */
export interface PostConfig {
  title: string
  description: string
  introduce: string
  author: string
  postPageConfig: PostListPageConfig
  tagsPageConfig: PostListPageConfig
  ogImageUseCover: boolean
  imageDarkenInDark: boolean
  prevPageText: string
  nextPageText: string
  nextPostText: string
  prevPostText: string
  wordCountView: boolean
}

/**
 * 标签配置接口 / Tags configuration interface
 * @property {string} title - 标签页标题 / Tags page title
 * @property {string} description - 标签页描述 / Tags page description
 * @property {string} introduce - 标签页介绍 / Tags page introduce
 */
export interface TagsConfig {
  title: string
  description: string
  introduce: string
}

/**
 * 链接类型 / Link type
 * @property {string} name - 链接显示名称 / Link display name
 * @property {string} url - 链接URL / Link URL
 */
export type Link = {
  name: string
  url: string
}

/**
 * 社交媒体链接类型 / Social media link type
 * @property {string} name - 平台名称 / Platform name
 * @property {string} url - 个人主页URL / Profile URL
 * @property {string} icon - 图标类名 / Icon class name
 */
export type SocialLink = {
  name: string
  url: string
  icon: string
}

/**
 * 项目配置接口 / Project configuration interface
 * @property {string} title - 项目标题 / Project title
 * @property {string} description - 项目描述 / Project description
 * @property {string} introduce - 项目介绍 / Project introduce
 */
export interface ProjectConfig {
  title: string
  description: string
  introduce: string
}

// 项目图标类型 / Project icon type
export type IconType = 'icon' | 'image'

/**
 * 拍立得照片变体类型 / Polaroid photo variant types
 * @description 定义不同宽高比的拍立得照片样式
 * - 1x1: 正方形比例
 * - 4x5: 标准拍立得比例
 * - 4x3: 横向比例
 * - 9x16: 竖向比例
 */
export type PolaroidVariant = '1x1' | '4x5' | '4x3' | '9x16'

/**
 * 图片配置接口 / Photo configuration interface
 * @property {string | ImageMetadata} src - 图片路径 / Image path
 * @property {string} alt - 图片描述 / Image description
 * @property {number} width - 图片宽度 / Image width
 * @property {number} height - 图片高度 / Image height
 * @property {PolaroidVariant} variant - 拍立得照片变体 / Polaroid photo variant
 * @property {string} location - 拍摄地点 / Shooting location
 * @property {string} date - 拍摄日期 / Shooting date
 * @property {string} camera - 拍摄设备 / Shooting equipment
 * @property {string} description - 图片描述 / Image description
 */
export interface Photo {
  src: string | ImageMetadata
  alt: string
  width: number
  height: number
  variant: PolaroidVariant
  location?: string
  date?: string
  camera?: string
  description?: string
}

/**
 * 图片页面配置接口 / Photos page configuration interface
 * @property {string} title - 页面标题 / Page title
 * @property {string} description - 页面描述 / Page description
 * @property {string} introduce - 页面介绍 / Page introduction
 */
export interface PhotosConfig {
  title: string
  description: string
  introduce: string
}

export interface FriendsConfig {
  title: string
  description: string
  introduce: string
}

export interface FriendLinkItem {
  name: string
  url: string
  description: string
  avatar?: string
  tags?: string[]
}

export type TimelineIconType = 'emoji' | 'icon' | 'color' | 'number' | 'image'

export interface PhotoData {
  title: string
  icon: {
    type: TimelineIconType
    value: string // emoji | icon-name | color-class | number | image-url
    fallback?: string // 备用显示
  }
  description?: string
  date: string
  photos: Photo[]
  travel?: string
}

export interface GitalkConfig {
  clientID: string
  clientSecret: string
  repo: string
  owner: string
  admin: string[]
  language?: string
  perPage?: number
  pagerDirection?: 'last' | 'first'
  createIssueManually?: boolean
  distractionFreeMode?: boolean
  enableHotKey?: boolean
}

export interface AnalyticsConfig {
  vercount?: {
    enabled: boolean
  }
  umami?: {
    enabled: boolean
    websiteId: string
    serverUrl: string
  }
  google?: {
    enabled: boolean
    id: string
  }
}

export interface CommentConfig {
  enabled: boolean
  system: 'gitalk' | 'artalk' | 'waline' | 'none'
  gitalk?: GitalkConfig
}
