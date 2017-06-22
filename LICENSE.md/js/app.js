(function(window, google) {
    var mapset = {
            center: {
                lat: 29.776315,
                lng: -95.383442
            },
            zoom: 15
        },
        map = new google.maps.Map(document.getElementById('googlemap'), mapset);
    var places = [{
            name: "Chick-fil",
            hours: "8:00 am to 10:00 pm",
            "address": "Chick-fil-A 2222 Shearn St Houston TX 77007",
            url: "http://www.Chick-fil.com",
            "lat": 29.774813,
            "lng": -95.381082,
            instagramTag: "Chickfil"
        },
        {
            name: "Chili's Grill & Bar",
            hours: "11:00 am to 11pm",
            "address": "2425 Katy FwyHoustonTX 77007",
            url: "http://www.chilis.com/",
            "lat": 29.776315,
            "lng": -95.383442,
            instagramTag: "chilis"
        },
        {
            name: "Buffalo Wild Wings",
            hours: "Open Year Round",
            "address": "Holyrood Park",
            url: "http://www.buffalowildwings.com",
            "lat": 29.769509,
            "lng": -95.400306,
            instagramTag: "Buffalo"
        },
        {
            name: "Cadillac Bar",
            hours: "10am - 5pm",
            "address": "Chambers Street",
            url: "http://www.cadillacbar.com",
            "lat": 29.776489,
            "lng": -95.408942,
            instagramTag: "CadillacBar"
        },
        {
            name: "Cyclone Anaya's Mexican Kitchen",
            hours: "7am - 7:15pm",
            "address": "1710 Durham Dr, Houston, TX 77007",
            url: "http://www.cycloneanaya.com",
            "lat": 29.775751,
            "lng": -95.410419,
            instagramTag: "CycloneAnaya"
        },
        {
            name: "Lupe Tortilla",
            hours: "Check site for tour times",
            "address": "1511 Shepherd Dr, Houston, TX 77007",
            url: "http://www.lupetortilla.com/",
            "lat": 29.774598,
            "lng": -95.409831,
            instagramTag: "LupeTortilla"
        }

    ];
    var infowindow = new google.maps.InfoWindow();
    var place, markers;
    for (var i = 0; i < places.length; i++) {
        place = places[i];
        markers = new google.maps.Marker({
            position: {
                lat: place.lat,
                lng: place.lng
            },
            map: map,
            title: place.address,
        });
        /* var contentString = '<div id="content">' +
               '<h3>' + place[i].name() + '</h3>' +
               '<p>Address: ' + place[i].address() + '</p>' +
               '<p>Postcode: ' + place[i].postcode() + '</p>' +
               '<p>Hours: ' + place[i].hours() + '</p>' +
               '<a href = "' + place[i].url() + '" target="_blank">Website</a>' +
               '<img src = "' + streetViewUrl + '">' +
               '</div>';
               var infowindow = new google.maps.InfoWindow({
               content: contentString
           });*/

        contnt(markers, place);
    }

    function contnt(markers, place) {

        google.maps.event.addListener(markers, "click", function(e) {
            infowindow.setContent(place.address);
            infowindow.open(map, markers);
        });
    }




})(window, google);