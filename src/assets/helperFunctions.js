const helperFunction = (() => {
    const parseBlogPost = (text) => {
        let lines = text.split("\n");
        lines = lines.map((line) => {
            if (line[0] === "#") {
                let i = 0;
                let times = 0;
                while (line[i] === "#") {
                    times += 1;
                    i += 1;
                }

                return `<h1 style="font-size: ${times}rem">${line.slice(times)}</h1>`;
            }
            if (line.length === 0) {
                return "<br/>";
            }
            if (line.includes("http")) {
                let alt = line.split("/");
                alt = alt[alt.length - 1];
                return `<img src=${line} alt="${alt}" />`;
            }
            return `<p>${line}</p>`;
        });
        return lines.join("");
    };

    const stringifyDate = (date) => {
        const dateArr = date.split("-");
        const YYYY = dateArr[0];
        const MM = dateArr[1];
        const DD = dateArr[2];
        const newDate = DD.concat("-", MM, "-", YYYY);
        return newDate;
    };

    const parseDate = (string) => {
        const dateArr = string.split("-");
        const YYYY = dateArr[2];
        const MM = dateArr[1];
        const DD = dateArr[0];
        const newDate = YYYY.concat("-", MM, "-", DD);
        return newDate;
    };

    const newDateObject = (parsedDate) => {
        const dateArr = parsedDate.split("-");
        return new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);
    };

    const todayDateString = () => {
        const tempD = new Date();
        const tempString = [
            tempD.getFullYear(),
            tempD.getMonth() + 1,
            (tempD.getDate().toString().split("").length === 1) ? (`0${tempD.getDate()}`) : tempD.getDate(),
        ].join("-");
        return tempString;
    };

    return {
        parseBlogPost,
        stringifyDate,
        parseDate,
        newDateObject,
        todayDateString,
    };
})();

export default helperFunction;
