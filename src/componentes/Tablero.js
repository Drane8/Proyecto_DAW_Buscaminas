import React, { Component } from "react";
import { Button } from "../componentes/ButtonRedirect";
import PropTypes from "prop-types";
import PopUpInstrucciones from "./PopUpInstrucciones";

export class Tablero extends Component {
  state = {
    infoTablero: this.crearInfoInicial(
      this.props.alto,
      this.props.ancho,
      this.props.minas
    ),
    gameStatus: false,
    minasRestantes: this.props.minas,
  };

  static propTypes = {
    alto: PropTypes.number,
    ancho: PropTypes.number,
    minas: PropTypes.number,
  };

  repartirMinas(alto, ancho, minas, info) {
    let posX = 0;
    let posY = 0;
    let minasColocadas = 0;

    while (minasColocadas < minas) {
      posX = Math.floor(Math.random() * alto);
      posY = Math.floor(Math.random() * ancho);
      if (!info[posX][posY].mina) {
        info[posX][posY].mina = true;
        minasColocadas++;
      }
    }
    return info;
  }

  contarMinasCerca(alto, ancho, info) {
    //recorro el tablero y compruebo las casillas que no son minas
    for (let i = 0; i < alto; i++) {
      for (let j = 0; j < ancho; j++) {
        if (!info[i][j].mina) {
          let posX = info[i][j].x;
          let posY = info[i][j].y;

          //compruebo las casillas de alrededor de la casilla actual
          //en caso de que sea mina sumo 1 a sus minasCerca
          for (let x = posX - 1; x <= posX + 1; x++) {
            for (let y = posY - 1; y <= posY + 1; y++) {
              if (x >= 0 && x < ancho && y >= 0 && y < alto) {
                if (info[x][y].mina) info[i][j].minasCerca++;
              }
            }
          }
        }
      }
    }

    return info;
  }

  crearInfoInicial(alto, ancho, minas) {
    let info = [];
    for (let i = 0; i < alto; i++) {
      info.push([]);
      for (let j = 0; j < ancho; j++) {
        info[i][j] = {
          x: i,
          y: j,
          mina: false,
          minasCerca: null,
        };
      }
    }
    info = this.repartirMinas(alto, ancho, minas, info);
    info = this.contarMinasCerca(alto, ancho, info);
    return info;
  }

  creartablero(array) {
    return array.map((fila) => {
      return fila.map((casilla) => {
        return (
          <div key={casilla.x * fila.length + casilla.y} className="celda">
            {casilla.mina ? "M" : casilla.minasCerca}
          </div>
        );
      });
    });
  }

  render() {
    return (
      <div className="container bg-main py-5">
        <div className="row">
          <div className="col-3">
            <Button to="/" texto="Menu" />
          </div>
          <div className="col text-center mt-auto">Minas: {this.state.minasRestantes}</div>
          <div className="col-3">
            <PopUpInstrucciones/>
          </div>
        </div>
        <div
          className={
            this.props.ancho === 8
              ? "row mt-4 tablero tablero-facil"
              : "row mt-4 tablero "
          }
        >
          {this.creartablero(this.state.infoTablero)}
        </div>
      </div>
    );
  }
}
