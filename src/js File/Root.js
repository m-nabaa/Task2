'use strict';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <h1>
        hello word
      </h1>
    );
  }
}
ReactDOM.render(<Root />,document.getElementById('app'));