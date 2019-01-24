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
										options:[{value:"dollar",label:"Dollar"},
												 {value:"euro",label:"Euro"}],
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
										options:[{value:"dollar",label:"Dollar"},
												 {value:"euro",label:"Euro"}],
										show:function(e){
													return "money" === e.numformaty
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
			   	var arr=layout.qHyperCube.qDataPages[0].qMatrix;
				//console.log(arr);
				
				function checkNull(value){
				return value=="NaN";
				}					
				
				var measure_array=new Array();
				
				arr.forEach(function(element) {
  							if(checkNull(element[0].qText) || checkNull(element[1].qText) || checkNull(element[2].qNum) || checkNull(element[3].qNum))
							{}
							else
							{measure_array.push(element)}
							});
							
				//console.log(measure_array);
				
				//this.$scope.measure_array=measure_array;
				
				var colorDimIndex = 0;
				
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
					

				//console.log(layout.qHyperCube.qDimensionInfo);
				
				layout.qHyperCube.qDimensionInfo.forEach(function(o,i){
					if (o.IsColorDimension){
						colorDimIndex = i;
					}
				});		
				
				
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
						var x = min + (extent/1000)*i;
						arr.push(regression_predict.predict(x));
					}
					return arr;
				};
				
				
				if(layout.regression.type=="none")
				{
				var regressionPoints = []
				}
				else
				{
				// get points on regression line
				var regressionPoints = generateRegressionPoints();
				}
				
				// svg width and height
				var width = $element.width() - layout.margin.left - layout.margin.right;
				var height = $element.height() - layout.margin.top - layout.margin.bottom;
				
				d3.select($element[0]).select("svg").attr("width", $element.width()).attr("height", $element.height());
				d3.select($element[0]).select(".plot").attr("transform", "translate(" + layout.margin.left + "," + layout.margin.top + ")");	
				
				// scales
				var x = d3.scaleLinear().domain([d3.min(measure_array, function(d) { return d[2].qNum; }), d3.max(measure_array, function(d) { return d[2].qNum; })]).range([0, width]);
				var y = d3.scaleLinear().domain([d3.min(measure_array, function(d) { return d[3].qNum; }), d3.max(measure_array, function(d) { return d[3].qNum; })]).range([height,0]);
			
				
				if(layout.grid=="yes")
				{
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
				}
				else
				{
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
          			 )

  				// add the Y gridlines
 				d3.select($element[0]).select(".plot").append("g")			
     				.attr("class", "grid")
      				.call(make_y_gridlines()
          			)
				}
							
								
				if(layout.numformatx=="money" && layout.xcurrency=="dollar")
				{
				var d3loc_dollarx={
				 	"decimal": ".",
 				 	"thousands": ",",
 				 	"grouping": [3],
 				 	"currency": ["$", ""]
				};
				
				d3.formatDefaultLocale(d3loc_dollarx);
				
				var dollarformatx="$,"+layout.decimalprecisionx;
				console.log(dollarformatx);
				d3.select($element[0]).select(".x-axis").attr("transform", "translate(0,"+height+")").call(d3.axisBottom(x).ticks(5).tickFormat(d3.format(dollarformatx)));				
				}
				else if(layout.numformatx=="money" && layout.xcurrency=="euro")
				{
				var d3loc_eurox={
				 	"decimal": ".",
 				 	"thousands": ",",
 				 	"grouping": [3],
 				 	"currency": ["€",""]
				};
				
				d3.formatDefaultLocale(d3loc_eurox);
				
				var euroformatx="$,"+layout.decimalprecisionx;
				console.log(euroformatx);			
				d3.select($element[0]).select(".x-axis").attr("transform", "translate(0,"+height+")").call(d3.axisBottom(x).ticks(5).tickFormat(d3.format(euroformatx)));
				}
				else
				{
				d3.select($element[0]).select(".x-axis").attr("transform", "translate(0,"+height+")").call(d3.axisBottom(x).ticks(5).tickFormat(d3.format(layout.decimalprecisionx)));
				}
				
			
				
				if(layout.numformaty=="money" && layout.ycurrency=="dollar")
				{
				var d3loc_dollary={
				 	"decimal": ".",
 				 	"thousands": ",",
 				 	"grouping": [3],
 				 	"currency": ["$", ""]
				};
				
				d3.formatDefaultLocale(d3loc_dollary);
				
				var dollarformaty="$,"+layout.decimalprecisiony;
				console.log(dollarformaty);				
				d3.select($element[0]).select(".y-axis").attr("transform", "translate(0,0)").call(d3.axisLeft(y).ticks(5).tickFormat(d3.format(dollarformaty)));
				}
				else if(layout.numformaty=="money" && layout.ycurrency=="euro")
				{
				var d3loc_euroy={
				 	"decimal": ".",
 				 	"thousands": ",",
 				 	"grouping": [3],
 				 	"currency": ["€",""]
				};
				
				d3.formatDefaultLocale(d3loc_euroy);
				
				var euroformaty="$,"+layout.decimalprecisiony;
				console.log(euroformaty);
				d3.select($element[0]).select(".y-axis").attr("transform", "translate(0,0)").call(d3.axisLeft(y).ticks(5).tickFormat(d3.format(euroformaty)));
				}
				else
				{				
				d3.select($element[0]).select(".y-axis").attr("transform", "translate(0,0)").call(d3.axisLeft(y).ticks(5).tickFormat(d3.format(layout.decimalprecisiony)));
				}
				
				
				
				/*
				if(layout.xcurrency=="dollar")
				{
				var d3loc_dollar={
				 	"decimal": ".",
 				 	"thousands": ",",
 				 	"grouping": [3],
 				 	"currency": ["$", ""]
				};
				
				d3.formatDefaultLocale(d3loc_dollar);
				
				var dollarformatx="$,"+layout.decimalprecisionx;
				console.log(dollarformatx);				
								
				if(layout.numformatx=="money")
				{
				d3.select($element[0]).select(".x-axis").attr("transform", "translate(0,"+height+")").call(d3.axisBottom(x).ticks(5).tickFormat(d3.format(dollarformatx)));				
				}
				else
				{				
				d3.select($element[0]).select(".x-axis").attr("transform", "translate(0,"+height+")").call(d3.axisBottom(x).ticks(5).tickFormat(d3.format(layout.decimalprecisionx)));
				}
				
				}
				else if(layout.xcurrency=="euro")
				{
				var d3loc_euro={
				 	"decimal": ".",
 				 	"thousands": ",",
 				 	"grouping": [3],
 				 	"currency": ["€",""]
				};
				
				d3.formatDefaultLocale(d3loc_euro);
				
				var euroformatx="$,"+layout.decimalprecisionx;
				console.log(euroformatx);					
				
				if(layout.numformatx=="money")
				{				
				d3.select($element[0]).select(".x-axis").attr("transform", "translate(0,"+height+")").call(d3.axisBottom(x).ticks(5).tickFormat(d3.format(euroformatx)));
				}
				else
				{
				d3.select($element[0]).select(".x-axis").attr("transform", "translate(0,"+height+")").call(d3.axisBottom(x).ticks(5).tickFormat(d3.format(layout.decimalprecisionx)));
				}
				
				}
				
				
				
				if(layout.ycurrency=="dollar")
				{
				var d3loc_dollar={
				 	"decimal": ".",
 				 	"thousands": ",",
 				 	"grouping": [3],
 				 	"currency": ["$", ""]
				};
				
				d3.formatDefaultLocale(d3loc_dollar);
				
				var dollarformaty="$,"+layout.decimalprecisiony;
				console.log(dollarformaty);
								
				if(layout.numformaty=="money")
				{				
				d3.select($element[0]).select(".y-axis").attr("transform", "translate(0,0)").call(d3.axisLeft(y).ticks(5).tickFormat(d3.format(dollarformaty)));
				}
				else
				{				
				d3.select($element[0]).select(".y-axis").attr("transform", "translate(0,0)").call(d3.axisLeft(y).ticks(5).tickFormat(d3.format(layout.decimalprecisiony)));
				}
				
				}					
				else if(layout.ycurrency=="euro")
				{
				var d3loc_euro={
				 	"decimal": ".",
 				 	"thousands": ",",
 				 	"grouping": [3],
 				 	"currency": ["€",""]
				};
				
				d3.formatDefaultLocale(d3loc_euro);
				
				var euroformaty="$,"+layout.decimalprecisiony;
				console.log(euroformaty);
				
				if(layout.numformaty=="money")
				{				
				d3.select($element[0]).select(".y-axis").attr("transform", "translate(0,0)").call(d3.axisLeft(y).ticks(5).tickFormat(d3.format(euroformaty)));
				}
				else
				{				
				d3.select($element[0]).select(".y-axis").attr("transform", "translate(0,0)").call(d3.axisLeft(y).ticks(5).tickFormat(d3.format(layout.decimalprecisiony)));
				}
				
				}
				
				*/
	
				var xdis_xlab=$element.width()/2;
				var ydis_xlab=$element.height()*(0.95);
				
				var xdis_ylab=layout.margin.left*(1/4);
				var ydis_ylab=$element.height()/2;
				
				
				if(layout.xaxistitle!="")
				{
				// x label 
				d3.select($element[0]).select(".x-label").append("text").attr("transform","translate("+xdis_xlab+","+ydis_xlab+")").style("text-anchor", "middle").text(layout.xaxistitle);		
				}
				else
				{
				// x label 
				d3.select($element[0]).select(".x-label").append("text").attr("transform","translate("+xdis_xlab+","+ydis_xlab+")").style("text-anchor", "middle").text(this.backendApi.getMeasureInfos()[0].qFallbackTitle);		
				} 
				
				
				if(layout.yaxistitle!="")
				{
				// y label	
				d3.select($element[0]).select(".y-label").append("text").attr( "transform","translate("+xdis_ylab+","+ydis_ylab+") rotate(-90)").style("text-anchor", "middle").text(layout.yaxistitle);
				}
				else
				{
				// y label
				d3.select($element[0]).select(".y-label").append("text").attr( "transform","translate("+xdis_ylab+","+ydis_ylab+") rotate(-90)").style("text-anchor", "middle").text(this.backendApi.getMeasureInfos()[1].qFallbackTitle);
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
				
				  var tooltipx=layout.xaxistitle;
				  var tooltipy=layout.yaxistitle;
				  
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
				var dots = d3.select($element[0]).select(".plot").selectAll(".dot").data(measure_array);
				//console.log(measure_array);
				
				
				//enter				
    			setTimeout(() => {
              		 dots.enter().append("circle")
					.attr("class", "dot")
					.attr("r",3.5)
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
					.attr("r",3.5)
					.attr("stroke",function(d){ return d[colorDimIndex].qText} )
				 	.attr("fill",function(d){return d[colorDimIndex].qText})
					.attr("cx", function(d) { return x(d[2].qNum);})
					.attr("cy", function(d) { return y(d[3].qNum);})
					.on("mouseover", tipMouseover)
                	.on("mouseout", tipMouseout);

              	}, 0)


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
				
			}

		};
	});
