import React, { Component } from "react";
import { Button } from "../componentes/ButtonRedirect";
import PropTypes from "prop-types";
import PopUpInstrucciones from "./PopUpInstrucciones";

import bandera from "../img/bandera.png";
import mina from "../img/bomba.png";

/**
 * Este componente trata de emular un tablero de 
 * un buscaminas, manejando todos los eventos del mismo
 */
export class Tablero extends Component {
  state = {
    infoTablero: this.crearInfoInicial(
      this.props.alto,
      this.props.ancho,
      this.props.minas
    ),
    fin: false,
    minasRestantes: this.props.minas,
    resultado: "",
    contadorOn: false,
    segundos: 0,
  };

  static propTypes = {
    alto: PropTypes.number,
    ancho: PropTypes.number,
    minas: PropTypes.number,
    dificultad: PropTypes.string,
  };

  /**
   * Funcion que inicia el contador de segundos
   */
  empezarContador() {
    this.setState({
      contadorOn: true,
    });
    this.contador = setInterval(() => {
      this.setState({
        segundos: this.state.segundos + 1,
      });
    }, 1000);
  }

  /**
   * Funcion que para el contador de segundos
   */
  pararContador() {
    this.setState({ contadorOn: false });
    clearInterval(this.contador);
  }

  /**
   * Esta funcion devuelve un string con las posiciones de las minas
   * 
   * @param {array} info array con informacion del tablero
   */
  posMinas(info) {
    let minas = "";

    for (let i = 0; i < this.props.alto; i++) {
      for (let j = 0; j < this.props.ancho; j++) {
        if (info[i][j].mina) {
          minas += "c:" + info[i][j].x + info[i][j].y + ".";
        }
      }
    }
    return minas;
  }

  /**
   * Esta funcion devuelve un string con las posiciones de las banderas
   * 
   * @param {array} info array con informacion del tablero
   */
  posBanderas(info) {
    let banderas = "";

    for (let i = 0; i < this.props.alto; i++) {
      for (let j = 0; j < this.props.ancho; j++) {
        if (info[i][j].marcadaBandera) {
          banderas += "c:" + info[i][j].x + info[i][j].y + ".";
        }
      }
    }
    return banderas;
  }

  /**
   * Esta funcion devuelve la cantidad de casillas que quedan ocultas
   * 
   * @param {array} info array con informacion del tablero
   */
  ocultasRestantes(info) {
    let ocultas = 0;

    for (let i = 0; i < this.props.alto; i++) {
      for (let j = 0; j < this.props.ancho; j++) {
        if (!info[i][j].mostrada) {
          ocultas++;
        }
      }
    }
    return ocultas;
  }

  /**
   * Esta funcion devuelve un array con la informacion del tablero
   * pero con todas las casillas mostradas
   * 
   * @param {array} info array con informacion del tablero
   */
  mostrarTablero(info) {
    for (let i = 0; i < this.props.alto; i++) {
      for (let j = 0; j < this.props.ancho; j++) {
        info[i][j].mostrada = true;
      }
    }
    return info;
  }

  /**
   * Esta funcion se encarga de repartir las minas por el tablero
   * 
   * @param {int} alto alto del tablero
   * @param {int} ancho ancho del tablero
   * @param {int} minas numero de minas
   * @param {array} info array con la informacion del tablero
   */
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

  /**
   * Esta funcion se encarga de contar las minas que se encuentran
   * alrededor de cada casilla para así actualizar el array con informacion
   * del tablero y devolverlo
   * 
   * @param {int} alto alto del tablero
   * @param {int} ancho ancho del tablero
   * @param {array} info array con informacion del tablero
   */
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

  /**
   * Esta funcion crea y devuelve un array con informacion 
   * de cada casilla del tablero
   * 
   * @param {int} alto altura del tablero
   * @param {int} ancho anchura del tablero
   * @param {int} minas numero de minas
   */
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

