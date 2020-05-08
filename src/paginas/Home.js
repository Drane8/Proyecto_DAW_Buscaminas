import React from "react";
import { Button } from "../componentes/ButtonRedirect";

export const Home = () => (
  <div className="container bg-main py-5">
        <Button to="/jugar" texto="Jugar" margen='mb-4 mt-5' />
        <Button to="/dificultad" texto="Elegir dificultad" margen='mt-4 mb-5' />
  </div>
);
