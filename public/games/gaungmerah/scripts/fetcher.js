console.warn("GAME VERSION 1.0.0.8");

["log", "error", "info", "debug"].forEach(
    (method) => (console[method] = () => {})
);

const baseURL = "https://cms.gaungmerah.id";
const tempEventId = "SPT21015161";

let SESSION_ID = "";

function getQueryParams(url) {
    let params = {};
    let parser = document.createElement("a");
    parser.href = url;
    let query = parser.search.substring(1);
    let vars = query.split("&");

    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        let key = decodeURIComponent(pair[0]);
        let value = pair[1] ? decodeURIComponent(pair[1]) : null;

        // If any parameter value is undefined, return null
        if (value === null) {
            return null;
        }

        params[key] = value;
    }

    return params;
}

const loadQuizData = (eventId, callback) => {
    var requestOptions = {
        method: "GET",
        redirect: "follow",
    };

    fetch(baseURL + "/api/main?event_id=" + eventId, requestOptions)
        .then((response) => response.text())
        .then((result) => callback(true, result))
        .catch((error) => callback(false, error));
};

const storePlayerData = (data, callback) => {
    var urlencoded = new URLSearchParams();

    for (const [key, value] of Object.entries(data)) {
        urlencoded.append(key, value);
    }

    var requestOptions = {
        method: "POST",
        body: urlencoded,
        redirect: "follow",
    };

    fetch(baseURL + "/api/audience", requestOptions)
        .then((response) => response.text())
        .then((result) => callback(true, result))
        .catch((error) => callback(false, error));
};

function loadImages(urls, onFinish) {
    let loadedCount = 0;
    const images = [];
    const totalImages = urls.length;

    urls.forEach((url, index) => {
        const img = new Image();
        img.onload = function () {
            images.push({
                key: url.key,
                img: img,
            });
            checkAllFinished();
        };

        img.onerror = function () {
            images.push({
                key: url.key,
                img: "",
            });
            checkAllFinished();
        };

        img.src = url.url;
    });

    function checkAllFinished() {
        loadedCount++;
        if (loadedCount === totalImages) {
            if (onAllFinishedCallback) {
                onFinish(images);
            }
        }
    }
}

async function getCityOptions(callback) {
    try {
        const response = await fetch(baseURL + "/api/areas");
        const json = await response.json();
        const cityOptions = json.response.data.map((item) => item.kota);
        console.log(cityOptions);
        callback(cityOptions);
    } catch (error) {
        console.error("Error fetching city options:", error);
        callback([]);
    }
}
