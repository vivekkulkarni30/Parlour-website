import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="error-state">
          <p className="eyebrow">Something needs attention</p>
          <h1>The page could not be loaded.</h1>
          <p>Please refresh the page, or contact the salon if the problem continues.</p>
        </main>
      );
    }

    return this.props.children;
  }
}
