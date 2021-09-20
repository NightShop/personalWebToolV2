import { useState } from "react";
import HabitsInfoHeader from "./HabitsInfoHeader";
import HabitsInfoRow from "./HabitsInfoRow";
import HabitAddPopup from "./HabitAddPopup";

const HabitsEdit = (props) => {
    const { habitsInfo, closeHabitsEdit } = props;
    const [addHabitPopupOpened, setAddHabitPopupOpened] = useState(false);

    return (
        <div>
            <h1>user: {props.userId}</h1>
            <table>
                <HabitsInfoHeader />
                <tbody>
                    {Object.keys(habitsInfo).map((key) => <HabitsInfoRow habitInfo={[key, habitsInfo[key]]} />)}
                </tbody>
            </table>
            <button type="button" onClick={() => setAddHabitPopupOpened(!addHabitPopupOpened)}>Add new habit</button>
            {addHabitPopupOpened && <HabitAddPopup userId={props.userId} closePopup={() => setAddHabitPopupOpened(!addHabitPopupOpened)} /> }
            <button type="button" onClick={closeHabitsEdit}>Back</button>
        </div>
    );
};

export default HabitsEdit;
