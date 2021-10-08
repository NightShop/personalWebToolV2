const HabitsInfoRow = (props) => {
    const { habitInfo, openPopup, deleteHabit } = props;

    return (
        <tr className="bg-green-400">
            <td className="m-4">{habitInfo[0]}</td>
            <td>{habitInfo[1]}</td>
            <td><button type="button" onClick={() => openPopup(habitInfo[0], habitInfo[1])}>update</button></td>
            <td><button type="button" onClick={() => deleteHabit(habitInfo[0])}>delete</button></td>
        </tr>
    );
};

export default HabitsInfoRow;
