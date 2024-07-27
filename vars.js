const STARTYEAR = 1995;
const ENDYEAR = 2020;
const YEARS = Array.from({length: ENDYEAR - STARTYEAR + 1}, (v, i) => STARTYEAR + i);

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const TEMP_MIN = -25.9;
const TEMP_MAX = 110;
const TEMP_NULL = -99;