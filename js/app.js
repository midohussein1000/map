var SearchText = ko.observable("");
// a viewmodel function  
var ViewModel = function(){
    var st = this;
    //init map
    this.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 31.0372998, lng: 31.3833837},
        zoom: 14,
        disableDefaultUI: !0
    });
    //Todo marker list 
    this.placesList = ko.observableArray([]);
    m_Places.forEach(function(placeItem){
        st.placesList.push(new placemodel(placeItem,st.map));
    });
    //Todo the event for click on marker
    this.placesList().forEach(function(placemodel){
        google.maps.event.addListener(placemodel.marker, 'click', function () {
            st.placeClicker(placemodel);
        });
    });
    // pop up info window when click on marker 
    var infowindow = new google.maps.InfoWindow();
    this.placeClicker = function(placemodel){
        infowindow.setContent(placemodel.content);
        infowindow.open(this.map, placemodel.marker);
        placemodel.toggleBounce();
    };

    // to filter the search
    st.SeacrhList = ko.computed(function(){
        var searchFilter = [];
        this.placesList().forEach(function(placemodel){
            if (placemodel.visible())
            {
                searchFilter.push(placemodel);
            }
        });
        return searchFilter;
    }, this);


};
// some places 
var m_Places =[
    {
        position: {lat: 31.0410712, lng: 31.4178593},
        name: "Mansoura, Egypt ",
        wikipedia: "Mansoura",
         address: " Address : eldaqahelia governate"

    },

    {	position: {lat: 31.0450423 , lng: 31.3884623},
        name: "dar bn lokman , Mansoura ",
        wikipedia: "دار_ابن_لقمان",
        address: "  Address : mansourah street street"

    },
    {	position: {lat: 31.042542,  lng: 31.3673265},
        name: "Mansoura Urology and Nephrology Center",
        wikipedia: "Mohamed Ghoneim",
        address: "  Address : talkha street"
    },
    {	position: {lat: 31.035498 , lng: 31.3575272},
        name: " The Olympic Village",
        wikipedia: "القرية_الأولمبية_بجامعة_المنصورة",
        address: "  Address : unvirsty Street"
    }
];

var placemodel = function (data, map){
    var st = this;
    this.position = ko.observable(data.position);
    this.name = ko.observable(data.name);
    this.address=ko.observable(data.address);
    this.marker = ko.observable();
    this.content = '<h4>' + st.name() + '</h4>'+'<h4>' + st.address() + '</h4>';
    this.wikipedia = data.wikipedia;

    // push data to marker

    this.marker = new google.maps.Marker({
        position: this.position(),
        map: map,
        title: this.name()
    });

    st.marker.setAnimation(null);

    // search by wiki using ajax and error  handler

    $.ajax({
        url:'https://ar.wikipedia.org/w/api.php?action=opensearch&format=json&callback=wikiCallBack&search='+st.wikipedia,
        dataType: 'jsonp',
        timeout: 2000
    }).done(function(data) {
        // using wiki api to search for the place 
        st.content = '<h4>' + st.name() + '</h4>'+'<p>' +'<h4>' + st.address() + '</h4>'+ data[1][0] +' from '+'<a href=' + data[3][0] + ' target="blank"> Wikipedia</a></p>';
    }).fail(function(jqXHR, textStatus){
        //if it fail to search or occures error 
        alert("an error with wiki");
    });
    //the visibility was rechecked when search filter is reset

    this.visible = ko.computed(function(){
        if (SearchText().length > 0){
            return (st.name().toLowerCase().indexOf(SearchText().toLowerCase()) > -1);
        }
        else{
            return true;
        }
    },this);

    this.toggleBounce = function() {
        if (st.marker.getAnimation() !== null)
        {
            st.marker.setAnimation(null);
        }
        else
        {
            st.marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function(){
                st.marker.setAnimation(null);
            }, 2100);
        }
    };
};




// intiate the   project
function proStart(){
    ko.applyBindings(new ViewModel());
}
// handeling the error
function mapEr() {
     
    alert("error in google map please try again");
}