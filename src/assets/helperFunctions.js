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
    return {
        parseBlogPost,
    };
})();

export default helperFunction;
