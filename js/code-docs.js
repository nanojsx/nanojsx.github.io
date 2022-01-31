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
  validCode: `import { h, render } from 'nano-jsx/lib/core'
import { Component } from 'nano-jsx/lib/component'

const styles = {
  popup: {
    background: 'red',
    padding: '16px',
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  }
}

class Popup {
  static id = 'popup'

  static Show() {
    if (document.getElementById(Popup.id)) return

    const popup = (
      <div onClick={Popup.Hide} style={{ ...styles.popup }}>
        <h1>
          I'm a popup
          <br />
          <small>click me to close</small>
        </h1>
      </div>
    )

    popup.id = Popup.id
    document.body.appendChild(popup)
  }

  static Hide() {
    const popup = document.getElementById(Popup.id)
    if (popup) popup.remove()
  }
}

class Buttons extends Component {
  didMount() {
    this.initState = { counter: 0 }
  }

  increaseCounterHandler() {
    this.setState({ counter: (this.state.counter += 1) })

    const counter = document.getElementById('counter')
    if (counter) counter.innerText = \`Counter: ${this.state.counter}\`
  }

  render() {
    return (
      <div>
        <button onClick={Popup.Show}>Show Popup</button> <br />
        <button onClick={() => this.increaseCounterHandler()}>Increase Counter</button>
        <div id="counter">Counter: 0</div>
      </div>
    )
  }
}

const VanillaApp = () => {
  // do some vanilla stuff
  // ...

  // render the buttons
  const buttons = render(<Buttons />)

  // append buttons to DOM
  const root = document.getElementById('root')
  root?.appendChild(buttons)
}

window.addEventListener('load', () => {
  VanillaApp()
})`,
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
  const id = 'some-state-id'
  // define your initial state
  const initState = 100
  // You can use useState()...
  const [value, setValue] = useState(initState, id)
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
    this.initState = { name: 'Doe' }

    // NOTE: "this.initState" will only set the state if it is empty;
    // to overwrite your state at this point, use "this.state"
  }


  didMount() {
    // access this component's state
    console.log(this.state) // { name: 'Doe' }
    
    // set true as second parameter, if you want to trigger a re-render
    this.setState({ name: 'John Doe' }, true) 

    // access the state from the functional component above using its id
    const value = getState('some-state-id') // { number: 100 }
    setState('some-state-id', newValue)
  }

  render() {
    return (
      <div>
        <p>{this.state.name}</p>
        <p>{getState('some-state-id').number}</p>
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
  contextAPI: `import Nano, { createContext, useContext } from 'nano-jsx'

/**
 * Create your own Context to provide data to Components or Functional Components.
 * @param defaultValue Pass the initial Value.
 */
const MyNameContext = createContext('suzanne')

// Context can be consumend in 2 ways
// 1. by using the Consumer Component in the render function
const Child = () => {
  return (
    <MyNameContext.Consumer>
      {(value: any) => {
        return <p>{value}</p>
      }}
    </MyNameContext.Consumer>
  )
}

// 2. alternatively by using the useContext() hook
const Child = () => {
  const value = useContext(MyNameContext)
  return <p>{value}</p>
}

const Parent = (props: any) => {
  return (
    // to overwrite the default value of the Context use the value prop
    <MyNameContext.Provider value={props.name}>
      <Child />
    </MyNameContext.Provider>
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
  dangerouslySetInnerHTML: `const html = \`<div>your markup</div>\`;

const App = () => {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}`,
  dangerouslySetInnerHTML2: `const App = () => {
  return <div innerHTML={{ __dangerousHtml: html }} />;
}`,
  withStyles: `import { h, render } from 'nano-jsx/lib/core'
import { withStyles } from 'nano-jsx/lib/withStyles'

const App = () => {
  // your styles
  const css = \`
    body {
      margin: 0;
      background-color: #f0f0f0;
    }\`

  // return Component withStyles
  return withStyles(css)(
    <div id="root">
      <h1>Hello from Nano JSX!</h1>
    </div>
  )
}

render(<App />, document.getElementById('root'))
`,
  customElementsMode: `import { h, render } from 'nano-jsx/lib/core'
import { Component } from 'nano-jsx/lib/component'
import { defineAsCustomElements } from 'nano-jsx/lib/customElementsMode'

/**
 * Create a customElement from Components or Functional Components.
 * @param Component name.
 * @param DOMString customElement name.
 * @param string[] Public props key(s).
 * @param mode Shadow DOM mode.
 */
class CustomElementCounter extends Component {
  value = 0

  // some custom CSS from Nano JSX
  static style = \`
    .code-result button {
      cursor: pointer;
      margin-right: 4px;
      padding: 8px 12px;
    }\`

  changeValue(newValue: number) {
    this.value += newValue
    this.update()
  }

  render() {
    return (
      <div class="code-result">
        <div id="counter-value">Counter: {this.value}</div>
        <button id="button-increment" onClick={() => this.changeValue(1)}>
          Increment
        </button>
        <button id="button-decrement" onClick={() => this.changeValue(-1)}>
          Decrement
        </button>
        <style>{CustomElementCounter.style}</style>
      </div>
    )
  }
}

// define your customElement
defineAsCustomElements(
  // your Nano Component name
  CustomElementCounter,
  // your customElements name
  // this is equivalent to CustomElementCounter.define's first argument
  'custom-element-counter',
  // optional Component's props key or multiple keys
  // use [] when not assigning keys
  ['value'],
  // optional attach a shadow DOM mode to a custom element: open / closed
  // more info:
  // https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM
  { mode: 'open' }
)

// create your App and include your customElement
const App = () => (
  <div id="root">
    <h1>Nano JSX customElement!</h1>
    <custom-element-counter></custom-element-counter>
  </div>
)

// render the App
render(<App />, document.getElementById('root'))`,
  customElementsModeHTML: `// optional split up your customElement into a single file
// and include it inside a Component or page with a script tag
<body>
  <custom-element-counter></custom-element-counter>
  <script src="webcomponents/custom-element-counter.js"></script>
</body>
`
}
