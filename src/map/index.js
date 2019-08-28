import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import { withStyles } from "@material-ui/core";
import { drawRoute } from "./drawRoute";
import { getRoute } from "../api";
import SearchBox from "./SearchBox";

const styles = theme => ({
  paper: {
    position: "absolute",
    top: 0,
    left: 20,
    maxWidth: "30%",
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
  }
});

class Map extends Component {
  map = null;
  mapContainer = React.createRef();

  componentDidMount() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibmF0YWxpYTE5ODciLCJhIjoiY2p6dmQ5a3FvMDdhMDNvbXd0eTJoMTAxeSJ9.12y-2BDAZFD0evPG06ko5Q";
    this.map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [30.2656504, 59.8029126], // LED
      zoom: 15
    });
  }

  order = (address1, address2) => {
    drawRoute(this.map, getRoute(address1, address2));
  };

  reset = () => {
    this.map.removeLayer("route");
    this.map.removeSource("route");
  };

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    const style = {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: "100%",
      height: window.innerHeight - 64
    };

    return (
      <>
        <div style={{ position: "relative", zIndex: -10 }}>
          <div style={style} ref={this.mapContainer} />
          <SearchBox order={this.order} reset={this.reset} />
        </div>
      </>
    );
  }
}

export default withStyles(styles)(Map);
