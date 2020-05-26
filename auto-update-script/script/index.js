const chokidar = require("chokidar");
const path = require("path");
const http = require("http");
const projectPath = process.argv[2]

chokidar
    .watch(path.join(projectPath, "assets/Script"))
    .on("change", runUpdate);

function runUpdate(filename) {
    if (/\.(ts|js)$/.test(filename)) {
        clearTimeout(runUpdate.timeout);
        runUpdate.timeout = setTimeout(function () {
            http.get("http://localhost:7456/update-db", (resp) => { });
            console.log("filename : " + filename);
        }, 200);
    }
}
