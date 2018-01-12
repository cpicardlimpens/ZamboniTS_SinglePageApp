
var map;
var currentMarker;
var infoWindow;
var markers_list = [];

var c;
var count = -1;
var current_count = 0;
var list_steps = '';

// HERE automatic get from wordpress
var features = [];
var API_BASE_URL = "http://zambonits.limpica.net/wp/wp-json/wp/v2/"

function loadMap() {
    // Styles a map in night mode.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 44.4962284,
            lng: 11.350587899999937
        },
        zoom: 16,
        disableDefaultUI: true,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{
                "elementType": "geometry",
                "stylers": [{
                    "color": "#ebe3cd"
                }]
            },
            {
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ffeb3b"
                }]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#523735"
                }]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#f5f1e6"
                }]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#c9b2a6"
                }]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#dcd2be"
                }]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#ae9e90"
                }]
            },
            {
                "featureType": "administrative.neighborhood",
                "elementType": "geometry.fill",
                "stylers": [{
                        "color": "#ffeb3b"
                    },
                    {
                        "visibility": "on"
                    },
                    {
                        "weight": 4.5
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "elementType": "labels.text",
                "stylers": [{
                    "visibility": "on"
                }]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#dfd2ae"
                }]
            },
            {
                "featureType": "poi",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#dfd2ae"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#93817c"
                }]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#a5b076"
                }]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#447530"
                }]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#f5f1e6"
                }]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#fdfcf8"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#f8c967"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#e9bc62"
                }]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#e98d58"
                }]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#db8555"
                }]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#806b63"
                }]
            },
            {
                "featureType": "transit",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#dfd2ae"
                }]
            },
            {
                "featureType": "transit.line",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#8f7d77"
                }]
            },
            {
                "featureType": "transit.line",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#ebe3cd"
                }]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#dfd2ae"
                }]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [{
                        "color": "#b9d3c2"
                    },
                    {
                        "weight": 4.5
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#92998d"
                }]
            }
        ]
    });
    c = map.getCenter();
    //google.maps.event.addDomListener(window, 'load');
    google.maps.event.addDomListener(window, "resize", function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    });

    // MAsk to focus on Zamboni street
    // Define the LatLng coordinates for the polygon's path.
    var outerCoords = [{
            lat: 44.49926027609643,
            lng: 11.327075958251953
        },
        {
            lat: 44.505749187681566,
            lng: 11.339521408081055
        },
        {
            lat: 44.50109683378502,
            lng: 11.356086730957031
        },
        {
            lat: 44.485667951204974,
            lng: 11.358060836791992
        },
        {
            lat: 44.48646398548003,
            lng: 11.339263916015625
        },
        {
            lat: 44.49044399391039,
            lng: 11.328964233398438
        }
    ];

    // Define the LatLng coordinates for the polygon's inner path.
    // Note that the points forming the inner path are wound in the
    // opposite direction to those in the outer path, to form the hole.
    var innerCoords = [{
            lat: 44.49428597518099,
            lng: 11.346087455749512
        },
        {
            lat: 44.49440842460528,
            lng: 11.347653865814209
        },
        {
            lat: 44.49489821973133,
            lng: 11.348834037780762
        },
        {
            lat: 44.4954492343308,
            lng: 11.350829601287842
        },
        {
            lat: 44.49626044079391,
            lng: 11.352524757385254
        },
        {
            lat: 44.49675022036458,
            lng: 11.354176998138428
        },
        {
            lat: 44.49740835518457,
            lng: 11.356065273284912
        },
        {
            lat: 44.49838789092852,
            lng: 11.356322765350342
        },
        {
            lat: 44.49881643264208,
            lng: 11.354155540466309
        },
        {
            lat: 44.49806648257639,
            lng: 11.352567672729492
        },
        {
            lat: 44.49728591205956,
            lng: 11.351323127746582
        },
        {
            lat: 44.49673491481525,
            lng: 11.349992752075195
        },
        {
            lat: 44.496382886072254,
            lng: 11.348190307617188
        },
        {
            lat: 44.49567882221063,
            lng: 11.3468599319458
        },
        {
            lat: 44.49514311575167,
            lng: 11.345744132995605
        },
        {
            lat: 44.494454343073116,
            lng: 11.345658302307129
        }
    ];


    // Construct the polygon.
    var zone = new google.maps.Polygon({
        paths: [outerCoords, innerCoords],
        strokeColor: '#FFFFFF',
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: '#FFFFFF',
        fillOpacity: 0.65
    });
    zone.setMap(map);

    // Create the DIV to hold the control
    var centerControlDiv = document.createElement('div');


    centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

}


