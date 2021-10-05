import { getFirestore, doc, collection, onSnapshot, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import uniqid from "uniqid";
import helperFunction from "../assets/helperFunctions";
import GratefulnessNewDay from "./GratefulnessNewDay";
import GratefulnessDay from "./GratefulnessDay";
import WarningPopUp from "./WarningPopUp";
import DeleteConfirmationPopup from "./DeleteConfirmationPopup";

const GratefulnessDiary = (props) => {
    const { parseDate, newDateObject } = helperFunction;
    const { userId } = props;
    const [showAddNewDay, setShowAddNewDay] = useState(false);
    const [gratefulnessDays, setGratefulnessDays] = useState({});
    const [usedDates, setUsedDates] = useState([]);
    const [showWarningPopup, setShowWarningPopup] = useState("");
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [dateToDelete, setDateToDelete] = useState("");
    const db = getFirestore();

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "users", userId, "gratefulnessDays"), (docu) => {
            const tempObj = {};
            docu.forEach((document) => {
                tempObj[document.id] = document.data();
            });
            setGratefulnessDays(tempObj);
            setUsedDates(Object.keys(tempObj));
        });

        return () => unsub();
    }, [db, userId]);

    const deleteEntry = (date) => {
        setShowDeletePopup(true);
        setDateToDelete(date);
    };

    const deleteEntryFinal = async (date) => {
        await deleteDoc(doc(db, "users", userId, "gratefulnessDays", date));
        setDateToDelete("");
        setShowDeletePopup("");
    };

    return (
        <div className="mx-auto max-w-5xl text-center">
            <h1 className="font-bold text-3xl mx-auto block">This is gratefulness diary</h1>
            {showDeletePopup
                && (
                    <DeleteConfirmationPopup
                        message={`Delete this entry from ${dateToDelete}`}
                        confirmDeletion={() => deleteEntryFinal(dateToDelete)}
                        rejectDeletion={() => {
                            setDateToDelete("");
                            setShowDeletePopup("");
                        }}
                    />
                )}
            {showWarningPopup && <WarningPopUp message={showWarningPopup} closePopup={() => setShowWarningPopup("")} />}
            <button className="btn-test" type="button" onClick={() => setShowAddNewDay(!showAddNewDay)}>Add new</button>
            {showAddNewDay && (
                <GratefulnessNewDay
                    userId={userId}
                    usedDates={usedDates}
                    showWarningPopup={setShowWarningPopup}
                    closeNewPopup={() => setShowAddNewDay(false)}
                />
            )}
            {(gratefulnessDays !== {})
                ? Object.entries(gratefulnessDays)
                    .sort((entryA, entryB) => newDateObject(parseDate(entryA[0])) < newDateObject(parseDate(entryB[0])))
                    .map(([date, dayData]) => <GratefulnessDay key={uniqid()} deleteEntry={deleteEntry} date={date} dayData={dayData} />)
                : null}
        </div>
    );
};

export default GratefulnessDiary;
