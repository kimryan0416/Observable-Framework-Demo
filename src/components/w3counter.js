import w3counter from "npm:w3counter";

export async function GetBrowsers() {
    return await w3counter('browser').then(data => {
        console.log(data);
        //=> [{item: 'Chrome 34', percent: '20.71%'}, {item: 'Firefox 28', percent: '13.04%'}, ...]
    });
}