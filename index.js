const svg = d3.select("svg");
const projection = d3.geoNaturalEarth1();
const pathGenerator = d3.geoPath().projection(projection);
const g  = svg.append("g");

g.append("path")
    .attr("class", "sphere")
    .attr("d", pathGenerator({type: "Sphere"}));

svg.call(d3.zoom().on("zoom", () => {
    g.attr("transform", d3.event.transform);
}));

d3.csv("data/city_temperature_short.csv", function(data) {
    data.forEach(element => {
        d3.select("body").append("p")
        .text(element["Country"] + " jere");
    });
});

d3.json('https://unpkg.com/world-atlas@1.1.4/world/50m.json', function(topoData) {
    d3.tsv('https://unpkg.com/world-atlas@1.1.4/world/50m.tsv', function(tsvData) {
        d3.csv("data/city_temperature_short.csv", function(tempData) {
            const countryName = tsvData.reduce((accumulator, d) => {
                accumulator[d.iso_n3] = d.name;
                return accumulator;
            }, {});
            //tsvData.forEach(d => {
            //    countryName[d.iso_n3] = d.name;
            //});
    
            const countries = topojson.feature(topoData, topoData.objects.countries);
            g.selectAll("path")
                .data(countries.features)
                .enter().append('path')
                    .attr("class", "country")
                    .attr("d", pathGenerator)
                .append("title")
                    .text(d => countryName[d.id]);
        });
    });
});
