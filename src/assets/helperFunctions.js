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
                return `<h${times}>${line.slice(times)}</h${times}>`;
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

    const parseDate = (date) => {
        const dateArr = date.split("-");
        console.log(dateArr);
        const YYYY = dateArr[0];
        const MM = dateArr[1];
        const DD = dateArr[2];
        const newDate = DD.concat("-", MM, "-", YYYY);
        return newDate;
    };

    return {
        parseBlogPost,
        parseDate,
    };
})();

export default helperFunction;
