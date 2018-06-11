let map;
let markers = [];
// Using simple map styles here
// following functionRandomizes marker colors on every load
const colors = ['red', 'blue', 'green', 'yellow'];
const randomColor = () => {
    return (Math.floor(Math.random() * 4));
};
let color = colors[randomColor()];


const locations = [{
        "title": "Eat Street",
        "location": {
            "lat": 12.9396543,
            "lng": 77.6236466
        },
        "fsID": "5710f4a2498ee2973641612e"
    },

    {
        "title": "FreshMenu",

        "location": {
            "lat": 12.9403969,
            "lng": 77.5987083
        },
        "fsID": "54e45e5b498e602addadad9f"

    },

    {
        "title": "PizzaHut",
        "location": {
            "lat": 12.9418055,
            "lng": 77.62322
        },
        "fsID": "4c2b3853b5fbb713728749df"
    },

    {
        "title": "Bakasur",
        "location": {
            "lat": 12.9380628,
            "lng": 77.6254155
        },
        "fsID": "54e0c35c498eab5eae2c5bfa"

    },

    {
        "title": "Barleyz",
        "location": {
            "lat": 12.9376688,
            "lng": 77.6247543
        },
        "fsID": "50815e43e4b029049209c4e3"


    }

];



//Initializing Google Maps
function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 12.9354504,
            lng: 77.6146828
        },
        zoom: 14
    });
    ko.applyBindings(new viewModel());
}



