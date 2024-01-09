import { TableCell, TableHead, TableRow } from "@mui/material";
import { useAppDispatch } from "../../utils/hooks/hooks";
import { IHabit, deleteHabit } from "../../utils/redux/habitsList";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

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

export default HabitTrackerHead;
