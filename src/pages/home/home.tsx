import HabitCreationForm from "../../components/habitCreationForm/habitCreationForm";
import HabitTracker from "../../components/habitTracker/habitTracker";
import { useAppSelector } from "../../utils/hooks/hooks";
import { selectHabitsList } from "../../utils/redux/habitsList";

const Home = () => {
  const habitsList = useAppSelector(selectHabitsList);

  return (
    <div>
      <HabitCreationForm />
      {habitsList.habits.length > 0 && <HabitTracker />}
    </div>
  );
};

export default Home;
