import React, { Component } from "react";
import { Button } from "../componentes/ButtonRedirect";
import PropTypes from "prop-types";

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
    for (let i = 0; i < alto; i++) {
      for (let j = 0; j < ancho; j++) {
        if (!info[i][j].mina) {
          info[i][j].minasCerca = this.comprobarAlrededor(i, j, info, alto, ancho);
        }
      }
    }

    return info;
  }

  comprobarAlrededor(x, y, info, alto, ancho) {
    let minas = null;

    //arriba izquierda
    if (x > 0 && y > 0) {
      if (info[x - 1][y - 1].mina) minas++;
    }

    //arriba
    if (x > 0) {
      if (info[x - 1][y].mina) minas++;
    }

    //arriba derecha
    if (x > 0 && y < ancho - 1) {
      if (info[x - 1][y + 1].mina) minas++;
    }

    //derecha
    if (y < ancho - 1) {
      if (info[x][y + 1].mina) minas++;
    }

    //abajo derecha
    if (x < alto - 1 && y < ancho - 1) {
      if (info[x + 1][y + 1].mina) minas++;
    }

    //abajo
    if (x < alto - 1) {
      if (info[x + 1][y].mina) minas++;
    }

    //abajo izquierda
    if (x < alto - 1 && y > 0) {
      if (info[x + 1][y - 1].mina) minas++;
    }

    //izquierda
    if (y > 0) {
      if (info[x][y - 1].mina) minas++;
    }

    return minas;
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
          minasCerca: null
        };
      }
    }
    info = this.repartirMinas(alto, ancho, minas, info);
    info = this.contarMinasCerca(alto,ancho,info);
    return info;
  }

  creartablero(array) {
    return array.map((datarow) => {
      return datarow.map((dataitem) => {
        return (
          <div key={dataitem.x * datarow.length + dataitem.y} className="celda">
            {dataitem.mina ? "M" : dataitem.minasCerca}
          </div>
        );
      });
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
