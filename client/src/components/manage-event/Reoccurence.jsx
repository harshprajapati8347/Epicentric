import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Reoccurence = ({
  reoccuringTimeTable,
  occType,
  setReoccuringTimeTable,
}) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  // Month Range Picker
  const [startMonth, setStartMonth] = useState();
  const [endMonth, setEndMonth] = useState();
  // Year Range Picker
  const [startYear, setStartYear] = useState();
  const [endYear, setEndYear] = useState();

  useEffect(() => {
    if (startMonth && endMonth) {
      setReoccuringTimeTable((prevState) => ({
        ...prevState,
        startMonth: startMonth.getMonth() + 1, // Adding 1 since getMonth() returns 0-indexed month
        endMonth: endMonth.getMonth() + 1,
      }));

      // If startDate && endDate then get date example (10 to 12)
      if (startDate && endDate) {
        setReoccuringTimeTable((prevState) => ({
          ...prevState,
          startDate: startDate.getDate(),
          endDate: endDate.getDate(),
        }));
      }
    }

    if (startDate && endDate) {
      setReoccuringTimeTable((prevState) => ({
        ...prevState,
        startDate: startDate.getDate(),
        endDate: endDate.getDate(),
        startMonth: startDate.getMonth() + 1,
        endMonth: endDate.getMonth() + 1,
        startYear: startDate.getFullYear(),
        endYear: endDate.getFullYear(),
      }));
    }
  }, [
    endDate,
    endMonth,
    endYear,
    setReoccuringTimeTable,
    startDate,
    startMonth,
    startYear,
  ]);

  useEffect(() => {
    if ((startYear, endYear)) {
      setReoccuringTimeTable((prevState) => ({
        ...prevState,
        startYear: startYear.getFullYear(),
        endYear: endYear.getFullYear(),
      }));
    }
  }, [startYear, endYear, setReoccuringTimeTable]);

  useEffect(() => {
    // If startMonth and endMonth are updated
    if (startMonth && endMonth) {
      // Get the start date of the month and end date of the month and set it to the dateRange
      const start = new Date(startMonth.getFullYear(), startMonth.getMonth());
      const end = new Date(endMonth.getFullYear(), endMonth.getMonth() + 1);
      setDateRange([start, end]);
    }
  }, [startMonth, endMonth]);

  return (
    <>
      {occType === "Yearly" ? (
        <>
          <Flex>
            <DatePicker
              selected={startYear}
              onChange={(date) => setStartYear(date)}
              selectsStart
              startDate={startYear}
              endDate={endYear}
              dateFormat="yyyy"
              showYearPicker
              placeholderText="Start Year"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            <DatePicker
              selected={endYear}
              onChange={(date) => setEndYear(date)}
              selectsEnd
              startDate={startYear}
              endDate={endYear}
              dateFormat="yyyy"
              showYearPicker
              placeholderText="End Year"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            {startYear && endYear && (
              <>
                <DatePicker
                  selected={startMonth}
                  onChange={(date) => setStartMonth(date)}
                  selectsStart
                  startDate={startMonth}
                  endDate={endMonth}
                  dateFormat="MM"
                  showMonthYearPicker
                  placeholderText="Start Month"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
                <DatePicker
                  selected={endMonth}
                  onChange={(date) => setEndMonth(date)}
                  selectsEnd
                  startDate={startMonth}
                  endDate={endMonth}
                  dateFormat="MM"
                  showMonthYearPicker
                  placeholderText="End Month"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </>
            )}
          </Flex>
          <Flex className="my-4">
            {startMonth && endMonth && (
              <>
                <DatePicker
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => {
                    setDateRange(update);
                  }}
                  isClearable={true}
                  // monthsShown={2}
                  dateFormat={"dd"}
                  placeholderText="Select Date Range"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </>
            )}
          </Flex>
        </>
      ) : occType === "Monthly" ? (
        <Flex>
          <DatePicker
            selected={startMonth}
            onChange={(date) => setStartMonth(date)}
            selectsStart
            startDate={startMonth}
            endDate={endMonth}
            dateFormat="MM"
            showMonthYearPicker
            placeholderText="Start Month"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
          <DatePicker
            selected={endMonth}
            onChange={(date) => setEndMonth(date)}
            selectsEnd
            startDate={startMonth}
            endDate={endMonth}
            dateFormat="MM"
            showMonthYearPicker
            placeholderText="End Month"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
          {startMonth && endMonth && (
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
              }}
              isClearable={true}
              // monthsShown={2}
              dateFormat={"dd"}
              placeholderText="Select Date Range"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          )}
        </Flex>
      ) : (
        <DatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => {
            setDateRange(update);
          }}
          isClearable={true}
          // monthsShown={2}
          dateFormat={"dd/mm/yyyy"}
          placeholderText="Select Date Range"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      )}
    </>
  );
};

export default Reoccurence;
