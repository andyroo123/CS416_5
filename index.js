const svg = d3.select("svg");
const projection = d3.geoNaturalEarth1();
const pathGenerator = d3.geoPath().projection(projection);

update();

function clear_svg() {
    svg.selectAll("*").remove();
}

function update() {
    clear_svg();
    g = svg.append("g");

    g.append("path")
    .attr("class", "sphere")
    .attr("d", pathGenerator({type: "Sphere"}));

    svg.call(d3.zoom().on("zoom", () => {
        g.attr("transform", d3.event.transform);
    }));

    d3.json('https://unpkg.com/world-atlas@1.1.4/world/50m.json', function(topoData) {
        d3.tsv('https://unpkg.com/world-atlas@1.1.4/world/50m.tsv', function(tsvData) {
            d3.csv("data/country_temperature.csv", function(tempData) {
                const countryName = tsvData.reduce((accumulator, d) => {
                    accumulator[d.iso_n3] = d.name;
                    return accumulator;
                }, {});
                const countryTemp = tempData.reduce((accumulator, d) => {
                    var key = d.Country + d.Year + d.Month;
                    accumulator[key] = d.AvgTemperature;
                    return accumulator;
                }, {});
    
                const countries = topojson.feature(topoData, topoData.objects.countries);
                g.selectAll("path")
                    .data(countries.features)
                    .enter().append('path')
                        .attr("class", "country")
                        .attr("fill", function (d) {
                            var year = document.getElementById("yearRange").value;
                            var month = parseInt(document.getElementById("monthRange").value) + 1;
                            var temp = countryTemp[countryName[d.id] + year + month];
                            if (temp) {
                                var val = temp / (TEMP_MAX - TEMP_MIN);
                                if (temp == TEMP_NULL) {
                                    return "rgb(27, 27, 27)";
                                }
                                else if (val <= .50) { // Blue - Yellow
                                    val =  255 * (val * 2);
                                    return "rgb("+val+","+val+","+(255-val)+")";
                                }
                                else { // Yellow - Red
                                    val = 255 * (val / 2);
                                    return "rgb(255,"+val+",0)"
                                }
                                return "rgb(0, 0, 0)";
                            }
                            else {
                                return "rgb(27, 27, 27)";
                            }
                        })
                        .attr("d", pathGenerator)
                    .append("title")
                        .attr("class", "country_title")
                        .text(function(d){
                            var year = document.getElementById("yearRange").value;
                            var month = parseInt(document.getElementById("monthRange").value) + 1;
                            var temp = countryTemp[countryName[d.id] + year + month];
                            if (temp) {
                                if (temp == -99) { return countryName[d.id] + "\nAvgTemp: None" }
                                return countryName[d.id] + "\nAvgTemp: " + temp;
                            }
                            else {
                                return countryName[d.id] + "\nAvgTemp: None";
                            }
                        });
            });
        });
    });
}