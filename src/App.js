import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <div className="contenedor">
        <h1 className="title">Meme creator</h1>
        <MemeCreador></MemeCreador>
      </div>
      <Dummy></Dummy>
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
      <img
        src={props.items.plantilla}
        className="image-template"
        alt="template-plantilla"
      ></img>
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

class Dummy extends React.Component {
  constructor() {
    super();
    this.state = {
      memes: [],
      isFetch: true,
      index: 0,
    };
  }
  componentDidMount() {
    // console.log("Did Mount");
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((memesJson) =>
        this.setState({ memes: memesJson.data, isFetch: false })
      );
  }

  handleButton = (event) => {
    const { value } = event.target;
    let count = Number(value) + 1;
    if (count >= 100) count = 0;
    this.setState({ index: count });
  };

  render() {
    if (this.state.isFetch) {
      return <h2 className="demo">"Loading...";</h2>;
    }
    let contador = this.state.index;
    const item = this.state.memes.memes[contador].url;
    return (
      <div className="galeria">
        <img src={item} alt={"meme"}></img>
        {/* {item.map((item, index) => {
          return <img key={index} src={item.url} alt={("meme", index)}></img>;
        })} */}
        <button value={contador} onClick={this.handleButton}>
          Next
        </button>
      </div>
    );
  }
}
export default App;
