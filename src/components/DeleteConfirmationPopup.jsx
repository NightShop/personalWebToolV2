const DeleteConfirmationPopup = (props) => {
    const { confirmDeletion, rejectDeletion, message } = props;
    return (
        <div className="bg-red-500">
            <p>{message}</p>
            <button type="button" onClick={confirmDeletion}>Yes</button>
            <button type="button" onClick={rejectDeletion}>No</button>
        </div>
    );
};

export default DeleteConfirmationPopup;
