import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      memes: {},
      isFetch: false,
      plantilla:
        "https://www.elsoldelcentro.com.mx/doble-via/virales/e7k71m-meme-origen/ALTERNATES/LANDSCAPE_1140/meme%20origen",
      buttonActivated: true,
    };
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((memesJson) =>
        this.setState({ memes: memesJson.data.memes, isFetch: true })
      );
  }

  handleButton = (event) => {
    const { value } = event.target;
    let count = Number(value) + 1;
    if (count >= 100) count = 0;
    this.setState({ index: count });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    // console.log(this.state.top + ":" + this.state.bottom);
  };

  handleUrl = (event) => {
    const { value } = event.target;
    if (value !== "") {
      this.setState({ plantilla: value });
    } else {
      this.setState({
        plantilla:
          "https://www.elsoldelcentro.com.mx/doble-via/virales/e7k71m-meme-origen/ALTERNATES/LANDSCAPE_1140/meme%20origen",
      });
    }
  };

  render() {
    return (
      <div className="App">
        {this.state.buttonActivated === false && (
          <button
            className=""
            onClick={() => this.setState({ buttonActivated: true })}
          >
            Abrir
          </button>
        )}

        <div className="contenedor">
          {this.state.isFetch === true && this.state.buttonActivated && (
            <div className="galeriaTrue">
              <div
                className="btn-close"
                onClick={() => this.setState({ buttonActivated: false })}
              >
                &times;
              </div>
              <div className="imagenes">
                {this.state.memes.map((item) => (
                  <img
                    src={item.url}
                    onClick={() => this.setState({ plantilla: item.url })}
                  ></img>
                ))}
              </div>
            </div>
          )}
          <div className="memeEditor">
            <h1 className="title">Meme creator</h1>
            <MemeCreador
              plantilla={this.state.plantilla}
              onUrl={this.handleUrl}
            ></MemeCreador>
          </div>
        </div>
      </div>
    );
  }
}
class MemeCreador extends React.Component {
  constructor() {
    super();
    this.state = {
      top: "",
      bottom: "",
    };
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div>
        <Meme items={this.state} plantilla={this.props.plantilla}></Meme>
        <MemeForm
          top={this.state.top}
          bottom={this.state.bottom}
          onChange={this.handleChange}
          onUrl={this.props.onUrl}
        ></MemeForm>
      </div>
    );
  }
}
function Meme(props) {
  return (
    <div className="meme-template">
      <img
        src={props.plantilla}
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
        value={props.top}
        onChange={props.onChange}
      />
      <input
        placeholder="Texto inferior"
        name="bottom"
        value={props.bottom}
        onChange={props.onChange}
      />
      <div className="form-UrlAnotherImage">
        <input
          placeholder="Url Imagen"
          name="plantilla"
          onChange={props.onUrl}
        />
        <button type="reset">Limpiar</button>
      </div>
    </form>
  );
}
export default App;
