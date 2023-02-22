const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'data'), function (err, files) {
    if (err) { console.log(err); }
    else {
       // console.log(files);

        files.forEach(function (file) {
            fs.readFile(path.join(__dirname, 'data', file), 'utf8', function (err, data) {


                if (err) {
                    if (err) {
                        if (err.code === 'EISDIR') {
                            console.log("Pliki zaktualizowano");
                            return;
                        }
                    }
                } else {
                    let dane = JSON.parse(data);
                    for (let daneData of dane) {
                        fs.mkdir(path.join(__dirname, 'data', daneData.name),
                            function (err) {
                                if (err) {
                                    if (err.code === 'EEXIST') {
                                        console.log("Folder istnieje");
                                        return;
                                    }
                                    console.log(err)
                                } else {
                                    console.log("Stworzono folder")
                                }
                            })
                           
                                                 

                        fs.writeFile(path.join(__dirname, 'data', daneData.name, daneData.id + '_' + daneData.name + '.txt'),
                            'Name : ' + daneData.name + '\r\n' +
                            'Phone : ' + daneData.phone + '\r\n' + 
                            'Street : ' + daneData.address.street + '\r\n' + 
                            'Zip Code : '+ daneData.address.zipcode +'\r\n'+
                            'City : '+ daneData.address.city, 
                            function (err) {
                                if (err) {
                                    console.log(err)
                                } else {
                                    console.log("Stworzono plik")
                                }
                            }
                        )
                    }
                }
            })
        })
    }
}

)