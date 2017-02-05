"use strict";

const request = require("./request");

function updateDB () {
    let id = this.parentNode.parentNode.parentNode.childNodes[1].textContent;
    let newName = this.previousSibling.previousSibling.childNodes[1].value;
    console.log(id);
    console.log(newName);
    request({method: "PUT",
        url: `/users/${Number(id)}`,
        // url: `/users/`+id,
        headers : [`Content-Type`, `application/json`],
        body: JSON.stringify({name: newName})})
        // json: {name: newName}})
        // body: {name: newName}})
        .then((body) => {
            console.log(body);
        })
        .catch(error => {
            console.log(error);
        });
}



module.exports = {

    deleteForm: function () {

        let id = this.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.textContent;

        request({method: "DELETE", url: `/users/${Number(id)}`})
            .then(() => {
                this.parentNode.parentNode.remove();
            })
            .catch(error => {
                console.log(error);
            });
    },

    updateForm: function () {
        // let name = this.parentNode.previousSibling.previousSibling.textContent;
        // let id = this.parentNode.previousSibling.previousSibling.previousSibling.textContent
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
    }

};
