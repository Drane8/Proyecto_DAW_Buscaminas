import React, { Component } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

export class Button extends Component {
  static propTypes = {
    to: PropTypes.string,
    texto: PropTypes.string,
    margen: PropTypes.string
  };

  render() {
    const { to, texto, margen, onclick } = this.props;
    return (
          <Link className={`btn btn-info btn-block btn-lg ${margen}`} to={to} role="button" onClick={onclick}>
            {texto}
          </Link>
    );
  }
}
