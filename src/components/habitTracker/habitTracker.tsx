import { useState } from "react";

import { useAppSelector } from "../../utils/hooks/hooks";
import { IHabitsList, selectHabitsList } from "../../utils/redux/habitsList";

import { Table, TableContainer } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import HabitTrackerHead from "../habitTrackerHead/habitTrackerHead";
import HabitTrackerBody from "../habitTrackerBody/habitTrackerBody";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

const HabitTracker = () => {
  const habitsList: IHabitsList = useAppSelector(selectHabitsList);

  const [month, setMonth] = useState(dayjs(new Date()));
  const [year, setYear] = useState(dayjs(new Date()));
  const ss = "asdf";

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={year}
          label={'"year"'}
          views={["year"]}
          onChange={(pickedYear) => {
            if (pickedYear) {
              setYear(pickedYear);
            }
          }}
        />
        <DatePicker
          value={month}
          label={'"month"'}
          views={["month"]}
          onChange={(pickedMonth) => {
            if (pickedMonth) {
              setMonth(pickedMonth);
            }
          }}
        />
      </LocalizationProvider>

      <TableContainer>
        <Table>
          <HabitTrackerHead habits={habitsList.habits} />
          <HabitTrackerBody
            habits={habitsList.habits}
            month={month.month()}
            year={year.year()}
          />
        </Table>
      </TableContainer>
    </>
  );
};

export default HabitTracker;
