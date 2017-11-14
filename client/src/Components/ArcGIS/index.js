import React, { Component } from 'react';
import esriLoader from 'esri-loader';
import './style.css';

class ArcGIS extends Component {

  constructor() {
    super();
    this.view = {};
    this.libs = {};
    this.mapConfig = {
      url: 'https://js.arcgis.com/4.4/'
    };
  }

  goTo(center) {

    const target = {
      center: center,
      zoom: 15
    };

    const options = {
      duration: 1500
    }

    this.view.goTo(target, options);
  }

  componentDidMount() {
    this.loadMap();
  }

  loadLibs() {

    const libs = [
      "esri/Map",
      "esri/views/MapView",
      "esri/geometry/Point",
      "esri/Graphic",
      "esri/symbols/SimpleMarkerSymbol",
      "esri/symbols/TextSymbol",
      "dojo/domReady!"
    ];

    esriLoader.dojoRequire(libs, this.setupMap);
  }

  loadMap() {

    esriLoader.bootstrap((err) => {

      if (err) {

        console.error(err);
        return;
      }

      this.loadLibs();

    }, this.mapConfig);

  }

  setupMap = (Map, MapView, Point, Graphic, SimpleMarkerSymbol, TextSymbol) => {

    const map = new Map({ basemap: "dark-gray" });

    this.libs = {
      Map,
      MapView,
      Point,
      Graphic,
      SimpleMarkerSymbol,
      TextSymbol
    };

    this.view = new MapView({
      container: "viewDiv",
      map: map,
      zoom: 4,
      center: [20, 20]
    });

    this.displayUserPoint();

    this.displayPoints();
  }

  displayUserPoint() {

    const template = {
      title: '<div class="arcGis-popup">Your location</div>',
      content: `<div class="arcGis-popup">
        <span><b>Lat:</b> {y}</span>
        <span><b>Lon:</b> {x}</span>
      </div>`
    };

    this.getUserPosition().then((position) => {

      const data = {
        x: position.coords.longitude,
        y: position.coords.latitude,
      }

      const point = this.pointGraphic(data, template);
      point.symbol.color =  [0, 255, 161, 0.55];

      this.view.graphics.add(point);

    }).catch(err => console.error);

  }

  displayPoints() {

    const template = {
      title: '<div class="arcGis-popup">Blood Group {bloodGroup}</div>',
      content: `<div class="arcGis-popup">
        <span><b>{firstName} {lastName}</b></span>
        <span><b>Tel:</b> {contactNumber}</span>
        <span><b>Email:</b> {emailAddress}</span>
        <span><b>Lat:</b> {y}</span>
        <span><b>Lon:</b> {x}</span>
      </div>`
    };

    Object.keys(this.props.contacts).forEach(k => {

      // const point = this.pointGraphic(
      //   [245, 50, 40, 0.60],
      //   this.props.contacts[k],
      //   template
      // );

      const text = this.textGraphic(
        this.props.contacts[k],
        template
      );

      //this.view.graphics.add(point);
      this.view.graphics.add(text);
    });

  }

  getUserPosition() {

    return new Promise((res, rej) => {

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(res, rej);
      } else {
        rej("Browser does not support GEO location");
      }

    });

  }

  pointGraphic(data, template) {

    const point = new this.libs.Point([data.x, data.y]);

    const markerSymbol = new this.libs.SimpleMarkerSymbol({
      outline: { color: [255, 255, 255, 0.5], width: 1 }
    });

    const pointGraphic = new this.libs.Graphic({
      geometry: point,
      symbol: markerSymbol,
      attributes: data,
      popupTemplate: template
    });

    return pointGraphic;
  }

  textGraphic(data, template) {

    const point = new this.libs.Point([data.x, data.y]);

    const color = data.bloodGroup.includes("-") 
      ? [0, 93, 189, 0.8]
      : [245, 0, 0, 0.8];

    const textSymbol = new this.libs.TextSymbol({
      color: color,
      haloColor: "#fff",
      haloSize: "10px",
      text: data.bloodGroup,
      xoffset: 4,
      yoffset: 4,
      font: {  // autocast as esri/symbols/Font
        size: 24,
        family: "sans-serif",
        weight: "bolder"
      }
    });

    const pointGraphic = new this.libs.Graphic({
      geometry: point,
      symbol: textSymbol,
      attributes: data,
      popupTemplate: template
    });

    return pointGraphic;
  }

  render() {
    return (
      <div className="ArcGIS">
        <div id="viewDiv"></div>
      </div>
    );
  }
}

export default ArcGIS;
