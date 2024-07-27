var yearOutput = document.getElementById("year-slider-value");
var monthOutput = document.getElementById("month-slider-value");

document.getElementById("yearRange").min = STARTYEAR;
document.getElementById("yearRange").max = ENDYEAR;

document.getElementById("yearRange").oninput = function() {
    var value = (this.value-this.min)/(this.max-this.min)*100;
    yearOutput.innerHTML = this.value;
    update();
}

document.getElementById("monthRange").oninput = function() {
    var value = (this.value-this.min)/(this.max-this.min)*100;
    monthOutput.innerHTML = MONTHS[this.value];
    update();
}