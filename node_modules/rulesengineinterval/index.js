'use strict';

console.log('Hello RulesEngineInterval');

module.exports = {

    area: function (width, height) {
        return width * height;
    },
    isEventTimeValidity: function (timestamp, intervalValidity) {
        var success = false;
        try {



            var timeValidity = JSON.parse(intervalValidity);


            //esempio 20181203152308
            var year = timestamp.substring(0, 4);
            var month = timestamp.substring(4, 6) - 1;
            var day = timestamp.substring(6, 8);
            var hour = timestamp.substring(8, 10);
            var minutes = timestamp.substring(10, 12);
            var seconds = timestamp.substring(12, 14);

            var currentDate = new Date(year, month, day, hour, minutes, seconds);

            var date = currentDate.getDate();
            var month = currentDate.getMonth() + 1; //da 1 a 12
            var year = currentDate.getFullYear();
            var hours = currentDate.getHours();
            var minutes = currentDate.getMinutes();
            var seconds = currentDate.getSeconds();
            var dayOfTheWeek = currentDate.getDay(); // da 1 a 7
            var currentTime = new Date(2000, 0, 1, hours, minutes, seconds);

            if (timeValidity.key == "always") {
                success = true;
            }
            else if (timeValidity.key == "week") {
                success = false;
                var weeks = timeValidity.week.days;
                for (var i = 0; i < weeks.length; ++i) {
                    if (weeks[i] == dayOfTheWeek) {
                        //il giorno corrente cade in uno dei giorni dell'intervallo richiesto
                        //prendiamo le hours
                        var hours = timeValidity.week.hours;
                        for (var j = 0; j < hours.length; ++j) {
                            var hour = hours[j];
                            var from = new Date("2000-01-01 " + hour.from);
                            var to = new Date("2000-01-01 " + hour.to);
                            if (from <= currentTime && currentTime <= to) {
                                success = true;
                                break;
                            }

                        }
                    } 
                    if (success) {
                        break;
                    }
                }
            }
             
        }
        catch (exception) {

            console.log(exception);
            success = false;

        }
        

        return success;

    }
};

 

 


//module.exports = function (currentDate, timeValidityInput) {
//    var success = false;
//    var timeValidity = JSON.parse(timeValidityInput);


//    var date = currentDate.getDate();
//    var month = currentDate.getMonth() + 1; //da 1 a 12
//    var year = currentDate.getFullYear();
//    var hours = currentDate.getHours();
//    var minutes = currentDate.getMinutes();
//    var seconds = currentDate.getSeconds();
//    var dayOfTheWeek = currentDate.getDay(); // da 1 a 7
//    var currentTime = new Date(2000, 0, 1, hours, minutes, seconds);

//    if (timeValidity.key == "always") {
//        success = true;
//    }
//    else if (timeValidity.key == "year") {
//        success = false;
//        var yearFromTo = timeValidity.year.fromTo;
//        for (var i = 0; i < yearFromTo.length; ++i) {
//            var from = new Date(yearFromTo[i].from);
//            var to = new Date(yearFromTo[i].to);
//            if (from <= currentDate && currentDate <= to) {
//                success = true;
//                break;
//            }
//        }

//    }
//    else if (timeValidity.key == "week") {
//        success = false;
//        var week = timeValidity.week;
//        for (var i = 0; i < week.length; ++i) {
//            if (week[i].id == dayOfTheWeek) {
//                var weekFromTo = week[i].fromTo;
//                for (var j = 0; j < weekFromTo.length; ++j) {
//                    var from = new Date("2000-01-01 " + weekFromTo[j].from);
//                    var to = new Date("2000-01-01 " + weekFromTo[j].to);
//                    if (from <= currentTime && currentTime <= to) {
//                        success = true;
//                        break;
//                    }
//                }
//            }
//            if (success) {
//                break;
//            }
//        }
//    }
//    else if (timeValidity.key == "days") {
//        success = false;
//        var days = timeValidity.days;
//        if (days.search(dayOfTheWeek) > -1) {
//            success = true;
//        }
//    }


//    return success;

//};