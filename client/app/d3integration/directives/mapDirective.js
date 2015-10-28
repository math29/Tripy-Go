angular.module('wtcApp.directives')
	.directive('d3map', [ function(){
		return {
			restrict: 'EA',
			scope: {
				data: '=' // data-binding bidirectionnel
			},
			link: function(scope, element, attrs){
				//d3Service.d3().then(function(d3) {
					var margin= parseInt(attrs.margin) || 20,
						height = parseInt(attrs.height) || 400,
						barPadding = parseInt(attrs.barPadding) || 5;
		
					

					// redimensionnement de la fenetre
					window.onresize = function(){
						scope.$apply();
					};

					scope.$watch(function(){
						return angular.element(window)[0].innerWidth;
					}, function(){
						scope.render();
					});

					scope.render = function(data){
											console.log(element[0]);
						var width = d3.select(element[0]).node().offsetWidth - margin;


					// remove all previous items before render
					//svg.selectAll('*').remove();
						// setup variables

							
						var projection = d3.geo.naturalEarth()
							.scale(167)
							.translate([width / 2, height / 2])
							.precision(.1);
								
						var svg = d3.select(element[0]).append("svg")
							.attr("width", width)
							.attr("height", height);

						var path = d3.geo.path()
							.projection(projection);

						var g = svg.append("g");

						// load and display the World
						d3.json("assets/maps/world-110m2-countries.json", function(error, topology) {
						g.append("path")
							.datum(topojson.feature(topology, topology.objects.countries))
							.attr("class", "land")
							.attr("d", path);
						});

						// zoom and pan
						var zoom = d3.behavior.zoom()
							.on("zoom",function() {
								g.attr("transform","translate("+ 
									d3.event.translate.join(",")+")scale("+d3.event.scale+")");
									g.selectAll("path")  
									.attr("d", path.projection(projection)); 
							 });

						svg.call(zoom)

					};
			
			//})
		}
	}
	}]);
