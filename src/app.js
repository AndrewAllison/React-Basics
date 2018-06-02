console.log('app.js');

class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.state = {
      options: props.options
    }
  }

  handleDeleteOptions() {
    this.setState(() => ({
      options: []
    }));
  }

  handleAddOption(option) {
    if (!option) {
      return 'Enter a valid value to add item';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists';
    }

    this.setState((prevState) => ({
      options: prevState.options.concat([option])
    }));
  }

  handlePick() {
    this.setState(() => {
      const randomNumber = Math.floor(Math.random() * this.state.options.length);
      const option = this.state.options[randomNumber];
      console.log('Picked', option);
    });
  }

  render() {
    const subtitle = 'Put your life in the hands of computer.';

    return (
      <div>
        <Header subtitle={subtitle}/>
        <Action
          handlePick={this.handlePick}
          hasOptions={this.state.options.length > 0}
        />
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
        />
        <AddOption
          handleAddOption={this.handleAddOption}
        />
      </div>
    );
  }
}

IndecisionApp.defaultProps = {
  options: []
}
const Header = (props) => {
  return (<div>
    <h1>{props.title}</h1>
    {props.subtitle && <h2>{props.subtitle}</h2>}
  </div>);
};

Header.defaultProps = {
  title: 'Indecision App'
};

const Action = (props) => {

  return (
    <div>
      <button
        disabled={!props.hasOptions}
        onClick={props.handlePick}>
        What should I do??
      </button>
    </div>
  );

}

class Options extends React.Component {
  render() {
    return (
      <div>
        <p>You Have {this.props.options.length}</p>
        <ul>
          {this.props.options.map(opt => <Option key={opt} text={opt}/>)}
          <button onClick={this.props.handleDeleteOptions}>Remove All</button>
        </ul>
      </div>
    );
  }
}

const Option = (props) => {
  return (
    <li>{props.text}</li>
  );
}

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined
    }
  }

  handleAddOption(e) {
    e.preventDefault();
    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);
    this.setState(() => ({
      error
    }));
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option"/>
          <button type="submit">Add another option.</button>
        </form>
      </div>
    );
  }
}


ReactDOM.render(<IndecisionApp/>, document.getElementById('App'));