  /**
   * Esta funcion devuelve el valor a mostrar dependiendo del tipo
   * de casilla que reciba
   * 
   * @param {array} casilla array con informacion de la casilla
   */
  valorCasilla(casilla) {
    if (casilla.marcadaBandera) {
      return <img src={bandera} alt="Bandera"></img>;
    } else if (casilla.mostrada) {
      if (casilla.mina) {
        return <img src={mina} alt="Mina"></img>;
      } else if (casilla.minasCerca > 0) {
        return <b>{casilla.minasCerca}</b>;
      }
    }
    return null;
  }

  /**
   * Esta funcion se encarga de mostrar las casillas adyacentes
   * a la casilla con las posiciones recibidas. Si alguna de estas
   * es una casilla vacia llama de manera recursiva a esta funcion
   * 
   * @param {int} x posicion x de la casilla
   * @param {int} y posicion y de la casilla
   * @param {array} info array con informacion del tablero
   */
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

  /**
   * Esta funcion se encarga de manejar el funcionamiento del click
   * izquierdo sobre una casilla
   * 
   * @param {int} x posicion x de la casilla
   * @param {int} y posicion y de la casilla
   */
  clickIzquierdo(x, y) {
    let info = this.state.infoTablero;
    let casilla = info[x][y];
    let final = this.state.fin;
    let resul = this.state.resultado;

    if (!this.state.contadorOn && !final) {
      this.empezarContador();
    }

    if (!final && !casilla.marcadaBandera && !casilla.mostrada) {
      casilla.mostrada = true;
      if (casilla.mina) {
        final = true;
        resul = "Has perdido";
        info = this.mostrarTablero(info);
        this.pararContador();
      } else if (casilla.minasCerca === null) {
        info = this.mostrarVacias(casilla.x, casilla.y, info);
      }
    }

    if (this.ocultasRestantes(info) === this.props.minas) {
      info = this.mostrarTablero(info);
      final = true;
      resul = "Has Ganado";
      this.pararContador();
    }

    this.setState({ infoTablero: info, fin: final, resultado: resul });
  }

   /**
   * Esta funcion se encarga de manejar el funcionamiento del click
   * derecho sobre una casilla
   * 
   * @param {int} x posicion x de la casilla
   * @param {int} y posicion y de la casilla
   */
  clickDerecho(event, x, y) {
    event.preventDefault();
    let info = this.state.infoTablero;
    let casilla = info[x][y];
    let minas = this.state.minasRestantes;
    let final = this.state.fin;
    let resul = this.state.resultado;

    if (!this.state.contadorOn  && !final) {
      this.empezarContador();
    }

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
      if (this.posMinas(info) === this.posBanderas(info)) {
        info = this.mostrarTablero(info);
        final = true;
        resul = "Has Ganado";
        this.pararContador();
      }
    }

    this.setState({
      infoTablero: info,
      minasRestantes: minas,
      fin: final,
      resultado: resul,
    });
  }

  /**
   * Esta funcion recibe un array con informacion del tablero 
   * a traves del cual genera cada casilla del tablero
   * 
   * @param {array} array array con informacion de tablero
   */
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

  /**
   * Funcion que reinicia los estados del componente
   * para volver a empezar una partida
   * 
   */
  volverJugar() {
    this.setState({
      infoTablero: this.crearInfoInicial(
        this.props.alto,
        this.props.ancho,
        this.props.minas
      ),
      fin: false,
      minasRestantes: this.props.minas,
      resultado: "",
      segundos: 0,
    });
  }

  render() {
    return (
      <div className="container bg-main py-5">
        <div className="row">
          <div className="col-3">
            <Button to="/" texto="Menu" />
          </div>
          <div className="col text-center mt-auto row">
          <div className="col"></div>
            <div className="col-4"><b>Dificultad:</b> {this.props.dificultad}</div>
            <div className="col-1">{this.state.segundos}</div>
            <div className="col-4"><b>Minas:</b> {this.state.minasRestantes}</div>
          <div className="col"></div>
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
        <div className={"resultado " + (this.state.fin ? "" : "oculto")}>
          {this.state.resultado}
          
          {this.state.resultado === "Has Ganado" ? "\nTiempo: " + this.state.segundos : ""}
          <br />
          <button
            className="btn btn-info my-1 btn-sm"
            onClick={() => this.volverJugar()}
          >
            Volver a jugar
          </button>
        </div>
      </div>
    );
  }
}
