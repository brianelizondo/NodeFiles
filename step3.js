const fs = require('fs');
const axios = require('axios');
const argv = process.argv;

function createFile(path, data){
    fs.appendFile(path, data, 'utf8', (err) => {
        if (err){
            console.log(`Couldn't write ${path}:`);
        }
    });
}

function cat(path, new_file, show_out){
    fs.readFile(path, 'utf8', function(err, data) {
        if (err){
            console.error(`Error reading ${err["path"]}:`);
            console.error(`Error: ${err["code"]}: no such file or directory, ${err["syscall"]} '${err["path"]}'`);
            process.exit(1);
        }
        
        createFile(new_file, data);
        if(show_out){
            console.log(data);
        }        
    });
}
async function webCat(url, new_file, show_out){
    try {
        const response = await axios.get(url);
        createFile(new_file, response.data);
        if(show_out){
            console.log(response.data);
        } 
    } catch (err){
        console.error(`Error fetching ${url}:`);
        console.error(`Error: Request failed with status code ${err["response"]["status"]}`);
        process.exit(1);
    }
}

let show_output = true;
let argv_received = argv[2];
let current_file = argv[3];
let new_file = argv[2];

if(argv_received == '--out'){
    show_output = false;
    current_file = argv[4];
    new_file = argv[3];
}

if(current_file.includes('http')){
    webCat(current_file, new_file, show_output);
}else{
    cat(current_file, new_file, show_output);
}


