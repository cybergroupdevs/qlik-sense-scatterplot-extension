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
								
								Bubbleradius:{
								type:"items",
								label:"Bubble Radius",
								items:{
									Radius:{
									type:"string",
									label:"Radius",
									ref:"bubbleradius",
									defaultValue:"3.5"
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
			   	var arr=layout.qHyperCube.qDataPages[0].qMatrix;
								
				function checkNull(value){
				return value=="NaN";
				}					
				
				var measure_array=new Array();
					
				
				arr.forEach(function(element) {
  							if(checkNull(element[0].qText) || checkNull(element[1].qText) || checkNull(element[2].qNum) || checkNull(element[3].qNum))
							{}
							else if(layout.xaxislimitmin!="" & element[2].qNum<layout.xaxislimitmin)
							{}
							else if(layout.xaxislimitmax!="" & element[2].qNum>layout.xaxislimitmax)
							{}
							else if(layout.yaxislimitmin!="" & element[3].qNum<layout.yaxislimitmin)
							{}
							else if(layout.yaxislimitmax!="" & element[3].qNum>layout.yaxislimitmax)
							{}
							else
							{measure_array.push(element)}
							});
							
				
				
				/*
				arr.forEach(function(element) {
  							if(checkNull(element[0].qText) || checkNull(element[1].qText) || checkNull(element[2].qNum) || checkNull(element[3].qNum))
							{}
							else
							{measure_array.push(element)}
							});
				*/
				
				
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
					
				layout.qHyperCube.qDimensionInfo.forEach(function(o,i){
					if (o.IsColorDimension){
						colorDimIndex = i;
					}
				});		
				
				// svg width and height
				var width = $element.width() - layout.margin.left - layout.margin.right;
				var height = $element.height() - layout.margin.top - layout.margin.bottom;
				
				d3.select($element[0]).select("svg").attr("width", $element.width()).attr("height", $element.height());
				d3.select($element[0]).select(".plot").attr("transform", "translate(" + layout.margin.left + "," + layout.margin.top + ")");	
				
				/*
				// scales
				var x = d3.scaleLinear().domain([d3.min(measure_array, function(d) { return d[2].qNum; }), d3.max(measure_array, function(d) { return d[2].qNum; })]).range([0, width]);
				var y = d3.scaleLinear().domain([d3.min(measure_array, function(d) { return d[3].qNum; }), d3.max(measure_array, function(d) { return d[3].qNum; })]).range([height,0]);
				*/
			
			
				/*
				// scales Used
				var x = d3.scaleLinear().domain([0, d3.max(measure_array, function(d) { return d[2].qNum; })]).range([0, width]);
				var y = d3.scaleLinear().domain([0, d3.max(measure_array, function(d) { return d[3].qNum; })]).range([height,0]);
				*/
				
				/*
				// scales Used
				var x = d3.scaleLinear().domain([layout.xaxislimitmin, layout.xaxislimitmax]).range([0, width]);
				var y = d3.scaleLinear().domain([layout.yaxislimitmin, layout.yaxislimitmax]).range([height,0]);
				*/
				
				
				if(layout.xaxislimitmin!=""  &  layout.xaxislimitmax!="")
				{
				var x = d3.scaleLinear().domain([layout.xaxislimitmin, layout.xaxislimitmax]).range([0, width]);
				}
				else if(layout.xaxislimitmin!="")
				{
				var x = d3.scaleLinear().domain([layout.xaxislimitmin, d3.max(measure_array, function(d) { return d[2].qNum; })]).range([0, width]);
				}
				else if(layout.xaxislimitmax!="")
				{
				var x = d3.scaleLinear().domain([0, layout.xaxislimitmax]).range([0, width]);
				}
				else
				{
				var x = d3.scaleLinear().domain([0, d3.max(measure_array, function(d) { return d[2].qNum; })]).range([0, width]);
				}
			
			
				if(layout.yaxislimitmin!=""  &  layout.yaxislimitmax!="")
				{
				var y = d3.scaleLinear().domain([layout.yaxislimitmin, layout.yaxislimitmax]).range([height,0]);
				}
				else if(layout.yaxislimitmin!="")
				{
				var y = d3.scaleLinear().domain([layout.yaxislimitmin, d3.max(measure_array, function(d) { return d[3].qNum; })]).range([height,0]);
				}
				else if(layout.yaxislimitmax!="")
				{
				var y = d3.scaleLinear().domain([0, layout.yaxislimitmax]).range([height,0]);
				}		
				else
				{
				var y = d3.scaleLinear().domain([0, d3.max(measure_array, function(d) { return d[3].qNum; })]).range([height,0]);
				}
				
			
				//console.log(layout);
				//console.log(layout.xaxislimitmin);
				//console.log(layout.xaxislimitmax);
				//console.log(layout.yaxislimitmin);
				//console.log(layout.yaxislimitmax);
				
				
				/*
				if(layout.regression.type=="none")
				{
					var regressionPoints = [];
				}
				else if(layout.regression.type == "equilibriumline")
				{
					var generateRegressionPoints = function() {
					var arr = [];
					
					var data = measure_array.map(function(row){
						return [row[2].qNum,row[3].qNum]
					});							
					var min = data.reduce(function(min, val) { 
						return val[0] < min ? val[0] : min; 
					}, data[0][0]);
					var max = data.reduce(function(max, val) { 
						return val[0] > max ? val[0] : max; 
					}, data[0][0]);
					var extent = max - min;
					for(var i = 0; i < 1000; i++) {
						//var x = min + (extent/1000)*i;
						var x =0+(extent/1000)*i;
						arr.push([x,-x+height]);									
						}
					
					//console.log("reg_array"+arr);
					return arr;
					};									
					var regressionPoints = generateRegressionPoints();
					//console.log(regressionPoints);
				}
				else
				*/
				
				
				
				if(layout.regression.type=="none")
				{
					var regressionPoints = [];
				}
				else if(layout.regression.type == "equilibriumline")
				{
					var generateRegressionPoints = function() {
					////////var arr = [[0,0],[1000,1000]];
					
					if(layout.xaxislimitmin!="" & layout.yaxislimitmin!="")
					{
					var arr = [[layout.xaxislimitmin,layout.yaxislimitmin],[1000,1000]];
					}
					else if(layout.xaxislimitmin!="")
					{
					var arr = [[layout.xaxislimitmin,0],[1000,1000]];
					}
					else if(layout.yaxislimitmin!="")
					{
					var arr = [[0,layout.yaxislimitmin],[1000,1000]];
					}
					else
					{
					var arr = [[0,0],[1000,1000]];
					}
					
					return arr;
					};									
					var regressionPoints = generateRegressionPoints();					
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
					var max1=layout.xaxislimitmax;
					var min1=layout.xaxislimitmin;
					
					var extent1 =max1-min1;
					var extent2 =max1-min;
										
					console.log(extent1);
					for(var i = 0; i < 1000; i++) {
						
						if(layout.xaxislimitmin!="" & layout.xaxislimitmax!="")
						{
						var x = min + (extent1/1000)*i;
						}
						else if(layout.xaxislimitmin!="")
						{
						var x = min + (extent/1000)*i;
						}
						else if(layout.xaxislimitmax!="")
						{
						var x = min + (extent2/1000)*i;
						}
						else
						{
						var x = 0 + (extent/1000)*i;
						}
						
						/*
						if(layout.xaxislimitmin!="")
						{
						var x = min1 + (extent1/1000)*i;
						}
						else
						{
						var x = min + (extent/1000)*i;
						}
						*/
						
						/////////////////////var x = min + (extent/1000)*i;
						//////////var x = 0 + (extent/1000)*i;
						arr.push(regression_predict.predict(x));
					}
					return arr;
					};
					var regressionPoints = generateRegressionPoints();
					//console.log(regressionPoints);
				}
				
				
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
						
				if(layout.numformatx=="money")
				{
				var d3loc_x={
				 	"decimal": ".",
 				 	"thousands": ",",
 				 	"grouping": [3],
 				 	"currency": [layout.xcurrency, ""]
				};
				
				d3.formatDefaultLocale(d3loc_x);
				
				var formatx="$,"+layout.decimalprecisionx;
				//console.log(formatx);
				d3.select($element[0]).select(".x-axis").attr("transform", "translate(0,"+height+")").call(d3.axisBottom(x).ticks(5).tickFormat(d3.format(formatx)));				
				}				
				else
				{
				d3.select($element[0]).select(".x-axis").attr("transform", "translate(0,"+height+")").call(d3.axisBottom(x).ticks(5).tickFormat(d3.format(layout.decimalprecisionx)));
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
				
				var formaty="$,"+layout.decimalprecisiony;
				console.log(formaty);				
				d3.select($element[0]).select(".y-axis").attr("transform", "translate(0,0)").call(d3.axisLeft(y).ticks(5).tickFormat(d3.format(formaty)));
				}				
				else
				{				
				d3.select($element[0]).select(".y-axis").attr("transform", "translate(0,0)").call(d3.axisLeft(y).ticks(5).tickFormat(d3.format(layout.decimalprecisiony)));
				}
				
				
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
			  		
			  	}catch(ex){console.log(ex)}
			  	
			  	var o = Math.round, r = Math.random, s = 255;
    			return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
			  }
			
				
				
				/////// DOTS //////	
				
				var dots = d3.select($element[0]).select(".plot").selectAll(".dot").data(measure_array);
				
				////////console.log(layout.bubbleradius);
				
				if(layout.bubbleradius!="")
				{
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
				
				}
				else
				{
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
				
				}
				
								
				
				/*
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
				*/
				
				
				
				
				
				/*
				//// REGRESSION LINE ////
				var regressionLine = d3.select($element[0]).select(".plot").selectAll(".regression").data([regressionPoints]);
				
				if(layout.regression.type=="equilibriumline")
				{
				//enter
				var lineGenerator = d3.line().curve(d3.curveCardinal);
				var array_reg=[];
				
				regressionPoints.forEach(function(element){array_reg.push([element[0],element[1]])});
								
				var pathData = lineGenerator(array_reg);
				
				regressionLine.enter().append("path")
					.attr("class", "regression")
					.attr("stroke", "black")
					.attr("stroke-width", "1px")
					.attr("d",d3.line().curve(d3.curveCardinal)(array_reg));
				
				//exit
				regressionLine.exit().remove();
				
				//update
				regressionLine
					.attr("stroke", "black")
					.attr("d",d3.line().curve(d3.curveCardinal)(array_reg));
					
				//needed for export
				return qlik.Promise.resolve();
				}
				else
				*/
				
				
				//// REGRESSION LINE ////
			
				var regressionLine = d3.select($element[0]).select(".plot").selectAll(".regression").data([regressionPoints]);
				
				//enter
				regressionLine.enter().append("path")
					.attr("class", "regression")
					.attr("stroke", "black")
					.attr("stroke-width", "1px")
					.attr("d", d3.line().curve(d3.curveCardinal).x(function(d){return x(d[0]); }).y(function(d){ return y(d[1]); }));
												
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
