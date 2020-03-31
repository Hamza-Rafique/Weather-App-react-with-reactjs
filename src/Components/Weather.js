import React from "react";

const Weather = props => {
  return (
    <React.Fragment>
      <div className="container text-light">
        <div className="cards pt-4">
          <h1>{props.city}</h1>
          <h5 className="py-4">
            <i className={`wi ${props.weatherIcon} display-1`} />
          </h5>
          {/* <h1 className="py-2"> {props.temp_celsius}&deg;</h1> */}
          {props.temp_celsius ? (
            <h1 className="py-2"> {props.temp_celsius}&deg;</h1>
          ) : null}
          {/* show maxand min */}
          {minmaxTemp(props.temp_min, props.temp_max, 19)}
          <h4 py="3">{props.description}</h4>
        </div>
      </div>
    </React.Fragment>
  );
};

function minmaxTemp(min, max) {
  if (min && max) {
    return (
      <h3>
        <span classNam="py-4">{min}&deg;</span>
        {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
        <span className="py-4">{max}&deg;</span>
      </h3>
    );
  }

  // <h3>
  //   <span py-4="true">{min}&deg;</span>
  //   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  //   <span py-4="true">{mix}&deg;</span>
  // </h3>
}

export default Weather;
