import { createSlice } from "@reduxjs/toolkit";

export enum habitType {
  checkBox = "checkBox",
  value = "value",
}

export interface IRecord {
  date: string;
  info?: string;
}

export interface IHabit {
  id: string;
  name: string;
  habitType: habitType;
  checkedDates?: Array<IRecord>;
}

export interface IHabitsList {
  habits: Array<IHabit>;
}

const initialState: IHabitsList = {
  habits: [
    {
      id: "reading",
      name: "reading",
      habitType: habitType.checkBox,
      checkedDates: [],
    },
  ],
};

export const habitsList = createSlice({
  name: "habitsList",
  initialState,
  reducers: {
    addHabit: (state, action) => {
      const { id, name, habitType } = action.payload;
      if (!state.habits.find((el) => el.id === id)) {
        state.habits.push({ id, name, habitType, checkedDates: [] });
      }
    },
    deleteHabit(state, action) {
      state.habits = state.habits.filter((el) => el.id !== action.payload.id);
    },
    changeHabitRecord(state, action) {
      const { id, date } = action.payload;
      state.habits = state.habits.map((habit) => {
        if (habit.id == id) {
          if (habit.checkedDates?.find((record) => record.date === date)) {
            habit.checkedDates = habit.checkedDates.filter((record) => {
              return record.date !== date;
            });
          } else {
            habit.checkedDates?.push({ date: date });
          }
        }

        return habit;
      });
    },
  },
});

export const { addHabit, deleteHabit, changeHabitRecord } = habitsList.actions;
export const selectHabitsList = (state: any) => state.habitsList;

export default habitsList.reducer;
