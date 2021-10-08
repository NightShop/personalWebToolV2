import uniqid from "uniqid";

import HabitCalendarCell from "./HabitCalendarCell";

const HabitCalendarRow = (props) => {
    const { habitDayDate, habitDaysCombined, deleteHabitDay, plusPoint, minusPoint } = props;
    const totalPoints = Object.keys(habitDaysCombined).reduce((sum, currentHabit) => {
        if (habitDaysCombined[currentHabit].totalPoints) {
            return sum + habitDaysCombined[currentHabit].totalPoints;
        }
        return sum;
    }, 0);

    const divArray = [];
    for (let i = 0; i < totalPoints / 2; i += 1) {
        divArray.push("1");
    }
    let color = "";
    console.log(totalPoints);
    console.log(parseInt(totalPoints) > 10);
    switch (true) {
        case totalPoints > 90:
            color = "animate-pulse bg-red-700";
            break;
        case totalPoints >= 80:
            color = "bg-red-800";
            break;
        case totalPoints >= 70:
            color = "bg-red-500";
            break;
        case totalPoints >= 60:
            color = "bg-purple-500";
            break;
        case totalPoints >= 50:
            color = "bg-indigo-500";
            break;
        case totalPoints >= 40:
            color = "bg-blue-500";
            break;
        case totalPoints >= 30:
            color = "bg-green-500";
            break;
        case totalPoints >= 20:
            color = "bg-yellow-400";
            break;
        case totalPoints >= 10:
            color = "bg-yellow-200";
            break;
        default:
            color = "bg-white";
    }

    return (
        <div className="border-white border-2 bg-green-400 mb-10">
            <div className="text-white font-extrabold text-4xl w-full tracking-widestest my-6">
                {habitDayDate}
            </div>
            <div className="flex">
                <div className="w-4/6">
                    {Object.keys(habitDaysCombined).sort((a, b) => a > b).map((habit) => (
                        <HabitCalendarCell
                            key={uniqid()}
                            habit={habit}
                            points={habitDaysCombined[habit].points}
                            occurence={habitDaysCombined[habit].totalPoints / habitDaysCombined[habit].points}
                            totalPoints={habitDaysCombined[habit].totalPoints}
                            plusPoint={() => plusPoint(habitDayDate, habit, habitDaysCombined[habit].points, habitDaysCombined[habit].totalPoints)}
                            minusPoint={() => minusPoint(habitDayDate, habit, habitDaysCombined[habit].points, habitDaysCombined[habit].totalPoints)}
                        />
                    ))}
                </div>
                <div className="m-2 bg-gray-300 flex flex-nowrap flex-col-reverse w-2/6">
                    {
                        divArray && divArray.map(() => (
                            <div className={`h-1/50 w-full block box-border border-black border-2 ${color}`} />
                        ))
                    }
                    Total:
                    {totalPoints}
                </div>
            </div>
            <div className="w-full">
                <button
                    className="w-full font-bold tracking-widest border-white border-t-8 bg-rink-light py-2"
                    type="button"
                    onClick={() => deleteHabitDay(habitDayDate)}
                >
                    DELETE DAY
                </button>
            </div>
        </div>
    );
};

export default HabitCalendarRow;
