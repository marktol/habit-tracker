import { TableBody, TableCell, TableRow, TextField } from "@mui/material";
import { useAppDispatch } from "../../utils/hooks/hooks";
import { IHabit, changeHabitRecord } from "../../utils/redux/habitsList";
import Checkbox from "@mui/material/Checkbox";

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

  function getDaysInMonth(month: number, year: number) {
    return new Date(year, month, 0).getDate();
  }
  const countOfDays: number = getDaysInMonth(month, year);

  const daysInTable: Array<number> = Array.from(
    { length: countOfDays },
    (_, i) => i + 1
  );

  const onCheckHabit = (id: string, date: string) => {
    dispatch(changeHabitRecord({ id: id, date: date }));
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
                  <TableCell key={`${habit.name}${year}${month}${el}`}>
                    <Checkbox
                      checked={habit.checkedDates?.some(
                        (check) => check.date === `${year}${month}${el}`
                      )}
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

export default HabitTrackerBody;
