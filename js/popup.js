document.addEventListener('DOMContentLoaded', function() {
    // 모든 dateNumber 버튼에 이벤트 리스너 추가
    document.querySelectorAll('.calendar .calendar-body .dateNumber').forEach(button => {
        button.addEventListener('click', function() {
            const day = this.dataset.day; // data-day 속성에서 날짜 값을 가져옵니다.
            const spanContent = this.querySelector("span") ? this.querySelector("span").innerHTML : "데이터 없음";
            showDatePopup(day, spanContent); // 날짜와 함께 span의 내용도 showDatePopup에 전달
        });
    });
});

// 팝업을 보여주는 함수, 날짜와 span 내용을 받아 처리
function showDatePopup(day, spanContent) {
    const monthName = calendarControl.calMonthName[calendarControl.localDate.getMonth()];
    const year = calendarControl.localDate.getFullYear();
    const popup = document.getElementById('datePopup');
    const popupContent = document.getElementById('popupContent');
    popupContent.innerHTML = `<p>날짜: ${monthName} ${day}, ${year}</p> <span>정보: ${spanContent}</span>`;
    popup.style.display = 'block';
}

function closePopup() {
    const popup = document.getElementById('datePopup');
    popup.style.display = 'none';
}