console.log('app.js');

class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.state = {
      options: []
    }
  }

  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);
      if (options) {
        this.setState(() => ({
          options
        }));
      }
    } catch (e) {
      // allow fall back to defaults.
    }
  }

  componentDidUpdate(prevProps, prevStates) {
    if (prevStates.options.left !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
    console.log('componentDidUpdate', prevProps, prevStates, this.state);
  }

  handleDeleteOptions() {
    this.setState(() => ({
      options: []
    }));
  }

  handleDeleteOption(optionToRemove) {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => {
        return optionToRemove !== option;
      })
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
        <Header />
        <Action
          handlePick={this.handlePick}
          hasOptions={this.state.options.length > 0}
        />
        <Options
          options={this.state.options}
          handleDeleteOption={this.handleDeleteOption}
          handleDeleteOptions={this.handleDeleteOptions}
        />
        <AddOption
          handleAddOption={this.handleAddOption}
        />
      </div>
    );
  }
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
        What should I do???
      </button>
    </div>
  );

}

const Options = (props) => {
  return (
    <div>
      {props.options.length === 0 && <p>Pease enter an option to get started!</p>}
      {props.options.length > 0 && <p>You Have {props.options.length}</p>}
      <ul>
        {
          props.options.map(option => (
            <Option
              key={option}
              text={option}
              handleDeleteOption={props.handleDeleteOption}
            />
          ))
        }
        {props.options.length > 0 && <button onClick={props.handleDeleteOptions}>Remove All</button>}
      </ul>
    </div>
  );
};

const Option = (props) => {
  return (
    <li>
      {props.text}
      <button onClick={(e) => {
        props.handleDeleteOption(props.text)
      }}
      >
        Remove
      </button>
    </li>
  );
};

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

    this.setState(() => ({error}));

    if (!error) {
      e.target.elements.option.value = '';
    }
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
