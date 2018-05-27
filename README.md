# React Sheltr

React Sheltr helps you implement Shared Element Transitions (Sh El Tr -> Sheltr 😉) in your React applications.

## Installation

```
npm install react-sheltr
```

NOTE: this is not a npm package yet...

## Table of Contents

* [What is it?](#what-is-it-)
* [Usage](#usage)
* [Examples](#examples)

## What is it?

A shared element transition is a transition between two views where some
element common for both views is used to smoothly bridge the transition.
In practice there can be two (or more) different elements that are transformed
(scaled and translated) so that it looks like one element that morphs from one state to the other.

Under the hood React Sheltr uses the [FLIP](https://aerotwist.com/blog/flip-your-animations/)
technique to do the heavy lifting for calculating and animating the shared elements.

## Usage

### A word of caution!

React Sheltr uses the official Context API introduced in React v16.3.0
so if you are using an older version of React than that then this module won't work 😕

### Quickstart

Firstly add Sheltr provider somewhere up in the view hierarchy tree just like you
would add your redux Provider or styled-components ThemeProvider.
Note that it doesn't really need to be at the root level but somewhere above
the `SharedElement` components that are used later.

```javascript
import Sheltr from 'react-sheltr';

<Sheltr>
  {/* other components go here */}
</Sheltr>
```

Then you can use `SharedElement` component to define and wire up your shared elements.
This component use the *render-prop* / *children as a function* pattern to expose
necessary props to the actual components that should be shared for the transition.

Here we have two related image components: Component A that starts the transition flow when
it is clicked, which is the default behaviour, and Component B when it's unmounted.

```javascript
import { SharedElement } from 'react-sheltr';

// Component A
<SharedElement sharedId={id}>
  {sheltrProps => (
    <ImageA {...sheltrProps} />
  )}
</SharedElement>

// Component B
<SharedElement sharedId={id} startOnUnmount>
  {sheltrProps => (
    <ImageB {...sheltrProps} />
  )}
</SharedElement>
```

In some cases you might need to apply the individual `sheltrProps` to separate components
or maybe compose them with some existing logic you have.

For this use case you can destruct the provided props and pick the ones you want.
However, remember that you need to spread rest of the props to the component
that should be shared.

```javascript
<SharedElement sharedId={id}>
  {({ onClick, ...rest }) => (
    <Wrapper onClick={onClick}>
      <Image {...rest} />
    </Wrapper>
  )}
</SharedElement>

// Or

<SharedElement sharedId={id}>
  {({ onClick, ...rest }) => (
    <Wrapper onClick={() => {
      this.handleClick(someData);
      onClick();
    }}>
      <Image {...rest} />
    </Wrapper>
  )}
</SharedElement>
```

### The HOC way

If you don't fancy the *render-prop* / *children as a function* pattern
you can use `withSheltr` Higher Order Component to gain access to the underlying
API and manually handle things that `ShareElement` would do for you.

```javascript
import { withSheltr } from 'react-sheltr';

class ComponentA extends Component {
  componentDidMount() {
    this.props.sheltr.transition();
  }

  handleClick = id => {
    this.props.sheltr.start(id);
  };

  render() {
    const { items, sheltr } = this.props;
    return (
      <Wrapper>
        {items.map(item => {
          return (
            <Item onClick={() => this.handleClick(item.id)}>
              <Thumbnail src={item.image} {...sheltr.getProps(item.id)} />
              {/* other things... */}
            </Item>
          );
        })}
      </Wrapper>
    );
  }
}

export default withSheltr(ComponentA);
```

```javascript
import { withSheltr } from 'react-sheltr';

class ComponentB extends Component {
  componentDidMount() {
    this.props.sheltr.transition();
  }

  componentWillUnmount() {
    this.props.sheltr.start(this.props.image.id);
  }

  render() {
    const { image, sheltr } = this.props;
    return (
      <Wrapper>
        <Img src={image.src} {...sheltr.getProps(image.id)} />
        {/* other things... */}
      </Wrapper>
    );
  }
}

export default withSheltr(ComponentB);
```

## API Reference

`*` = required.

### `<Sheltr />` (default export)

| **Prop** | **Type** | **Default** | **Note** |
|----------|----------|-------------|----------|
| `delay` | `number` | `0`ms | The delay for all transition animations inside Sheltr provider.
| `duration` | `number` | `400`ms | The duration for all transition animations inside Sheltr provider.
| `easing` | `string` | `"cubic-bezier(0.075, 0.82, 0.165, 1)"` | Any valid css [transition timing function](https://www.w3schools.com/cssref/css3_pr_transition-timing-function.asp).

### `<SharedElement />`

| **Prop** | **Type** | **Default** | **Note** |
|----------|----------|-------------|----------|
| `children`* | `func` | none |
| `sharedId`* | `string` | none | A unique id between two shared elements.
| `startOnClick` | `bool` | true | A flag telling SharedElement to provide a click handler to start the transition flow.
| `startOnUnmount` | `bool` | false | A flag telling SharedElement to start the transition flow when the component unmounts.
| `completeOnUnmount` | `bool` | false | A flag telling SharedElement to complete transition flow when the component unmounts (after handling `startOnUnmount` related actions.

## Examples

To see more real-world-like examples that use `react-router` and `styled-components`
check the **examples** folder for two quite common use cases for shared element transitions:

- List view with thumbnail images that morph into the header of the clicked item's detail view.
- Simple mosaic image gallery
