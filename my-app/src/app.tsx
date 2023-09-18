import * as ReactDOM from 'react-dom';

function render() {
  ReactDOM.render(
    <h2 className='bg-red-200 text-center text-cyan-400'>Hello from React!</h2>,
    document.getElementById('root'),
  );
}

render();
