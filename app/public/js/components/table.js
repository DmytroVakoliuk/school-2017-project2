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
                    html += helpers.row(id, user.name);
                }
            });
            document.getElementById("tableUsers").innerHTML = html;

            helpers.listener();
        })
        .catch(error => {
            console.log(error);
        });
};