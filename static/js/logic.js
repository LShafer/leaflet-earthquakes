// Store our API endpoint inside queryUrl
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
  console.log(data);
});

function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" + "<p> Magnitude: " +  feature.properties.mag + "</p>")
  } 

  function markerSize(mag) {
    return mag * 15000;
  }
  
  function markerColor(mag) {
    if (mag <= 1) {
        return "#008000";
    } else if (mag <= 2) {
        return "#9ACD32";
    } else if (mag <= 3) {
        return "#FFFF00";
    } else if (mag <= 4) {
        return "#FFD700";
    } else if (mag <= 5) {
        return "#FF8C00";
    } else {
        return "#FF0000";
    };
  }
  
  let earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function (feature, latlng) {
      return L.circle(latlng, {
        radius: markerSize(feature.properties.mag),
        fillColor: markerColor(feature.properties.mag),
        fillOpacity: 1,
        stroke: false,
      });
    }, onEachFeature: onEachFeature
  });  
  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  // let earthquakes = L.geoJSON(earthquakeData, {
  //   onEachFeature: onEachFeature
  // });

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

// Define function to create the maps
function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  let streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  let darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  let lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  var faultLine = new L.LayerGroup();

  // Define a baseMaps object to hold our base layers
  let baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap,
    "Light Map": lightmap
  };

  // Create overlay object to hold our overlay layer
  let overlayMaps = {
    Earthquakes: earthquakes,
    Faultlines: faultLine
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  let myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [darkmap, earthquakes, faultLine]
  });

// function createFeatures(earthquakeData) {

//   // Define a function we want to run once for each feature in the features array
//   // Give each feature a popup describing the place and time of the earthquake
//   function onEachFeature(feature, layer) {
//     layer.bindPopup("<h3>" + feature.properties.place +
//       "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" + "<p> Magnitude: " +  feature.properties.mag + "</p>")
//   } 
  
//   let earthquakes = L.geoJSON(earthquakeData, {
//     pointToLayer: function (feature, latlng) {
//       return L.circleMarker(latlng, {
//         radius: markerSize(feature.properties.mag),
//         fillColor: markerColor(feature.properties.mag),
//         fillOpacity: 1,
//         stroke: false,
//       });
//     }, onEachFeature: onEachFeature
//   });  
//   // Create a GeoJSON layer containing the features array on the earthquakeData object
//   // Run the onEachFeature function once for each piece of data in the array
//   // let earthquakes = L.geoJSON(earthquakeData, {
//   //   onEachFeature: onEachFeature
//   // });

//   // Sending our earthquakes layer to the createMap function
//   createMap(earthquakes);
// }

// function createMap(earthquakes) {

//   // Define streetmap and darkmap layers
//   let streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "mapbox.streets",
//     accessToken: API_KEY
//   });

//   let darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "mapbox.dark",
//     accessToken: API_KEY
//   });

//   let lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "mapbox.light",
//     accessToken: API_KEY
//   });

//   // Define a baseMaps object to hold our base layers
//   let baseMaps = {
//     "Street Map": streetmap,
//     "Dark Map": darkmap,
//     "Light Map": lightmap
//   };

//   // Create overlay object to hold our overlay layer
//   let overlayMaps = {
//     Earthquakes: earthquakes
//   };

//   // Create our map, giving it the streetmap and earthquakes layers to display on load
//   let myMap = L.map("map", {
//     center: [
//       37.09, -95.71
//     ],
//     zoom: 5,
//     layers: [streetmap, earthquakes]
//   });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  // function markerColor(mag) {
  //   if (mag <= 1) {
  //       return "#008000";
  //   } else if (mag <= 2) {
  //       return "#9ACD32";
  //   } else if (mag <= 3) {
  //       return "#FFFF00";
  //   } else if (mag <= 4) {
  //       return "#FFD700";
  //   } else if (mag <= 5) {
  //       return "#FF0000";
  //   } else {
  //       return "#8B0000";
  //   };
  // }

  let faultlinequery = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";
  
  // Create the faultlines and add them to the faultline layer
  d3.json(faultlinequery, function(data) {
    L.geoJSON(data, {
      style: function() {
        return {color: "blue", fillOpacity: 0}
      }
    }).addTo(faultLine)
  })

  function magColor(d) {
    return d > 5 ? '#FF0000' :
           d > 4 ? '#FF8C00' :
           d > 3 ? '#FFD700' :
           d > 2 ? '#FFFF00' :
           d > 1 ? '#9ACD32' :
                   '#008000';
  }

  let legend = L.control({
    position: 'bottomright'
  });

  legend.onAdd = function(map) {
    let div = L.DomUtil.create('div', 'info legend'),
          magnitude = [0, 1, 2, 3, 4, 5],
          labels = [],
          from, to;

      for (let i = 0; i < magnitude.length; i++) {
        from = magnitude[i];
        to = magnitude[i+1];
        labels.push(
          '<i style="background:' + magColor(from + 1) + '">[color]</i> ' +
          from + (to ? '&ndash;' + to : '+'));
          // '<i style="background:' + magColor(magnitude[i] + 1) + '"></i> ' + 
          // magnitude[i] + (magnitude[i + 1] ? ' - ' + magnitude[i + 1] + '<br>' : ' + '));
      }
  
      div.innerHTML = labels.join('<br>');
      return div;
  };
  
  legend.addTo(myMap);
}

// for (let i = 0; i < data.length; i++) {

//     // Conditionals for countries points
//     var color = "";
//     if (data[i].properties.mag < 1) {
//       color = "green";
//     }
//     else if (data[i].properties.mag < 3) {
//       color = "blue";
//     }
//     else if (data[i].properties.mag < 5) {
//       color = "green";
//     }
//     else {
//       color = "red";
//     }
  
//     // Add circles to map
//     L.circle(data[i].properties.mag, {
//       fillOpacity: 0.75,
//       color: "white",
//       fillColor: color,
//       // Adjust radius
//       radius: data[i].properties.mag * 1500
//     }).bindPopup("<h1>" + data[i].title + "</h1>").addTo(myMap);
//   }
  