const DeleteConfirmationPopup = (props) => {
    const { confirmDeletion, rejectDeletion, message } = props;
    return (
        <div className="bg-red-500 p-2 my-4">
            <p>{message}</p>
            <button className="underline mx-6" type="button" onClick={confirmDeletion}>Yes</button>
            <button className="underline mx-6" type="button" onClick={rejectDeletion}>No</button>
        </div>
    );
};

export default DeleteConfirmationPopup;
