define( ["qlik", "https://cdnjs.cloudflare.com/ajax/libs/d3/4.9.1/d3.min.js", "./regression", "text!./RegressionPlot.html", "css!./RegressionPlot.css"],
	function ( qlik, d3, regression, template ) {
		"use strict";
		return {
			initialProperties: {
				qHyperCubeDef: {
					qDimensions: [],
					qMeasures: [],
					qSuppressMissing: true,
					qInitialDataFetch: [{
						qWidth: 4,
						qHeight: 2000
					}]
				}
			},
			definition: {
				type: "items",
				component: "accordion",
				items: {
					dimensions: {
								uses: "dimensions",
								min: 2,
								max: 2,
								items: {
									MyCheckProp: {
										type: "boolean",
										label: "Use this as color dimension",
										ref: "qDef.IsColorDimension",
										defaultValue: false
									}
								}
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
								},
								NumberFormatting:{
								type:"items",
								label:"Number Formatting",
								items:{
										xaxisnumformat:{
										type:"string",
								 		component:"dropdown",
								 		label:"x axis formatting",
								 		ref:"numformatx",
								 		options:[{value:'number',label:'number'},
								 		  		{value:'money',label:'money'}]
										},
										yaxisnumformat:{
										type:"string",
								 		component:"dropdown",
								 		label:"y axis formatting",
								 		ref:"numformaty",
								 		options:[{value:'number',label:'number'},
								 		  		{value:'money',label:'money'}]
										}
									  }
								},
								dataHandling:{
										uses:"dataHandling"
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
											{value: 'none',label:'None'},
											{value: 'linear', label: 'Linear'}, 
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
<<<<<<< HEAD
			
=======
>>>>>>> 339440b9a98735925d311bfede28ebc97b196039
			paint: function ($element, layout) {
			    
				var colorDimIndex = 0;
				
				var id = "ext_" + layout.qInfo.qId;

				  if (!document.getElementById(id)) {
<<<<<<< HEAD
					  $element.append($("<div qv-extension />").attr("id",id));
				  }else{
=======
				  
					  $element.append($("<div qv-extension />").attr("id",id));
				  }else{
				  
>>>>>>> 339440b9a98735925d311bfede28ebc97b196039
					  $("#" + id)
					  .empty()
					  .removeClass();
				  }
				  
				  $("#" + id)
				  .addClass("regression-plot")
				  .append("<svg><g class='plot'><g class='x-axis'></g><g class='y-axis'></g></g><g class='x-label'></g><g class='y-label'></g></svg>");



				
				layout.qHyperCube.qDimensionInfo.forEach(function(o,i){
					if (o.IsColorDimension){
						colorDimIndex = i;
					}
				});		
				
				
				
				
				if(layout.regression.type=="none")
				{
				var regressionPoints = []
				}
				else
				{
				// get points on regression line
				var regressionPoints = this.$scope.generateRegressionPoints();
				}
				
				// svg width and height
				var width = $element.width() - layout.margin.left - layout.margin.right;
				var height = $element.height() - layout.margin.top - layout.margin.bottom;
				
				d3.select($element[0]).select("svg").attr("width", $element.width()).attr("height", $element.height());
				d3.select($element[0]).select(".plot").attr("transform", "translate(" + layout.margin.left + "," + layout.margin.top + ")");
															
				// scales
				var x = d3.scaleLinear().domain([d3.min(layout.qHyperCube.qDataPages[0].qMatrix, function(d) { return d[2].qNum; }), d3.max(layout.qHyperCube.qDataPages[0].qMatrix, function(d) { return d[2].qNum; })]).range([0, width]);
				var y = d3.scaleLinear().domain([d3.min(layout.qHyperCube.qDataPages[0].qMatrix, function(d) { return d[3].qNum; }), d3.max(layout.qHyperCube.qDataPages[0].qMatrix, function(d) { return d[3].qNum; })]).range([height,0]);
				
			
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
				
<<<<<<< HEAD
				/*			
				// x and y axis
				d3.select($element[0]).select(".x-axis").attr("class", "x-axisline").attr("transform", "translate(0,"+height+")").call(d3.axisBottom(x).ticks(5));
				d3.select($element[0]).select(".y-axis").attr("class", "y-axisline").attr("transform", "translate(0,0)").call(d3.axisLeft(y).ticks(5));
				*/
=======
>>>>>>> 339440b9a98735925d311bfede28ebc97b196039
				
				if(layout.numformatx=="money" && layout.numformaty=="money")
				{
				d3.select($element[0]).select(".x-axis").attr("transform", "translate(0,"+height+")").call(d3.axisBottom(x).ticks(5).tickFormat(d3.format("$0.0f")));
				d3.select($element[0]).select(".y-axis").attr("transform", "translate(0,0)").call(d3.axisLeft(y).ticks(5).tickFormat(d3.format("$0.0f")));
				}
				else if(layout.numformatx=="money")
				{
				d3.select($element[0]).select(".x-axis").attr("transform", "translate(0,"+height+")").call(d3.axisBottom(x).ticks(5).tickFormat(d3.format("$0.0f")));
				d3.select($element[0]).select(".y-axis").attr("transform", "translate(0,0)").call(d3.axisLeft(y).ticks(5));
				}
				else if(layout.numformaty=="money")
				{
				d3.select($element[0]).select(".x-axis").attr("transform", "translate(0,"+height+")").call(d3.axisBottom(x).ticks(5));
				d3.select($element[0]).select(".y-axis").attr("transform", "translate(0,0)").call(d3.axisLeft(y).ticks(5).tickFormat(d3.format("$0.0f")));
				}
				else
				{
				// x and y axis
				d3.select($element[0]).select(".x-axis").attr("transform", "translate(0,"+height+")").call(d3.axisBottom(x).ticks(5));
				d3.select($element[0]).select(".y-axis").attr("transform", "translate(0,0)").call(d3.axisLeft(y).ticks(5));
				}
				
				
				
				var xdis_xlab=$element.width()/2;
				var ydis_xlab=$element.height()*(0.95);
				
				var xdis_ylab=layout.margin.left*(1/4);
				var ydis_ylab=$element.height()/2;
				
				var xaxisflg=0;
				if(layout.xaxistitle!="")
				{xaxisflg=1;}
				if(xaxisflg==0)
				{
				// x label 
				d3.select($element[0]).select(".x-label").append("text").attr("transform","translate("+xdis_xlab+","+ydis_xlab+")").style("text-anchor", "middle").text(this.backendApi.getMeasureInfos()[0].qFallbackTitle);		
				}
				else
				{
				// x label 
				d3.select($element[0]).select(".x-label").append("text").attr("transform","translate("+xdis_xlab+","+ydis_xlab+")").style("text-anchor", "middle").text(layout.xaxistitle);		
				} 
				
				var yaxisflg=0;
				if(layout.yaxistitle!="")
				{yaxisflg=1;}
				if(yaxisflg==0)
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
				  var xval=d[2].qText;
				  var yval=d[3].qText;
				  
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
				
	
			 
              var that = this
			  var evaluateColorCode = function(d){
			  	console.log(that.$scope.colorCode)
			  	try{
			  		//console.log(colorRGB)
			  	}catch(ex){console.log(ex)}
			  	//return that.$scope.colorCode
			  	var o = Math.round, r = Math.random, s = 255;
    			return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
			  }


				/////// DOTS //////
				var dots = d3.select($element[0]).select(".plot").selectAll(".dot").data(layout.qHyperCube.qDataPages[0].qMatrix);
				
				
					
				//enter
<<<<<<< HEAD
				
    			setTimeout(() => {
              		 dots.enter().append("circle")
					.attr("class", "dot")
					.attr("r",3.5)
=======
    			setTimeout(() => {
              		 dots.enter().append("circle")
					.attr("class", "dot")
					.attr("r",function(d){if( d[2].qNum!="NaN" & d[3].qNum!="NaN" )
											{
											console.log(d[2].qNum);
											return 3.5;
											}
										    else
										  	{
											return 0;
											}
											})
>>>>>>> 339440b9a98735925d311bfede28ebc97b196039
					.attr("stroke",function(d){ return d[colorDimIndex].qText} )
				 	.attr("fill",function(d){return d[colorDimIndex].qText})
					.attr("cx", function(d) { if((d[2].qNum)=="NaN")
												{
												d[2].qNum=0;
<<<<<<< HEAD
												console.log(d[2].qNum);
												return;
												}
												else
												{
												console.log(d[2].qNum);
=======
												//console.log(d[2].qNum);
												return x(d[2].qNum);
												}
												else
												{
												//console.log(d[2].qNum);
>>>>>>> 339440b9a98735925d311bfede28ebc97b196039
												return x(d[2].qNum); 
												}
												})
					.attr("cy", function(d) { if((d[3].qNum)=="NaN")
												{
												d[3].qNum=0;
<<<<<<< HEAD
												console.log(d[3].qNum);
												return;
												}
												else
												{
												console.log(d[3].qNum);
=======
												//console.log(d[3].qNum);
												return y(d[3].qNum);
												}
												else
												{
												//console.log(d[3].qNum);
>>>>>>> 339440b9a98735925d311bfede28ebc97b196039
												return y(d[3].qNum); 
												}
												})
					.on("mouseover", tipMouseover)
                	.on("mouseout", tipMouseout);

              	}, 0)


				//exit
				dots.exit().remove();
				//update 
				setTimeout(() => {
              		 dots.enter().append("circle")
					.attr("class", "dot")
<<<<<<< HEAD
					.attr("r",3.5)
=======
					.attr("r",function(d){if( d[2].qNum!="NaN" & d[3].qNum!="NaN" )
											{
											return 3.5;
											}
										  	else
										  	{
											return 0;
											}
											})
>>>>>>> 339440b9a98735925d311bfede28ebc97b196039
					.attr("stroke",function(d){ return d[colorDimIndex].qText} )
				 	.attr("fill",function(d){return d[colorDimIndex].qText})
					.attr("cx", function(d) { if((d[2].qNum)=="NaN")
												{
												d[2].qNum=0;
<<<<<<< HEAD
												console.log(d[2].qNum);
												return;
												}
												else
												{
												console.log(d[2].qNum);
=======
												//console.log(d[2].qNum);
												return x(d[2].qNum); 
												}
												else
												{
												//console.log(d[2].qNum);
>>>>>>> 339440b9a98735925d311bfede28ebc97b196039
												return x(d[2].qNum); 
												}
												})
					.attr("cy", function(d) { if((d[3].qNum)=="NaN")
												{
												d[3].qNum=0;
<<<<<<< HEAD
												console.log(d[3].qNum);
												return;
												}
												else
												{
												console.log(d[3].qNum);
=======
												//console.log(d[3].qNum);
												return y(d[3].qNum);
												}
												else
												{
												//console.log(d[3].qNum);
>>>>>>> 339440b9a98735925d311bfede28ebc97b196039
												return y(d[3].qNum); 
												}
												})
					.on("mouseover", tipMouseover)
                	.on("mouseout", tipMouseout);
<<<<<<< HEAD

              	}, 0)

				
=======

              	}, 0)				
>>>>>>> 339440b9a98735925d311bfede28ebc97b196039
			
				

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

				//needed for export
				return qlik.Promise.resolve();
				
			},
			controller: ["$scope", "$element", function ( $scope, $element ) {
				//recalculate regression when user changes regression type
				$scope.$watch("layout.regression", function() {
					console.log($scope.layout.regression.order);
<<<<<<< HEAD
					$scope.regression = regression($scope.layout.regression.type, $scope.layout.qHyperCube.qDataPages[0].qMatrix.map(function(row){if(row[2].qNum=="NaN")
=======
					$scope.regression = regression($scope.layout.regression.type, $scope.layout.qHyperCube.qDataPages[0].qMatrix.map(function(row){
					if(row[2].qNum=="NaN")
>>>>>>> 339440b9a98735925d311bfede28ebc97b196039
						{row[2].qNum=0;}
						if(row[3].qNum=="NaN")
						{row[3].qNum=0;}
						return [row[2].qNum,row[3].qNum]}), $scope.layout.regression.order);
				}, true);

				
				
				$scope.evaluateColorExpression = function(expression){
					console.log(qlik.currApp().model.engineApp)
					qlik.currApp().model.engineApp.
		              evaluateEx(expression)
		              .then(function(result){
		              	console.log(result.qValue.qText)
		              	$scope.colorCode = result.qValue.qText
		              	console.log($scope.colorCode)
		              	console.log(colorRGB)
		              	return result.qValue.qText
		              })
				}

				// function to generate 100 points on regression line so it can be plotted
				$scope.generateRegressionPoints = function() {
					var arr = [];
					var data = $scope.layout.qHyperCube.qDataPages[0].qMatrix.map(function(row){
						if(row[2].qNum=="NaN")
						{row[2].qNum=0;}
						if(row[3].qNum=="NaN")
						{row[3].qNum=0;}
<<<<<<< HEAD
						
=======
>>>>>>> 339440b9a98735925d311bfede28ebc97b196039
						return [row[2].qNum,row[3].qNum]
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
