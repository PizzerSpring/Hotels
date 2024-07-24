$(function () {
    function createCalendar(year, month) {
        const calendar = document.querySelector('.main__form-calendar');

        /*

        let today = new Date();
        let nowMonth = today.getMonth() + 1;
        let date = today.getDate();
        let monthCurrent = today.getMonth() + 1;
        // console.log(nowMonth);*/
        let mon = month - 1;
        let day = new Date(year, mon);
        let datesPrevMonth = new Date(year, mon, 0);

        // Number of month to string

        const monthsName = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

        const selectedMonthName = monthsName[mon];

        let table = `
    <table>
      <caption class="main__form-year-month">${selectedMonthName} ${year}</caption>
      <thead>
      <tr>
        <th>Пн</th>
        <th>Вт</th>
        <th>Ср</th>
        <th>Чт</th>
        <th>Пт</th>
        <th>Сб</th>
        <th>Вс</th>
      </tr>
      </thead>
    
      <tr>
`;

        // days of prev month

        for (let i = 0; i < getDay(day); i++) {
            let startPrevMonthDates = datesPrevMonth.getDate() - datesPrevMonth.getDay() + 1;
            const date = Number(startPrevMonthDates) + i;
            table += '<td class="main__form-prevnext-month">' + date + '</td>';

        }
        //console.log(date);

        // days of current month

        while (day.getMonth() == mon) {
            table += '<td class="main__form-current-days">' + day.getDate() + '</td>'
            /*if (day.getDate() === date && (day.getMonth() + 1) === monthCurrent) {
                // console.log(day.getMonth() + 1);
                table += '<td class="main__form-current-days current-date">' + day.getDate() + '</td>'
            } else {
                table += '<td class="main__form-current-days">' + day.getDate() + '</td>';
            }*/

            if (getDay(day) % 7 == 6) {
                table += '<tr></tr>';
            }
            day.setDate(day.getDate() + 1);
        }

        // days of next month

        if (getDay(day) !== 0) {
            for (let i = getDay(day); i < 7; i++) {
                table += '<td class="main__form-prevnext-month">' + day.getDate() + '</td>';
                day.setDate(day.getDate() + 1);
            }

        }

        table += `</tr></table>`;
        calendar.innerHTML = table;
        // console.log(day.getMonth());


    }

    function getDay(date) {
        let day = date.getDay();
        if (day === 0) day = 7;
        return day - 1;
    }

    let callData = new Date();
    let callYear = callData.getFullYear();
    let callMonth = callData.getMonth() + 1;

    createCalendar(callYear, callMonth);

    const showCal = document.querySelector('.main__form-show-calendar');
    const inputArrival = document.querySelector('.main__form-arrival');
    inputArrival.addEventListener('click', () => {
        showCal.classList.toggle('hide-calendar');
    })

    /*const showCal = document.querySelector('.showCal');
    showCal.addEventListener('click', () => {
        // console.log(44)
    })

    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');

    const cal1 = document.querySelector('.cal1');
    const cal2 = document.querySelector('.cal2');

    cal1.addEventListener('click', () => {
        showCal.classList.toggle('hide');
    })

    cal2.addEventListener('click', () => {
        showCal.classList.toggle('hide');
    })

    const apply = document.querySelector('.apply');
    const cancel = document.querySelector('.cancel');


    cancel.addEventListener('click', () => {
        showCal.classList.toggle('hide');
        cal1.value = '';
        cal2.value = '';
    })


//console.log(createCalendar('body',2024, 7));
    let n = new Date().getMonth() + 1;
    let y = new Date().getFullYear();

    prev.addEventListener('click', () => {
        if (n === 1) {
            n = 13;
            y--;
        }
        n--;
        createCalendar(y, n);
        // console.log(n);
    })

    next.addEventListener('click', () => {
        if (n === 12) {
            n = 0;
            y++;
        }
        n++;
        createCalendar(y, n);
        // console.log(n);
    })

    let callData = new Date();
    let callYear = callData.getFullYear();
    let callMonth = callData.getMonth() + 1;

    createCalendar(callYear, callMonth);*/

//range for datepicker

    /*let start = '';
    let end = '';
    let count = 0;
    let startId = '';
    let endId = '';


    const td = document.querySelectorAll('td');
    for (let i = 0; i < td.length; i++) {
        td[i].setAttribute("id", i);
    }

//console.log(td);
    td.forEach(item => {
        item.addEventListener('click', (e) => {
            // e.target.classList.toggle('sel');
            const tdSel = document.querySelectorAll('td.sel');

            /!*for(let i = 0; i < tdSel.length; i++) {
                tdSel[0] !== item ? tdSel[0].classList.remove('sel') : null
            }*!/

            if(start === '') {
                item.classList.toggle('sel');
                start = item.innerHTML;
                startId = item.id;
                console.log(startId);
                const startIdEl = document.getElementById(startId);
                console.log(startIdEl);
            } else {
                if(end === '') {
                    item.classList.toggle('end');
                    end = item.innerHTML;
                    endId = item.id;
                    console.log(endId);
                    let difId = endId - startId;
                    //console.log(startId);
                    for(let i = +startId + 1; i < endId; i++) {
                        const allElId = document.getElementById(i);
                        allElId.classList.toggle('range');
                    }

                } else {
                    //item.classList.remove('sel');
                    // item.classList.remove('end');
                    start = '';
                    end = '';
                    startId = item.id;
                    //endId = '';

                    Array.from(document.querySelectorAll('td')).forEach(function(el) {
                        // console.log(el);
                        el.classList.remove('sel');
                    });
                    Array.from(document.querySelectorAll('td')).forEach(function(el) {
                        // console.log(el);
                        el.classList.remove('end');
                    });
                    Array.from(document.querySelectorAll('td')).forEach(function(el) {
                        // console.log(el);
                        el.classList.remove('range');
                    });
                    item.classList.toggle('sel');
                    start = item.innerHTML;
                }
            }

            /!*if(start > end) {
                let b = end;
                end = start;
                start = b;
            }*!/

            // console.log(start);
            // console.log(end);

            // console.log(tdSel);

            apply.addEventListener('click', () => {
                cal1.value = start;
                cal2.value = end;
            })
        })
    })*/


});