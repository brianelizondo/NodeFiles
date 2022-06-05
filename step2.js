const fs = require('fs');
const axios = require('axios');
const argv = process.argv;

function cat(path){
    fs.readFile(path, 'utf8', function(err, data) {
        if (err){
            console.error(`Error reading ${err["path"]}:`);
            console.error(`Error: ${err["code"]}: no such file or directory, ${err["syscall"]} '${err["path"]}'`);
            process.exit(1);
        }
        console.log(data);
    });
}
async function webCat(url){
    try {
        const response = await axios.get(url);
        console.log(response.data);
    } catch (err){
        console.error(`Error fetching ${url}:`);
        console.error(`Error: Request failed with status code ${err["response"]["status"]}`);
    }
}

const argv_received = argv[2];
if(argv_received.includes('http')){
    webCat(argv_received);
}else{
    cat(argv_received);
}