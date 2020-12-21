class Utility {

    static mergeJSON(...data) {
        let result = {};
        for (let i in data) {
            for (let j in data[i]) {
                let value = data[i][j];
                result[j] = value;
            }
        }
        return result;
    }

    static HTMLLableToChar(text) {
        let result = text;
        const map = [
            {
                key: "&nbsp;",
                value: " "
            },
            {
                key: "&lt;",
                value: "<"
            },
            {
                key: "&gt;",
                value: ">"
            }
        ];

        for (let i = 0; i < map.length; i++) {
            let item = map[i];
            while (result.search(item.key) != -1)
                result = result.replace(item.key, item.value);
        }

        return result;
    }
}

module.exports = Utility;