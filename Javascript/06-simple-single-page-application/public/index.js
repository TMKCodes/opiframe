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
    if(response.ok) {
        let data = await response.json();
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
    if(response.ok) {
        let data = await response.json();
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
    if(response.ok) {
        let data = await response.json();
        return data;
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
    if(response.ok) {
        let data = await response.json();
    } else {
        console.error("Failed to delete contact, for some unknown reason.");
    }
}

let changeToEditMode = (user) => {
    let form = document.getElementById("form");
    let username = document.getElementById("usernameInput");
    let firstname = document.getElementById("firstnameInput");
    let lastname = document.getElementById("lastnameInput");
    let email = document.getElementById("emailInput");
    let phone = document.getElementById("phoneInput");
    username.value = user.username;
    firstname.value = user.firstname;
    lastname.value = user.lastname;
    email.value = user.email;
    phone.value = user.phone;
    let submitButton = document.getElementById("addButton");
    submitButton.value = "Save";
    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        let newContact = {
            username: username.value,
            firstname: firstname.value,
            lastname: lastname.value,
            email: email.value,
            phone: phone.value
        };
        console.log(user.id);
        updateContact(user.id, newContact).then((data) => {
            console.log(data);
            getContacts().then(data => {
                appendTable(anchor, data);
                form.reset();
                mode = 0;
                submitButton.value = "Add";
            });
        });
    });

}

let addUserEventListener = (event) => {
    console.log("AddingUserEventListener");
    event.preventDefault();
    let newContact = {
        username: document.getElementById("usernameInput").value,
        firstname: document.getElementById("firstnameInput").value,
        lastname: document.getElementById("lastnameInput").value,
        email: document.getElementById("emailInput").value,
        phone: document.getElementById("phoneInput").value
    };
    addContact(newContact).then(() => {
        getContacts().then(data => {
            appendTable(anchor, data);
        });
    });
};

// VIEW STUFF


let appendTable = (anchor, data) => {
    let oldTable = document.getElementById("usersTable");
    if(oldTable) {
        oldTable.remove();
    }
    let table = document.createElement("table");

	let header = document.createElement("thead");
    let headerRow = document.createElement("tr");

	let usernameheader = document.createElement("th");
	let usernametext = document.createTextNode("Username");
	usernameheader.appendChild(usernametext);

	let firstnameheader = document.createElement("th");
	let firstnametext = document.createTextNode("First Name");
	firstnameheader.appendChild(firstnametext);
	
	let lastnameheader = document.createElement("th");
	let lastnametext = document.createTextNode("Last Name");
	lastnameheader.appendChild(lastnametext);
	
	let emailheader = document.createElement("th");
	let emailtext = document.createTextNode("Email");
	emailheader.appendChild(emailtext);
	
	let phoneheader = document.createElement("th");
	let phonetext = document.createTextNode("Phone");
	phoneheader.appendChild(phonetext);
	
	let removeheader = document.createElement("th");
	let removetext = document.createTextNode("Remove");
	removeheader.appendChild(removetext);
	
	let editheader = document.createElement("th");
	let edittext = document.createTextNode("Edit");
	editheader.appendChild(edittext);
	
    headerRow.appendChild(usernameheader);
	headerRow.appendChild(firstnameheader);
	headerRow.appendChild(lastnameheader);
	headerRow.appendChild(emailheader);
	headerRow.appendChild(phoneheader);
	headerRow.appendChild(removeheader);	
	headerRow.appendChild(editheader);

	header.appendChild(headerRow);
	table.appendChild(header);

    let tableBody = document.createElement("tbody");
    for(let i = 0; i < data.length; i++) {
        let row = document.createElement("tr");
        for(let x = 1; x < 6; x++) {
            let cell = document.createElement("td");
            let text = document.createTextNode(data[i][Object.keys(data[i])[x]]);
            cell.appendChild(text);
            row.appendChild(cell);
        }
        let edit = document.createElement("td");
        let editButton = document.createElement("button");
        editButton.setAttribute("name", data[i].id);
        editButton.addEventListener("click", (evt) => {
            console.log(data[i]);
            changeToEditMode(data[i]);
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
        tableBody.appendChild(row);
    }
    table.appendChild(tableBody);
    table.setAttribute("id", "usersTable");
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


    form.addEventListener("submit", addUserEventListener);

    anchor.appendChild(form);

    getContacts().then(data => {
        appendTable(anchor, data);
    });
}

window.onload = () => {
    let anchor = document.getElementById("anchor");
    appendOurForm(anchor);
}