//Viewmodal
let viewModel = function() {
    let polygon = null;
    let that = this;
    this.ratings = ko.observable('Ratings');
    this.imageSRC = ko.observable('images/placeholder.png');
    this.pricing = ko.observable('Prices');
    this.Timings = ko.observable('Timings');
    this.Title = ko.observable('Food Joint');
    //user input from the search bar
    this.check = ko.observable('');

    let largeInfoWindow = new google.maps.InfoWindow();

    // Initializing drawing manager and setting the values to draw a polygon
    let drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        drawingControlOptions: {
            // Toolbox appears at top right
            position: google.maps.ControlPosition.TOP_RIGHT,
            drawingModes: [
                google.maps.drawing.OverlayType.POLYGON
            ]
        }
    });
    //Constructing markers and pushing em in the markers array
    for (let i = 0; i < locations.length; i++) {
        let position = locations[i].location;
        let title = locations[i].title;
        let placeID = locations[i].fsID;
        let marker = new google.maps.Marker({
            id: placeID,
            position: position,
            title: title,
            visibility: ko.observable(true),
            animation: google.maps.Animation.DROP,
            imageSRC: " ",
            ratings: " ",
            pricing: " ",
            Address: " ",
            Timings: " "
        });
        marker.setMap(map);
        markers.push(marker);
}


        // Randomizing colors for markers
        let color;
        markers.forEach(function(marker){
          color = colors[randomColor()];
        marker.setIcon('http://maps.google.com/mapfiles/ms/icons/' + color + '-dot.png');
        // Adding animations to the markers once they're clicked, ends after 2 bounces
        marker.addListener('click', function() {
            let that = this;
            this.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() {
                that.setAnimation(null);
            }, 1000);
        });
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfoWindow);
        });
      });




    // Fetching data from Foursquare API and rendering it on my page     -       -             -
    markers.forEach(function(marker) {
      fetch(`https://api.foursquare.com/v2/venues/${marker.id}?client_id=VESIFAEWGSC0HOYU3JW5ZOJSDKAEKXWIQD5IZRA0SMOBRZ0O&client_secret=DWKAKONYXSHVSQ1YDPY52XISBWBX03LN0JSCVPTFQBS1X55X)
      .then(res => res.json())
      .then((response) => {
        console.log(response)
        // to escape reference errors as the API result is inconsistent
        try{marker.ratings = response.response.venue.rating;}
        catch(e){marker.ratings = "Unrated"}
        try{marker.imageSRC = response.response.venue.bestPhoto.prefix + "800x600" + response.response.venue.bestPhoto.suffix;}
        catch(e){marker.imageSRC = "./images/placeholder.png"}
      })
      .catch((e) => {
        alert("Error Occured!")
      })
    });
    //   -          -           -
    //Function to display all markers
    this.setShowFlag = function(x) {
      markers.forEach(function(marker){
        marker.visibility(x);
            marker.setVisible(x);
      });

    };
    this.selectParticularMarker = function(marker) {
        populateInfoWindow(marker, largeInfoWindow);
        marker.selected = true;
        marker.visibility(true);
        marker.setVisible(true);
        marker.setMap(map);
        that.ratings(marker.ratings);
        that.imageSRC(marker.imageSRC);
        that.pricing(marker.pricing);
        that.Timings(marker.Timings);
        that.Title(marker.title);
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            marker.setAnimation(null);
        }, 1450);


    };

    //Part of filterLIst
    let res;
    let checkEXP;
    // Filters the list of locations and add/hide markers respectively
    this.filterList = function(Infowindow) {
        if (that.check().length === 0) {
            that.setShowFlag(true);
        } else {
            checkEXP = new RegExp(that.check(), 'ig'); // using string.match to check if user input matches with available options
            for (let i = 0; i < markers.length; i++) {
                res = markers[i].title.match(checkEXP);
                if (res !== null) {
                    markers[i].visibility(true);
                    markers[i].setVisible(true);
                } else {
                    markers[i].visibility(false);
                    markers[i].setVisible(false);
                }
            }
        }
    };
    // Triggered once the user types something in the search bar (or doesn't)
    // Focuses the map on the location user entered and returns exact location in text in jumbotron div(index.html)

    // refers to jumbotron below search area
    this.addressDetailed = ko.observable('See full address of your search here.');

    // "check" here refers to user input (app.js:71)
    this.findArea = function() {
        console.log("Search triggered");
        //Using geocoder API
        let geocoder = new google.maps.Geocoder();
        if (that.check().length === 0) {
            window.alert("Enter an area or an address");
        } else {
            geocoder.geocode({
                address: that.check()
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    console.log(results);
                    map.setCenter(results[0].geometry.location);
                    map.setZoom(15);
                    //
                    that.addressDetailed(results[0].formatted_address);
                } else {
                    window.alert("We couldn't find the location. Please make sure you enter a valid address");
                }
            });
        }
    };
    // Adding info to infoWindow
    function populateInfoWindow(marker, infowindow) {
        //Reduced unnecessary digits from latitude and longitude no one cares about
        let lan = marker.position.lat(),
            lng = marker.position.lng();

        infowindow.marker = marker;
        infowindow.setContent('<h1>' + marker.title + '</h1>' + '<p>Lat:' + lan + '</p><p>Lng:' + lng + '</p><p> Ratings :' +marker.ratings+ '</p>' ); // I could add image by adding +'<img src=" ' +marker.imageInfoWindow+' " >' but can i please not?
        infowindow.open(map, marker);

    }
    this.toggleDrawing = function() {
        if (drawingManager.map) {
            drawingManager.setMap(null);
            // Removes the drawn polygon once user closes the drawing tools
            if (polygon) {
                polygon.setMap(null);
            }
        } else {
            drawingManager.setMap(map);
        }
    };

    // Shows markers inside the polygon and hides the markers that are outside the drawn polygon
    let searchInsidePolygon = function() {
        for (let i = 0; i < markers.length; i++) {
            if (google.maps.geometry.poly.containsLocation(markers[i].position, polygon)) {
                markers[i].setMap(map);
            } else {
                markers[i].setMap(null);
            }
        }
    };
    //Manages what happens once a polygon is drawn
    drawingManager.addListener('overlaycomplete', function(event) {
        if (polygon) {
            polygon.setMap(null);
            hideListings();
        }
        //Switches off drawing mode once a drawing is done
        drawingManager.setDrawingMode(null);
        polygon = event.overlay;

        polygon.setEditable(true);
        polygon.setDraggable(true);

        polygon.type = event.type;
        // Shows markers(if any) inside the shape user makes and drags around or alters
        //  Took some help from Stack Overflow! :P
        google.maps.event.addListener(polygon, 'click', function() {
            google.maps.event.addListener(polygon.getPath(), 'set_at', function() {
                searchInsidePolygon();
            });

            google.maps.event.addListener(polygon.getPath(), 'insert_at', function() {
                searchInsidePolygon();
            });

        });


    });
    // Toggles the markers on : adds the markers
    this.showListings = function() {
        let bounds = new google.maps.LatLngBounds();
        for (let i = 0; i < markers.length; i++) {
            markers[i].animation = google.maps.Animation.DROP;
            markers[i].setMap(map);
            bounds.extend(markers[i].position);

        }
        map.fitBounds(bounds);
    };

    // Toggles the markers off : removes the markers
    this.hideListings = function() {

        let bounds = new google.maps.LatLngBounds();
        for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(null);

        }
    };

};
