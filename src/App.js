import { useState } from "react";
import { useDatePicker } from "react-headless-date-picker";

function App() {
  const [dateStates, setDateStates] = useState({
    focus: null,
    date: null,
  });

  const handleDateChange = (state) => {
    console.log(state);
    setDateStates(state);
  };

  const {
    activatedMonths,
    goToPreviousMonth,
    goToNextMonth,
    monthDays,
    weekdayLabels,
    onDayClick,
    isDisabledDate,
  } = useDatePicker({
    focus: dateStates.focus,
    onDateChange: handleDateChange,
    selectedDate: dateStates.date,
  });

  console.log(dateStates.focus);

  return (
    <div>
      <div>
        <strong>focus :</strong>
        {`${dateStates.focus}`}
      </div>
      <div>
        <strong>selectedDate :</strong>
        {dateStates.date && dateStates.date.toLocaleString()}
      </div>
      <button type="button" onClick={goToPreviousMonth}>
        prev
      </button>
      <button type="button" onClick={goToNextMonth}>
        next
      </button>
      <div
        style={{
          display: "grid",
          margin: "32px 0 0",
          gridTemplateColumns: `repeat(${activatedMonths.length}, 300px)`,
          gridGap: "0 64px",
        }}
      >
        {activatedMonths.map((month) => (
          <div key={month.date}>
            <strong
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "16px 0",
              }}
            >
              {month.label}
            </strong>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                justifyContent: "center",
              }}
            >
              {weekdayLabels.map((dayLabel) => (
                <div style={{ textAlign: "center" }} key={dayLabel}>
                  {dayLabel}
                </div>
              ))}
            </div>
          </div>
        ))}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            justifyContent: "center",
          }}
        >
          {monthDays.map((monthDay) =>
            monthDay.map((day, index) => {
              if (day === null) {
                return <div key={index}></div>;
              }

              return (
                <button
                  type="button"
                  key={day.date}
                  onClick={() => onDayClick(day.date)}
                  disabled={isDisabledDate(day.date)}
                >
                  {day.label}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
