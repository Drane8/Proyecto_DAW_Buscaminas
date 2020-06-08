import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import { Home } from "./paginas/Home";
import { Dificultad } from "./paginas/Dificultad";
import { Juego } from "./paginas/Juego";
import { NotFound } from "./paginas/NotFound";

import cabecera from "./img/cabecera.jpg";

/**
 * Componente principal de la aplicacion funciona como SPA de la misma
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dificultad: "Facil",
    };
    this.cambiarFacil = this.cambiarFacil.bind(this);
    this.cambiarMedio = this.cambiarMedio.bind(this);
    this.cambiarDificil = this.cambiarDificil.bind(this);
  }

  /**
   * Funcion para cambiar la dificultad a facil
   */
  cambiarFacil() {
    this.setState(() => ({ dificultad: "Facil" }));
  }

  /**
   * Funcion para cambiar la dificultad a medio
   */
  cambiarMedio() {
    this.setState(() => ({ dificultad: "Medio" }));
  }

  /**
   * Funcion para cambiar la dificultad a dificil
   */
  cambiarDificil() {
    this.setState(() => ({ dificultad: "Dificil" }));
  }

  render() {
    return (
      <div className="App container">
        <div className="container">
          <img src={cabecera} alt="Logo" className="img-fluid" />
        </div>
        <div className="container">
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => <Home dificultad={this.state.dificultad} />}
            />
            <Route
              exact
              path="/dificultad"
              render={(props) => (
                <Dificultad
                  cambiarFacil={this.cambiarFacil}
                  cambiarMedio={this.cambiarMedio}
                  cambiarDificil={this.cambiarDificil}
                />
              )}
            />
            <Route exact path="/jugar" render={props=><Juego dificultad={this.state.dificultad} />} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <div className="container">
          <div className="container-fluid bg-footer text-center py-3">
            Desarrollado por Daniel Garcia
            <br />
            <a
              rel="license"
              href="http://creativecommons.org/licenses/by-sa/4.0/"
            >
              <img
                alt="Creative Commons License"
                src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png"
              />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
