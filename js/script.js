var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;          //define the size of the bars//

var x = d3.scale.ordinal()    
    .rangeRoundBands([0, width], .1);   //set the width of x-axis//

var y = d3.scale.linear()   //set the width of y-axis//
    .range([height, 0]);

var xAxis = d3.svg.axis() //put x-axis at the bottom//
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()//put y-axis at the left//
    .scale(y)
    .orient("left")
    .ticks(10, "%"); //set the scale of y-axis//

var svg = d3.select(".chart").append("svg") 
    .attr("width", width + margin.left + margin.right) //attribute the width to "width"//
    .attr("height", height + margin.top + margin.bottom)//attribute the height to "height"//
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("js/baseballcard.json", function(error, data) {
	console.log(data);//call the json doc//

  x.domain(data.stats.map(function(d) { return d.year; })); //set year as data on x-axis//
  y.domain([0, d3.max(data.stats, function(d) { return d.H; })]); //set home run as data on y-axis//

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")") //set the scale of x-axis//
      .call(xAxis);

  svg.append("g") 
      .attr("class", "y axis") //set the scale of y-axis//
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Home Run");

  svg.selectAll(".bar")
      .data(data.stats) //call data//
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.year); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.H); })
      .attr("height", function(d) { return height - y(d.H); });

});












