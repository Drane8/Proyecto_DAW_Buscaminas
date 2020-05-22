import React, { Component } from "react";
import {Tablero} from '../componentes/Tablero';
import PropTypes from "prop-types";

export class Juego extends Component {

  static propTypes = {
    alto: PropTypes.number,
    ancho: PropTypes.number,
    minas: PropTypes.number,
  }
  
  componentWillMount() {
    if (this.props.dificultad === "Facil") {
      this.setState(() => ({ alto: 8, ancho: 8, minas: 10 }));
    } else if (this.props.dificultad === "Medio") {
      this.setState(() => ({ alto: 16, ancho: 16, minas: 40 }));
    } else {
      this.setState(() => ({ alto: 16, ancho: 16, minas: 99 }));
    }
  }

  render() {
    const { alto, ancho, minas } = this.state;
    return (
          <Tablero alto={alto} ancho={ancho} minas={minas}/>
    );
  }
}
