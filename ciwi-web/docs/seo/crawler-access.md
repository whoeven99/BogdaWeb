# Search and AI crawler access

Policy reviewed on 2026-09-20: allow crawling of public content and discovery files by all crawlers, including Google and AI crawlers. No separate AI-training opt-out is added; the existing wildcard permission is preserved.

`src/app/robots.ts` serves the root `/robots.txt`. A single `User-agent: *` group allows `/` and excludes `/api/`, which contains lead-capture and affiliate operations. It declares the absolute sitemap URL `https://ciwi.ai/sitemap.xml`. The sitemap, `/llms.txt`, public English and Chinese pages, JavaScript, CSS and images remain crawlable. Avoid separate named-bot groups unless they need a genuinely different policy: specific groups can replace the wildcard group's exclusions.

The existing sitemap includes published task guides only. The AI content directory now uses the same published-guide selector; queued and discovered drafts remain excluded. `llms.txt` is a discovery aid, not a permission standard or a guarantee of indexing or AI citation. No CORS changes are required for server-to-server crawler requests.

Robots exclusions do not authenticate requests or guarantee that a URL stays out of search results. API authentication remains the responsibility of each endpoint. Content that needs a noindex directive must remain crawlable for the directive to be read.

## Deployment verification

After deployment, fetch `/robots.txt`, `/sitemap.xml` and `/llms.txt` with ordinary and crawler user agents. Each should return the intended text or XML with HTTP 200, without a login page, JavaScript challenge, restrictive X-Robots-Tag or redirect loop. Check a public guide and its required assets as well. A spoofed user-agent check alone does not prove access for a verified crawler IP.

Production requests from this environment timed out on 2026-09-20, and the web fetcher could not retrieve these three URLs. This does not establish the cause or prove that crawlers are blocked. CDN/WAF policies and verified crawler access remain unverified; repository changes cannot override an upstream block. No deployment or Search Console submission was performed in this task.

## References

- [Requested Semrush article](https://www.semrush.com/blog/beginners-guide-robots-txt/)
- [Google's robots.txt specification](https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec)
