"use strict";
const request = require("./request");
const helpers = require("./helpers");

module.exports = function () {

    request({method: "GET", url: "/users"})
        .then(data => {
            let users = JSON.parse(data);
            let html = "";
            users.forEach((user, id) => {
                if (user) {
                    html += `
                <tr class="users">
                    <td>${id}</td>
                    <td>${user.name}</td>
                    <td><a href="#delete" class="delete">Удалить</a> | <a href="#update">Изменить</a></td>
                </tr>`;
                }
            });
            document.getElementById("tableUsers").innerHTML = html;

            let deleteButtons = document.getElementsByClassName("delete");
            for (let i = 0, len = deleteButtons.length; i < len; i++) {
                deleteButtons[i].addEventListener("click", helpers.deleteForm);
                deleteButtons[i].nextSibling.nextSibling.addEventListener("click", helpers.updateForm);
            }
        })
        .catch(error => {
            console.log(error);
        });
};