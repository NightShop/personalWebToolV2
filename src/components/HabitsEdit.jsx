import { useState } from "react";
import HabitsInfoHeader from "./HabitsInfoHeader";
import HabitsInfoRow from "./HabitsInfoRow";
import HabitAddPopup from "./HabitAddPopup";

const HabitsEdit = (props) => {
    const { habitsInfo } = props;
    const [addHabitPopupOpened, setAddHabitPopupOpened] = useState(false);

    return (
        <div>
            <table>
                <HabitsInfoHeader />
                <tbody>
                    {Object.keys(habitsInfo).map((key) => <HabitsInfoRow habitInfo={[key, habitsInfo[key]]} />)}
                </tbody>
            </table>
            <button type="button" onClick={() => setAddHabitPopupOpened(!addHabitPopupOpened)}>Add new habit</button>
            {addHabitPopupOpened && <HabitAddPopup /> }
        </div>
    );
};

export default HabitsEdit;
