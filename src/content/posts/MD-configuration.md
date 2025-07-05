---
title: 'Post Configuration'
description: 'Comprehensive guide for  post configuration in Litos theme'
pubDate: 2025-05-01
tags: ['Configuration','Images','Post']
recommend: true
heroImage: 'MD-Configuration.webp'
ogImage: 'MD-Configuration.webp'
---

This document provides a comprehensive guide for post configuration in the Litos theme, including front matter settings and image display options.

## Create a New Post

To create a new Markdown file, follow these steps:

1. Navigate to the `src/content/posts` directory.
2. Create a new Markdown file with a `.md` extension.

## Front Matter Configuration

The front matter in Markdown files is managed through Astro Content Collections, which enforces a consistent structure across all posts. Below is a detailed specification of available front matter properties:

```md
---
title: 'Your Post Title'
description: 'A brief description of your post'
pubDate: 2025-05-01
updatedDate: 2025-05-01
author: 'Dnzzk2'
recommend: false
heroImage: 'image-filename.png'
ogImage: 'og-image-filename.png'
heroImageLayout: 'left'
heroImageAspectRatio: '16/9'
tags: ['tag1', 'tag2']
---
```

### Property Specifications

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| title | string | Yes | - | The main heading of your article, displayed prominently on the article page and in post listings |
| description | string | Yes | - | A concise summary of your post, used for SEO optimization and social media preview cards |
| pubDate | Date | Yes | - | Publication date in YYYY-MM-DD format |
| updatedDate | Date | No | - | Last modification date in YYYY-MM-DD format |
| author | string | No | - | Content creator's name; falls back to site's default author if unspecified |
| recommend | boolean | No | false | Enables featured status for the post, adding a special recommendation indicator |
| heroImage | string | No | - | Featured image filename (stored in `public/hero-images/`) or external URL |
| ogImage | string | No | - | Social media preview image (stored in `public/og-images/`) or external URL |
| heroImageLayout | string | No | - | Image positioning ('left' or 'right') for post listings; takes precedence when post list type is 'image' |
| heroImageAspectRatio | string | No | '16/9' | Image aspect ratio, supports '16/9' or '3/4' |
| tags | string[] | No | [] | Array of keywords for content categorization and navigation |

## Image Display Configuration

When the post list type is set to `image`, the theme provides flexible image handling:

- If `heroImage` is not specified, the system uses `defaultHeroImage` from `POSTS_CONFIG` in `config.ts`
- If `ogImage` is omitted, the site's default `ogimage` is applied

### Display Variations

> [!IMPORTANT] 2025/07/25
> Added `Jap` style, which can be configured for `postType` use in Front Matter, worth trying.
>
> This theme no longer determines which meta information display style to use based on the presence or proportion of images, but rather allows you to define it yourself. You can configure `postType` in `config.ts` to determine the default style, and in front matter of the MD document, you can specify the display style of this MD file through `postType`.

The theme supports three distinct image display styles based on the `heroImage` configuration:

1. Without Hero Image:
:::image-figure[noImage]
![](~/assets/images/md-configuration/noImage-dark.webp)(class:img-light)

![](~/assets/images/md-configuration/noImage-light.webp)(class:img-dark)
:::

2. With Hero Image (Default 16/9 Ratio):
:::image-figure[16/9]
![](~/assets/images/md-configuration/image-16-9-dark.webp)(class:img-light)

![](~/assets/images/md-configuration/image-16-9-light.webp)(class:img-dark)
:::

3. With Hero Image (3/4 Ratio):
:::image-figure[3/4]
![](~/assets/images/md-configuration/image-3-4-dark.webp)(class:img-light)

![](~/assets/images/md-configuration/image-3-4-light.webp)(class:img-dark)
:::

> [!note]
> The aspect ratios '3/4' and '16/9' serve as indicators for vertical or horizontal orientation rather than strict dimensional requirements. However, using images that closely match these ratios will prevent distortion.
>
> For consistency in post listings, the theme enforces fixed 3/4 or 16/9 ratios regardless of the original image dimensions.

## Image Processing Tools

Litos includes built-in image optimization tools to help reduce website loading times and improve performance. The project provides two main scripts for image processing:

### Optimize Images Script

The `optimize` script is a powerful tool for batch processing images, offering various optimization options:

```bash
pnpm run optimize -- [options]
```

#### Available Options

| Option | Alias | Description | Default |
|--------|-------|-------------|----------|
| --input, | -i | Input file or directory path (required) | - |
| --quality | -q | Compression quality (0-100) | 80 |
| --width | -w | Maximum width to resize (0 = no resize) | 0 |
| --format | -f | Output format (jpg, jpeg, png, webp, avif) | Original format |
| --keepOriginal | -k | Keep original files | false |
| --recursive | -r | Process subdirectories | true |
| --outputDir | -o | Custom output directory | Same as input |

