import * as ReactDOM from 'react-dom';
import HierarchyContainer from './componets/HierarchyContainer';
import ButtonComponent from './componets/ButtonComponent';

function render() {
  ReactDOM.render(
    <>
      <HierarchyContainer></HierarchyContainer>
      <ButtonComponent />
    </>,
    document.getElementById('root')
  );
}

render();

