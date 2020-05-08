import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import { Home } from "./paginas/Home";
import { Dificultad } from "./paginas/Dificultad";
import { Juego } from "./paginas/Juego";
import { NotFound } from "./paginas/NotFound";

import cabecera from "./img/cabecera.jpg";

class App extends Component {
  render() {
    return (
      <div className="App container">
        <div className="container">
          <img src={cabecera} alt="Logo" className="img-fluid" />
        </div>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dificultad" component={Dificultad} />
            <Route exact path="/jugar" component={Juego} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <div className="container">
          <div className="container-fluid bg-footer text-center py-3">Desarrollado por Daniel Garcia</div>
        </div>
      </div>
    );
  }
}

export default App;
