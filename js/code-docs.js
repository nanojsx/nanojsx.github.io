const code = {
  projectTemplate: `npx degit nanojsx/template nano

cd nano

npm install
npm run dev`,
  npmInstall: `# install nano-jsx
npm i nano-jsx`,
  import: `// app.tsx
import Nano from 'nano-jsx'

const App = (props) => <h1>Hello from {props.name}!</h1>

Nano.render(<App name="Nano" />, document.getElementById('root'))`,
  tsConfig: `// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2015",
    "jsx": "react",
    "jsxFactory": "Nano.h",
    // More compiler options…
  }
}     `,
  bundle: `// index.html
<script src="https://unpkg.com/nano-jsx/bundles/nano.slim.min.js"><\/script>

// (or the full version with all features included)
<script src="https://unpkg.com/nano-jsx/bundles/nano.full.min.js"><\/script>

<script>
  const { jsx, render } = nanoJSX

  const App = (props) => jsx\`<h1>Hello from \${props.name}!</h1>\`

  render(jsx\`<\${App} name="Nano" />\`, document.getElementById('root'))
<\/script>
    `,
  props: `import Nano, { Component } from 'nano-jsx'

class Names extends Component {
  data: any

  async didMount() {
    const res = (await fetchMock('/api/names')) as any

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
}`,
  state: `import Nano, { Component } from 'nano-jsx'
import { useState, getState, setState } from 'nano-jsx/lib/hooks/useState'

const MyComponent = () => {
  // every state needs an unique id
  const id = 'some-state'
  // You can use useState()...
  const [value, setValue] = useState(100, id)
  // ...or simply use getState() and setState().
  const value = getState(id)
  setState(id, newValue)

  return <p>{value}</p> // <p>100</p>
}

class MyComponent extends Component {
  constructor(props) {
    super(props)
    
    // set a unique id if you use this component more than 
    // once across your app and it is using a state
    this.id = 'MyComponent'

    // this state now has the id 'MyComponent' and can be accessed
    // by any other component using that id and the useState() hook
    this.state = { name: 'Doe' }

    // you could of course just add a simple property like "value",
    // but it will not persist after re-mounting the component.
    // If your component does never re-mount, you can safely do it.
    this.value = { name: 'Doe' }
  }


  didMount() {
    // access this component's state
    console.log(this.state) // { name: 'Doe' }
    
    // set true as second parameter, if you want to trigger a re-render
    this.setState({ name: 'John Doe' }, true) 

    // access the state from the functional component above using its id
    const value = getState('some-state') // { number: 100 }
    setState('some-state', newValue)
  }

  render() {
    return (
      <div>
        <p>{this.store.state.name}</p>
        <p>{getState('some-state').number}</p>
      </div>
    ) // <div><p>John Doe</p><p>100</p></div>
  }
}`,
  store: `import Nano, { Component } from 'nano-jsx'
import { Store } from 'nano-jsx/lib/store'

/**
 * Create your own Store.
 * @param defaultState Pass the initial State.
 * @param name The unique name of the Store (optional).
 * @param storage Pass 'memory', 'local' or 'session' (optional).
 */
const myStore = new Store({}, 'my-store', 'local')

const MyComponent = () => {
  // you can't subscribe to a store in a functional component,
  // only read and write to it adjusting the state here,
  // will trigger the subscription event in class components
  myStore.state = { number: 100 }
  // or
  myStore.setState({ number: 100 })

  // access the store's state
  console.log(myStore.state) // { number: 100 }

  return <p>{this.store.state.number}</p> // <p>100</p>
}

class MyComponent extends Component {
  // use the myStore inside MyComponent
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
    return <p>{this.store.state.number}</p> // <p>100</p>
  }
}`,
  contextAPI: `import Nano from 'nano-jsx'

const MyContext = Nano.createContext('suzanne')

const Child = () => {
  return (
    <MyContext.Consumer>
      {(value: any) => {
        return <p>{value}</p>
      }}
    </MyContext.Consumer>
  )
}

const Parent = (props: any) => {
  return (
    <MyContext.Provider value={props.name}>
      <Child />
    </MyContext.Provider>
  )
}

Nano.render(<Parent name="john" />, document.getElementById('root'))
`,
  fragment: `import Nano, { Fragment } from 'nano-jsx'

const List = () => (
  <Fragment>
    <p>first child</p>
    <p>second child</p>
    <p>third child</p>
  </Fragment>
)
`,
  customElementsMode: `import Nano from 'nano-jsx'
import NanoComponent from 'your-own-nano-component'

Nano.defineAsCustomElements(
  // your Nano Component
  NanoComponent,
  // your custom elements name, This is equivalent to customElements.define's first argument.
  'nano-component',
  // component's props key
  ['value'],
  // optional, customElements option
  {
    mode: 'open'
  }
)
`,
customElementsModeHTML: `<body>
  <h1>Hello Nano JSX customElementsMode</h1>
  <nano-component value='hello'></nano-component>
  <script src='your custom elements script'></script>
</body>
`
}