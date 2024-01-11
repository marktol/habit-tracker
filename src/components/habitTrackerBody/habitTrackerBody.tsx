import { TableBody, TableCell, TableRow, TextField } from "@mui/material";
import { useAppDispatch } from "../../utils/hooks/hooks";
import {
  IHabit,
  changeHabitCheckRecord,
  changeHabitValueRecord,
} from "../../utils/redux/habitsList";
import Checkbox from "@mui/material/Checkbox";
import { ChangeEvent } from "react";
import dayjs from "dayjs";

const HabitTrackerBody = ({
  habits,
  year,
  month,
}: {
  habits: IHabit[];
  year: dayjs.Dayjs;
  month: dayjs.Dayjs;
}) => {
  const dispatch = useAppDispatch();

  const daysInTable: Array<number> = Array.from(
    { length: month.daysInMonth() },
    (_, i) => i + 1
  );

  const onCheckHabit = (id: string, date: string) => {
    dispatch(changeHabitCheckRecord({ id: id, date: date }));
  };

  const onChangeValueHabit = (
    id: string,
    date: string,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(
      changeHabitValueRecord({ id: id, date: date, value: e.target.value })
    );
  };

  return (
    <TableBody>
      {daysInTable.map((el) => (
        <TableRow key={el}>
          <TableCell>
            {el}.{month.month()}
          </TableCell>
          {habits &&
            habits.map((habit: IHabit) => {
              const currentDate = `${year}${month}${el}`;
              return (
                <TableCell key={`${habit.name}${currentDate}`}>
                  {habit.habitType === "checkBox" && (
                    <Checkbox
                      checked={habit.checkedDates?.some(
                        (check) => check.date === currentDate
                      )}
                      onClick={() => onCheckHabit(habit.id, currentDate)}
                    />
                  )}
                  {habit.habitType === "value" && (
                    <TextField
                      type="name"
                      value={
                        habit.checkedDates?.find(
                          (check) => check.date === currentDate
                        )?.info || ""
                      }
                      onChange={(e) =>
                        onChangeValueHabit(habit.id, currentDate, e)
                      }
                    />
                  )}
                </TableCell>
              );
            })}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default HabitTrackerBody;