function initMap() {

    /* ccl: place the user, and calculate the distance to Le due Torri */
    var Oldpos, pos;
    Oldpos = {
            lat: 0,
            lng: 0
    };

    $.getJSON( API_BASE_URL+"listings/", function( data ) {
        for (var i=0; i< data.length; i++) {
            var listing = data[i];
            var new_feature = {
                "pos_lat": listing.acf.loc_lat,
                "pos_lng": listing.acf.loc_lng,
                "title": listing.title.rendered,
                "listing_id": String(listing.id),
                "label": (listing.title.rendered).substring(0, 1),
            }
            features.push(new_feature);
        }
        // Sorting the stages according the label
        features.sort(function(a, b){
            var a1= a.label, b1= b.label;
            if(a1== b1) return 0;
            return a1> b1? 1: -1;
        });
        console.log("Got it!",features.length);

        loadMap();

        for (var i = 0, feature; feature = features[i]; i++) {
            addMarker(feature);
        }

        markers_list[current_count].setAnimation(google.maps.Animation.BOUNCE);

        /* geoloc */
        var infoWindow_ = new google.maps.InfoWindow({
            map: map,
            maxWidth: 250
        });
        var geolocation = null;
        if (window.navigator && window.navigator.geolocation) {
            geolocation = true;
        };
        console.log("geolocation= "+geolocation);
        function compute_distance_and_set_position(pos){
            //circle.setCenter(pos);
            // Compute distance to "Due Torri" (latitude = 44.4944304; longitude = 11.346510399999943)
            var loc1 = new google.maps.LatLng(features[0].pos_lat, features[0].pos_lng);
            var loc2 = new google.maps.LatLng(pos.lat, pos.lng);
            var spherical = google.maps.geometry.spherical;
            var distance = spherical.computeDistanceBetween(loc1, loc2);

            infoWindow_.setPosition(loc1);//loc_info);
            // InfoWindow content
            var content = '<div style="font-size:10px; font-weight:lighter">' +
                      '<p>Siete ' + Math.round(distance) + ' metri lontani da Le due Torri</p>'+
                  '</div>';
            infoWindow_.setContent(content);

        };
        if (geolocation) {

            // Now watch position change
            var identifier = window.navigator.geolocation.watchPosition(function(position) {
                pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                if((Oldpos.lat != pos.lat && Oldpos.lng != pos.lng) || Oldpos.lat==0) {

                    Oldpos = pos;
                    //console.log("new: " + pos+" / old: "+Oldpos);
                    console.log(" Position change ! lat: "+pos.lat+" lng: "+pos.lng);

                    compute_distance_and_set_position(pos);
                } else {
                    console.log("no update position");
                }


            },
             function( error ){
                                    console.log( "Something went wrong: ", error );
                            },
                            {
                                    timeout: (10 * 1000),
                                    maximumAge: (1000 * 60 * 15),
                                    enableHighAccuracy: true
                            }
            );
        }

        $('#modals').append('<div class="modal fade" id="myModal" role="dialog">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content" style="background-color:rgba(255,255,255,0.2); top:100px">' +
            '<div class="modal-header" style="border-bottom: 0px solid #e5e5e5">' +
            '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
            '<h4 class="modal-title">Zamboni Touch Street: Un percorso in 7 Tappe</h4>' +
            '</div>' +
            '<div class="modal-body">' +
            '<audio controls><source src="sounds/Event2.wav" type="audio/wav"></audio>' +
            '</div>' +
            '</div>' +
            '</div>')
        // myModal opens with button 'i'

        var url = $('#myModal audio').attr('src');
        $('#myModal').on('hide.bs.modal', function(){
            //console.log('close modal '+id);
            jQuery('#myModal audio').removeAttr("src", jQuery('#myModal audio').removeAttr("src"));

        });

        $('#myModal').on('show.bs.modal', function(){
            $('#myModal audio').attr('src', url);
        });
    });
}

