import React, { Component } from 'react';
import PropTypes from 'prop-types';

// TODO: add warnings and errors for misuse.

const SheltrContext = React.createContext();

// Shared Element Transition --> Sh El Tr --> Sheltr
class Sheltr extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    delay: PropTypes.number,
    duration: PropTypes.number,
    easing: PropTypes.string,
  };

  static defaultProps = {
    delay: 0,
    duration: 400,
    easing: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
  };

  sharedId = null;
  first = null;
  last = null;

  // Put `isTransitioning` inside React compoennt state so that changes made
  // to it cause a re-render.
  state = {
    // TODO: not sure what this can be used for...
    isTransitioning: false,
  };

  getSharedId = () => this.sharedId;

  getProps = sharedId => {
    return {
      ...this.state, // pass state if someone wants to do something with it
      'data-sheltr-id': sharedId,
    };
  };

  getSharedElements = () => {
    return Array.from(
      document.querySelectorAll(`[data-sheltr-id="${this.sharedId}"]`)
    );
  };

  // Active element is always the one that has not been
  // marked with `data-sheltr-read` data attribute.
  // Also, there should be only one or two shared elements in the DOM
  // at a time and only one of them can have `data-sheltr-read` attribute set
  // so we can return the first filtered element and that should be
  // the active one (active meaning the one relevant for either `readFirst`
  // or `readLast`)
  getActiveElement = () => {
    const els = this.getSharedElements();
    return els.filter(el => !el.getAttribute('data-sheltr-read'))[0];
  };

  clearState = () => {
    this.sharedId = null;
    this.first = null;
    this.last = null;
  };

  unmarkSharedElements = () => {
    this.getSharedElements().forEach(el => {
      el.removeAttribute('data-sheltr-read');
    });
  };

  readFirst = id => {
    this.clearState();
    this.sharedId = id;

    const el = this.getActiveElement();
    const { x, y, width, height } = el.getBoundingClientRect();

    this.unmarkSharedElements(); // remove `data-sheltr-read` from others first
    el.setAttribute('data-sheltr-read', 'true'); // then mark element as read

    this.first = { x, y, width, height };
  };

  readLast = () => {
    const el = this.getActiveElement();
    const { x, y, width, height } = el.getBoundingClientRect();

    /* NOTE:
     * If image is not loaded `getBoundingClientRect` returns `height: 0`
     * at least with Safari after some quick testing.
     * So we need to calculate height from the width and aspect ratio
     * of the element if the user has provided the known
     * native width / height of the image.
     */
    let h = height;
    const { sheltrWidth, sheltrHeight } = el.dataset;

    if (!height && width && sheltrWidth && sheltrHeight) {
      const aspectRatio = sheltrWidth / sheltrHeight;
      h = width / aspectRatio;
    }

    this.last = { x, y, width, height: h };
    this.invert(el);
  };

  invert = el => {
    // Calculate scale and translate for inversion
    const scaleX = this.first.width / this.last.width;
    const scaleY = this.first.height / this.last.height;
    const translateX = this.first.x - this.last.x;
    const translateY = this.first.y - this.last.y;
    const translate = `translate3d(${translateX}px, ${translateY}px, 0px)`;
    const scale = `scale(${scaleX}, ${scaleY})`;
    const transform = `${translate} ${scale}`;

    // Invert
    requestAnimationFrame(() => {
      el.style.willChange = 'transform';
      el.style.transition = 'none';
      el.style.transformOrigin = 'top left';
      el.style.transform = `${transform}`;

      // Set fixed width / height for more robust animation on Safari
      if (this.last.width > 0 && this.last.height > 0) {
        el.style.width = `${this.last.width}px`;
        el.style.height = `${this.last.height}px`;
      }

      this.play(el);
    });
  };

  play = el => {
    const { easing, duration, delay } = this.props;

    // Play
    this.setState({ isTransitioning: true });

    // Wait for the next frame so we know all the style changes have
    // taken hold: https://aerotwist.com/blog/flip-your-animations/
    requestAnimationFrame(() => {
      el.style.transition = `transform ${duration}ms ${easing} ${delay}ms`;
      el.style.transform = 'none';

      // Remove temp properties after animation is finished
      el.addEventListener('transitionend', () => {
        // Remove tmp width and height
        el.style.removeProperty('width');
        el.style.removeProperty('height');

        // Cleanup transition related styles
        el.style.willChange = 'unset';
        el.style.transition = 'none';

        this.setState({ isTransitioning: false });
        this.clearState();
      });
    });
  };

  // NOTE: "first" should always be read before calling transition
  transition = () => {
    if (!this.sharedId || this.state.isTransitioning) return; // bail
    this.readLast();
  };

  render() {
    const context = {
      start: this.readFirst,
      transition: this.transition,
      getSharedId: this.getSharedId,
      getProps: this.getProps,
    };

    return (
      <SheltrContext.Provider value={context}>
        {this.props.children}
      </SheltrContext.Provider>
    );
  }
}

class SharedElementComp extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    sharedId: PropTypes.string.isRequired,
    startOnUnmount: PropTypes.bool,
    startOnClick: PropTypes.bool,
    completeOnUnmount: PropTypes.bool,
    sheltr: PropTypes.shape({
      start: PropTypes.func.isRequired,
      transition: PropTypes.func.isRequired,
      getSharedId: PropTypes.func.isRequired,
      getProps: PropTypes.func.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    startOnClick: true,
    startOnUnmount: false,
  };

  componentDidMount() {
    this.props.sheltr.transition();
  }

  shouldComponentUpdate() {
    // Optimize rendering
    return this.props.sharedId === this.props.sheltr.getSharedId();
  }

  componentWillUnmount() {
    if (this.props.startOnUnmount) {
      this.props.sheltr.start(this.props.sharedId);

      // NOTE: in cases where the component that corresponds "last"
      // was not unmounted we need to call `transition` after we read "first"
      // component to complete the transition since there is no
      // SharedElement component that would call `transition` on
      // componentDidMount lifecycle hook.
      if (this.props.completeOnUnmount) {
        this.props.sheltr.transition();
      }
    }
  }

  handleClick = () => {
    this.props.sheltr.start(this.props.sharedId);
  };

  render() {
    const { sheltr, sharedId, startOnUnmount } = this.props;
    const baseProps = sheltr.getProps(sharedId);
    const sheltrProps = startOnUnmount
      ? baseProps // no need for click handler
      : { ...baseProps, onClick: this.handleClick };

    return this.props.children(sheltrProps);
  }
}

// Exported *****************************************************************

// HOC for more manual usage
export function withSheltr(Component) {
  return function SheltrComponent(props) {
    return (
      <SheltrContext.Consumer>
        {context => <Component {...props} sheltr={context} />}
      </SheltrContext.Consumer>
    );
  };
}

// Helper component to wrap shared elements
export const SharedElement = withSheltr(SharedElementComp);

// Main provider component
export default Sheltr;
