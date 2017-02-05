"use strict";

const request = require("./request");

function updateDB() {
    let id = this.parentNode.parentNode.parentNode.childNodes[1].textContent;
    let newName = this.previousSibling.previousSibling.childNodes[1].value;
    request({
        method: "PUT",
        url: `/users/${Number(id)}`,
        headers: ['Content-Type', 'application/json'],
        body: JSON.stringify({name: newName})
    }).then(() => {
        let id = this.parentNode.parentNode.parentNode.childNodes[1].textContent;
        let updatedRow = this.parentNode.parentNode.parentNode;
        updatedRow.innerHTML = `<tr class="users">
                <td class="user_id">${id}</td>
                <td>${newName}</td>
                <td><a href="#delete" class="delete">Удалить</a> | <a href="#update">Изменить</a></td>
                </tr>`;
        updatedRow.childNodes[5].childNodes[2].addEventListener("click", form);
    }).catch(error => {
        console.log(error);
    });

}
let form = function () {
    this.parentNode.innerHTML = `<td></td><form action="" class="form-inline">
            <div class="form-group">
            <input class="form-control" type="text">
            </div>
            <button type="submit" class="updateBtn btn btn-primary">Изменить</button>
            </form></td>`;
    let updateButtons = document.getElementsByClassName("updateBtn");
    for (let i = 0, len = updateButtons.length; i < len; i++) {
        updateButtons[i].addEventListener("click", updateDB);
    }
};
module.exports = {

    deleteRow: function () {

        let id = this.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.textContent;

        request({method: "DELETE", url: `/users/${Number(id)}`})
            .then(() => {
                this.parentNode.parentNode.remove();
            })
            .catch(error => {
                console.log(error);
            });
    },

    updateForm: form
};