function addMarker(f) {
    infoWindow = new google.maps.InfoWindow({
        map: map
    });
    //infoWindow.setOptions({strokeWeight: 2.0, strokeColor: 'green', fillColor: 'green'});
    infoWindow.close();
    //var currentMark;
    var marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(f.pos_lat,f.pos_lng), //f.position,
        //icon: f.icon,//pinSymbol('red')
        title: f.title,
        listing_id: f.listing_id,
        label: f.label
    });
    //console.log(marker.title + " // "+ marker.label + " // " + marker.listing_id);
    list_steps+=marker.listing_id;
    list_steps+="_";
    markers_list.push(marker);

    attachSecretMessage(marker, marker.title);

}


function attachSecretMessage(marker, secretMessage) {
    marker.addListener('click', function() {
        var id = this.listing_id;
        var label = this.label;
        console.log("id"+id);
        console.log(features[0].listing_id);
        //opens another window
		window.location.hash = '#p';
        //window.open('ZamboniTS.html','_self');//pano.html?id='+id+'&list='+list_steps,'_self'); //'pano.html#id'+id+'&l'+list_steps
    });
}




/*
function pinSymbol(color) {
    return {
        path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
        fillColor: color,
        fillOpacity: 1,
        strokeColor: '#000',
        strokeWeight: 1,
        scale: 0.5
    };
}
*/


