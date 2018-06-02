const app = {
  title: 'Indecision App',
  subtitle: 'Put your life in the hands of a computer',
  options: []
}

// JSX - JavaScript XML
let appRoot = document.getElementById('App');

const onFormSubmit = (e) => {
  e.preventDefault();
  const option = e.target.elements['option'].value;
  if (option) {
    app.options.push(option);
    render();
  }
};

const onRemoveAll = () => {
  app.options = [];
  render();
};

const onMakeDecision = () => {
  const randomNumber = Math.floor(Math.random() * app.options.length);
  const option = app.options[randomNumber];
  alert(option);
};

const render = () => {
  let templateTwo = (
    <div>
      <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
      <p>{app.options.length}</p>
      <ol>
        {
          app.options.map((option) => {
            return <li key={option}>{option}</li>
          })
        }
      </ol>
      <button onClick={onRemoveAll}>Reset</button>
      <button disabled={app.options.length <= 0} onClick={onMakeDecision}>Make Decision</button>
      <form onSubmit={onFormSubmit}>
        <input type="text" name="option" />
        <button>Add Option</button>
      </form>
    </div>
  );
  ReactDOM.render(templateTwo, appRoot);
};

render();
