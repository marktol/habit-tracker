import { FormEvent, useState } from "react";
import { useAppDispatch } from "../../utils/hooks/hooks";
import { addHabit, habitType } from "../../utils/redux/habitsList";
import { FormLabel, FormSection, FormSubmitButton } from "./addHabit.styled";
import {
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const AddHabit = () => {
  const dispatch = useAppDispatch();

  const [habitName, setHabitName] = useState("");
  const [type, setType] = useState(habitType.checkBox);

  const onHabitNameChange = (e: any) => {
    setHabitName(e.target.value);
  };
  const onTypeChange = (e: any) => {
    setType(e.target.value);
  };

  const addFilledHabit = (event: FormEvent) => {
    console.log("save clicked");
    event.preventDefault();

    if (habitName.length > 0) {
      dispatch(addHabit({ id: habitName, name: habitName, habitType: type }));
      setHabitName("");
    }
  };

  return (
    <div>
      <h1>Add Habit</h1>
      <form onSubmit={addFilledHabit}>
        <FormSection>
          <FormLabel variant="h6">Name: </FormLabel>
          <TextField
            type="name"
            onChange={onHabitNameChange}
            value={habitName}
          />
        </FormSection>
        <FormSection>
          <FormLabel variant="h6">Type: </FormLabel>
          <Select
            label="Age *"
            name="type"
            onChange={onTypeChange}
            value={type}
          >
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

export default AddHabit;
