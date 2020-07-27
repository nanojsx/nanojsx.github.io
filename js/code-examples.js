const code = {
  todoList: `import Nano, { Component } from 'nano-jsx'

  class Todos extends Component {
    todos: string[] = []
  
    submitHandler(e: Event) {
      e.preventDefault()
      const input = document.getElementById('input') as HTMLInputElement
      this.todos.push(input.value)
      this.update()
    }
  
    render() {
      return (
        <form onSubmit={(e: Event) => this.submitHandler(e)}>
          <label>
            <span>Add Todo</span>
            <input id="input" />
          </label>
          <button type="submit">Add</button>
          <ul>
            {this.todos.map((todo) => (
              <li>{todo}</li>
            ))}
          </ul>
        </form>
      )
    }
  }
  
  Nano.render(<Todos />, document.getElementById('root'))`,
  clock: `class Clock extends Component {
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
  fetch: `import Nano, { Component } from 'nano-jsx'

class Names extends Component {
  data: any

  async didMount() {
    const res = await fetch('/api/names') as any

    if (res) {
      this.data = res.data
      this.update()
    }
  }

  render() {
    if (this.data) {
      return (
        <ul>
          {this.data.map((d: any) => {
            return <li>{d.name}</li>
          })}
        </ul>
      )
    } else {
      return <div>...loading</div>
    }
  }
}
`,
  store: `// import Nano, Component and Store
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
  ssr: `// server.tsx
import Nano, { Img, Helmet } from 'nano-jsx'

const App = () => {
  return (
    <div>
      <Helmet>
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
  </body>
</html>
\`

// now send the html to the client`,
  taggedTemplates: `<script>
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
</script>`
}
