$(function () {
    function createCalendar(year, month) {
        const calendar = document.querySelector('.main__form-calendar');

        let mon = month - 1;
        let day = new Date(year, mon);
        let datesPrevMonth = new Date(year, mon, 0);
        let today = new Date();
        let currentDate = today.getDate();
        let currentMonth = today.getMonth() + 1;

        // Number of month to string

        const monthsName = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

        const selectedMonthName = monthsName[mon];

        let table = `
    <table>
      <caption>
      <div>
      <span class="main__form-prev-month"></span>
      <span class="main__form-year-month">${selectedMonthName} ${year}</span>
      <span class="main__form-next-month"></span>
      </div>
      </caption>
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

        // days of current month and current date

        while (day.getMonth() == mon) {
            if (day.getDate() === currentDate && (day.getMonth() + 1) === currentMonth) {
                table += '<td class="main__form-current-days current-date">' + day.getDate() + '</td>'
            } else {
                table += '<td class="main__form-current-days">' + day.getDate() + '</td>';
            }

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

        table += `</tr>
        </table>
        <div class="main__form-btns">
        <button class="main__form-clear main__form-btn-disabled">Очистить</button>\`
        <button class="main__form-apply main__form-btn-disabled">Применить</button>
        </div>`;
        calendar.innerHTML = table;

        // prev next months

        const prevMonthBtn = document.querySelector('.main__form-prev-month');
        const nextMonthBtn = document.querySelector('.main__form-next-month');

        prevMonthBtn.addEventListener('click', () => {
            if (month === 1) {
                month = 13;
                year--;
            }
            month--;
            createCalendar(year, month);
        })

        nextMonthBtn.addEventListener('click', () => {
            if (month === 12) {
                month = 0;
                year++;
            }
            month++;
            createCalendar(year, month);
        })

        // range

        const clear = document.querySelector('.main__form-clear');
        const apply = document.querySelector('.main__form-apply');

        clear.disabled = true;
        apply.disabled = true;

        let startDate = '';
        let endDate = '';
        let startDateId = '';
        let endDateId = '';

        const rangeDays = document.querySelectorAll('.main__form-calendar td');

        // setting id for rangeDays

        for (let i = 0; i < rangeDays.length; i++) {
            rangeDays[i].setAttribute("id", i);
        }

        rangeDays.forEach(item => {
            item.addEventListener('click', (e) => {
                if (startDate === '') {
                    item.classList.toggle('main__form-start-date');
                    startDate = item.innerHTML;
                    startDateId = item.id;
                    console.log(startDateId);
                    const startIdEl = document.getElementById(startDateId);
                    console.log(startIdEl);
                    clear.disabled = false;
                } else {
                    if (endDate === '') {
                        item.classList.toggle('main__form-end-date');
                        endDate = item.innerHTML;
                        endDateId = item.id;
                        console.log(endDateId);
                        const endIdEl = document.getElementById(endDateId);
                        console.log(endIdEl);
                        let difId = endDateId - startDateId;
                        for(let i = +startDateId + 1; i < endDateId; i++) {
                            const allElId = document.getElementById(i);
                            allElId.classList.toggle('main__form-range');
                        }
                        apply.disabled = false;
                        apply.classList.toggle('main__form-btn-disabled');
                    } else {
                        startDate = '';
                        endDate = '';
                        startDateId = item.id;
                        apply.disabled = true;
                        apply.classList.toggle('main__form-btn-disabled');
                        item.classList.toggle('main__form-start-date');

                        Array.from(document.querySelectorAll('.main__form-calendar td')).forEach(function (el) {
                            // console.log(el);
                            el.classList.remove('main__form-start-date');
                        });
                        Array.from(document.querySelectorAll('.main__form-calendar td')).forEach(function (el) {
                            // console.log(el);
                            el.classList.remove('main__form-end-date');
                        });
                        Array.from(document.querySelectorAll('.main__form-calendar td')).forEach(function(el) {
                            // console.log(el);
                            el.classList.remove('main__form-range');
                        });

                        item.classList.toggle('main__form-start-date');
                        startDate = item.innerHTML;
                    }
                }
            })

        })

        const showCal = document.querySelector('.main__form-show-calendar');

        const inputArrival = document.querySelector('.main__form-arrival');
        const inputDeparture = document.querySelector('.main__form-departure');

        apply.addEventListener('click', (e) => {
            e.preventDefault();
            inputArrival.value = startDate;
            inputDeparture.value = endDate;
            console.log('apply')
            showCal.classList.add('hide-calendar');
        })

        clear.addEventListener('click', (e) => {
            e.preventDefault();

            Array.from(document.querySelectorAll('.main__form-calendar td')).forEach(function (el) {
                el.classList.remove('main__form-start-date');
            });
            Array.from(document.querySelectorAll('.main__form-calendar td')).forEach(function (el) {
                el.classList.remove('main__form-end-date');
            });
            startDate = '';
            endDate = '';
            clear.disabled = true;

            Array.from(document.querySelectorAll('.main__form-calendar td')).forEach(function (el) {
                if(el.classList.contains('main__form-start-date') || el.classList.contains('main__form-end-date') || !apply.disabled) {
                    apply.classList.toggle('main__form-btn-disabled');
                    apply.disabled = true;
                }
            });
        })


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
        showCal.classList.remove('hide-calendar');
    })

    const inputDeparture = document.querySelector('.main__form-departure');
    inputDeparture.addEventListener('click', () => {
        showCal.classList.remove('hide-calendar');
    })

    const topInputs = document.querySelector('.main__form-top');
    document.addEventListener('click', (e) => {
        if (e.target === inputArrival || topInputs.contains(e.target) || e.target.classList.contains('main__form-prev-month') || e.target.classList.contains('main__form-next-month')) {
            return;
        } else {
            showCal.classList.add('hide-calendar');
        }
    })

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
