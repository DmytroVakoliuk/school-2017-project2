"use strict";

const request = require("./request");

module.exports = function() {

    let id = this.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.textContent;

    request({method: "DELETE", url: `/users/${Number(id)}`})
        .then( () => {
            this.parentNode.parentNode.remove();
        })
    .catch(error => {
        console.log(error);
    });


};
