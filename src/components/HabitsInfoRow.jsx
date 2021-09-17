const HabitsInfoRow = (props) => {
    const { habitInfo } = props;
    console.log(habitInfo);
    return (
        <tr>
            <td>{habitInfo[0]}</td>
            <td>{habitInfo[1]}</td>
            <td><button type="button">update</button></td>
            <td><button type="button">delete</button></td>
        </tr>
    );
};

export default HabitsInfoRow;
