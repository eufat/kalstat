/**
 * Created by Eufrat Tsaqib on 2/15/2016.
 */
nv.addGraph(function () {
    var data = chiSquare();
    var chiChart = nv.models.lineChart() //Adjust chart margins to give the x-axis some breathing room.
        .useInteractiveGuideline(true)       //Show the legend, allowing users to turn on/off line series.
        .showYAxis(true)        //Show the y-axis
        .showXAxis(true)
        .height(250);

    chiChart.xAxis     //Chart x-axis settings
        .axisLabel('X')
        .tickFormat(d3.format(',r'));

    chiChart.forceX([0,10]);

    chiChart.yAxis     //Chart y-axis settings
        .axisLabel('Y')
        .tickFormat(d3.format('.02f'));


    d3.select('#chi svg')    //Select the <svg> element you want to render the chart in.
        .datum(data)         //Populate the <svg> element with chart data...
        .call(chiChart);          //Finally, render the chart!

    //Update the chart when window resizes.
    nv.utils.windowResize(function () {
        chiChart.update()
    });
    return chiChart;
});

nv.addGraph(function () {
    var data = normal();
    var normalChart = nv.models.lineChart() //Adjust chart margins to give the x-axis some breathing room.
        .useInteractiveGuideline(true)       //Show the legend, allowing users to turn on/off line series.
        .showYAxis(true)        //Show the y-axis
        .showXAxis(true)
        .height(250);

    normalChart.xAxis     //Chart x-axis settings
        .axisLabel('X')
        .tickFormat(d3.format(',r'));

    normalChart.yAxis     //Chart y-axis settings
        .axisLabel('Y')
        .tickFormat(d3.format('.02f'));


    d3.select('#normal svg')    //Select the <svg> element you want to render the chart in.
        .datum(data)         //Populate the <svg> element with chart data...
        .call(normalChart);          //Finally, render the chart!

    //Update the chart when window resizes.
    nv.utils.windowResize(function () {
        normalChart.update()
    });
    return normalChart;
});


/**************************************
 * Data generators
 */
function chiSquare() {
    var chi = [], k = 5;

    //Data is represented as an array of {x,y} pairs.
    for (var i = 0; i <= 10; i += 0.2) {
        chi.push({
            x: i,
            y:

            // chisquare formula
            ((Math.pow(i, (k/2)-1))*(Math.pow(Math.E, -i/2)))/
            ((Math.pow(2, k/2))* jStat.gammafn(k/2))
        });
    }

    //Line chart data should be sent as an array of series objects.
    return [
        {
            values: chi,      //values - represents the array of {x,y} data points
            key: 'Chi Square', //key  - the name of the series.
            color: '#ff7f0e',  //color - optional: choose your own line color.
            area: true
        }
    ];
}

function normal() {
    var normal = [], mean = 23.11111111111111, stdev = 1.72848324, variance = Math.pow(stdev, 2);

    //Data is represented as an array of {x,y} pairs.
    for (var i = 15; i <= 30; i += 0.2) {
        normal.push({
            x: i,
            y:

            // chisquare formula
            ((Math.pow(Math.E, -(Math.pow(i - mean, 2) / (2 * variance))))) /
            (stdev * Math.sqrt(2 * Math.PI))
        });
    }

    //Line chart data should be sent as an array of series objects.
    return [
        {
            values: normal,      //values - represents the array of {x,y} data points
            key: 'Normal Distribution', //key  - the name of the series.
            color: '#ff7f0e',  //color - optional: choose your own line color.
            area: true
        }
    ];
}

