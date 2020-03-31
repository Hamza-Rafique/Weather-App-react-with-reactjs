import React, { Component, Suspense, lazy } from "react";
import "./App.css";
import "weather-icons/css/weather-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Weather from "./Components/Weather";
import Form from "./Components/Form";
// import loadable from "@loadable/component";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const weather = lazy(() => import("./Components/Weather"));
const form = lazy(() => import("./Components/Form"));

//api key  bb811dd46f0fb205896b092e5c6e5658

const API_key = "bb811dd46f0fb205896b092e5c6e5658";

// const form = loadable(() => import("./Components/Form"));
// const weather = loadable(() => import("./Components/Weather"));

class App extends Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      days: "",
      error: false
    };

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }
  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        this.setState({ icon: this.weatherIcon.Thunderstorm });
        break;

      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: this.weatherIcon.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 531:
        this.setState({ icon: this.weatherIcon.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: this.weatherIcon.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: this.weatherIcon.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: this.weatherIcon.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: this.weatherIcon.Clouds });
        break;

      default:
        this.setState({ icon: "" });
    }
  }

  //for get data for api asyn
  getWeather = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    if (city && country) {
      // fetch data from api
      const api_call = await fetch(
        //method to call api
        // "http:// api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${API_key}"
        //Other way to call api
        "http:// api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bb811dd46f0fb205896b092e5c6e5658"
      );

      //for convering data into json formatings

      const response = await api_call.json();
      console.log(response);
      this.setState({
        city: `${response.name}, ${response.sys.country}`,
        celsius: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description
      });

      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);
    } else {
      this.setState({ error: true });
    }
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Suspense fallback={<div> loading.... </div>}>
            <Switch>
              <Route path="/">
                <Form loadweather={this.getWeather} error="this.state.error" />
              </Route>
              <Route path="/weather">
                <Weather
                  city={this.state.city}
                  country={this.state.country}
                  temp_celsius={this.state.celsius}
                  temp_max={this.state.temp_max}
                  temp_min={this.state.temp_min}
                  description={this.state.description}
                  weatherIcon={this.state.icon}
                  day={this.state.day}
                />
              </Route>
            </Switch>
          </Suspense>
        </div>
      </Router>
    );
  }
}

export default App;
