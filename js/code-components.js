const code = {
  Helmet: `import { Helmet } from 'nano-jsx/lib/components/helmet'
  
<Helmet>
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
</Helmet>`,
  Img: `import { Img } from 'nano-jsx/lib/components/img'

// lazy load an image
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
  Router: `import * as Router from 'nano-jsx/lib/components/router'

// link to another page
<Router.Link to="/">Home</Router.Link>

// use a function to navigate to another page
Router.to('/another-page')

// Router.Switch wrapps all Routes
// fallback to "404 (not found)"
<Router.Switch fallback={() => <div>404 (not found)</div>}>

  <Router.Route exact path="/">
    // some component
  </Router.Route>

  <Router.Route path="/topics">
    <Topics /> // see below
  </Router.Route>

  // :id can be anything
  <Router.Route exact path="/:id/details">
    // some component
  </Router.Route>

  // :id needs to match the regex /^[a-f0-9]{6}$/
  <Router.Route exact path="/:id/details" regex={{ id: /^[a-f0-9]{6}$/ }}>
    // some component
  </Router.Route>

</Router.Switch>

// how the Topics component could look like
const Topics = (props) => {
  const { path } = props.route
  return (
    <div id="topics">
      <h2>Topics</h2>

      <Router.Link to={\`$\{path\}/one\`}>One</Router.Link>
      <Router.Link to={\`$\{path\}/two\`}>Two</Router.Link>

      <div class="router">
        <Router.Switch>
          <Router.Route path={\`$\{path\}/one\`}>topic one</Router.Route>
          <Router.Route path={\`$\{path\}/two\`}>topic two</Router.Route>
        </Router.Switch>
      </div>
    </div>
  )
}

// render a specific route on the server-side
renderSSR(<App />, { pathname: '/123456/detail' })`,
  Suspense: `import { Suspense } from 'nano-jsx/lib/components/suspense'

// "fetchNames" is a function that returns a promise
// "names" will be available as a props in the List component
// use a Loading component as "fallback"
<Suspense cache names={fetchNames} fallback={<Loading />}>
  <List />
</Suspense>`,
  Link: `import { Link } from 'nano-jsx/lib/components/link'
  
// prefetch the link on page load
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
<Link delay={150} href="https://geckosio.github.io/">
  Link to geckos.io
</Link>`,
  Visible: `import { Visible } from 'nano-jsx/lib/components/visible'
  
// some lazy rendered section
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
<Visible>{Comments}</Visible>`
}
