define( ["qlik", "https://cdnjs.cloudflare.com/ajax/libs/d3/4.9.1/d3.min.js", "./regression", "text!./RegressionPlot.html", "css!./RegressionPlot.css"],
	function ( qlik, d3, regression, template ) {
		"use strict";
		return {
			template: template,
			initialProperties: {
				qHyperCubeDef: {
					qDimensions: [],
					qMeasures: [],
					qSuppressMissing: true,
					qInitialDataFetch: [{
						qWidth: 3,
						qHeight: 3333
					}]
				}
			},
			definition: {
				type: "items",
				component: "accordion",
				items: {
					dimensions: {
								uses: "dimensions",
								min: 1,
								max: 1
							},
					measures: {
								uses: "measures",
								min: 2,
								max: 2
							},
							
					addons:{
							uses:"addons",
							items:{
								CustomTitles:{
									type:"items",
									label:"Custom Titles",
									items:{
										Xaxistitle:{
										type:"string",
										label:"X Axis Title",
										ref:"xaxistitle"
										},
										Yaxistitle:{
										type:"string",
										label:"Y Axis Title",
										ref:"yaxistitle"
										}
									}
								}
							 }
							},
					
					/*sorting: {
						uses: "sorting"
					},*/
					
					settings: {
						uses: "settings",
						items: {
							regression: {
								type: "items",
								label: "Regression",
								items: {
									regressionType: {
										type: "string",
										component: "dropdown",
										label: "Regression type",
										ref: "regression.type",
										options: [
											{value: 'linear', label: 'Linear'}, 
											{value: 'exponential', label: 'Exponential'}, 
											{value: 'logarithmic', label: 'Logarithmic'}, 
											{value: 'power', label: 'Power'}, 
											{value: 'polynomial', label: 'Polynomial'}
										]
									},
									order: {
										type: "integer",
										label: "Order",
										ref: "regression.order",
										min: 2,
										defaultValue: 2,
										show: function(layout) {
											return layout.regression.type === "polynomial";
										}
									}
								}
							},
							margins: {
								type: "items",
								label: "Margins",
								items: {
									marginTop: {
										type: "integer",
										label: "Top Margin",
										ref: "margin.top",
										min: "0",
										defaultValue: "20"
									},
									marginRight: {
										type: "integer",
										label: "Right Margin",
										ref: "margin.right",
										min: "0",
										defaultValue: "30"
									},
									marginBottom: {
										type: "integer",
										label: "Bottom Margin",
										ref: "margin.bottom",
										min: "0",
										defaultValue: "60"
									},
									marginLeft: {
										type: "integer",
										label: "Left Margin",
										ref: "margin.left",
										min: "0",
										defaultValue: "50"
									}
								}
							}
						}
					}
				}
			},
			support: {
				snapshot: true,
				export: true,
				exportData: true
			},
			paint: function ($element, layout) {
				//console.log($element);
				 
				 
				 if(this.painted) return;
				 this.painted = true;
				
				// get points on regression line
				var regressionPoints = this.$scope.generateRegressionPoints();

				// svg width and height
				var width = $element.width() - layout.margin.left - layout.margin.right;
				var height = $element.height() - layout.margin.top - layout.margin.bottom;
				
				d3.select($element[0]).select("svg").attr("width", $element.width()).attr("height", $element.height());
				d3.select($element[0]).select(".plot").attr("transform", "translate(" + layout.margin.left + "," + layout.margin.top + ")");
				
				
				
				// scales
				//var x = d3.scaleLinear().domain([0, d3.max(layout.qHyperCube.qDataPages[0].qMatrix, function(d) { return d[1].qNum; })]).range([0, width]);
				//var y = d3.scaleLinear().domain([0, d3.max(layout.qHyperCube.qDataPages[0].qMatrix, function(d) { return d[2].qNum; })]).range([height,0]);
				
				// scales
				var x = d3.scaleLinear().domain([d3.min(layout.qHyperCube.qDataPages[0].qMatrix, function(d) { return d[1].qNum; }), d3.max(layout.qHyperCube.qDataPages[0].qMatrix, function(d) { return d[1].qNum; })]).range([0, width]);
				var y = d3.scaleLinear().domain([d3.min(layout.qHyperCube.qDataPages[0].qMatrix, function(d) { return d[2].qNum; }), d3.max(layout.qHyperCube.qDataPages[0].qMatrix, function(d) { return d[2].qNum; })]).range([height,0]);
				
				
				
				
				// gridlines in x axis function
				function make_x_gridlines() {		
    			return d3.axisBottom(x).scale(x).ticks(5);
				}

				// gridlines in y axis function
				function make_y_gridlines() {		
    			return d3.axisLeft(y).scale(y).ticks(5);
				}
				
				
				
				
				
				/*
				for(var i=0;i<layout.qHyperCube.qDataPages[0].qMatrix.length;i++)
				{
				console.log(layout.qHyperCube.qDataPages[0].qMatrix[i][1].qText);
				}
				*/
				
				
				// gridlines in x axis function
				function make_x_gridlines() {		
    			return d3.axisBottom(x).scale(x).ticks(5);
				}

				// gridlines in y axis function
				function make_y_gridlines() {		
    			return d3.axisLeft(y).scale(y).ticks(5);
				}
				
				
				
				// add the X gridlines
  				d3.select($element[0]).select(".plot").append("g")			
     			 	.attr("class", "grid")
      				.attr("transform", "translate(0," + height + ")")
      				.call(make_x_gridlines()
          			.tickSize(-height)
          			.tickFormat("")
     				 )

  				// add the Y gridlines
 				d3.select($element[0]).select(".plot").append("g")			
     				.attr("class", "grid")
      				.call(make_y_gridlines()
          			.tickSize(-width)
          			.tickFormat("")
     	 			)
				

				
				// x and y axis
				d3.select($element[0]).select(".x-axis").attr("class", "x-axisline").attr("transform", "translate(0,"+height+")").call(d3.axisBottom(x).ticks(5));
				d3.select($element[0]).select(".y-axis").attr("class", "y-axisline").attr("transform", "translate(0,0)").call(d3.axisLeft(y).ticks(5));
								
				var xdis_xlab=$element.width()/2;
				var ydis_xlab=$element.height()*(0.95);
				
				var xdis_ylab=layout.margin.left*(1/4);
				var ydis_ylab=$element.height()/2;
				
				var flag1=0;
				if(layout.xaxistitle!="")
				{flag1=1;}
				if(flag1==0)
				{
				// x label 
				d3.select($element[0]).select(".x-label").append("text").attr("transform","translate("+xdis_xlab+","+ydis_xlab+")").style("text-anchor", "middle").text(this.backendApi.getMeasureInfos()[0].qFallbackTitle);		
				}
				else
				{
				// x label 
				d3.select($element[0]).select(".x-label").append("text").attr("transform","translate("+xdis_xlab+","+ydis_xlab+")").style("text-anchor", "middle").text(layout.xaxistitle);		
				} 
				
				var flag2=0;
				if(layout.yaxistitle!="")
				{flag2=1;}
				if(flag2==0)
				{
				// y label
				d3.select($element[0]).select(".y-label").append("text").attr( "transform","translate("+xdis_ylab+","+ydis_ylab+") rotate(-90)").style("text-anchor", "middle").text(this.backendApi.getMeasureInfos()[1].qFallbackTitle);
				}
				else
				{
				// y label	
				d3.select($element[0]).select(".y-label").append("text").attr( "transform","translate("+xdis_ylab+","+ydis_ylab+") rotate(-90)").style("text-anchor", "middle").text(layout.yaxistitle);
				}
				
				
			  // Add the tooltip container to the vis container
              // it's invisible and its position/contents are defined during mouseover
              var tooltip = d3.select($element[0]).append("div").attr("class", "tooltip").style("opacity",0.5);
			
              // tooltip mouseover event handler
              var tipMouseover = function(d) {
              	  
                  var color = "white";
				  var state=d[0].qText;
				  var xval=d[1].qText;
				  var yval=d[2].qText;
				  
				  var tooltipx=layout.qHyperCube.qMeasureInfo[0].qFallbackTitle;
				  var tooltipy=layout.qHyperCube.qMeasureInfo[1].qFallbackTitle;
           
				  var html  = "<div style='background-color: black ;opacity:0.5;padding:5px ; border-radius: 5px'><span style='color:" + color + ";font-size:14px; font-weight:bold '>" +state+ "</span><br><span style='color:" + color + ";font-size:11px;'>"+tooltipx+" : " +xval+ " <br> "+tooltipy+" : "+yval+"</span><br/></div>"
				  		  
				  tooltip.html(html)
                      .style("left", d3.select(this).attr("cx")+"px")
                      .style("top", d3.select(this).attr("cy")+"px")
                      .transition()
                      .duration(200) // ms
                      .style("opacity", .9)  

              };
			  
              // tooltip mouseout event handler
              var tipMouseout = function(d) {
                  tooltip.transition()
                      .duration(300) // ms
                      .style("opacity", 0); // don't care about position!
              };
				
				/////// DOTS //////
				var dots = d3.select($element[0]).select(".plot").selectAll(".dot")
					.data(layout.qHyperCube.qDataPages[0].qMatrix);
				//enter
				dots.enter().append("circle")
					.attr("class", "dot")
					.attr("r",3.5)
					.attr("stroke",  function(d) {
						var newData = x(d[1].qNum)
						if(newData > 500) {
							return "black"
						}else if(newData >300){
							return "blue"
						}else if(newData >100){
							return "green"
						}else{
							return "yellow"
						}
				   })
					.attr("fill", function(d) {
						var newData = x(d[1].qNum)
						if(newData > 500) {
							return "black"
						}else if(newData >300){
							return "blue"
						}else if(newData >100){
							return "green"
						}else{
							return "yellow"
						}
				   })
					.attr("cx", function(d) { return x(d[1].qNum); })
					.attr("cy", function(d) { return y(d[2].qNum); })
					.on("mouseover", tipMouseover)
                	.on("mouseout", tipMouseout);



				//exit
				dots.exit().remove();
				//update 
				dots
					.attr("r",3.5)
					.attr("stroke",  function(d) {
						var newData = x(d[1].qNum)
						if(newData > 500) {
							return "black"
						}else if(newData >300){
							return "blue"
						}else if(newData >100){
							return "green"
						}else{
							return "yellow"
						}
				   })
					.attr("fill", function(d) {
						var newData = x(d[1].qNum)
						if(newData > 500) {
							return "black"
						}else if(newData >300){
							return "blue"
						}else if(newData >100){
							return "green"
						}else{
							return "yellow"
						}
				   })
					.attr("cx", function(d) { return x(d[1].qNum); })
					.attr("cy", function(d) { return y(d[2].qNum); })
					.on("mouseover", tipMouseover)
                	.on("mouseout", tipMouseout);

				

				//// REGRESSION LINE ////
				var regressionLine = d3.select($element[0]).select(".plot").selectAll(".regression").data([regressionPoints]);
				//enter
				regressionLine.enter().append("path")
					.attr("class", "regression")
					.attr("stroke", "black")
					.attr("stroke-width", "1px")
					.attr("d", d3.line().curve(d3.curveCardinal).x(function(d){ return x(d[0]); }).y(function(d){ return y(d[1]); }));
				//exit
				regressionLine.exit().remove();
				//update
				regressionLine
					.attr("stroke", "black")
					.attr("d", d3.line().curve(d3.curveCardinal).x(function(d){ return x(d[0]); }).y(function(d){ return y(d[1]); }));

				//// STATS ////
				/*d3.select($element[0]).select(".plot").selectAll(".r-squared")
					.data([this.$scope.regression])
					.attr("x", width)
					.attr("y", height - 2)
					.text("R-Squared: " + this.$scope.regression.r2)
				.enter().append("text")
					.attr("class", "r-squared")
					.attr("text-anchor", "end")
					.attr("x", width)
					.attr("y", height - 2)
					.text("R-Squared: " + this.$scope.regression.r2);
				d3.select($element[0]).select(".plot").selectAll(".equation")
					.data([this.$scope.regression])
					.attr("x", width)
					.attr("y", height - 20)
					.text("Equation: " + this.$scope.regression.string)
				.enter().append("text")
					.attr("class", "equation")
					.attr("text-anchor", "end")
					.attr("x", width)
					.attr("y", height - 20)
					.text("Equation: " + this.$scope.regression.string);
				*/
				//needed for export
				return qlik.Promise.resolve();
			},
			controller: ["$scope", "$element", function ( $scope, $element ) {
				//recalculate regression when user changes regression type
				$scope.$watch("layout.regression", function() {
					console.log($scope.layout.regression.order);
					$scope.regression = regression($scope.layout.regression.type, $scope.layout.qHyperCube.qDataPages[0].qMatrix.map(function(row){return [row[1].qNum,row[2].qNum]}), $scope.layout.regression.order);
				}, true);

				// function to generate 100 points on regression line so it can be plotted
				$scope.generateRegressionPoints = function() {
					var arr = [];
					var data = $scope.layout.qHyperCube.qDataPages[0].qMatrix.map(function(row){
						return [row[1].qNum,row[2].qNum]
					});
					
					var min = data.reduce(function(min, val) { 
						return val[0] < min ? val[0] : min; 
					}, data[0][0]);
					var max = data.reduce(function(max, val) { 
						return val[0] > max ? val[0] : max; 
					}, data[0][0]);
					var extent = max - min;
					for(var i = 0; i < 100; i++) {
						var x = min + (extent/100)*i;
						arr.push($scope.regression.predict(x));
					}
					return arr;
				};
			}]
		};
	});
