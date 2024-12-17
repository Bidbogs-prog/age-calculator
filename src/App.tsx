import { useEffect, useState } from "react";
import arrow from "./assets/images/icon-arrow.svg";
import "./App.css";

interface DateInput {
  day: number;
  month: number;
  year: number;
}

interface AgeResult {
  years: string;
  months: string;
  days: string;
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

  const [isValid, setIsValid] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [age, setAge] = useState<AgeResult>({
    years: "- -",
    months: "- -",
    days: "- -",
  });

  let yearDiff = currentDate.year - dateInput.year;
  let monthDiff = currentDate.month - dateInput.month;
  let dayDiff = currentDate.day - dateInput.day;

  const calculateAge = (e: any) => {
    e.preventDefault();

    //date validation

    function isDateValid(year: number, month: number, day: number): boolean {
      const date = new Date(year, month - 1, day);
      console.log(date);
      return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
      );
    }

    console.log(isDateValid(dateInput.year, dateInput.month, dateInput.day));

    if (
      dateInput.day < 0 ||
      dateInput.day > 31 ||
      dateInput.month < 0 ||
      dateInput.month > 12 ||
      dateInput.year > new Date().getFullYear() ||
      dateInput.year < 0
    ) {
      console.log("Invalid value");
    } else if (
      dateInput.day == 0 ||
      dateInput.month == 0 ||
      dateInput.year == 0
    ) {
      setIsEmpty(true);
    } else if (
      isDateValid(dateInput.year, dateInput.month, dateInput.day) == false
    ) {
      setIsValid(true);
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
        months: monthDiff.toString(),
        days: dayDiff.toString(),
        years: yearDiff.toString(),
      });

      setIsEmpty(false);
      setIsValid(false);
    }
  };

  return (
    <>
      <div className="flex flex-col bg-white font-poppins800i  w-[300px] mx-auto rounded-t-2xl rounded-bl-2xl rounded-br-[80px] md:w-[550px] md:rounded-br-[150px]">
        <form onSubmit={calculateAge}>
          <div className="font-poppins700 mb-[40px] flex justify-center gap-4 pt-[40px] md:mb-[0px] md:justify-start md:ml-[40px] md:gap-5 ">
            {/* //DAY INPUT */}
            <div className="flex flex-col justify-center relative">
              {" "}
              <span
                className={`text-lightgrey uppercase tracking-[2px] text-[11px] mr-auto mb-[5px] md:text-[10px] ${
                  dateInput.day > 31 || dateInput.day < 0 || isEmpty || isValid
                    ? "text-primaryRed"
                    : "text-lightgrey"
                }`}
              >
                {" "}
                Day
              </span>
              <input
                placeholder="DD"
                className={`border-solid border-[1px] border-offwhite w-[70px] rounded-lg h-[45px] px-[10px] focus:outline-none md:w-[105px] md:h-[55px] md:text-[23px] ${
                  dateInput.day > 31 || dateInput.day < 0 || isEmpty || isValid
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
                className={`text-[9px] absolute top-[65px] left-[-5px] w-[80px] mt-[5px] font-poppins400i md:top-[70px] md:text-[10px] md:w-[100px] md:left-[0] ${
                  dateInput.day > 31 || dateInput.day < 0
                    ? "inline-block text-primaryRed"
                    : "hidden"
                }`}
              >
                Must be a valid day
              </span>
              <span
                className={`text-[9px] absolute top-[65px] left-[-5px] w-[80px] mt-[5px] font-poppins400i md:top-[70px] md:text-[10px] md:w-[100px] md:left-[0] ${
                  isEmpty ? "inline-block text-primaryRed" : "hidden"
                }`}
              >
                This field is required
              </span>
              <span
                className={`text-[9px] absolute top-[65px] left-[-5px] w-[80px] mt-[5px] font-poppins400i  md:top-[70px] md:text-[10px] md:w-[100px] md:left-[0] ${
                  isValid ? "inline-block text-primaryRed" : "hidden"
                }`}
              >
                Must be a valid date
              </span>
            </div>

            {/* // MONTH INPUT */}
            <div className="flex flex-col relative">
              {" "}
              <span
                className={`text-lightgrey uppercase tracking-[2px] text-[11px] mr-auto mb-[5px] md:text-[10px]  ${
                  dateInput.month > 12 ||
                  dateInput.month < 0 ||
                  isEmpty ||
                  isValid
                    ? "text-primaryRed"
                    : "text-lightgrey"
                } `}
              >
                Month
              </span>
              <input
                placeholder="MM"
                className={`border-solid border-[1px] border-offwhite w-[70px] rounded-lg h-[45px] px-[10px] md:w-[105px] md:h-[55px] md:text-[23px] focus:outline-none ${
                  dateInput.month > 12 ||
                  dateInput.month < 0 ||
                  isEmpty ||
                  isValid
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
                className={`text-[9px] absolute top-[65px] left-[-5px] w-[80px] mt-[5px] font-poppins400i md:top-[70px] md:text-[10px] md:w-[100px] md:left-[0] ${
                  dateInput.month > 12 || dateInput.month < 0
                    ? "inline-block text-primaryRed"
                    : "hidden"
                }`}
              >
                Must be a valid month
              </span>
              <span
                className={`text-[9px] absolute top-[65px] left-[-5px] w-[80px] mt-[5px] font-poppins400i md:top-[70px] md:text-[10px] md:w-[100px] md:left-[0] ${
                  isEmpty ? "inline-block text-primaryRed" : "hidden"
                }`}
              >
                This field is required
              </span>
            </div>

            {/* // YEAR INPUT */}
            <div className="flex flex-col relative">
              {" "}
              <span
                className={`text-lightgrey uppercase tracking-[2px] text-[11px] mr-auto mb-[5px] md:text-[10px] ${
                  dateInput.year > currentDate.year ||
                  dateInput.year < 0 ||
                  isEmpty ||
                  isValid
                    ? "text-primaryRed"
                    : "text-lightgrey"
                }`}
              >
                Year
              </span>
              <input
                placeholder="YYYY"
                className={`border-solid border-[1px] border-offwhite w-[70px] rounded-lg h-[45px] px-[10px] md:w-[105px] md:h-[55px] md:text-[23px] focus:outline-none ${
                  dateInput.year > currentDate.year ||
                  dateInput.year < 0 ||
                  isEmpty ||
                  isValid
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
                className={`text-[9px] absolute top-[65px] left-[-5px] w-[80px] mt-[5px] font-poppins400i md:top-[70px] md:text-[10px] md:w-[100px] md:left-[0] ${
                  dateInput.year > currentDate.year
                    ? "inline-block text-primaryRed"
                    : "hidden"
                }`}
              >
                Must be in the past
              </span>
              <span
                className={`text-[9px] absolute top-[65px] left-[-5px] w-[80px] mt-[5px] font-poppins400i md:top-[70px] md:text-[10px] md:w-[100px] md:left-[0] ${
                  dateInput.year < 0 ? "inline-block text-primaryRed" : "hidden"
                }`}
              >
                Must be a valid year
              </span>
              <span
                className={`text-[9px] absolute top-[65px] left-[-5px] w-[80px] mt-[5px] font-poppins400i md:top-[70px] md:text-[10px] md:w-[100px] md:left-[0] ${
                  isEmpty ? "inline-block text-primaryRed" : "hidden"
                }`}
              >
                This field is required
              </span>
            </div>
          </div>
          <div className="relative mb-[30px] hover:pointer md:mb-[0px] ">
            <button
              type="submit"
              className="z-10 bg-primaryPurple hover:bg-offblack relative w-[50px] h-[50px] flex justify-end items-center rounded-full m-auto mt-[20px] md:w-[70px] md:h-[70px] md:ml-auto md:mr-[40px]"
            >
              <div>
                <img
                  className="w-[25px] h-[25px] absolute top-[13px] left-[13px] z-50 hover:cursor-pointer md:w-[35px] md:h-[35px] md:top-[16px] md:left-[17px]"
                  src={arrow}
                  alt="arrow"
                />
              </div>
            </button>
            <div className="bg-offwhite h-[1px] w-[250px] m-auto absolute z-0 right-[25px] top-[25px] md:w-[480px] md:top-[35px] md:right-[39px]"></div>
          </div>
        </form>
        <div className="text-5xl flex flex-col pb-[50px] md:text-[70px] md:ml-[10px]">
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
