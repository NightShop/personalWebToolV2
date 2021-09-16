const HabitsInfoRow = (props) => {
    const { habitInfo } = props;
    console.log(habitInfo);
    return (
        <tr>
            <td>{habitInfo[0]}</td>
            <td>{habitInfo[1]}</td>
            <td><a href="/">delete</a></td>
            <td><a href="/">update</a></td>
        </tr>
    );
};

export default HabitsInfoRow;
