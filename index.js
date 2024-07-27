d3.csv("data/city_temperature_short.csv", function(data) {
    data.forEach(element => {
        d3.select("body").append("p")
        .text(element["Country"] + " jere");
    });
});