$(function () {

	// Globals variables
		// 	An array containing objects with information about the products.
	var products = [],

		// Our filters object will contain an array of values for each filter

		// Example:
		// filters = {
		// 		"manufacturer" = ["Apple","Sony"],
		//		"storage" = [16]
		//	}
		filters = {};


	//	Event handlers for frontend navigation

	//	Checkbox filtering
    /*
	var checkboxes = $('.all-products input[type=checkbox]');

	checkboxes.click(function () {

		var that = $(this),
			specName = that.attr('name');

		// When a checkbox is checked we need to write that in the filters object;
		if(that.is(":checked")) {

			// If the filter for this specification isn't created yet - do it.
			if(!(filters[specName] && filters[specName].length)){
				filters[specName] = [];
			}

			//	Push values into the chosen filter array
			filters[specName].push(that.val());

			// Change the url hash;
			createQueryHash(filters);
		}

		// When a checkbox is unchecked we need to remove its value from the filters object.
		if(!that.is(":checked")) {

			if(filters[specName] && filters[specName].length && (filters[specName].indexOf(that.val()) != -1)){

				// Find the checkbox value in the corresponding array inside the filters object.
				var index = filters[specName].indexOf(that.val());

				// Remove it.
				filters[specName].splice(index, 1);

				// If it was the last remaining value for this specification,
				// delete the whole array.
				if(!filters[specName].length){
					delete filters[specName];
				}

			}

			// Change the url hash;
			createQueryHash(filters);
		}
	});

	// When the "Clear all filters" button is pressed change the hash to '#' (go to the home page)
	$('.filters button').click(function (e) {
		e.preventDefault();
		window.location.hash = '#';
	});
    */

	// Single product page buttons

	var panoPage = $('.pano');

	panoPage.on('click', function (e) {

		if (panoPage.hasClass('visible')) {

			var clicked = $(e.target);

			// If the close button or the background are clicked go to the previous page.
			if (clicked.hasClass('close') || clicked.hasClass('overlay')) {
				// Change the url hash with the last used filters.
				createQueryHash(filters);
			}

		}

	});

	//Ccl
	var infoPage = $('.info');

	infoPage.on('click', function (e) {
		window.location.hash = '#i';

		if (infoPage.hasClass('visible')) {

			var clicked = $(e.target);

			// If the close button or the background are clicked go to the previous page.
			if (clicked.hasClass('close') || clicked.hasClass('overlay')) {
				// Change the url hash with the last used filters.
				createQueryHash(filters);
			}

		}

	});


	// These are called on page load
    /*
	// Get data about our products from products.json.
	$.getJSON( "products.json", function( data ) {

		// Write the data into our global variable.
		products = data;

		// Call a function to create HTML for all the products.
		generateAllProductsHTML(products);

		// Manually trigger a hashchange to start the app.
		$(window).trigger('hashchange');
	});
    */

	// An event handler with calls the render function on every hashchange.
	// The render function will show the appropriate content of out page.
	$(window).on('hashchange', function(){
		render(decodeURI(window.location.hash));
	});



	// Navigation

	function render(url) {

		// Get the keyword from the url.
		var temp = url.split('/')[0];

		// Hide whatever page is currently shown.
		$('.main-content .page').removeClass('visible');

		var	map_ = {

			// The "Homepage".
			'': function() {

				// Clear the filters object, uncheck all checkboxes, show all the products
				filters = {};
				/*checkboxes.prop('checked',false);*/

				renderProductsPage(products);
			},
            /*
			// Single Products page.
			'#product': function() {

				// Get the index of which product we want to show and call the appropriate function.
				var index = url.split('#product/')[1].trim();

				renderSingleProductPage(index, products);
			},

			// Page with filtered products
			'#filter': function() {

				// Grab the string after the '#filter/' keyword. Call the filtering function.
				url = url.split('#filter/')[1].trim();

				// Try and parse the filters object from the query string.
				try {
					filters = JSON.parse(url);
				}
					// If it isn't a valid json, go back to homepage ( the rest of the code won't be executed ).
				catch(err) {
					window.location.hash = '#';
					return;
				}

				renderFilterResults(filters, products);
			},
            */

			// Ccl
			// Page info about ZamboniTS
			'#i': function() {
				renderInfoPage();
			},
			// pano page about
			'#p': function() {
				renderPanoPage();
			}


		};

		// Execute the needed function depending on the url keyword (stored in temp).
		if(map_[temp]){
			map_[temp]();
		}
		// If the keyword isn't listed in the above - render the error page.
		else {
			renderErrorPage();
		}

	}


	// This function is called only once - on page load.
	// It fills up the products list via a handlebars template.
	// It recieves one parameter - the data we took from products.json.
	function generateAllProductsHTML(data){

		var list = $('.all-products .products-list');

		var theTemplateScript = $("#products-template").html();
		//Compile the template​
		var theTemplate = Handlebars.compile (theTemplateScript);
		list.append (theTemplate(data));


		// Each products has a data-index attribute.
		// On click change the url hash to open up a preview for this product only.
		// Remember: every hashchange triggers the render function.
		list.find('li').on('click', function (e) {
			e.preventDefault();

			var productIndex = $(this).data('index');

			window.location.hash = 'product/' + productIndex;
		})


	}

	// This function receives an object containing all the product we want to show.
	function renderProductsPage(data){
        /*
		var page = $('.all-products'),
			allProducts = $('.all-products .products-list > li');

		// Hide all the products in the products list.
		allProducts.addClass('hidden');

		// Iterate over all of the products.
		// If their ID is somewhere in the data object remove the hidden class to reveal them.
		allProducts.each(function () {

			var that = $(this);

			data.forEach(function (item) {
				if(that.data('index') == item.id){
					that.removeClass('hidden');
				}
			});
		});

		// Show the page itself.
		// (the render function hides all pages so we need to show the one we want).
		page.addClass('visible');*/

	}


	// Opens up a preview for one of the products.
	// Its parameters are an index from the hash and the products object.
	function renderSingleProductPage(index, data){

		var page = $('.pano'),
			container = $('.viewPano');

		// Find the wanted product by iterating the data object and searching for the chosen index.
		if(data.length){
			data.forEach(function (item) {
				if(item.id == index){
					// Populate '.preview-large' with the chosen product's data.
					container.find('h3').text(item.name);
					container.find('img').attr('src', item.image.large);
					container.find('p').text(item.description);
				}
			});
		}

		// Show the page.
		page.addClass('visible');

	}

	// Find and render the filtered data results. Arguments are:
	// filters - our global variable - the object with arrays about what we are searching for.
	// products - an object with the full products list (from product.json).
	/*function renderFilterResults(filters, products){

			// This array contains all the possible filter criteria.
		var criteria = ['manufacturer','storage','os','camera'],
			results = [],
			isFiltered = false;

		// Uncheck all the checkboxes.
		// We will be checking them again one by one.
		checkboxes.prop('checked', false);


		criteria.forEach(function (c) {

			// Check if each of the possible filter criteria is actually in the filters object.
			if(filters[c] && filters[c].length){


				// After we've filtered the products once, we want to keep filtering them.
				// That's why we make the object we search in (products) to equal the one with the results.
				// Then the results array is cleared, so it can be filled with the newly filtered data.
				if(isFiltered){
					products = results;
					results = [];
				}


				// In these nested 'for loops' we will iterate over the filters and the products
				// and check if they contain the same values (the ones we are filtering by).

				// Iterate over the entries inside filters.criteria (remember each criteria contains an array).
				filters[c].forEach(function (filter) {

					// Iterate over the products.
					products.forEach(function (item){

						// If the product has the same specification value as the one in the filter
						// push it inside the results array and mark the isFiltered flag true.

						if(typeof item.specs[c] == 'number'){
							if(item.specs[c] == filter){
								results.push(item);
								isFiltered = true;
							}
						}

						if(typeof item.specs[c] == 'string'){
							if(item.specs[c].toLowerCase().indexOf(filter) != -1){
								results.push(item);
								isFiltered = true;
							}
						}

					});

					// Here we can make the checkboxes representing the filters true,
					// keeping the app up to date.
					if(c && filter){
						$('input[name='+c+'][value='+filter+']').prop('checked',true);
					}
				});
			}

		});

		// Call the renderProductsPage.
		// As it's argument give the object with filtered products.
		renderProductsPage(results);
	}
    */

	// Shows the error page.
	function renderErrorPage(){
		var page = $('.error');
		page.addClass('visible');
	}

	// Get the filters object, turn it into a string and write it into the hash.
	function createQueryHash(filters){

		// Here we check if filters isn't empty.
		if(!$.isEmptyObject(filters)){
			// Stringify the object via JSON.stringify and write it after the '#filter' keyword.
			window.location.hash = '#filter/' + JSON.stringify(filters);
		}
		else{
			// If it's empty change the hash to '#' (the homepage).
			window.location.hash = '#';
		}

	}

	// Ccl
	// Page Information
	function renderInfoPage(){
		var page = $('.info'),
			container = $('.viewInfo');

		container.find('h3').text("Zamboni Touch Street: Un percorso in 7 Tappe");

  		//container.find('audioSource').attr('src', 'sounds/Event2.wav');

  		//container.find('audio').load(); //call this to just preload the audio without playing
  		//container.find('audio').play(); //call this to play the song right away
		container.find('img').attr('src', 'assets/images/casa-isolani-residenze-di-epoca-bologna-vista-camera-abbado-580.jpg');
		container.find('audio').attr('src', 'assets/sounds/Event2.wav');
		container.find('p').text("Il progetto nasce nell’ambito delle recenti iniziative dedicate a via Zamboni, uno dei fulcri principali dell’identità e della vita bolognese, proponendo un percorso di riscoperta dei molteplici aspetti che la connotano attraverso l’utilizzo della multimedialità per offrire un’esperienza interattiva con la strada, caratterizzata dal coinvolgimento multisensoriale.");

		// Show the page.
		page.addClass('visible');
	}

	// Pano Information
	function renderPanoPage(){
		var page = $('.pano'),
			container = $('.viewPano')
			//container1 = $('.viewPano .n1'),
			//container2 = $('.viewPano .n2')
			;

		container.find('h3').text("Tappa");

  		//container.find('audioSource').attr('src', 'sounds/Event2.wav');

  		//container.find('audio').load(); //call this to just preload the audio without playing
  		//container.find('audio').play(); //call this to play the song right away
        container.find('img').attr('src', 'assets/images/casa-isolani-residenze-di-epoca-bologna-vista-camera-abbado-580.jpg');
		//container1.find('img').attr('src', 'assets/images/casa-isolani-residenze-di-epoca-bologna-vista-camera-abbado-580.jpg');
		//container2.find('img').attr('src', 'assets/images/galaxy-alpha-large.jpg');
		//container.find('audio').attr('src', 'assets/sounds/Event2.wav');
		//container.find('p').text("Il progetto nasce nell’ambito delle recenti iniziative dedicate a via Zamboni, uno dei fulcri principali dell’identità e della vita bolognese, proponendo un percorso di riscoperta dei molteplici aspetti che la connotano attraverso l’utilizzo della multimedialità per offrire un’esperienza interattiva con la strada, caratterizzata dal coinvolgimento multisensoriale.");

		// Show the page.
		page.addClass('visible');
	}

});
