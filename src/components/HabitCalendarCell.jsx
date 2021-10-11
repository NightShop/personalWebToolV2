const HabitCalendarCell = (props) => {
    const { habit, totalPoints, occurence, plusPoint, minusPoint } = props;
    return (
        <div className="border-4 flex h-28 text-md lg:text-2xl justify-center items-center border-black">
            <div className="w-4/12  h-6/12 border-r-2 py-4">
                {habit}
            </div>
            <div className="w-3/12 text-xl md:text-4xl h-6/12 border-r-2 py-4">
                {Number.isNaN(occurence) ? "/" : `# ${occurence}`}
            </div>
            <div className="w-3/12 text-xl md:text-4xl">
                {Number.isNaN(totalPoints) ? "/" : `∑ ${totalPoints}`}
            </div>
            <div className="w-1/6 lg:h-full lg:flex">
                {!Number.isNaN(totalPoints)
                    ? (
                        <div className="w-full h-10 lg:w-1/2 lg:h-full flex justify-center items-center">
                            <button className="w-8 h-8 lg:h-5/6 rounded-full bg-rink-dark lg:rounded-sm" type="button" onClick={plusPoint}>+</button>
                        </div>
                    )
                    : <div className="w-1/12 h-full flex justify-center items-center" />}
                {!Number.isNaN(totalPoints)
                    ? (
                        <div className="w-full h-10 lg:w-1/2 lg:h-full flex justify-center items-center">
                            <button className="w-8 h-8 lg:h-5/6 rounded-full bg-rink-dark lg:rounded-sm" type="button" onClick={minusPoint}>-</button>
                        </div>
                    )
                    : <div className="w-1/12 h-full flex justify-center items-center" />}
            </div>
        </div>
    );
};

export default HabitCalendarCell;
