"use strict";

const request = require("./request");
const helpers = require("./helpers");


function addUser() {
    return new Promise(()=> {
        let name = document.getElementById("name").value;

        if(name){
            request({
                method: "POST",
                url: `/users`,
                body: JSON.stringify({name: name})
            }).then((data) => {
                let id =JSON.parse(data);
                let row = document.createElement("TR");
                row.innerHTML = `<td>${id.id}</td><td>${name}</td><td><a href="#delete" class="delete">Удалить</a> | <a href="#update">Изменить</a></td>`;
                document.getElementById("tableUsers").appendChild(row);

            }).then(() => {
                document.getElementById("myForm").reset();
                helpers.listeners();
            }).catch(error => {
                console.log(error);
            });
        }
    })
}

module.exports = function () {

    document.getElementById("eddNewUser").addEventListener("click", addUser);
};