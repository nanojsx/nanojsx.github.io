const code = {
  Helmet: `import { Helmet } from 'nano-jsx/lib/components/helmet'
  
<Helmet>
  {/* html attributes */}
  <html lang="en" amp />

  {/* body attributes */}
  <body class="root" />

  {/* additional body attrbutes */}
  <body class="main" id="id" />

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
  RouterListener: `import { Route, Switch, Link, Listener, parseParamsFromPath, matchPath } from 'nano-jsx/lib/components/router'
import { h, render } from 'nano-jsx/lib/core'
import { Component } from 'nano-jsx/lib/component'

// fetch a post by id (with random delay)
const fetchPostMock = (id: string) =>
  new Promise(resolve => setTimeout(() => resolve(\`This is post #\${id}\`), Math.random() * 100 + 100))

class BlogPage extends Component {
  listener = Listener().use()

  async getPost() {
    const params = parseParamsFromPath(this.props.route.path)
    // same as:
    // const match = matchPath(window.location.pathname, { path: this.props.route.path })
    // if (!match) return
    // const { params } = match

    if (params?.id) {
      const post = await fetchPostMock(params.id)
      this.update(post)
    }
  }

  async didMount() {
    this.listener.subscribe((curr, prev, event) => {
      if (curr !== prev && /^\/blog\/\d+$/.test(curr)) {
        this.getPost()
      }
    })
    this.getPost()
  }

  public didUnmount() {
    this.listener.cancel()
  }

  render(post: string) {
    if (post) return <div>{post}</div>
    return <div>loading...</div>
  }
}

class App extends Component {
  render() {
    return (
      <div id="root">
        <nav style="display: flex; flex-direction: column;">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/blog/219">Blog #219</Link>
          <Link to="/blog/584">Blog #584</Link>
          <Link to="/blog/855">Blog #855</Link>
        </nav>

        <section>
          <Switch>
            <Route exact path="/">
              {() => <h1>HomePage</h1>}
            </Route>
            <Route exact path="/about">
              {() => <h1>AboutPage</h1>}
            </Route>
            <Route exact path="/blog/:id">
              <BlogPage />
            </Route>
          </Switch>
        </section>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))`,
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
