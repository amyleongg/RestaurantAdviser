var queryURL = " https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search";
var apiKey = "-yUrZ9AEn265gqwMEhOvili1Q9ydKohTd0fQ-3_pycdy49LJdZFucDIRGmYbEoHdA-ycbhMZpItnfUlQjyfVGOW9KBm6q9i1uAK2NI9IapiCZO0dvoKwMRVmmi5YXnYx";

var googlemapsapiKey = "AIzaSyCUZ7fTICyveg5p7CbRPEO1glBi2fT6qOU";
var googlemapsURL= "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/staticmap?";

var googlezURL= "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/staticmap?center=63.259591,-144.667969&zoom=6&size=400x400&markers=color:blue%7Clabel:S%7C62.107733,-145.541936&markers=size:tiny%7Ccolor:green%7CDelta+Junction,AK&markers=size:mid%7Ccolor:0xFFFF00%7Clabel:C%7CTok,AK&key=AIzaSyCUZ7fTICyveg5p7CbRPEO1glBi2fT6qOU";


let request = (url, callback) => {
    var OReq= new XMLHttpRequest();
    OReq.addEventListener("load", () => {
        callback(OReq.response);
    });
    OReq.responseType = 'json';
    OReq.open("GET", url);
    OReq.setRequestHeader('accept', 'application/json');
    OReq.setRequestHeader('x-requested-with', 'xmlhttprequest');
    OReq.setRequestHeader('Access-Control-Allow-Origin', '*');
    OReq.setRequestHeader('Authorization', `Bearer ${apiKey}`);
    OReq.send();
}



let userLocation = {
    lat: 0,
    long: 0
};


navigator.geolocation.getCurrentPosition(x=>{
    console.log(x);
    userLocation.lat=x.coords.latitude;
    userLocation.long=x.coords.longitude;
}, err=>console.error(err));



Vue.component("result-component", {
    data: function() {
        return {
        };
    },
    props: {
        organization: Object
    },

    methods: {
        generateStaticMapsUrl: function() {
            var googlemapsapiKey = "AIzaSyCUZ7fTICyveg5p7CbRPEO1glBi2fT6qOU";
            var googlemapsURL= "https://maps.googleapis.com/maps/api/staticmap?";


            url= googlemapsURL + "size=400x400&markers=color:red|" + this.organization.coordinates.latitude + "," + this.organization.coordinates.longitude + "&key=" + googlemapsapiKey;
            return url;


        },

        googlemapsPositions: function (restlatitude, restlongitude) {
            request(googlezURL,(response) => {



                console.log(response);
            });
        },
    },
    template: `
<div>
<!--    <div :key="googlemapsIterator.url" v-for="googlemapsIterator in organization" >-->


<!--    </div>-->
    <h1>{{ organization.name }}</h1>
    <img :src="generateStaticMapsUrl()">

</div>`
});




Vue.component("results-component", {
    data: function() {
        const dataMembers = {
            results: [],
            loc: "chicago",
            cuisineChosen: false,
            buttons : [{ name: 'American Food', url: 'americanfood', cuisineType: 'American Food' }, { name: 'Chinese Food', url: 'chinesefood.jpg', cuisineType: 'Chinese Food' },{ name: 'Desserts (Treat Yourself!)', url: 'dessert.jpg', cuisineType: 'dessert' }, { name: 'Fast Food', url: 'fastfood.jpg',cuisineType: 'Fast Food' }, { name: 'French Food', url: 'frenchfood.jpg', cuisineType: 'French Food' }, { name: 'Greek Food', url: 'greekfood.jpg', cuisineType: 'Greek Food' }, { name: 'Italian Food', url: 'italianfood.jpg', cuisineType:'Italian Food' }, { name: 'Mexican Food', url: 'mexicanfood.png', cuisineType: 'Mexican Food'} ,{ name: 'General', url: 'general.png', cuisineType: 'Food'}  ]
        };
        return dataMembers;
    },
    methods: {

        btnresults: function (foodtype) {


                    request(queryURL + "?latitude=" + userLocation.lat + "&longitude=" + userLocation.long + "&term=" +foodtype, (response) => {
                        this.results = response.businesses;
                        console.log(response);
                        this.cuisineChosen= true;
                    });

        },


        callApi: function() {
            request(queryURL + "?price=3&latitude=" + userLocation.lat + "&longitude=" + userLocation.long, (response) => {
                this.results = response.businesses;
                console.log('testing', response);
            });
        }
    },
    template: `
<div>
    <div :key="buttonIterator.url" v-for="buttonIterator in buttons" v-if="!cuisineChosen">
        <div class="container column">
            <img :src="buttonIterator.url" style="width:100%">
            <button class="btn" @click="btnresults(buttonIterator.cuisineType)" >{{buttonIterator.name}}</button> 
            
        </div> 
 
    </div>
        
        
    <result-component v-for="result of results" :key="result.name" v-bind:organization="result"></result-component>

   
    
 
</div>`
});

let vc = new Vue({
    el: "#app",
    data: {

    },
    methods: {

    }
});
