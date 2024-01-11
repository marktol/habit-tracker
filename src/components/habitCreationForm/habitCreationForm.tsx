import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "../../utils/hooks/hooks";
import { addHabit, habitType } from "../../utils/redux/habitsList";
import {
  FormLabel,
  FormSection,
  FormSubmitButton,
} from "./habitCreationForm.styled";
import {
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const HabitCreationForm = () => {
  const dispatch = useAppDispatch();

  const [habitName, setHabitName] = useState("");
  const [type, setType] = useState(habitType.checkBox);

  const onHabitNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHabitName(e.target.value);
  };
  const onTypeChange = (e: any) => {
    setType(e.target.value);
  };

  const onAddHabit = (event: FormEvent) => {
    event.preventDefault();

    dispatch(addHabit({ id: habitName, name: habitName, habitType: type }));
    setHabitName("");
  };

  return (
    <div>
      <h1>Add Habit</h1>
      <form onSubmit={onAddHabit}>
        <FormSection>
          <FormLabel variant="h6">Name: </FormLabel>
          <TextField
            required
            type="name"
            onChange={onHabitNameChange}
            value={habitName}
          />
        </FormSection>
        <FormSection>
          <FormLabel variant="h6">Type: </FormLabel>
          <Select name="type" onChange={onTypeChange} value={type}>
            {Object.values(habitType).map((el) => {
              return (
                <MenuItem key={el} value={el}>
                  {el}
                </MenuItem>
              );
            })}
          </Select>
        </FormSection>
        <FormSection>
          <FormSubmitButton variant="outlined" type="submit" size="large">
            Save
          </FormSubmitButton>
        </FormSection>
      </form>
    </div>
  );
};

export default HabitCreationForm;
