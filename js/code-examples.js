const code = {
  Form: `import { h, render } from 'nano-jsx/lib/core'
import { Component } from 'nano-jsx/lib/component'

class Form extends Component {
  handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    for (const [name, value] of formData.entries()) {
      console.log(name + ': ' + value) // fname: John // lname: Doe
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" id="fname" name="fname" value="John" />
        <br />
        <input type="text" id="lname" name="lname" value="Doe" />
        <br />
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

render(<Form />, document.getElementById('root'))`,
  TodoList: `import { h, render, Component, tick } from 'nano-jsx'

class Todos extends Component {
  todos: string[] = []
  input: HTMLInputElement

  submitHandler(e: Event) {
    e.preventDefault()
    this.todos.push(this.input.value)
    this.update()

    // get focus back on the input element
    tick(() => {
      this.input.focus()
    })

    // Of course, instead of doing all this stuff with update(), focus(), adding to the todos array, etc..,
    // you could also simply use Vanilla JS: Create a new HTMLListElement and use appendChild() on the <ul> element.
  }

  render() {
    return (
      <div>
        <form onSubmit={(e: Event) => this.submitHandler(e)}>
          <label>Add Todo</label>
          <input ref={el => (this.input = el)} id="my-input" />
          <button type="submit">Add</button>
        </form>
        <ul>
          {this.todos.map(todo => (
            <li>{todo}</li>
          ))}
        </ul>
      </div>
    )
  }
}

render(<Todos />, document.getElementById('root'))`,
  Clock: `class Clock extends Component {
  time = Date.now()
  timer: number

  didMount() {
    // update time every second
    this.timer = setInterval(() => {
      this.time = Date.now()
      this.update()
    }, 1000)
  }

  didUnmount() {
    clearInterval(this.timer)
  }

  render() {
    let time = new Date(this.time).toLocaleTimeString()
    return <span>{time}</span>
  }
}

// render an instance of Clock into <body>:
Nano.render(<Clock />, document.body)`,
  Checkbox: `class Checkbox extends Component {
  checked = true

  toggle = (e: Event) => {
    this.checked = !this.checked
    this.update()
  }

  render() {
    const Text = this.checked ? <p>is checked</p> : null

    return (
      <div>
        <input id="checkbox" type="checkbox" checked={this.checked || undefined} onClick={this.toggle} />
        <Text />
      </div>
    )
  }
}

Nano.render(<Checkbox />, document.body)`,
  Fetch: `const fetchNames = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const json = await res.json()
  const names = json.map((obj) => obj.name)
  return names
}

class Names extends Component {
  async didMount() {
    const names = await fetchNames()
    this.update(names)
  }

  list(names: string[]) {
    return (
      <ul>
        {names.map((n) => {
          return <li>{n}</li>
        })}
      </ul>
    )
  }

  render(names) {
    if (names) return this.list(names)
    else return <div>...loading</div>
  }
}
`,
  FetchSuspense: `// fetch a list of names from the server
const fetchNames = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const json = await res.json()
  const names = json.map((obj) => obj.name)
  return names
}

// loading placeholder
const Loading = () => <div>loading...</div>

// list component
const List = ({ names }) => (
  <ul>
    {names.map((n) => {
      return <li>{n}</li>
    })}
  </ul>
)

// app component
const App = () => (
  <div>
    <h2>Names</h2>
    <Suspense cache names={fetchNames} fallback={<Loading />}>
      <List />
    </Suspense>
  </div>
)
`,
  FetchSuspenseIsomorphic: `// app component
class App extends Component {

  // a empty static method
  static fetchNames(): any {}

  render() {
    return (
      <div>
        <h2>Names</h2>
        <Suspense cache names={App.fetchNames() || fetchNames} fallback={<Loading />}>
          <List />
        </Suspense>
      </div>
    )
  }
}

// client-side rendering
Nano.render(<App />, document.getElementById('root'))

// server-side rendering
const names = await fetchNames() // prefetch names
App.fetchNames = () => () => names // overwrite the static method
Nano.renderSSR(<App />) // render
`,
  LazyImgFadein: `import Nano, { Img, Helmet } from 'nano-jsx'

// create your component
const MyLazyImg = (props: any) => {
  return (

    // add a gray background while the image is loading
    <div style={{ backgroundColor: '#d4d4d4', height: \`\${props.height}px\` }}>
      
      // add some styles to the head
      <Helmet>
        <style>{\`
          .my-lazy-img {
            opacity: 0;
            animation: fadein 5s forwards;
          }
          @keyframes fadein {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
        \`}</style>
      </Helmet>

      // load the image
      <Img
        onLoad={(e: Event) => {
          const img = e.target as HTMLImageElement
          img.classList.add('my-lazy-img')
        }}
        {...props}
      />

    </div>
  )
}

// use your component
<MyLazyImg width="350" height="150" src="https://via.placeholder.com/350x150" />`,
  Store: `// import Nano, Component and Store
import Nano, { Component, Store } from '../index'

// initialize the store with a default value
const myStore = new Store({ name: 'Hulk' })

// set a new state
myStore.state = { name: 'Thor' }

class Hero extends Component {
  // use the store in your component
  store = myStore.use()

  didMount() {
    // subscribe to store changes
    this.store.subscribe((newState: any, prevState: any) => {
      // check if you need to update your component or not
      if (newState.name !== prevState.name) this.update()
    })
  }

  didUnmount() {
    // cancel the store subscription
    this.store.cancel()
  }

  render() {
    // display the name property of your store's state
    return <p>Name: {this.store.state.name}</p>
  }
}

class App extends Component {
  // use the store in your component
  store = myStore.use()

  didMount() {
    setTimeout(() => {
      // set a new state after 2 seconds
      this.store.setState({ name: 'Iron Man' })
    }, 2000)
  }

  render() {
    return <Hero />
  }
}

Nano.render(<App />, document.getElementById('root'))`,
  Ssr: `// server.tsx
import Nano, { Helmet } from 'nano-jsx'

const App = () => {
  return (
    <div>
      <Helmet>
        <html lang="en" amp />

        <body class="root" />
        <body class="main" id="id" />

        <title>Nano JSX Helmet SSR</title>
        <meta name="description" content="Nano-JSX application" />
      </Helmet>

      <Helmet footer>
        <script src="/this/belongs/to/the/footer.js"></script>
      </Helmet>

      <h1>Hello nano!</h1>
    </div>
  )
}

const app = Nano.renderSSR(<App />)
const { body, head, footer, attributes } = Helmet.SSR(app)

const html = \`
<!DOCTYPE html>
<html \${attributes.html.toString()}>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    \${head.join('\\n')}
  </head>
  <body \${attributes.body.toString()}>
    \${body}
    \${footer.join('\\n')}
  </body>
</html>
\`
// access \`attributes.body\` as [Map]: { 'class' => 'main', 'id' => 'id' }
// or with \`attributes.body.toString())\`: class="main" id="id"

// now send the html to the client`,
  TaggedTemplates: `<script>
  const { render, jsx, Link } = nanoJSX

  const names = ['joe', 'suzanne']

  const Names = (props) => {
    return jsx\`
      <ul>
        \${names.map(name => {
          return jsx\`<li>${name}</li>\`
        })}
      </ul>\`
  }

  const App = () => {
    return jsx\`
    <div>

      <!-- Listen for the click event -->
      <h2 onClick="\${() => console.log('click')}">List of names</h2>

      <!-- Render the Names component -->
      <\${Names} />

      <!-- Use the built-in Link component -->
      <\${Link} prefetch="hover" href="https://geckosio.github.io/">
        Link
      </\${Link}>

    </div>\`
  }

  render(App, document.getElementById('root'))
</script>`,
  updateComponents: `import Nano, { Component } from 'nano-jsx'

class Child extends Component {
  constructor(props) {
    super(props)
    this.initState = { name: 'John' } // will set the state only if it is empty
    this.state = { name: 'John' } // will overwrite the state
  }

  render() {
    return (
      <div>
        <button onClick={this.props.updateParent}>
          Update Parent Component
        </button>
      </div>
    )
  }
}

class App extends Component {
  _childref

  handleSelfUpdate = () => {
    this.update()
  }

  handleChildUpdate = () => {
    this._childref.update()
  }

  render() {
    return (
      <div>
        <button onClick={this.handleChildUpdate}>
          Update Child Component
        </button>
        <Child
          updateParent={this.handleSelfUpdate}
          ref={(el) => (this._childref = el)}
        />
      </div>
    )
  }
}

Nano.render(<App />, document.getElementById('root'))`,
  WithStyles: `// imports
import { h, render } from 'nano-jsx/lib/core'
import { withStyles } from 'nano-jsx/lib/withStyles'
import { Component } from 'nano-jsx/lib/component'

// styles
const NavbarCSS = \`
#navbar {
  display:flex;
  flex-direction: column;
}
#navbar a {
  color: #ff4e6a;
}\`
const ComponentCSS = 'h2 { color: red; }'
const AppCSS = \`
body {
  margin: 0;
  background-color: #f0f0f0;
}\`

// wrap withStyles() around a functional component
const Navbar = () => {
  return (
    <div id="navbar">
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </div>
  )
}
const NavbarWithStyles = withStyles(NavbarCSS)(Navbar)

// use it as a decorator for a class component
@withStyles(ComponentCSS)
class ClassComponent extends Component {
  render() {
    return <h2>ClassComponent using withStyle() decorator</h2>
  }
}

const App = () => {
  // return Component withStyles
  return withStyles(AppCSS)(
    <div id="root">
      <NavbarWithStyles />
      <ClassComponent />
    </div>
  )
}

render(<App />, document.getElementById('root'))
`
}
