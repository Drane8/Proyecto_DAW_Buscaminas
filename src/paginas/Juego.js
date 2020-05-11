import React from "react";
import { Button } from "../componentes/ButtonRedirect";

export const Juego = () => (
  <div className="container bg-main py-5">
    <div className="row">
      <div className="col">Minas: ##</div>
      <div className="col">
        <Button to="/" texto="Menu principal" />
      </div>
    </div>
    <div className="tablero mt-4">
      <table>
        <tr>
          <td> </td>
          <td> </td>
          <td> </td>
        </tr>
        <tr>
          <td> </td>
          <td> </td>
          <td> </td>
        </tr>
        <tr>
          <td> </td>
          <td> </td>
          <td> </td>
        </tr>
      </table>
    </div>
  </div>
);
