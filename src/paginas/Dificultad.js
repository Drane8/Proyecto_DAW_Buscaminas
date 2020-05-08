import React from "react";
import { Button } from "../componentes/ButtonRedirect";

export const Dificultad = () => (
  <div className="container bg-main py-5">
        <Button to="/" texto="Facil" margen='mb-4 mt-5' />
        <Button to="/" texto="Medio" margen='mt-4 mb-4' />
        <Button to="/" texto="Dificil" margen='mt-4 mb-5' />
  </div>
);
