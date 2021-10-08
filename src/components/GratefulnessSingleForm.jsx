import { useEffect, useState } from "react";

const GratefulnessSingleForm = (props) => {
    const { setEntry, number } = props;
    const [title, setTitle] = useState("");
    const [main, setMain] = useState("");

    useEffect(() => {
        setEntry({ title, main });
    }, [title, main, setEntry]);

    return (
        <div className="m-4 border-rink-light border-b-8 flex justify-center">
            <div className="w-1/3 flex items-center">
                <h2 className="mx-auto text-7xl lg:text-9xl text-gray-300">
                    #
                    {number}
                </h2>
            </div>
            <div className="w-2/3">
                <input
                    placeholder="What are you gratefull for?"
                    className="placeholder-gray-300 border-4 border-green-400 w-3/4 my-2"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <textarea
                    placeholder="Why?"
                    className="placeholder-gray-300 border-4 border-green-400 w-3/4 mb-5 h-32"
                    type="text"
                    value={main}
                    onChange={(e) => setMain(e.target.value)}
                />
            </div>
        </div>
    );
};

export default GratefulnessSingleForm;
