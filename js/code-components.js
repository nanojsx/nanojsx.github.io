const code = {
  Link: `// prefetch the link on page load
<Link prefetch href="https://geckosio.github.io/">
  Link to geckos.io
</Link>

// prefetch the link if user hovers over it
<Link prefetch="hover" href="https://geckosio.github.io/">
  Link to geckos.io
</Link>

// prefetch the link if it is visible
<Link prefetch="visible" href="https://geckosio.github.io/">
  Link to geckos.io
</Link>

// back will use window.history.back(), if last page matches href
// (this will navigate faster by serving the last page from the browser caches)
<Link back href="https://geckosio.github.io/">
  Link to geckos.io
</Link>

// wait for 150ms before navigating
// (useful if, for example, you want to fadeOut the content before navigating)
// (together with "prefetch", your MPA will just look like a SPA ❤️)
<Link delay="150" href="https://geckosio.github.io/">
  Link to geckos.io
</Link>`,
  Img: `// lazy load an image
<Img src="imageURL" />

// do not lazy load an image
<Img src="imageURL" lazy={false} />

// lazy load an image, displays a blue box while loading
<div style={{width:'100px', height:'100px', backgroundColor: 'blue'}}>
  <Img height="100" src="imageURL" />
</div>

// lazy load an image with a placeholder image
<Img src="imageURL" placeholder="placeholderURL" />

// lazy load an image with a placeholder component
<Img src="imageURL" placeholder={Placeholder} />`,
  Visible: `// some lazy rendered section
<Visible>
  {()=>(
    <div id="comments">
      <p>Will be rendered once in the visible area.</p>
      <script>
        console.log('visible!')
      </script>
    </div>
  )}
</Visible>

// or
<Visible component={Comments} />

// or
<Visible>{Comments}</Visible>`,
  Helmet: `<Helmet>
  {/* html attributes */}
  <html lang="en" amp />

  {/* body attributes */}
  <body class="root" />

  {/* title element */}
  <title>My Plain Title or {dynamic} title</title>

  {/* meta elements */}
  <meta name="description" content="Nano-JSX application" />

  {/* link elements */}
  <link rel="canonical" href="http://mysite.com/example" />

  {/* inline style elements */}
  <style type="text/css">{\`
    body {
      background-color: blue;
    }
  \`}</style>

  {/* inline script elements */}
  <script>console.log("Hello");</script>

  {/* noscript elements */}
  <noscript>{\`
    <link rel="stylesheet" type="text/css" href="foo.css" />
  \`}</noscript>

  {/* JSON-LD */}
  <script type="application/ld+json">{\`
    {
      "@context": "https://schema.org/",
      "@type": "Recipe",
      "name": "Party Coffee Cake",
      "author": {
        "@type": "Person",
        "name": "Mary Stone"
      },
      "datePublished": "2018-03-10",
      "description": "This coffee cake is awesome and perfect for parties.",
      "prepTime": "PT20M"
    }
  \`}</script>
</Helmet>`
}
