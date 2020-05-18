import React, { Component } from "react";
import { Button } from "../componentes/ButtonRedirect";
import PropTypes from "prop-types";

export class Tablero extends Component {
  state = {
    infoTablero: this.crearInfoInicial(this.props.alto,this.props.ancho),
    gameStatus: false,
    minasRestantes: this.props.minas,
  };

  static propTypes = {
    alto: PropTypes.number,
    ancho: PropTypes.number,
    minas: PropTypes.number,
  };


  crearInfoInicial(alto, ancho){
      let array = []
      for (let i = 0; i < alto; i++) {
        array.push([]);
        for (let j = 0; j < ancho; j++) {
          array[i][j] = {
            x: i,
            y: j
          };
        }
      }
      return array;

  }

  creartablero(array) {
    return array.map((datarow) => {
        return datarow.map((dataitem) => {
          return (
            <div key={dataitem.x * datarow.length + dataitem.y} className='celda'>
            </div>);
        })
      });
  }

  render() {
    return (
      <div className="container bg-main py-5">
        <div className="row">
          <div className="col">Minas: {this.state.minasRestantes}</div>
          <div className="col">
            <Button to="/" texto="Menu principal" />
          </div>
        </div>
        <div className={(this.props.ancho === 8 ? 'row mt-4 tablero tablero-facil' : 'row mt-4 tablero ')}>{this.creartablero(this.state.infoTablero)}</div>
      </div>
      
    );
  }
}
