import { writeFileSync, readFileSync, mkdirSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import GithubSlugger from 'github-slugger'
import { escape } from 'pliny/utils/htmlEscaper.js'
import siteMetadata from '../data/siteMetadata.js'
import { allBlogs } from '../.contentlayer/generated/index.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Read tag-data.json
const tagData = JSON.parse(
  readFileSync(path.join(__dirname, '../app/tag-data.json'), 'utf-8')
)

const slugger = new GithubSlugger()

// Sort posts by date
const sortPosts = (posts) => {
  return posts.sort((a, b) => {
    const aDate = new Date(a.date)
    const bDate = new Date(b.date)
    return bDate - aDate
  })
}

const generateRssItem = (post) => `
  <item>
    <guid>${siteMetadata.siteUrl}/blog/${post.slug}</guid>
    <title>${escape(post.title)}</title>
    <link>${siteMetadata.siteUrl}/blog/${post.slug}</link>
    <description>${escape(post.summary)}</description>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <author>${siteMetadata.email} (${siteMetadata.author})</author>
    ${post.tags.map((t) => `<category>${t}</category>`).join('')}
  </item>
`

const generateRss = (posts, page = 'feed.xml') => {
  const rss = `
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>${escape(siteMetadata.title)}</title>
        <link>${siteMetadata.siteUrl}/blog</link>
        <description>${escape(siteMetadata.description)}</description>
        <language>${siteMetadata.language}</language>
        <managingEditor>${siteMetadata.email} (${siteMetadata.author})</managingEditor>
        <webMaster>${siteMetadata.email} (${siteMetadata.author})</webMaster>
        <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
        <atom:link href="${siteMetadata.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
        ${posts.map(generateRssItem).join('')}
      </channel>
    </rss>
  `

  const dir = './public'
  mkdirSync(dir, { recursive: true })
  writeFileSync(path.join(dir, page), rss)
}

const main = () => {
  const posts = sortPosts(allBlogs)
  generateRss(posts)
}

main()
