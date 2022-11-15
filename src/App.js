import Draggable from './Draggable'

function App() {

  const element = <p>Hello world</p>

  return (
    <Draggable childElement={element}/>
  );
}

export default App;
