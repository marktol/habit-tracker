import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/hooks";
import {
  IHabit,
  IHabitsList,
  addHabitRecord,
  deleteHabit,
  selectHabitsList,
} from "../../utils/redux/habitsList";
import Checkbox from "@mui/material/Checkbox";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { SkipNext, SkipPrevious } from "@mui/icons-material";

const HabitTrackerList = () => {
  const habitsList: IHabitsList = useAppSelector(selectHabitsList);
  console.log(habitsList);

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const onNextYear = () => {
    setYear(year + 1);
  };

  const onPrevYear = () => {
    setYear(year - 1);
  };
  const onNextMonth = () => {
    setMonth(month + 1);
  };

  const onPrevMonth = () => {
    setMonth(month - 1);
  };

  return (
    <>
      <h1>
        <IconButton aria-label="prev" onClick={onPrevYear}>
          <SkipPrevious />
        </IconButton>
        {year}
        <IconButton aria-label="next" onClick={onNextYear}>
          <SkipNext />
        </IconButton>
      </h1>
      <h1>
        <IconButton aria-label="prev" onClick={onPrevMonth}>
          <SkipPrevious />
        </IconButton>
        {month}
        <IconButton aria-label="next" onClick={onNextMonth}>
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

const HabitTrackerBody = ({
  habits,
  month,
  year,
}: {
  habits: IHabit[];
  month: number;
  year: number;
}) => {
  const dispatch = useAppDispatch();

  function daysInMonth(month: number, year: number) {
    return new Date(year, month, 0).getDate();
  }
  const countOfDays: number = daysInMonth(month, year);
  const daysInTable: Array<number> = [];
  for (let i = 1; i < countOfDays; i++) {
    daysInTable.push(i);
  }

  const onCheckHabit = (id: string, date: string) => {
    dispatch(addHabitRecord({ id: id, date: date }));
  };

  return (
    <TableBody>
      {daysInTable.map((el) => (
        <TableRow key={el}>
          <TableCell>
            {el}.{month}
          </TableCell>
          {habits &&
            habits.map((habit: IHabit) => {
              if (habit.habitType === "checkBox") {
                return (
                  <TableCell
                    key={`${year}${month}${el}`}
                    id={`${year}${month}${el}`}
                  >
                    <Checkbox
                      checked={
                        habit.checkedDates?.find(
                          (check) => check.date === `${year}${month}${el}`
                        )
                          ? true
                          : false
                      }
                      onClick={() =>
                        onCheckHabit(habit.id, `${year}${month}${el}`)
                      }
                    />
                  </TableCell>
                );
              } else {
                return (
                  <TableCell key={`${year}${month}${el}`}>
                    <TextField type="name" />
                  </TableCell>
                );
              }
            })}
        </TableRow>
      ))}
    </TableBody>
  );
};

const HabitTrackerHead = ({ habits }: { habits: IHabit[] }) => {
  const dispatch = useAppDispatch();

  const onRemoveHabbit = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(deleteHabit({ id: e.currentTarget.getAttribute("id") }));
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell>Date</TableCell>
        {habits &&
          habits.map((el: IHabit) => {
            return (
              <TableCell key={el.name} id={el.name}>
                {el.name}
                <IconButton
                  aria-label="delete"
                  onClick={onRemoveHabbit}
                  id={el.id}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            );
          })}
      </TableRow>
    </TableHead>
  );
};

export default HabitTrackerList;
