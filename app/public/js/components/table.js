"use strict";

module.exports = function(){
/*    let test = '';
    console.log('>>',test,'<<');
    let promise = new Promise((resolve) => {
        setTimeout(resolve, 500, 'promise resolved after 500 ms');
    });
    promise.then(console.log.bind(console))*/



    let request = obj => {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open(obj.method || "GET", obj.url);
            if (obj.headers) {
                Object.keys(obj.headers).forEach(key => {
                    xhr.setRequestHeader(key, obj.headers[key]);
                });
            }
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject(xhr.statusText);
                }
            };
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send(obj.body);
        });
    };

    request({url: "/users"})
        .then(data => {
            let users = JSON.parse(data);
            let html = "";
            users.forEach((user, id) => {
                html += `
                <tr>
                    <td>${id}</td>
                    <td>${user.name}</td>
                    <td><a href="#delete">Удалить</a> | <a href="#update">Изменить</a></td>
                </tr>`;

            });
            document.getElementById("tableUsers").innerHTML = html;
        })
        .catch(error => {
            console.log(error);
        });
};