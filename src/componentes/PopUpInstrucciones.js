import React from "react";
import Popup from "reactjs-popup";
export default () => (
  <Popup
    trigger={<button className="btn btn-info btn-block btn-lg"> Ayuda </button>}
    modal
  >
    {(close) => (
      <div className="modaljs">
        <div className="header"> Instrucciones Buscaminas </div>
        <div className="content">
          {" "}
          El juego consiste en despejar todas las casillas de una pantalla que
          no oculten una mina. <br />
          <br />
          Algunas casillas tienen un número, el cual indica la cantidad de minas
          que hay en las casillas adyacentes. Así, si una casilla tiene el
          número 3, significa que hay 3 minas adyacentes.
          <br />
          <br />
          Si se descubre una casilla sin número indica que ninguna de las
          casillas vecinas tiene mina y éstas se descubren automáticamente.
          <br />
          <br />
          <b>Click izquierdo:</b> descubre el contenido de una casilla
          <br />
          <b>Click derecho:</b> marca una casilla con una banderita
          <br />
          <br />
          Si se descubre una casilla con una mina se pierde la partida.
          <br />
          <br />
          Para ganar hay que marcar todas las minas con una banderita
        </div>
        <div className="actions">
          <button
            className="btn btn-info"
            onClick={() => {
              close();
            }}
          >
            Cerrar instrucciones
          </button>
        </div>
      </div>
    )}
  </Popup>
);
