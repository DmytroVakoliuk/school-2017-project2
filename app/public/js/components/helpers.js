"use strict";

const request = require("./request");

function updateDB() {
    let id = this.parentNode.parentNode.parentNode.childNodes[0].textContent;
    let newName = this.previousSibling.childNodes[0].value;
    if (newName) {
        request({
            method: "PUT",
            url: `/users/${Number(id)}`,
            body: JSON.stringify({name: newName})
        }).then(() => {
            let updatedRow = this.parentNode.parentNode.parentNode;
            updatedRow.innerHTML = row(id, newName);
        }).catch(error => {
            console.log(error);
        });
    }
}

function updateForm(target) {
    target.parentNode.innerHTML = `<form action="" class="form-inline"><div class="form-group"><input class="form-control" type="text"></div><button type="button" class="updateBtn btn btn-primary">Изменить</button></form>`;
    let updateButtons = document.getElementsByClassName("updateBtn");
    for (let i = 0, len = updateButtons.length; i < len; i++) {
        updateButtons[i].addEventListener("click", updateDB);
    }
}

function deleteRow(target) {
    let id = target.parentNode.previousSibling.previousSibling.textContent;
    request({method: "DELETE", url: `/users/${Number(id)}`})
        .then(() => {
            target.parentNode.parentNode.remove();
        })
        .catch(error => {
            console.log(error);
        });
}
function listener(){
    let table = document.getElementById("tableUsers");
    table.onclick = function(event) {
        let target = event.target;
        if (target.className == 'delete') {
            deleteRow(target);
        }else if(target.className == 'update'){
            updateForm(target);
        }
    };
}
let row = (id, name) => {
    let html = `<tr><td class="user_id">${id}</td><td>${name}</td><td><a href="#delete" class="delete">Удалить</a> | <a href="#update" class="update">Изменить</a></td></tr>`;
    return html;
};


module.exports = {

    row: row,

    listener: listener
};
