$(document).ready(function(){

$('.carousel__inner__slider').slick({
  dots: false,
  infinite: true,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay:true,
  prevArrow:"<i class='fa fa-chevron-left slick-prev' aria-hidden='true'></i>",
  nextArrow:"<i class='fa fa-chevron-right slick-next' aria-hidden='true'></i>",
  responsive: [
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },

     {
      breakpoint: 480,
      	settings: {
      	slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows:false,
	    customPaging: function(slider, i) {
	      // this example would render "tabs" with titles
	      return '<span class="dot"></span>';
	    },
      }
    }
  ]

});

         google.maps.event.addDomListener(window, 'load', init);
        
            function init() {
                // Basic options for a simple Google Map
                // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
                var mapOptions = {
                    // How zoomed in you want the map to start at (always required)
                    zoom: 16,

                    // The latitude and longitude to center the map (always required)
                    center: new google.maps.LatLng(51.5241098, -0.0738972), 

                    scrollwheel: false,

                    // How you would like to style the map. 
                    // This is where you would paste any style found on Snazzy Maps.
                    styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
                };

                // Get the HTML DOM element that will contain your map 
                // We are using a div with id="map" seen below in the <body>
                var mapElement = document.getElementById('map');

                var iconBase = "../images/"

                var contentString = 
                '<div id="content">'+
	            '<div id="bodyContent">'+
	            '<p>Geek Label</p>' +
	            '<p>4th Floor</p>'+
	            '<p>27 - 33 Bethnal Green Road</p>'+
	            '<p>Shoreditch</p>'+
	            '<p>London</p>'+
	            '<p>E1 6LA</p>'+
	            '</div>'+
	            '</div>';



                // Create the Google Map using our element and options defined above
                var map = new google.maps.Map(mapElement, mapOptions);

                var infowindow = new google.maps.InfoWindow({
          			content: contentString,
          			pixelOffset:new google.maps.Size(180, 130)
        		});

                // Let's also add a marker while we're at it
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(51.5241098, -0.0738972),
                    map: map,
                    title: 'Geek!',
                    icon: iconBase + 'Vector-Smart-Object 2.png'
                });

                 marker.addListener('click', function() {
          			infowindow.open(map, marker);
        		});
            }


        //Scroll
        smoothScroll.init({
		    speed: 500, // Integer. How fast to complete the scroll in milliseconds
		    easing: 'easeInOutCubic', // Easing pattern to use
		});
});


