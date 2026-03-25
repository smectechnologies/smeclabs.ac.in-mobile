# Sitemap Configuration for Mobile Site (m.smeclabs.ac.in)

## Important: Sitemap Strategy

Since this is the **mobile version** of the website (m.smeclabs.ac.in), the sitemap strategy is:

### Current Setup:
- ✅ `robots.txt` points to main site sitemap: `https://smeclabs.ac.in/sitemap.xml`
- ✅ `sitemap.xml` in this directory contains main site URLs (for reference)
- ✅ All canonical tags point to main site

### Why This Approach?

1. **Prevents Duplicate Content**: Mobile and desktop sites have same content
2. **Single Source of Truth**: Main site (smeclabs.ac.in) is the canonical version
3. **SEO Best Practice**: Google recommends one sitemap for mobile/desktop pairs

### What Search Engines See:

When crawlers visit m.smeclabs.ac.in:
1. Read `robots.txt` → Find sitemap at smeclabs.ac.in/sitemap.xml
2. Read pages → Find canonical tags pointing to smeclabs.ac.in
3. Understand: Mobile site is alternate version, main site is canonical

### Deployment Instructions:

#### For Mobile Site (m.smeclabs.ac.in) - THIS SITE:
1. Deploy the `out` directory to m.smeclabs.ac.in
2. Ensure `robots.txt` is accessible at: https://m.smeclabs.ac.in/robots.txt
3. The `sitemap.xml` file is included but not actively used (robots.txt points to main site)

#### For Main Site (smeclabs.ac.in):
1. Ensure sitemap.xml is accessible at: https://smeclabs.ac.in/sitemap.xml
2. Add this to main site's HTML head:
   ```html
   <link rel="alternate" media="only screen and (max-width: 640px)" href="https://m.smeclabs.ac.in" />
   ```
3. Submit sitemap to Google Search Console: https://smeclabs.ac.in/sitemap.xml

### Google Search Console Setup:

1. **Verify Both Properties**:
   - smeclabs.ac.in (main site)
   - m.smeclabs.ac.in (mobile site)

2. **Submit Sitemap** (only for main site):
   - Go to smeclabs.ac.in property
   - Submit: https://smeclabs.ac.in/sitemap.xml

3. **Set Mobile-Desktop Association**:
   - Google will automatically detect the relationship via:
     - Canonical tags on mobile site
     - Alternate tags on main site

### Testing:

Test that robots.txt is working:
```bash
curl https://m.smeclabs.ac.in/robots.txt
```

Should return:
```
User-agent: *
Allow: /
Sitemap: https://smeclabs.ac.in/sitemap.xml
```

### Alternative Approach (Not Recommended):

If you want mobile site to have its own sitemap:
1. Keep sitemap.xml with m.smeclabs.ac.in URLs
2. Update robots.txt to point to: https://m.smeclabs.ac.in/sitemap.xml
3. Submit both sitemaps to Google Search Console

**However**, this can cause duplicate content issues since both sites have identical content.

### Recommended: Current Setup ✅

The current setup (robots.txt pointing to main site sitemap) is the best practice for mobile subdomains with identical content.
