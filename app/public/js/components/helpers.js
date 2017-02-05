"use strict";

const request = require("./request");

function updateDB() {
    let id = this.parentNode.parentNode.parentNode.childNodes[0].textContent;
    let newName = this.previousSibling.childNodes[0].value;
    if(newName){
        request({
            method: "PUT",
            url: `/users/${Number(id)}`,
            body: JSON.stringify({name: newName})
        }).then(() => {
            let updatedRow = this.parentNode.parentNode.parentNode;
            updatedRow.innerHTML = row(id, newName);
            listeners();
        }).catch(error => {
            console.log(error);
        });
    }
}

function updateForm() {
    this.parentNode.innerHTML = `<form action="" class="form-inline"><div class="form-group"><input class="form-control" type="text"></div><button type="button" class="updateBtn btn btn-primary">Изменить</button></form>`;
    let updateButtons = document.getElementsByClassName("updateBtn");
    for (let i = 0, len = updateButtons.length; i < len; i++) {
        updateButtons[i].addEventListener("click", updateDB);
    }
}

function deleteRow() {
        let id = this.parentNode.previousSibling.previousSibling.textContent;
        request({method: "DELETE", url: `/users/${Number(id)}`})
            .then(() => {
                this.parentNode.parentNode.remove();
            })
            .catch(error => {
                console.log(error);
            });
}

let row = (id, name) => {
    let html = `<tr><td class="user_id">${id}</td><td>${name}</td><td><a href="#delete" class="delete">Удалить</a> | <a href="#update">Изменить</a></td></tr>`;
    return html;
};

function listeners() {
    let deleteButtons = document.getElementsByClassName("delete");
    for (let i = 0, len = deleteButtons.length; i < len; i++) {
        deleteButtons[i].addEventListener("click", deleteRow);
        deleteButtons[i].nextSibling.nextSibling.addEventListener("click", updateForm);
    }
}

module.exports = {

    row: row,

    listeners: listeners
};
