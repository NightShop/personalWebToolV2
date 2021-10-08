const HabitCalendarCell = (props) => {
    const { habit, totalPoints, occurence, plusPoint, minusPoint } = props;
    return (
        <div className="border-4 flex h-28 text-2xl justify-center items-center border-black">
            <div className="w-4/12  h-6/12 border-r-2 py-4">
                {habit}
            </div>
            <div className="w-3/12 text-4xl h-6/12 border-r-2 py-4">
                {Number.isNaN(occurence) ? "/" : `# ${occurence}`}
            </div>
            <div className="w-3/12 text-4xl">
                {Number.isNaN(totalPoints) ? "/" : `∑ ${totalPoints}`}
            </div>
            {!Number.isNaN(totalPoints)
                ? (
                    <div className="w-1/12 h-full flex justify-center items-center">
                        <button className="w-6 h-4/5 bg-rink-dark rounded-sm" type="button" onClick={plusPoint}>+</button>
                    </div>
                )
                : <div className="w-1/12 h-full flex justify-center items-center" />}
            {!Number.isNaN(totalPoints)
                ? (
                    <div className="w-1/12 h-full flex justify-center items-center">
                        <button className="w-6 h-4/5 bg-rink-dark rounded-sm" type="button" onClick={minusPoint}>-</button>
                    </div>
                )
                : <div className="w-1/12 h-full flex justify-center items-center" />}
        </div>
    );
};

export default HabitCalendarCell;
