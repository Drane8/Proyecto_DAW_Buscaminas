import React from "react";
import { Button } from "../componentes/ButtonRedirect";

export const NotFound = () => (
  <div className="jumbotron jumbotron-fluid mb-0 bg-main">
    <div className="container text-center">
      <h1 className="display-3">404!</h1>
      <h2>No existe la página</h2>
      <hr className="my-5" />
      <div className="row justify-content-center">
        <div className="col-4 text-center">
          <Button to="/" texto="Menu principal" />
        </div>
      </div>
    </div>
  </div>
);