#### Examples

1. Basic optimization with default settings:
```bash
pnpm run optimize -- -i public/images
```

2. Convert images to WebP with 85% quality:
```bash
pnpm run optimize -- -i public/images -f webp -q 85
```

3. Resize images to maximum width of 1200px:
```bash
pnpm run optimize -- -i public/images -w 1200
```

4. Save optimized images to a different directory:
```bash
pnpm run optimize -- -i public/images -o public/optimized
```

### Alternative Tools

While the built-in tools are recommended for seamless integration, you can also use external services for image optimization:

- [TinyPNG](https://free.tinypng.site/) - Excellent compression for PNG and JPEG files
- [Squoosh](https://squoosh.app/) - Browser-based image optimization with various formats support
- [ImageOptim](https://imageoptim.com/) - Desktop application for lossless image optimization

> [!tip]
> For best results, consider using WebP format for your images as it provides excellent compression while maintaining high quality. The built-in optimization tool automatically handles WebP conversion when specified.

### Hero image and OG image

Hero images and OG images play crucial roles in enhancing your content's visual appeal and social media presence. Here are some recommended tools and guidelines for creating effective images:

#### Recommended Tools

1. **OG Image Generators**:
   - [Free OG Image Generator](https://ogimage.click/) - Simple and quick OG image creation

2. **OG Preview Tools**:
   - [Social Share Preview](https://socialsharepreview.com/) - Test OG images across platforms
   - [Metatags.io](https://metatags.io/) - Preview and debug social media cards

#### Size Recommendations

- **Hero Images**:
  - Landscape (16/9): 1200×675px or 1920×1080px
  - Portrait (3/4): 800×1067px or 1200×1600px

- **OG Images**:
  - Optimal size: 1200×630px (Facebook, Twitter, LinkedIn)
  - Minimum size: 600×315px
  - Aspect ratio: 1.91\:1

> [!tip]
> When creating images, consider:
>
> - Using consistent branding elements
> - Maintaining readable text size
> - Optimizing file size without compromising quality
> - Testing appearance across different platforms

## Snippets

The `.vscode/litos.code-snippets` file provides three code snippets for quickly generating Markdown frontmatter. These snippets help you create different types of blog post templates efficiently.

### Basic Template (No Image)

- **Trigger**: `postfm` or `postnoimg`
- **Purpose**: Creates a basic blog post template without images
- **Placeholders**:
  - `${1:Your Post Title}`: Article title
  - `${2:A brief description}`: Article description
  - `${3-4:YYYY-MM-DD}`: Publication and update dates (auto-filled with current date)
  - `${5:Author}`: Author name (defaults to filename)
  - `${6|false,true|}`: Featured post toggle
  - `${7-8:tag}`: Article tags

**Example Output**:
```md
---
title: 'Getting Started with TypeScript'
description: 'A comprehensive guide to TypeScript fundamentals'
pubDate: 2024-01-15
updatedDate: 2024-01-15
author: 'John Doe'
recommend: false
tags: ['TypeScript', 'Programming']
---
```

### 16/9 Image Template

- **Trigger**: `postfm16` or `post169`
- **Purpose**: Creates a template with 16/9 landscape image support
- **Additional Fields**:
  - `heroImage`: Cover image filename
  - `ogImage`: Social media preview image
  - `heroImageAspectRatio`: Fixed to '16/9'

**Example Output**:
```md
---
title: 'Modern Web Design Trends'
description: 'Exploring the latest trends in web design for 2024'
pubDate: 2024-01-15
updatedDate: 2024-01-15
author: 'Jane Smith'
recommend: true
heroImage: 'web-design-trends.png'
ogImage: 'web-design-trends.png'
heroImageAspectRatio: '16/9'
tags: ['Design', 'Web Development']
---
```

### 3/4 Image Template

- **Trigger**: `postfm34` or `post34`
- **Purpose**: Creates a template with 3/4 portrait image support
- **Additional Fields**:
  - Same as 16/9 template, but `heroImageAspectRatio` is fixed to '3/4'

**Example Output**:
```md
---
title: 'Portrait Photography Tips'
description: 'Essential tips for capturing stunning portrait photos'
pubDate: 2024-01-15
updatedDate: 2024-01-15
author: 'Alex Johnson'
recommend: false
heroImage: 'portrait-tips.png'
ogImage: 'portrait-tips.png'
heroImageAspectRatio: '3/4'
tags: ['Photography', 'Tutorial']
---
```

### Usage Instructions

1. Create a new `.md` file in VS Code
2. Type the trigger prefix (e.g., `postfm`) and press Tab
3. Use Tab to navigate between placeholders and fill in content
4. After completing all placeholders, the cursor will position at the article body

> [!tip]
> Choose the appropriate template to streamline your writing process. For posts with images, select a template that matches your image aspect ratio for optimal display.
