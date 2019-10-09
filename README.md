# leaflet-earthquakes - Visualizing Data with Leaflet

## Background

Welcome to the United States Geological Survey, or USGS for short! The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. As a new hire, you will be helping them out with an exciting new project!

The USGS is interested in building a new set of tools that will allow them visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. Their hope is that being able to visualize their data will allow them to better educate the public and other government organizations (and hopefully secure more funding..) on issues facing our planet.

## Your Task

### Earthquake Map

1. **Data Collection**

   ![3-Data](Images/3-Data.png)

   Earthquake data for this map is provided by the USGS GeoJSON feed, located here: [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)

   ![4-JSON](Images/4-JSON.png)

2. **Build the Map**

   Create a map using Leaflet that plots all of the earthquakes from the data set based on their longitude and latitude.

   * Data markers should reflect the magnitude of the earthquake in their size and color. Earthquakes with higher magnitudes should appear larger and darker in color.

   * Include popups that provide additional information about the earthquake when a marker is clicked.

   * Create a legend that will provide context for the map data.

- - -

### Tectonic Plate Map

<img src = "https://github.com/LShafer/leaflet-earthquakes/blob/master/Leaflet-earthquakes.png">

The USGS wants to see a second data set on the map to illustrate the relationship between tectonic plates and seismic activity. Data on tectonic plates can be found here: <https://github.com/fraxen/tectonicplates>.

* Plot a second data set on the map.

* Add a number of base maps to choose from as well as create two overlays (one for earthquakes and one for fault lines) that can be turned on and off independently.

* Add layer controls to the map.

- - -



