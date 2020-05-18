import React,{Component} from "react";
import { Button } from "../componentes/ButtonRedirect";

export class Dificultad extends Component {
  render() {
    return (
      <div className="container bg-main py-5">
        <div className="row justify-content-center">
          <div className="col-4 text-center">
            <Button to="/" texto="Facil" margen="mb-4 mt-5" onclick={this.props.cambiarFacil}/>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-4 text-center">
            <Button to="/" texto="Medio" margen="mt-4 mb-4" onclick={this.props.cambiarMedio}/>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-4 text-center">
            <Button to="/" texto="Dificil" margen="mt-4 mb-5" onclick={this.props.cambiarDificil}/>
          </div>
        </div>
      </div>
    );
  }
}
