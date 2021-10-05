const WarningPopUp = (props) => {
    const { closePopup, message } = props;
    return (
        <div className="bg-red-700">
            <p>{message}</p>
            <button type="button" onClick={closePopup}>Close</button>
        </div>
    );
};

export default WarningPopUp;
