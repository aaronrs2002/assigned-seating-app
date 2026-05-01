let guestData = [];

async function fetchGuest() {



    //  await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
    const response = await fetch("../localdata/guestInfo.json");
    const contents = await response.json();
    return contents;
}


const buildGuests = async () => {



    const result = await fetchGuest();

    guestData = result;

    let guestSelectList = "<option value='default'>Select Profile</option>";

    for (let i = 0; i < result.length; i++) {
        guestSelectList = guestSelectList + "<option value='" + i + "'>" + result[i].fName + " " + result[i].lName + "</option>"
    }


    document.querySelector("select[name='guestList']").innerHTML = guestSelectList;
}; buildGuests();

function selectProfile() {

    let whichProfile = document.querySelector("select[name='guestList']").value;
    if (whichProfile === "default") {
        return false;
    }

    document.querySelector("[name='fName']").value = guestData[whichProfile].fName;
    document.querySelector("[name='lName']").value = guestData[whichProfile].lName;
    document.querySelector("[name='phone']").value = guestData[whichProfile].phone;
    document.querySelector("[name='email']").value = guestData[whichProfile].email;
    document.querySelector("[name='guestImg']").value = guestData[whichProfile].guestImg;
    document.getElementById("guestImgTarget").innerHTML = "<img class='img-fluid' src='" + guestData[whichProfile].guestImg + "' />";
    document.getElementById("nameTarget").innerHTML = guestData[whichProfile].fName + " " + guestData[whichProfile].lName;

    let accountsObj = [];


    for (let i = 0; i < guestData[whichProfile].events.length; i++) {

        if (accountsObj.indexOf(guestData[whichProfile].events[i].account) === -1) {
            accountsObj.push(guestData[whichProfile].events[i].account);
        }
    }


    console.log("JSON.stringify(accountsObj): " + JSON.stringify(accountsObj));


    let accountsTargetHTML = "<option value='default'>Select Account</option>";

    for (let i = 0; i < accountsObj.length; i++) {
        accountsTargetHTML = accountsTargetHTML + "<option value='" + accountsObj[i] + "'>" + accountsObj[i] + "</option>"
    }

    document.querySelector("select[name='accountsTarget']").innerHTML = accountsTargetHTML;





    /*
    "events": [
        {
            "account": "2026-04-28-Smith Wedding",
            "eventTitle": "Rehearsal Dinner",
            "hotelInfo": "Sheraton",
            "flightInfo": "Delta-4657",
            "carRentalInfo": "Hertz",
            "optionalMessage": "Kosher meal",
            "attending": "yes",
            "guestType": "StandardGuest",
            "seatAssignment": "table 18"
        },
    */

}

function selectAccount() {

    let whichAccount = document.querySelector("select[name='accountsTarget']").value;
    let whichProfile = document.querySelector("select[name='guestList']").value;
    let eventHTML = "";
    for (let i = 0; i < guestData[whichProfile].events.length; i++) {
        if (guestData[whichProfile].events[i].account === whichAccount) {

            eventHTML = eventHTML + `<ul>
                    <li><h3>Event Title: ${guestData[whichProfile].events[i].eventTitle}</h3></li>
                    <li>Hotel Info: ${guestData[whichProfile].events[i].hotelInfo}</li>
                    <li>Flight Info: ${guestData[whichProfile].events[i].flightInfo}</li>
                    <li>Car Rental: ${guestData[whichProfile].events[i].carRentalInfo}</li>
                    <li>Details: ${guestData[whichProfile].events[i].optionalMessage}</li>
                     <li>Attending: ${guestData[whichProfile].events[i].attending}</li>
                     <li>Guest Level: ${guestData[whichProfile].events[i].guestType}</li>
                     <li>Seat Assignment: ${guestData[whichProfile].events[i].seatAssignment}</li>
                     </ul><hr/>`;



        }

    }

    document.getElementById("accountDataTarget").innerHTML = eventHTML;
    //accountDataTarget

}

function clearForms() {
    [].forEach.call(document.querySelectorAll("input[type='text']"), (e) => {
        e.value = "";
    });
    [].forEach.call(document.querySelectorAll("select"), (e) => {
        e.selectedIndex = 0;
    });
}


function addEdit(module, addEdit) {
    if (module === "event" && addEdit === "add") {
        [].forEach.call(document.querySelectorAll("[data-module='event'][data-addedit='edit']"), (e) => {
            e.classList.add("hide");
        });

        [].forEach.call(document.querySelectorAll("[data-module='event'][data-addedit='add']"), (e) => {
            e.classList.remove("hide");
        });
        globalAlert("alert-success", "Your in Add Mode for events.");
    }

    if (module === "event" && addEdit === "edit") {
        [].forEach.call(document.querySelectorAll("[data-module='event'][data-addedit='add']"), (e) => {
            e.classList.add("hide");
        });

        [].forEach.call(document.querySelectorAll("[data-module='event'][data-addedit='edit']"), (e) => {
            e.classList.remove("hide");
        });
        globalAlert("alert-success", "Your in Edit Mode for events.");
    }
    /*start profile*/
    console.log("module: " + module + " - addEdit: " + addEdit);

    if (module === "profile" && addEdit === "add") {
        [].forEach.call(document.querySelectorAll("[data-module='profile'][data-addedit='edit']"), (e) => {
            e.classList.add("hide");
        });

        [].forEach.call(document.querySelectorAll("[data-module='profile'][data-addedit='add']"), (e) => {
            e.classList.remove("hide");
        });

        globalAlert("alert-success", "Your in Add Mode For profiles.");
    }

    if (module === "profile" && addEdit === "edit") {
        [].forEach.call(document.querySelectorAll("[data-module='profile'][data-addedit='add']"), (e) => {
            e.classList.add("hide");
        });

        [].forEach.call(document.querySelectorAll("[data-module='profile'][data-addedit='edit']"), (e) => {
            e.classList.remove("hide");
        });
        globalAlert("alert-success", "Your in Edit Mode For profiles.");
    }



}