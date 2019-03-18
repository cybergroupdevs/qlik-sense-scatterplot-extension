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
					}],
					
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
								label:"Formatting",
								type:"items",
								items:{
										xaxisnumformat:{
										label:"X-Axis Formatting",
										ref:"numformatx",
										type:"string",
										component:"dropdown",
										options:[{value:"number",label:"Number"},
								 		  		 {value:"money",label:"Money"}]										
										},
										decimalprecisionx:{
										label:"Decimal Precision",
										ref:"decimalprecisionx",
										type:"string",
										defaultValue:".0f",
										show:function(e){
												return "number" || "money" ===  e.numformatx
												}
										},
										xcurrency:{
										label:"Currency type",
										ref:"xcurrency",
										type:"string",
										component:"dropdown",
										options:[{value:"د.إ",label:"AED"},
													{value:"֏",label:"AMD"},
													{value:"Kz",label:"AOA"},
													{value:"A$",label:"AUD"},
													{value:"₼",label:"AZN"},
													{value:"KM",label:"BAM"},
													{value:"৳",label:"BDT"},
													{value:"B$",label:"BND"},
													{value:"R$",label:"BRL"},
													{value:"p.",label:"BYR"},
													{value:"C$",label:"CAD"},
													{value:"CHf",label:"CHF"},
													{value:"$",label:"CLP"},
													{value:"¥",label:"CNY"},
													{value:"$",label:"COP"},
													{value:"Kč",label:"CZK"},
													{value:"Kr.",label:"DKK"},
													{value:"دج",label:"DZD"},
													{value:"E£",label:"EGP"},
													{value:"€",label:"EUR"},
													{value:"£",label:"GBP"},
													{value:"HK$",label:"HKD"},
													{value:"Rp",label:"IDR"},
													{value:"₪",label:"ILS"},
													{value:"₹",label:"INR"},
													{value:"د.ا",label:"JOD"},
													{value:"¥",label:"JPY"},
													{value:"KSh",label:"KES"},
													{value:"₩",label:"KRW"},
													{value:"KD",label:"KWD"},
													{value:"₸",label:"KZT"},
													{value:"Rs",label:"LKR"},
													{value:"LD",label:"LYD"},
													{value:"DH",label:"MAD"},
													{value:"Ar",label:"MGA"},
													{value:"MRO",label:"MRO"},
													{value:"Mex$",label:"MXN"},
													{value:"RM",label:"MYR"},
													{value:"₦",label:"NGN"},
													{value:"kr",label:"NOK"},
													{value:"NULL",label:"NULL"},
													{value:"$",label:"NZD"},
													{value:"₱",label:"PHP"},
													{value:"₨",label:"PKR"},
													{value:"zł",label:"PLN"},
													{value:"QR",label:"QAR"},
													{value:"₽",label:"RUB"},
													{value:"SR",label:"SAR"},
													{value:"kr",label:"SEK"},
													{value:"S$",label:"SGD"},
													{value:"Sk",label:"SKK"},
													{value:"฿",label:"THB"},
													{value:"DT",label:"TND"},
													{value:"₺",label:"TRY"},
													{value:"NT$",label:"TWD"},
													{value:"₴",label:"UAH"},
													{value:"$",label:"USD"},
													{value:"$U",label:"UYU"},
													{value:"VEF",label:"VEF"},
													{value:"₫",label:"VND"},
													{value:"CFA",label:"XOF"},
													{value:"R",label:"ZAR"}
													],
										show:function(e){
													return "money" === e.numformatx
													}
										},
										yaxisnumformat:{
										label:"Y-Axis Formatting",
										ref:"numformaty",
										type:"string",
										component:"dropdown",
										options:[{value:"number",label:"Number"},
								 		  		 {value:"money",label:"Money"}]										
										},
										decimalprecisiony:{
										label:"Decimal Precision",
										ref:"decimalprecisiony",
										type:"string",
										defaultValue:".0f",
										show:function(e){
												return "number" || "money" ===  e.numformaty
												}
										},
										ycurrency:{
										label:"Currency type",
										ref:"ycurrency",
										type:"string",
										component:"dropdown",
										options:[{value:"د.إ",label:"AED"},
												{value:"֏",label:"AMD"},
												{value:"Kz",label:"AOA"},
												{value:"A$",label:"AUD"},
												{value:"₼",label:"AZN"},
												{value:"KM",label:"BAM"},
												{value:"৳",label:"BDT"},
												{value:"B$",label:"BND"},
												{value:"R$",label:"BRL"},
												{value:"p.",label:"BYR"},
												{value:"C$",label:"CAD"},
												{value:"CHf",label:"CHF"},
												{value:"$",label:"CLP"},
												{value:"¥",label:"CNY"},
												{value:"$",label:"COP"},
												{value:"Kč",label:"CZK"},
												{value:"Kr.",label:"DKK"},
												{value:"دج",label:"DZD"},
												{value:"E£",label:"EGP"},
												{value:"€",label:"EUR"},
												{value:"£",label:"GBP"},
												{value:"HK$",label:"HKD"},
												{value:"Rp",label:"IDR"},
												{value:"₪",label:"ILS"},
												{value:"₹",label:"INR"},
												{value:"د.ا",label:"JOD"},
												{value:"¥",label:"JPY"},
												{value:"KSh",label:"KES"},
												{value:"₩",label:"KRW"},
												{value:"KD",label:"KWD"},
												{value:"₸",label:"KZT"},
												{value:"Rs",label:"LKR"},
												{value:"LD",label:"LYD"},
												{value:"DH",label:"MAD"},
												{value:"Ar",label:"MGA"},
												{value:"MRO",label:"MRO"},
												{value:"Mex$",label:"MXN"},
												{value:"RM",label:"MYR"},
												{value:"₦",label:"NGN"},
												{value:"kr",label:"NOK"},
												{value:"NULL",label:"NULL"},
												{value:"$",label:"NZD"},
												{value:"₱",label:"PHP"},
												{value:"₨",label:"PKR"},
												{value:"zł",label:"PLN"},
												{value:"QR",label:"QAR"},
												{value:"₽",label:"RUB"},
												{value:"SR",label:"SAR"},
												{value:"kr",label:"SEK"},
												{value:"S$",label:"SGD"},
												{value:"Sk",label:"SKK"},
												{value:"฿",label:"THB"},
												{value:"DT",label:"TND"},
												{value:"₺",label:"TRY"},
												{value:"NT$",label:"TWD"},
												{value:"₴",label:"UAH"},
												{value:"$",label:"USD"},
												{value:"$U",label:"UYU"},
												{value:"VEF",label:"VEF"},
												{value:"₫",label:"VND"},
												{value:"CFA",label:"XOF"},
												{value:"R",label:"ZAR"}
												],
										show:function(e){
													return "money" === e.numformaty
													}
										}
									  }
								},
								/*
								AxisLimits:{
									type:"items",
									label:"Axis Limits",
									items:{
										Xaxislimitmin:{
										type:"string",
										label:"X Axis Min Limit",
										ref:"xaxislimitmin"
										},
										Xaxislimitmax:{
										type:"string",
										label:"X Axis Max Limit",
										ref:"xaxislimitmax"
										},
										Yaxislimitmin:{
										type:"string",
										label:"Y Axis Min Limit",
										ref:"yaxislimitmin"
										},
										Yaxislimitmax:{
										type:"string",
										label:"Y Axis Max Limit",
										ref:"yaxislimitmax"
										}
									}
								},
								*/
								Bubbleradius:{
								type:"items",
								label:"Bubble Radius",
								items:{
								settings:{
										items:{
											Radius:{
											type:"number",
											component:"slider",
											label:"Radius",
											ref:"bubbleradius",
											min: 0,
											max: 10,
											step: 0.5,
											///defaultValue:"3.5"
											}
										}
								}
								}
								},
								GridLines:{
								type:"items",
								label:"GridLines",
								items:{
										gridlines:{
										type:"string",
										component:"dropdown",
										label:"GridLines",
										ref:"grid",
										options:[{value:'no',label:'No'},
												 {value:'yes',label:'Yes'}]
										}
								}
								}
														
							 }
							},
						
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
											{value: 'polynomial', label: 'Polynomial'},
											{value: 'equilibriumline',label:'Equilibrium Line'}
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
			
				
				function checkNull(value){
				return value=="NaN";
				}	


				function dataArray()
				{
			   	var arr=layout.qHyperCube.qDataPages[0].qMatrix;
				
				var measure_array=new Array();
				
				arr.forEach(function(element) {
  							if(checkNull(element[0].qText) || checkNull(element[1].qText) || checkNull(element[2].qNum) || checkNull(element[3].qNum))
							{}
							else
							{measure_array.push(element)}
							});
							
				return measure_array;
				}
				
				console.log(dataArray());
				
				
				
				
				function make_x_gridlines()
				{
				return d3.axisBottom(x).scale(x).ticks(5);
				}

				function make_y_gridlines()
				{
				return d3.axisLeft(y).scale(y).ticks(5);	
				}
				



				function dotsplot(dataarr,radius,colorDimIndex,xscale,yscale,tipMouseover,tipMouseout)
				{
				var dots = d3.select($element[0]).select(".plot").selectAll(".dot").data(dataarr);
				
				//enter	
				
              		 dots.enter().append("circle")
					.attr("class", "dot")
					.attr("r",radius)
					.attr("stroke",function(d){ return d[colorDimIndex].qText} )
				 	.attr("fill",function(d){return d[colorDimIndex].qText})
					.attr("cx", function(d) { return xscale(d[2].qNum);})
					.attr("cy", function(d) { return yscale(d[3].qNum);})
					.on("mouseover", tipMouseover)
                	.on("mouseout", tipMouseout);
							
				//exit
				dots.exit().remove();
				
				}



				var colorDimIndex = 0;
				var width = $element.width() - layout.margin.left - layout.margin.right;
				var height = $element.height() - layout.margin.top - layout.margin.bottom;
				var x = d3.scaleLinear().domain([0, d3.max(dataArray(), function(d) { return d[2].qNum; })]).range([0, width]).nice();
				var y = d3.scaleLinear().domain([0, d3.max(dataArray(), function(d) { return d[3].qNum; })]).range([height,0]).nice();
				var xdis_xlab=$element.width()/2;
				var ydis_xlab=$element.height()*(0.95);
				/////var xdis_ylab=layout.margin.left*(1/4);
				var xdis_ylab=layout.margin.left*(-0.75);
				var ydis_ylab=$element.height()/2;
				var formatx="$,"+layout.decimalprecisionx;
				var formaty="$,"+layout.decimalprecisiony;
				var radius=layout.bubbleradius;
				var tooltipx=layout.xaxistitle;
				var tooltipy=layout.yaxistitle;
				var tipMouseover;
				var tipMouseout;
				var xgrid=make_x_gridlines();
				var ygrid=make_y_gridlines();


				
				

				
				var id = "ext_" + layout.qInfo.qId;
				  if (!document.getElementById(id)) {
					  $element.append($("<div qv-extension />").attr("id",id));
				  }else{
					  $("#" + id)
					  .empty()
					  .removeClass();
				  }
				  $("#" + id)
				  .addClass("regression-plot")
				  .append("<svg><g class='plot'><g class='x-axis'></g><g class='y-axis'></g></g><g class='x-label'></g><g class='y-label'></g></svg>");
				
				
				
				//var colorDimIndex = 0;
				layout.qHyperCube.qDimensionInfo.forEach(function(o,i){
					if (o.IsColorDimension){
						colorDimIndex = i;
					}
				});		
				
				var svg=d3.select($element[0]).select("svg").attr("width", $element.width()).attr("height", $element.height());
				var zoom=d3.zoom().on("zoom",zoomed);
				svg.call(zoom);
				var plot=d3.select($element[0]).select(".plot").attr("transform", "translate(" + layout.margin.left + "," + layout.margin.top + ")");	
				

				
				if(layout.grid=="yes")
				{
				
				// add the X gridlines
  				var X_gridlines=d3.select($element[0]).select(".plot").append("g")			
     			 	.attr("class", "grid")
      				.attr("transform", "translate(0," + height + ")")
      				.call(xgrid
          			.tickSize(-height)
          			.tickFormat("")
     				 )

  				// add the Y gridlines
 				var Y_gridlines=d3.select($element[0]).select(".plot").append("g")			
     				.attr("class", "grid")
      				.call(ygrid
          			.tickSize(-width)
          			.tickFormat("")
     	 			)
				}
				else
				{
				// add the X gridlines
  				var X_gridlines=d3.select($element[0]).select(".plot").append("g")			
     			 	.attr("class", "grid")
      				.attr("transform", "translate(0," + height + ")")
      				.call(xgrid)

  				// add the Y gridlines
 				var Y_gridlines=d3.select($element[0]).select(".plot").append("g")			
     				.attr("class", "grid")
      				.call(ygrid)
				}		
				
				
				
				
				
				
				if(layout.numformatx=="money")
				{
				var d3loc_x={
				 	"decimal": ".",
 				 	"thousands": ",",
 				 	"grouping": [3],
 				 	"currency": [layout.xcurrency, ""]
				};
				
				d3.formatDefaultLocale(d3loc_x);
				
				var XA=d3.axisBottom(x).ticks(5).tickFormat(d3.format(formatx));
				var xaxis=d3.select($element[0]).select(".x-axis").attr("transform", "translate(0,"+height+")").call(XA);				
				}				
				else
				{
				var XA=d3.axisBottom(x).ticks(5).tickFormat(d3.format(layout.decimalprecisionx));
				var xaxis=d3.select($element[0]).select(".x-axis").attr("transform", "translate(0,"+height+")").call(XA);
				}
		
		
				if(layout.numformaty=="money")
				{
				var d3loc_y={
				 	"decimal": ".",
 				 	"thousands": ",",
 				 	"grouping": [3],
 				 	"currency": [layout.ycurrency, ""]
				};
				
				d3.formatDefaultLocale(d3loc_y);
				
				var YA=d3.axisLeft(y).ticks(5).tickFormat(d3.format(formaty));
				var yaxis=d3.select($element[0]).select(".y-axis").attr("transform", "translate(0,0)").call(YA);
				}				
				else
				{				
				var YA=d3.axisLeft(y).ticks(5).tickFormat(d3.format(layout.decimalprecisiony));
				var yaxis=d3.select($element[0]).select(".y-axis").attr("transform", "translate(0,0)").call(YA);
				}
				
				
				
				if(layout.xaxistitle!="")
				{
				// x label 
				var x_label=d3.select($element[0]).select(".x-label").append("text").attr("transform","translate("+xdis_xlab+","+ydis_xlab+")").style("text-anchor", "middle").text(layout.xaxistitle);		
				}
				else
				{
				// x label 
				var x_label=d3.select($element[0]).select(".x-label").append("text").attr("transform","translate("+xdis_xlab+","+ydis_xlab+")").style("text-anchor", "middle").text(this.backendApi.getMeasureInfos()[0].qFallbackTitle);		
				} 
				
				
				if(layout.yaxistitle!="")
				{
				// y label	
				var y_label=d3.select($element[0]).select(".y-label").append("text").attr( "transform","translate("+xdis_ylab+","+ydis_ylab+") rotate(-90)").style("text-anchor", "middle").text(layout.yaxistitle);
				}
				else
				{
				// y label
				var y_label=d3.select($element[0]).select(".y-label").append("text").attr( "transform","translate("+xdis_ylab+","+ydis_ylab+") rotate(-90)").style("text-anchor", "middle").text(this.backendApi.getMeasureInfos()[1].qFallbackTitle);
				}
				
				



				// Add the tooltip container to the vis container
              // it's invisible and its position/contents are defined during mouseover
              var tooltip = d3.select($element[0]).append("div").attr("class", "tooltip").style("opacity",0.5);
			
              // tooltip mouseover event handler
              tipMouseover = function(d) {
              	  
                  var color = "white";
				  var state=d[0].qText;
				  var xval=d[2].qText;
				  var yval=d[3].qText;
				
				  //var tooltipx=layout.xaxistitle;
				  //var tooltipy=layout.yaxistitle;
				  
				  if(layout.xaxistitle=="")
				  {
				  tooltipx=layout.qHyperCube.qMeasureInfo[0].qFallbackTitle;
				  }
				  
				  if(layout.yaxistitle=="")
				  {
				  tooltipy=layout.qHyperCube.qMeasureInfo[1].qFallbackTitle;
				  }
				  
           
				  var html  = "<div style='background-color: black ;opacity:0.5;padding:5px ; border-radius: 5px'><span style='color:" + color + ";font-size:14px; font-weight:bold '>" +state+ "</span><br><span style='color:" + color + ";font-size:11px;'>"+tooltipx+" : " +xval+ " <br> "+tooltipy+" : "+yval+"</span><br/></div>"
				  		  
				  tooltip.html(html)
                      .style("left", d3.select(this).attr("cx")+"px")
                      .style("top", d3.select(this).attr("cy")+"px")
                      .transition()
                      .duration(200) // ms
                      .style("opacity", .9)  

              };
			  
              // tooltip mouseout event handler
              tipMouseout = function(d) {
                  tooltip.transition()
                      .duration(300) // ms
                      .style("opacity", 0); // don't care about position!
              };

              	dotsplot(dataArray(),radius,colorDimIndex,x,y,tipMouseover,tipMouseout);
	          	

				
				
				/*
				/////// DOTS //////	
				
				var dots = d3.select($element[0]).select(".plot").selectAll(".dot").data(measure_array);
				
				
				//enter	
				setTimeout(() => {
              		 dots.enter().append("circle")
					.attr("class", "dot")
					.attr("r",layout.bubbleradius)
					.attr("stroke",function(d){ return d[colorDimIndex].qText} )
				 	.attr("fill",function(d){return d[colorDimIndex].qText})
					.attr("cx", function(d) { return x(d[2].qNum);})
					.attr("cy", function(d) { return y(d[3].qNum);})
					.on("mouseover", tipMouseover)
                	.on("mouseout", tipMouseout);

              	}, 0)
								
				
				//exit
				dots.exit().remove();
				
				//update 
				setTimeout(() => {
              		 dots.enter().append("circle")
					.attr("class", "dot")
					.attr("r",layout.bubbleradius)
					.attr("stroke",function(d){ return d[colorDimIndex].qText} )
				 	.attr("fill",function(d){return d[colorDimIndex].qText})
					.attr("cx", function(d) { return x(d[2].qNum);})
					.attr("cy", function(d) { return y(d[3].qNum);})
					.on("mouseover", tipMouseover)
                	.on("mouseout", tipMouseout);

              	}, 0)
				*/
			
				/*
				//// REGRESSION LINE ////
				var regressionLine = d3.select($element[0]).select(".plot").selectAll(".regression").data([regressionPoints]);
				
				//enter
				var regline=regressionLine.enter().append("path")
					.attr("class", "regression")
					.attr("stroke", "black")
					.attr("stroke-width", "1px")
					.attr("d", d3.line().curve(d3.curveCardinal).x(function(d){return x(d[0]); }).y(function(d){ return y(d[1]);}));
				
				//exit
				regressionLine.exit().remove();
				
				//update
				regressionLine
					.attr("stroke", "black")
					.attr("d", d3.line().curve(d3.curveCardinal).x(function(d){ return x(d[0]); }).y(function(d){ return y(d[1]); }));
				
				*/
				
				function zoomed() {
				
				var new_xScale = d3.event.transform.rescaleX(x);
  				var new_yScale = d3.event.transform.rescaleY(y);
				
				xaxis.call(XA.scale(new_xScale));
				yaxis.call(YA.scale(new_yScale));
				
				X_gridlines.call(xgrid.scale(new_xScale));
				Y_gridlines.call(ygrid.scale(new_yScale));
				
				var xMin = new_xScale.domain()[0];
				console.log(xMin);
				var xMax = new_xScale.domain()[1];
				console.log(xMax);
				var yMin = new_yScale.domain()[0];
				console.log(yMin);
				var yMax = new_yScale.domain()[1];
				console.log(yMax);
				
				var arr=layout.qHyperCube.qDataPages[0].qMatrix;
				var measure_array_zoom=new Array();

				arr.forEach(function(element) {
  							if(checkNull(element[0].qText) || checkNull(element[1].qText) || checkNull(element[2].qNum) || checkNull(element[3].qNum))
							{}
							else if(element[2].qNum<xMin)
							{}
							else if(element[2].qNum>xMax)
							{}
							else if(element[3].qNum<yMin)
							{}
							else if(element[3].qNum>yMax)
							{}
							else
							{measure_array_zoom.push(element)}
							});


				console.log(measure_array_zoom);

				////dotsplot(measure_array_zoom,radius,colorDimIndex,new_xScale,new_yScale,tipMouseover,tipMouseout);

				/*
				measure_array=[];
								
				arr.forEach(function(element) {
  							if(checkNull(element[0].qText) || checkNull(element[1].qText) || checkNull(element[2].qNum) || checkNull(element[3].qNum))
							{}
							else if(element[2].qNum<xMin)
							{}
							else if(element[2].qNum>xMax)
							{}
							else if(element[3].qNum<yMin)
							{}
							else if(element[3].qNum>yMax)
							{}
							else
							{measure_array.push(element)}
							});
																
				/////measurearr();
				
				circles.attr("cx", function(d) { return new_xScale(d[2].qNum);});
				circles.attr("cy", function(d) { return new_yScale(d[3].qNum);});
				
				
				regressionPoints=[];
				
				if(layout.regression.type=="none")
				{
					regressionPoints = [];
				}
				else if(layout.regression.type == "equilibriumline")
				{
					var generateRegressionPoints = function() {
					var arr = [[0,0],[1000,1000]];
					
					return arr;
					};									
					regressionPoints = generateRegressionPoints();					
				}
				else
				{
					var generateRegressionPoints = function() {
					var arr = [];
					
					var data = measure_array.map(function(row){
						return [row[2].qNum,row[3].qNum]
					});
					console.log(data);
					var regression_predict = regression(layout.regression.type,measure_array.map(function(row){
						return [row[2].qNum,row[3].qNum]}), layout.regression.order);
					
					var min = data.reduce(function(min, val) { 
						return val[0] < min ? val[0] : min; 
					}, data[0][0]);
					var max = data.reduce(function(max, val) { 
						return val[0] > max ? val[0] : max; 
					}, data[0][0]);
					
					var extent = max - min;
																								
					for(var i = 0; i < 1000; i++) {
						var x = 0 + (extent/1000)*i;
						arr.push(regression_predict.predict(x));
					}
					return arr;
					};
					regressionPoints = generateRegressionPoints();					
				}
				
				console.log(regressionPoints);
				
				////regpoints();
				
				regline.attr("d", d3.line().curve(d3.curveCardinal).x(function(d){ return new_xScale(d[0]); }).y(function(d){ return new_yScale(d[1]);}));
				
				*/
				
				
				
				
  				}
				
				
				
				
				//needed for export
				return qlik.Promise.resolve();
				
			}

		};
	});





	
	
				/*
			 
              var that = this
			  var evaluateColorCode = function(d){
			  	console.log(that.$scope.colorCode)
			  	try{
			  		
			  	}catch(ex){console.log(ex)}
			  	
			  	var o = Math.round, r = Math.random, s = 255;
    			return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
			  }
			*/
			


			/*
				
				function dataRegPoints()
				{
				
				var regressionPoints = [];
				
				if(layout.regression.type=="none")
				{
					regressionPoints = [];
				}
				else if(layout.regression.type == "equilibriumline")
				{
					var generateRegressionPoints = function() {
					var arr = [[0,0],[1000,1000]];
					return arr;
					};									
					regressionPoints = generateRegressionPoints();					
				}
				else
				{
					var generateRegressionPoints = function() {
					var arr = [];
					
					var data = measure_array.map(function(row){
						return [row[2].qNum,row[3].qNum]
					});
					
					var regression_predict = regression(layout.regression.type,measure_array.map(function(row){
						return [row[2].qNum,row[3].qNum]}), layout.regression.order);
					
					var min = data.reduce(function(min, val) { 
						return val[0] < min ? val[0] : min; 
					}, data[0][0]);
					var max = data.reduce(function(max, val) { 
						return val[0] > max ? val[0] : max; 
					}, data[0][0]);
					
					var extent = max - min;
															
					for(var i = 0; i < 1000; i++) {
						
						var x = 0 + (extent/1000)*i;
						arr.push(regression_predict.predict(x));
					}
					return arr;
					};
					regressionPoints = generateRegressionPoints();					
				}
				
				return regressionPoints;
				}
							
				console.log(dataRegPoints());
				*/

