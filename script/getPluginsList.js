
const tempFilename = "../tmp/pluginsList.txt";

if (new URLSearchParams(window.location.search).has("reset")) {
    fetch(tempFilename, { method: "DELETE" });
}

let res = "";
const xhr = new XMLHttpRequest();
if (!checkFileExists(tempFilename)) {
    xhr.open("GET", "../script/plugins/", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            const jsScripts = Array.from(xhr.responseXML.getElementsByTagName("a"))
                .map((a) => a.href.split("/").pop())
                .filter((f) => f.endsWith(".js"));
            res = JSON.stringify(jsScripts);
            writeFile(tempFilename, res);
        }
    };
    xhr.send();
} else {
    res = readFile(tempFilename);
}

console.log(res);

function checkFileExists(path) {
    const xhr = new XMLHttpRequest();
    xhr.open("HEAD", path, false);
    xhr.send();
    return xhr.status !== 404;
}

function readFile(path) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", path, false);
    xhr.send();
    return xhr.responseText;
}

function writeFile(path, data) {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", path, false);
    xhr.send(data);
}