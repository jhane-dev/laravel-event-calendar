let calendar;
let events = [];
let eventList = []
$(document).ready(() => {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    events = getEvents();
    $.each(events, (index, field) => {
        let arrayOfDays = field.days.split("");
        let evenSet = genarateToDates(field.start_date, field.end_date, arrayOfDays, field.event_name);
        $.merge(eventList, evenSet);
    });


    eventList = removeDuplicateEvent(eventList, it => it.start)


    $(document).on("change", "#startdate", () => {
        $("#enddate").attr("min", $("#startdate").val());
    });

    calendar = new FullCalendar.Calendar(document.getElementById('calendar'), {
        initialView: 'dayGridMonth',
        events: eventList,
    });

    calendar.render();

    $('.btn-save').click(() => {

        let boxes = $('input[name=days]:checked');
        let boxesCount = 0;
        let days = "";
        $.each(boxes, (index, field) => {
            days += field.value;
            boxesCount += 1;

        });


        if (!($('#event').val())) {
            alert("Event should not be empty.");
        } else if (!($('#startdate').val())) {
            alert("Date From: should not be empty.")
        } else if (!($('#enddate').val())) {
            alert("Date To: shoud not be empty.")
        } else if ($('#startdate').val() > $('#enddate').val()) {
            alert("Date To: shoud be higher or equal to Date From:");
        } else if (boxesCount < 1) {
            alert($('#event').val() + " need at least one day")
        } else {
            addNewEvent(days);
        }


    });



});

function genarateToDates(startDate, endDate, days, eventName) {
    var resultArray = [];
    $.each(days, function(i, value) {
        let start = moment(startDate, 'YYYY-MM-DD').subtract(1, 'days');
        let end = moment(endDate, 'YYYY-MM-DD');
        let tmp = start.clone().day(parseInt(value));
        if (tmp.isAfter(start, 'YYYY-MM-DD')) {
            let obj = {
                id: "event-"+tmp.format('YYYY-MM-DD'),
                start: tmp.format('YYYY-MM-DD'),
                title: eventName
            }
            resultArray.push(obj);
        }
        do {
            tmp.add(7, 'days');
            if (tmp.isAfter(end, 'YYYY-MM-DD')) {
                break;
            }
            let obj = {
                 id: "event-"+tmp.format('YYYY-MM-DD'),
                start: tmp.format('YYYY-MM-DD'),
                title: eventName
            }
            resultArray.push(obj);

        } while (tmp.isBefore(end, 'YYYY-MM-DD'));

    });

    return resultArray;
}


function addNewEvent(days) {

    $.ajax({
        type: 'ajax',
        method: 'POST',
        url: '/add_event',
        async: false,
        data: {
            eventname: $('#event').val(),
            startdate: $('#startdate').val(),
            enddate: $('#enddate').val(),
            days: days
        },
        dataType: 'json',
        success: (response)=> {
          let arrayOfDays = response.days.split("");
          let listOfEvents = genarateToDates(response.start_date, response.end_date, arrayOfDays, response.event_name);
           
           $.each(listOfEvents, (index, field) => {
              let eventToRemove = calendar.getEventById("event-"+String(field.start))
              if(eventToRemove){
                 eventToRemove.remove();
              }
                calendar.addEvent({
                  id: "event-"+field.start,
                  title: field.title,
                  start: field.start,
                  
                });
               calendar.render();
           });

          new PNotify({
              title: 'Event',
              text: 'Event added successfully.',
              delay: 1500,
              type: 'success'
          });
            

        },
        error: ()=> {
          new PNotify({
              title: 'Error',
              text: 'error on adding event.',
              delay: 1500,
              type: 'error'
          });
        }
    });

}

function getEvents() {
    let events = [];

    $.ajax({
        type: 'ajax',
        method: 'POST',
        url: '/get_events',
        async: false,
        dataType: 'json',
        success: (response)=> {

            events = response
        },
        error: ()=> {
          new PNotify({
              title: 'Error',
              text: 'error on getting events.',
              delay: 1500,
              type: 'error'
          });
        }
    });

    return events;

}

function removeDuplicateEvent(index, key) {
    return [
        ...new Map(
            index.map(x => [key(x), x])
        ).values()
    ]
}