const srcPath = "";
const scriptPath = srcPath + "scripts/";

const scriptNames = [
    "global.js",
    "start_config.js",
    "buttons.js",
].map(name => scriptPath + name);


scriptNames.forEach(name => {
    const script = document.createElement("script");
    script.src = name;
    script.type = "text/javascript";
    $("head").append(script);
});
