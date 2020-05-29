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
    fin: false,
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
          mostrada: false,
          marcadaBandera: false,
        };
      }
    }
    info = this.repartirMinas(alto, ancho, minas, info);
    info = this.contarMinasCerca(alto, ancho, info);
    return info;
  }

  valorCasilla(casilla) {
    if (casilla.marcadaBandera) {
      return "B";
    } else if (casilla.mostrada) {
      if (casilla.mina) {
        return "M";
      } else if (casilla.minasCerca > 0) {
        return casilla.minasCerca;
      }
    }
    return null;
  }

  mostrarVacias(x, y, info) {
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (i >= 0 && i < this.props.ancho && j >= 0 && j < this.props.alto) {
          let casilla = info[i][j];
          if (!casilla.mostrada && !casilla.marcadaBandera) {
            casilla.mostrada = true;
            if (casilla.minasCerca === null) {
              info = this.mostrarVacias(casilla.x, casilla.y, info);
            }
          }
        }
      }
    }

    return info;
  }

  clickIzquierdo(x, y) {
    let info = this.state.infoTablero;
    let casilla = info[x][y];
    let final = this.state.fin;

    if (!this.state.fin && !casilla.marcadaBandera && !casilla.mostrada) {
      casilla.mostrada = true;
      if (casilla.mina) {
        final = true;
        alert("Has perdido");
      } else if (casilla.minasCerca === null) {
        info = this.mostrarVacias(casilla.x, casilla.y, info);
      }
    }

    this.setState({ infoTablero: info, fin: final });
  }

  clickDerecho(event, x, y) {
    event.preventDefault();
    let info = this.state.infoTablero;
    let casilla = info[x][y];
    let minas = this.state.minasRestantes;

    if (!this.state.fin && !casilla.mostrada) {
      if (!casilla.marcadaBandera && minas > 0) {
        casilla.marcadaBandera = true;
        minas--;
      } else if (casilla.marcadaBandera) {
        casilla.marcadaBandera = false;
        minas++;
      }
    }

    if (minas === 0) {
      //comprobar si se ha ganado
    }

    this.setState({ infoTablero: info, minasRestantes: minas });
  }

  creartablero(array) {
    return array.map((fila) => {
      return fila.map((casilla) => {
        return (
          <div
            key={casilla.x * fila.length + casilla.y}
            className={"celda" + (casilla.mostrada ? " mostrada" : "")}
            onClick={() => {
              this.clickIzquierdo(casilla.x, casilla.y);
            }}
            onContextMenu={(e) => this.clickDerecho(e, casilla.x, casilla.y)}
          >
            {this.valorCasilla(casilla)}
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
          <div className="col text-center mt-auto">
            Minas: {this.state.minasRestantes}
          </div>
          <div className="col-3">
            <PopUpInstrucciones />
          </div>
        </div>
        <div
          className={
            "row mt-4 tablero" +
            (this.props.ancho === 8 ? " tablero-facil" : "")
          }
        >
          {this.creartablero(this.state.infoTablero)}
        </div>
      </div>
    );
  }
}
