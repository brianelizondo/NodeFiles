const fs = require('fs');
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
cat(argv[2]);