import { useState } from "react";

import { useAppSelector } from "../../utils/hooks/hooks";
import { IHabitsList, selectHabitsList } from "../../utils/redux/habitsList";

import { Table, TableContainer } from "@mui/material";
import { SkipNext, SkipPrevious } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

import HabitTrackerHead from "../habitTrackerHead/habitTrackerHead";
import HabitTrackerBody from "../habitTrackerBody/habitTrackerBody";

const HabitTracker = () => {
  const habitsList: IHabitsList = useAppSelector(selectHabitsList);

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const onNextYearButtonClick = () => {
    setYear(year + 1);
  };

  const onPrevYearButtonClick = () => {
    setYear(year - 1);
  };
  const onNextMonthButtonClick = () => {
    setMonth(month + 1);
  };

  const onPrevMonthButtonClick = () => {
    setMonth(month - 1);
  };

  return (
    <>
      <h1>
        <IconButton aria-label="prev" onClick={onPrevYearButtonClick}>
          <SkipPrevious />
        </IconButton>
        {year}
        <IconButton aria-label="next" onClick={onNextYearButtonClick}>
          <SkipNext />
        </IconButton>
      </h1>
      <h1>
        <IconButton aria-label="prev" onClick={onPrevMonthButtonClick}>
          <SkipPrevious />
        </IconButton>
        {month}
        <IconButton aria-label="next" onClick={onNextMonthButtonClick}>
          <SkipNext />
        </IconButton>
      </h1>
      <TableContainer>
        <Table>
          <HabitTrackerHead habits={habitsList.habits} />
          <HabitTrackerBody
            habits={habitsList.habits}
            month={month}
            year={year}
          />
        </Table>
      </TableContainer>
    </>
  );
};

export default HabitTracker;
