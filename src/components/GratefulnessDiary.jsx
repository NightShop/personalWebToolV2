import { getFirestore, doc, collection, onSnapshot, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import GratefulnessNewDay from "./GratefulnessNewDay";
import GratefulnessDay from "./GratefulnessDay";

const GratefulnessDiary = (props) => {
    const { userId } = props;
    const [showAddNewDay, setShowAddNewDay] = useState(false);
    const [gratefulnessDays, setGratefulnessDays] = useState({});
    const db = getFirestore();

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "users", userId, "gratefulnessDays"), (docu) => {
            const tempObj = {};
            docu.forEach((document) => {
                tempObj[document.id] = document.data();
            });
            console.log("tempObj ", tempObj);
            setGratefulnessDays(tempObj);
        });

        return () => unsub();
    }, [db, userId]);

    const deleteEntry = async (date) => {
        await deleteDoc(doc(db, "users", userId, "gratefulnessDays", date));
    };

    return (
        <div>
            <h1>This is gratefulness diary</h1>
            <button type="button" onClick={() => setShowAddNewDay(!showAddNewDay)}>Add new</button>
            {showAddNewDay && <GratefulnessNewDay userId={userId} />}
            {(gratefulnessDays !== {})
            ? Object.entries(gratefulnessDays).map(([date, dayData]) => <GratefulnessDay deleteEntry={deleteEntry} date={date} dayData={dayData} />)
            : null}
        </div>
    );
};

export default GratefulnessDiary;
