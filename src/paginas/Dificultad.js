import React from "react";
import { Button } from "../componentes/ButtonRedirect";

export const Dificultad = () => (
  <div className="container bg-main py-5">
    <div className="row justify-content-center">
      <div className="col-4 text-center">
        <Button to="/" texto="Facil" margen="mb-4 mt-5" />
      </div>
    </div>

    <div className="row justify-content-center">
      <div className="col-4 text-center">
        <Button to="/" texto="Medio" margen="mt-4 mb-4" />
      </div>
    </div>

    <div className="row justify-content-center">
      <div className="col-4 text-center">
        <Button to="/" texto="Dificil" margen="mt-4 mb-5" />
      </div>
    </div>
  </div>
);
