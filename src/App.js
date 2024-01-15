import Draggable from "./Draggable";
import logo from "./assets/logo.png";
import "./style.css";

function App() {
  const element = (
    <div
      className="image"
      style={{
        backgroundImage: "url(" + logo + ")",
      }}
    ></div>
  );

  return <Draggable childElement={element} />;
}

export default App;
