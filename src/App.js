import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Meme creator</h1>
        <MemeCreador></MemeCreador>
      </div>
    </div>
  );
}
class MemeCreador extends React.Component {
  constructor() {
    super();
    this.state = {
      top: "",
      bottom: "",
      plantilla:
        "https://www.elsoldelcentro.com.mx/doble-via/virales/e7k71m-meme-origen/ALTERNATES/LANDSCAPE_1140/meme%20origen",
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    // console.log(this.state.top + ":" + this.state.bottom);
  };

  render() {
    return (
      <div>
        <Meme items={this.state}></Meme>
        <MemeForm value={this.state} onChange={this.handleChange}></MemeForm>
      </div>
    );
  }
}
function Meme(props) {
  return (
    <div className="meme-template">
      <img src={props.items.plantilla} className="image-template"></img>
      <h2 className="top-text">{props.items.top}</h2>
      <h2 className="bottom-text">{props.items.bottom}</h2>
    </div>
  );
}

function MemeForm(props) {
  return (
    <form className="form">
      <input
        placeholder="Texto superior"
        name="top"
        value={props.value.top}
        onChange={props.onChange}
      />
      <input
        placeholder="Texto inferior"
        name="bottom"
        value={props.value.bottom}
        onChange={props.onChange}
      />
      <input
        placeholder="Url Imagen"
        name="plantilla"
        onChange={props.onChange}
      />
    </form>
  );
}
export default App;
