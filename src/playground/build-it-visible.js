// JSX - JavaScript XML
// let appRoot = document.getElementById('App');

// let isVisible = false;
// const onVisibilityClicked = () => {
//   isVisible = !isVisible;
//   render();
// };

// const render = () => {
//   let templateTwo = (
//     <div>
//       <h1>Visibility</h1>
//       <button onClick={onVisibilityClicked}>{isVisible ? 'Hide' : 'Show'}</button>
//       {isVisible && (<p>Some nice text here that is hidden!!!</p>)  }
//     </div >
//   );
//   ReactDOM.render(templateTwo, appRoot);
// };

// render();

class Visibility extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
    this.state = {
      visibility: false
    }
  }
  handleToggleVisibility() {
    console.log('Visibility');
    this.setState((prevState) => {
      return {
        visibility: !prevState.visibility
      }
    });
  }
  render() {
    return (
      <div>
        <h1>Visibility</h1>
        <button onClick={this.handleToggleVisibility}>{this.state.visibility ? 'Hide Details' : 'Show Details'}</button>
        {this.state.visibility && (
          <p>Hey there now I show!!</p>
        )}
      </div>
    );
  }
}

ReactDOM.render(<Visibility />, document.getElementById('App'));
