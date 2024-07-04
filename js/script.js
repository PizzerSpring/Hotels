$(function () {

    let arrival;
    let departure;

    $('.datepicker').datepicker({
        showOtherMonths: true,
        showButtonPanel: true,
        closeText: "Очистить",
        currentText: "Применить",
        onSelect: function () {
            arrival = $("#arrival").datepicker("getDate");
            arrival = Date.parse(arrival);
            console.log(arrival);

            if(arrival) {
                $(".ui-datepicker td").addClass("active");
            }


            departure = $("#departure").datepicker("getDate");
            departure = Date.parse(departure);
            console.log(departure);

            for (let i = arrival; i <= departure; i = i + 24 * 60 * 60 * 1000) {
                console.log(new Date(i).toISOString().substr(0, 10))
            }
        }
    });


    // var currentDate = $( "#arrival" ).datepicker( "getDate" );


    /*const dateFormat = "mm/dd/yy";
    const arrival = $("#arrival")
        .datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 3
        })
        .on("change", function () {
            departure.datepicker("option", "minDate", getDate(this));
        })

    const departure = $("#departure")
        .datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 3
        })
        .on("change", function () {
            arrival.datepicker("option", "maxDate", getDate(this));
        })

    function getDate(element) {
        let date;
        try {
            date = $.datepicker.parseDate(dateFormat, element.value);
        } catch (error) {
            date = null
        }
        return date;
    }*/


});
