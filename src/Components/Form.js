import React from "react";
import "./Style.css";
const Form = props => {
  return (
    <div className="container">
      <div>{props.error ? error() : null}</div>
      <h1 className="title"> Check Weather</h1>
      <form onSubmit={props.loadweather}>
        <div className="row">
          <div className="col-md-2 offset-md-2 px">
            <input
              type="text"
              className="from-control"
              name="city"
              autoComplete="off"
              placeholder="City...."
            />
          </div>
          <div className="col-md-2 offset-md-2">
            <input
              type="text"
              className="from-control"
              name="country"
              autoComplete="off"
              placeholder="Country...."
            />
          </div>
          <div className="col-md-2 py-2 offset-md-2">
            <button className="btn btn-warning">Get Weather </button>
          </div>
        </div>
      </form>
    </div>
  );
};

function error() {
  return (
    <div className="alert alert-danger mx-5" role="alert">
      Please Enter City and Country
    </div>
  );
}

export default Form;
