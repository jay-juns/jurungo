function CalendarControl() {
    const calendar = new Date();
    const calendarControl = {
        localDate: new Date(),
        prevMonthLastDate: null,
        calWeekDays: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
        calMonthName: [
            "1월", "2월", "3월", "4월", "5월", "6월",
            "7월", "8월", "9월", "10월", "11월", "12월"
        ],
        showDatePopup: function(day, spanContent) {
            const monthName = this.calMonthName[this.localDate.getMonth()];
            const year = this.localDate.getFullYear();
            const popup = document.getElementById('datePopup');
            const popupContent = document.getElementById('popupContent');
            const infoText = spanContent ? `<span>${spanContent.innerHTML}</span>` : "데이터가 없습니다.";
            popupContent.innerHTML = `날짜: ${monthName} ${day}, ${year} ${infoText}`;
            popup.style.display = 'block';
        },
        getCurrentMonth: function() {
            return calendar.getMonth();
        },
        getCurrentYear: function() {
            return calendar.getFullYear();
        },
        daysInMonth: function(month, year) {
            return new Date(year, month, 0).getDate();
        },
        firstDay: function() {
            return new Date(calendar.getFullYear(), calendar.getMonth(), 1);
        },
        lastDay: function() {
            return new Date(calendar.getFullYear(), calendar.getMonth() + 1, 0);
        },
        getPreviousMonthLastDate: function() {
            let lastDate = new Date(calendar.getFullYear(), calendar.getMonth(), 0).getDate();
            return lastDate;
        },
        navigateToPreviousMonth: function () {
            calendar.setMonth(calendar.getMonth() - 1);
            this.updateCalendarViews();  // 달력 뷰 업데이트 함수 호출
        },        
        navigateToNextMonth: function () {
            calendar.setMonth(calendar.getMonth() + 1);
            this.updateCalendarViews();  // 달력 뷰 업데이트 함수 호출
        },
        updateCalendarViews: function() {
            this.plotDates();
            this.attachEvents();  // 이벤트 다시 연결
        },
        navigateToCurrentMonth: function() {
            let currentMonth = this.localDate.getMonth();
            let currentYear = this.localDate.getFullYear();
            calendar.setMonth(currentMonth);
            calendar.setYear(currentYear);
            this.attachEventsOnNextPrev();
        },
        displayYear: function() {
            let yearLabel = document.querySelector(".calendar .calendar-month-label");
            yearLabel.innerHTML = calendar.getFullYear() + '년';
        },
        displayMonth: function() {
            let monthLabel = document.querySelector(".calendar .calendar-year-label");
            monthLabel.innerHTML = this.calMonthName[calendar.getMonth()];
        },
        plotSelectors: function() {
            document.querySelector(".calendar").innerHTML += `<div class="calendar-inner"><div class="calendar-controls">
                <div class="calendar-prev"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#666" d="M88.2 3.8L35.8 56.23 28 64l7.8 7.78 52.4 52.4 9.78-7.76L45.58 64l52.4-52.4z"/></svg></a></div>
                <div class="calendar-year-month">
                    <div class="calendar-month-label"></div>
                    <div>-</div>
                    <div class="calendar-year-label"></div>
                </div>
                <div class="calendar-next"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#666" d="M38.8 124.2l52.4-52.42L99 64l-7.77-7.78-52.4-52.4-9.8 7.77L81.44 64 29 116.42z"/></svg></a></div>
                </div>
                <div class="calendar-today-date">오늘 날짜:
                    ${this.localDate.getFullYear()}년
                    ${this.calMonthName[this.localDate.getMonth()]}
                    ${this.localDate.getDate()}일
                    ${this.calWeekDays[this.localDate.getDay()]}
                </div>
                <div class="calendar-body"></div>
            </div>`;
        },
        plotDayNames: function() {
            for (let i = 0; i < this.calWeekDays.length; i++) {
                document.querySelector(".calendar .calendar-body").innerHTML += `<div class="${this.calWeekDays[i] === '일요일' ? 'red-day' : ''}">${this.calWeekDays[i]}</div>`;
            }
        },
        plotDates: function () {
            document.querySelector(".calendar .calendar-body").innerHTML = "";
            this.plotDayNames();
            this.displayMonth();
            this.displayYear();
            let prevDateCount = this.firstDay().getDay(); // 달력의 첫 주에 대한 이전 달의 날짜 수를 결정합니다.
            let daysInMonth = this.daysInMonth(calendar.getMonth() + 1, calendar.getFullYear());
        
            let today = new Date();
            today.setHours(0, 0, 0, 0); // 시간 정보 초기화
            
            // 이전 달의 마지막 날짜를 포함한 배열을 생성합니다.
            for (let i = 0; i < prevDateCount; i++) {
                document.querySelector(".calendar .calendar-body").innerHTML += `<div class="prev-dates"></div>`;
            }
        
            // 금요일에만 특정 데이터를 표시하기 위한 인덱스 초기화
            let fridayDataIndex = 0;
            let fridayData = ["주헌진", "염장미", "김준석"]; // 금요일에 표시할 데이터
        
            // 현재 달의 모든 날짜를 순회합니다.
            for (let day = 1; day <= daysInMonth; day++) {
                let currentDate = new Date(calendar.getFullYear(), calendar.getMonth(), day);
                let dayOfWeek = currentDate.getDay(); // 요일을 가져옵니다 (0: 일요일, 1: 월요일, ..., 6: 토요일)
                let dayContent = day; // 기본적으로 표시될 날짜 내용
                let extraClass = dayOfWeek === 0 ? "red-day" : ""; // 일요일인 경우 'red-day' 클래스 추가
                
                let spanText = ""; // span 내부에 표시될 텍스트
                let spanClass = ""; // span 태그의 클래스
        
                // 금요일 데이터 설정
                let currentFridayData = fridayData[fridayDataIndex % fridayData.length];
                switch (currentFridayData) {
                    case "주헌진":
                        spanClass = "ju";
                        break;
                    case "염장미":
                        spanClass = "yeom";
                        break;
                    case "김준석":
                        spanClass = "kim";
                        break;
                    default:
                        spanClass = ""; // 기본 클래스 (해당하는 경우가 없을 때)
                }
                 // 특정 날짜에 이벤트 추가 (예: 4월 21일)
                if (currentDate.getMonth() === 3 && currentDate.getDate() === 21) {
                    spanText = `<i class="ico">·</i>JTBC 고양 10km`;
                    spanClass = "marathon-day";
                }
        
                 // 금요일에만 특정 데이터 추가
                if (dayOfWeek === 5) {
                    spanText = `<i class="ico">·</i>${currentFridayData}`;
                    fridayDataIndex++;
                }
        
                 // 현재 날짜 이전이면 .prev 클래스 추가
                if (currentDate < today) {
                    spanClass += " prev"; // 기존 spanClass에 추가
                }
        
                // 최종 HTML 업데이트
                if (spanText) {
                    dayContent += `<span class="${spanClass}">${spanText}</span>`;
                }
        
                // 기존 onclick 제거
                document.querySelector(".calendar .calendar-body").innerHTML += `<div class="number-item ${extraClass}" data-num="${day}"><button class="dateNumber ${extraClass}" onclick='calendarControl.showDatePopup(${day}, this.parentNode)'>${dayContent}</button></div>`;
            }

            this.attachDateClickHandlers(); // 이벤트 리스너 다시 설정
            this.highlightToday();
        
            // 현재 달력 뷰에 필요한 다음 달의 날짜 수를 채웁니다.
            let remainingSlots = 42 - (daysInMonth + prevDateCount); // 42는 일반적으로 달력의 총 슬롯 수 (6주 * 7일)
            for (let i = 1; i <= remainingSlots; i++) {
                document.querySelector(".calendar .calendar-body").innerHTML += `<div class="next-dates">${i}</div>`;
            }
        
            this.highlightToday(); // 오늘 날짜 강조
        },
        attachEvents: function () {
            // 기존 이벤트 핸들러 제거
            let prevBtn = document.querySelector(".calendar .calendar-prev a");
            let nextBtn = document.querySelector(".calendar .calendar-next a");
            let todayDate = document.querySelector(".calendar .calendar-today-date");
        
            prevBtn.removeEventListener('click', this.boundPrev);
            nextBtn.removeEventListener('click', this.boundNext);
            todayDate.removeEventListener('click', this.boundToday);
        
            // 새로 바인딩할 함수를 저장
            this.boundPrev = this.navigateToPreviousMonth.bind(this);
            this.boundNext = this.navigateToNextMonth.bind(this);
            this.boundToday = this.navigateToCurrentMonth.bind(this);
        
            // 이벤트 리스너 추가
            prevBtn.addEventListener('click', this.boundPrev);
            nextBtn.addEventListener('click', this.boundNext);
            todayDate.addEventListener('click', this.boundToday);
        },
        highlightToday: function () {
            const currentMonth = this.localDate.getMonth();
            const changedMonth = calendar.getMonth();
            const currentYear = this.localDate.getFullYear();
            const changedYear = calendar.getFullYear();
        
            // calendar.getDate()를 사용하기 전에 calendarControl 객체에 정의된 calendar 객체를 참조 확인
            const todayDate = this.localDate.getDate();
            
            if (currentYear === changedYear && currentMonth === changedMonth) {
                const dayItems = document.querySelectorAll(".calendar .calendar-body .number-item");
                if (dayItems && dayItems[todayDate - 1]) {
                    dayItems[todayDate - 1].classList.add("calendar-today");
                    console.log("Today highlighted on the calendar.");
                }
            }
        },
        handleDateClick: function (event) {
            let day = event.target.dataset.day;
            this.showDatePopup(day);
        },
        attachDateClickHandlers: function () {
            document.querySelectorAll(".calendar .dateNumber").forEach(button => {
                button.removeEventListener('click', this.handleDateClick); // 기존 핸들러 제거
                button.addEventListener('click', this.handleDateClick.bind(this)); // 새 핸들러 할당
            });
        },
        attachEventsOnNextPrev: function() {
            this.plotDates();
        },
        init: function () {
            this.plotSelectors();
            this.plotDates();
            this.attachEvents();
        }
    };
    calendarControl.init();
    return calendarControl;
}

const calendarControl = new CalendarControl();
