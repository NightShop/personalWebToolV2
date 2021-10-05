const WarningPopUp = (props) => {
    const { closePopup } = props;
    return (
        <div className="bg-red-700">
            <p>You already set Habit day at this date</p>
            <button type="button" onClick={closePopup}>Close</button>
        </div>
    );
};

export default WarningPopUp;
