const HabitsInfoRow = (props) => {
    const { habitInfo, openPopup, deleteHabit } = props;

    return (
        <tr className="bg-green-400">
            <td className="border-4 border-black p-5">{habitInfo[0]}</td>
            <td className="border-4 border-black p-5">{habitInfo[1]}</td>
            <td className="border-4 border-black bg-rink-light">
                <button
                    className="w-full hover:text-white"
                    type="button"
                    onClick={() => openPopup(habitInfo[0], habitInfo[1])}
                >
                    update
                </button>
            </td>
            <td
                className="border-4 border-black bg-rink-light"
            >
                <button
                    className="w-full hover:text-white"
                    type="button"
                    onClick={() => deleteHabit(habitInfo[0])}
                >
                    delete
                </button>
            </td>
        </tr>
    );
};

export default HabitsInfoRow;
