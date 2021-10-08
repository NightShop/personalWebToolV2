const WarningPopUp = (props) => {
    const { closePopup, message } = props;
    return (
        <div className="bg-red-700 my-6">
            <p className="pt-2">{message}</p>
            <button className="my-2 underline" type="button" onClick={closePopup}>Close</button>
        </div>
    );
};

export default WarningPopUp;
