const code = {
  counterJSX: `import Nano, { Component, Fragment } from 'nano-jsx'

class Counter extends Component {
  value = 0

  changeValue(newValue: number) {
    this.value += newValue
    this.update()
  }

  render() {
    return (
      <Fragment>
        <div>Counter: {this.value}</div>
        <button onClick={() => this.changeValue(1)}>Increment</button>
        <button onClick={() => this.changeValue(-1)}>Decrement</button>
      </Fragment>
    )
  }
}
Nano.render(<Counter />, document.getElementById('root'))`,
  counterJavaScript: `import Nano, { Component, Fragment } from 'nano-jsx'

class Counter extends Component {
  value = 0

  changeValue(newValue: number) {
    this.value += newValue
    this.update()
  }

  render() {
    return Nano.h(
      Fragment,
      null,
      Nano.h('div', null, 'Counter: ', this.value),
      Nano.h('button', { onClick: () => this.changeValue(1) }, 'Increment'),
      Nano.h('button', { onClick: () => this.changeValue(-1) }, 'Decrement')
    )
  }
}
Nano.render(Nano.h(Counter, null), document.getElementById('root'))`,
  counterTaggedTemplates: `import Nano, { Component, Fragment, jsx } from 'nano-jsx'

class Counter extends Component {
  value = 0

  changeValue(newValue: number) {
    this.value += newValue
    this.update()
  }

  render() {
    return jsx\`
      <\${Fragment}>
        <div>Counter: \${this.value}</div>
        <button onClick=\${() => this.changeValue(1)}>Increment</button>
        <button onClick=\${() => this.changeValue(-1)}>Decrement</button>
      </\${Fragment}>\`
  }
}

Nano.render(jsx\`<\${Counter} />\`, document.getElementById('root'))`,
  nodeSSR: `import Nano from 'nano-jsx'
import { Helmet } from 'nano-jsx'

const App = () => (
  <div>
    <Helmet>
      <title>Nano JSX SSR</title>
      <meta name="description" content="Server Side Rendered Nano JSX Application" />
    </Helmet>

    <Helmet footer>
      \<\script src="/scripts.js">\<\/script>
    </Helmet>

    <h1>Hello nano!</h1>
  </div>
)

const app = Nano.renderSSR(<App />)
const { body, head, footer } = Helmet.SSR(app)

const html = \`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    \${head.join('\\n')}
  </head>
  <body>
    \${body}
    \${footer.join('\\n')}
  \<\/body>
</html>`,
  denoSSR: `import * as Nano from 'https://deno.land/x/nano_jsx/mod.ts'
const { Helmet } = Nano

const App = () => (
  <div>
    <Helmet>
      <title>Nano JSX SSR</title>
      <meta name="description" content="Server Side Rendered Nano JSX Application" />
    </Helmet>

    <Helmet footer>
      \<\script src="/scripts.js">\<\/script>
    </Helmet>

    <h1>Hello nano!</h1>
  </div>
)

const app = Nano.renderSSR(<App />)
const { body, head, footer } = Helmet.SSR(app)

const html = \`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    \${head.join('\\n')}
  </head>
  <body>
    \${body}
    \${footer.join('\\n')}
  \<\/body>
</html>`,
  partialHydrationShowcase: `<App>
  <Header>
    <Logo />
    <Navigation />
  <Header>

  <Main>
    <Content />
    <Comments />
  <Main />
</App>

// render the App on the server
renderSSR(<App />)

// send and hydrate only what the client needs
hydrate(<Navigation />)
hydrate(<Comments />)
`,
  hydrateLazy: `// do not pre-render Comments
<Comments noSSR />

// will be hydrated once scrolling to the comments section
hydrateLazy(<Comments />)
`,
  projectTemplate: `npx degit nanojsx/template nano

cd nano

npm install
npm run dev`,
  compareSvelte: `// App.svelte
<script>
  export let name;
\<\/script>

<h1>Hello {name}!</h1>

// main.js
import App from './App.svelte';

const app = new App({
  target: document.body,
  props: {
    name: 'world'
  }
});

export default app;

// 1.7kB (gzip)
`,
  compareNanoJSX: `// App.tsx
import Nano from 'nano-jsx'

const App = (props) => (
  <h1>Hello {props.name}!</h1>
)

Nano.render(
  <App name="world" />,
  document.body
)








// 1.9kB (gzip)`
}
