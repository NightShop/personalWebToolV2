const DeleteConfirmationPopup = (props) => {
    const { confirmDeletion, rejectDeletion } = props;
    return (
        <div className="bg-red-500">
            <p>Do you really want to delete this habit</p>
            <button type="button" onClick={confirmDeletion}>Yes</button>
            <button type="button" onClick={rejectDeletion}>No</button>
        </div>
    )
}

export default DeleteConfirmationPopup;
