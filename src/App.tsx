import { useState } from "react";
import arrow from "./assets/images/icon-arrow.svg";
import "./App.css";

interface DateInput {
  day: number;
  month: number;
  year: number;
}

interface AgeResult {
  years: number;
  months: number;
  days: number;
}

const currentDate = {
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  day: new Date().getDate(),
};

function App() {
  const [dateInput, setDateInput] = useState<DateInput>({
    day: 0,
    month: 0,
    year: 0,
  });

  const [age, setAge] = useState<AgeResult>({
    years: 0,
    months: 0,
    days: 0,
  });

  let yearDiff = currentDate.year - dateInput.year;
  let monthDiff = currentDate.month - dateInput.month;
  let dayDiff = currentDate.day - dateInput.day;

  const calculateAge = (e: any) => {
    e.preventDefault();
    if (
      dateInput.day < 1 ||
      dateInput.day > 31 ||
      dateInput.month < 1 ||
      dateInput.month > 12 ||
      dateInput.year > new Date().getFullYear()
    ) {
      alert("Sir t9awed la?");
    } else {
      // add calculation logic
      if (dayDiff < 0) {
        const previousMonth = currentDate.month - 1;
        const daysInPreviousMonth = new Date(
          currentDate.year,
          previousMonth,
          0
        ).getDate();
        dayDiff += daysInPreviousMonth;
        monthDiff--;
      }

      if (monthDiff < 0) {
        monthDiff += 12;
        yearDiff--;
      }

      setAge({
        months: monthDiff,
        days: dayDiff,
        years: yearDiff,
      });
    }
  };

  return (
    <>
      <div className="flex flex-col bg-white font-poppins800i  w-[300px] mx-auto rounded-t-2xl rounded-bl-2xl rounded-br-[80px]">
        <form onSubmit={calculateAge}>
          <div className="font-poppins700 mb-[40px] flex justify-center gap-4 pt-[40px]">
            {/* //DAY INPUT */}
            <div className="flex flex-col justify-center relative">
              {" "}
              <span
                className={`text-lightgrey uppercase tracking-[2px] text-[11px] mr-auto mb-[5px] ${
                  dateInput.day > 31 || dateInput.day < 0
                    ? "text-primaryRed"
                    : "text-lightgrey"
                }`}
              >
                {" "}
                Day
              </span>
              <input
                placeholder="DD"
                className={`border-solid border-[1px] border-offwhite w-[70px] rounded-lg h-[45px] px-[10px] focus:outline-none ${
                  dateInput.day > 31 || dateInput.day < 0
                    ? "border-primaryRed"
                    : "border-offwhite"
                }`}
                type="number"
                onChange={(e) => {
                  setDateInput({
                    ...dateInput,
                    day: Number(e.target.value),
                  });
                }}
              />
              <span
                className={`text-[9px] absolute top-[65px] left-[-5px] w-[80px] mt-[5px] font-poppins400i ${
                  dateInput.day > 31 || dateInput.day < 0
                    ? "inline-block text-primaryRed"
                    : "hidden"
                }`}
              >
                Must be a valid day
              </span>
            </div>

            {/* // MONTH INPUT */}
            <div className="flex flex-col relative">
              {" "}
              <span
                className={`text-lightgrey uppercase tracking-[2px] text-[11px] mr-auto mb-[5px] ${
                  dateInput.month > 12 || dateInput.month < 0
                    ? "text-primaryRed"
                    : "text-lightgrey"
                } `}
              >
                Month
              </span>
              <input
                placeholder="MM"
                className={`border-solid border-[1px] border-offwhite w-[70px] rounded-lg h-[45px] px-[10px] focus:outline-none ${
                  dateInput.month > 12 || dateInput.month < 0
                    ? "border-primaryRed"
                    : "border-offwhite"
                }`}
                type="number"
                onChange={(e) => {
                  setDateInput({
                    ...dateInput,
                    month: Number(e.target.value),
                  });
                }}
              />
              <span
                className={`text-[9px] absolute top-[65px] left-[-5px] w-[80px] mt-[5px] font-poppins400i ${
                  dateInput.month > 12 || dateInput.month < 0
                    ? "inline-block text-primaryRed"
                    : "hidden"
                }`}
              >
                Must be a valid month
              </span>
            </div>

            {/* // YEAR INPUT */}
            <div className="flex flex-col relative">
              {" "}
              <span
                className={`text-lightgrey uppercase tracking-[2px] text-[11px] mr-auto mb-[5px] ${
                  dateInput.year > currentDate.year
                    ? "text-primaryRed"
                    : "text-lightgrey"
                }`}
              >
                Year
              </span>
              <input
                placeholder="YYYY"
                className={`border-solid border-[1px] border-offwhite w-[70px] rounded-lg h-[45px] px-[10px] focus:outline-none ${
                  dateInput.year > currentDate.year
                    ? "border-primaryRed"
                    : "border-offwhite"
                }`}
                type="number"
                onChange={(e) => {
                  setDateInput({
                    ...dateInput,
                    year: Number(e.target.value),
                  });
                }}
              />
              <span
                className={`text-[9px] absolute top-[65px] left-[-5px] w-[80px] mt-[5px] font-poppins400i ${
                  dateInput.year > currentDate.year
                    ? "inline-block text-primaryRed"
                    : "hidden"
                }`}
              >
                Must be in the past
              </span>
            </div>
          </div>
          <div className="relative mb-[30px] hover:pointer ">
            <button
              type="submit"
              className="z-10 bg-primaryPurple hover:bg-offblack relative w-[50px] h-[50px] flex justify-center items-center rounded-full m-auto mt-[20px]"
            >
              <div>
                <img
                  className="w-[25px] h-[25px] absolute top-[13px] left-[13px] z-50 hover:cursor-pointer"
                  src={arrow}
                  alt="arrow"
                />
              </div>
            </button>
            <div className="bg-offwhite h-[1px] w-[250px] m-auto absolute z-0 right-[25px] top-[25px]"></div>
          </div>
        </form>
        <div className="text-5xl flex flex-col pb-[50px]">
          <p className="mr-auto ml-[20px]">
            <span className="text-primaryPurple">{age.years}</span> years
          </p>
          <p className="mr-auto ml-[20px]">
            <span className="text-primaryPurple">{age.months}</span> months{" "}
          </p>
          <p className="mr-auto ml-[20px]">
            <span className="text-primaryPurple">{age.days}</span> days
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
