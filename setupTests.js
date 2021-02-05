import "@testing-library/jest-dom/extend-expect";

// fix Warning: unstable_flushDiscreteUpdates: Cannot flush updates when React is already rendering.
// https://github.com/testing-library/react-testing-library/issues/470#issuecomment-710775040
Object.defineProperty(HTMLMediaElement.prototype, 'muted', {
  set: () => {},
});