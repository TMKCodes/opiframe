var mode = 0;

// REST API endpoint: /api/users

let addContact = async (newContact) => {
    let response = await fetch("/api/users", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newContact)
    });
    console.log(response.status);
    if(response.ok) {
        let data = await response.json();
        console.log(data);
    } else {
        console.error("Failed to add contact, for some unknown reason.");
    }
}

let getContacts = async () => {
    let response = await fetch("/api/users", {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        }
    });
    console.log(response.status);
    if(response.ok) {
        let data = await response.json();
        console.log(data);
        return data;
    } else {
        console.log("Failed to get contacts, for some unknown reason.");
        return [];
    }
}


let updateContact = async (id, newContact) => {
    let response = await fetch("/api/users/" + id, {
        method: "PUT",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newContact)
    });
    console.log(response.status);
    if(response.ok) {
        let data = await response.json();
        console.log(data);
    } else {
        console.error("Failed to update contact, for some unknown reason.");
    }
}

let deleteContact = async (id) => {
    let response = await fetch("/api/users/" + id, {
        method: "DELETE",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        }
    });
    console.log(response.status);
    if(response.ok) {
        let data = await response.json();
        console.log(data);
    } else {
        console.error("Failed to delete contact, for some unknown reason.");
    }
}

// VIEW STUFF


let appendTable = (anchor, data) => {
    console.log("Populating table with data: " + data);
    let oldTable = document.getElementById("usersTable");
    if(oldTable) {
        oldTable.remove();
    }
    let table = document.createElement("table");
    table.id = "usersTable";
    table.innerHTML = "";
    for(let i = 0; i < data.length; i++) {
        let row = document.createElement("tr");
        for(let x = 1; x < 5; x++) {
            let cell = document.createElement("td");
            let text = document.createTextNode(data[i][Object.keys(data[i])[x]]);
            cell.appendChild(text);
            row.appendChild(cell);
        }
        let edit = document.createElement("td");
        let editButton = document.createElement("button");
        editButton.setAttribute("name", data[i].id);
        editButton.addEventListener("click", (evt) => {

        });
        let editButtonTextNode = document.createTextNode("Edit");
        editButton.appendChild(editButtonTextNode);
        edit.appendChild(editButton);

        let del = document.createElement("td");
        let delButton = document.createElement("button");
        delButton.setAttribute("name", data[i].id);
        delButton.addEventListener("click", (evt) => {
            deleteContact(evt.target.name).then(() => {
                getContacts().then(data => {
                    appendTable(anchor, data);
                });
            });
        });
        let delButtonTextNode = document.createTextNode("Delete");
        delButton.appendChild(delButtonTextNode);
        del.appendChild(delButton);

        row.appendChild(edit);
        row.appendChild(del);
        table.appendChild(row);
    }
    anchor.appendChild(table);
}


let appendLabeledInput = (appendTo, labelText, inputType, inputId, inputName) => {
    let label = document.createElement("label");
    label.setAttribute("for", inputId);
    let labelTextNode = document.createTextNode(labelText);
    label.appendChild(labelTextNode);
    
    let input = document.createElement("input");
    input.setAttribute("type", inputType);
    input.setAttribute("id", inputId);
    input.setAttribute("name", inputName);
    
    let br = document.createElement("br");
    appendTo.appendChild(label);
    appendTo.appendChild(br);
    appendTo.appendChild(input);
    appendTo.appendChild(br.cloneNode());
}

let appendSubmitButton = (appendTo, inputId, value) => {
    let submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("id", inputId);
    submitButton.setAttribute("value", value);
    appendTo.appendChild(submitButton);
}

let appendOurForm = (anchor) => {
    let form = document.createElement("form");
    form.setAttribute("id", "form");

    appendLabeledInput(form, "Username:", "text", "usernameInput", "usernameInput");
    appendLabeledInput(form, "Firstname:", "text", "firstnameInput", "firstnameInput");
    appendLabeledInput(form, "Lastname:", "text", "lastnameInput", "lastnameInput");
    appendLabeledInput(form, "Email:", "email", "emailInput", "emailInput");
    appendLabeledInput(form, "Phone:", "tel", "phoneInput", "phoneInput");

    appendSubmitButton(form, "addButton", "Add");


    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let newContact = {
            username: document.getElementById("usernameInput").value,
            firstname: document.getElementById("firstnameInput").value,
            lastname: document.getElementById("lastnameInput").value,
            email: document.getElementById("emailInput").value,
            phone: document.getElementById("phoneInput").value
        };
        console.log(newContact);
        addContact(newContact);
        form.reset();
        getContacts().then(data => {
            appendTable(anchor, data);
        });
    });

    anchor.appendChild(form);

    getContacts().then(data => {
        appendTable(anchor, data);
    });
}

window.onload = () => {
    let anchor = document.getElementById("anchor");
    appendOurForm(anchor);
}
