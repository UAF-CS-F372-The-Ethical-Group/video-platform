/**
 * Contains functionality to allow inserting elements into the head of
 * a page from within a component.
 */

import { Component } from "preact";

let mounted: Head[] = [];

/**
 * Track any elements that have been passed as children to a Head
 * component, and return them when Head.rewind is called.
 */
export default class Head extends Component {
  /** Return all children and reset the list */
  static rewind() {
    const state = mounted.map((mount) => mount.props.children ?? [])
      .flat();
    mounted = [];
    return <>{state}</>;
  }

  /** On mount, track all children */
  override componentWillMount() {
    mounted.push(this);
  }

  /**
   * If the component is unmounted, remove the children from
   * tracking
   */
  override componentWillUnmount() {
    const i = mounted.indexOf(this);
    if (~i) mounted.splice(i, 1);
  }

  /** Do not render any markup for this compoenent. */
  render() {
    return null;
  }
}
