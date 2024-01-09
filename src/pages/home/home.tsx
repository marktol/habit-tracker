import AddHabit from "../../components/addHabit/addHabit";
import HabitTrackerList from "../../components/habitTrackerList/habitTrackerList";
import { useAppSelector } from "../../utils/hooks/hooks";
import { selectHabitsList } from "../../utils/redux/habitsList";

const Home = () => {
  const habitsList = useAppSelector(selectHabitsList);

  return (
    <div>
      <AddHabit />
      {habitsList.habits.length > 0 && <HabitTrackerList />}
    </div>
  );
};

export default Home;
