import React,{Component} from "react";
import { Button } from "../componentes/ButtonRedirect";

export class Home extends Component{
  render(){
    return (
  <div className="container bg-main py-5">
    <div className="row justify-content-center">
      <div className="col-4 text-center">
        <Button to="/jugar" texto="Jugar" margen="mb-4 mt-5" />
      </div>
    </div>
    <div className="row justify-content-center">
      <div className="col-4 text-center">
        <Button to="/dificultad" texto={`Elegir dificultad: ${this.props.dificultad}`} margen="mt-4 mb-5" />
      </div>
    </div>
  </div>
);
    }}