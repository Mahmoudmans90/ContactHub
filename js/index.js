let btns = document.querySelectorAll(".showModel");
let model = document.querySelector(".model");
let row_contacts = document.querySelector(".row-contacts");
let no_contacts = document.querySelector(".no-contacts");
let user_icon = document.querySelector(".icon-user");
let closebtn = document.getElementById("close");
let cancel = document.getElementById("cancel");
let fullname = document.getElementById("fullname");
let email = document.getElementById("email");
let save = document.getElementById("save");
let phone = document.getElementById("phone");
let address = document.getElementById("address");
let group = document.getElementById("group");
let notes = document.getElementById("notes");
let emergency = document.getElementById("emergency");
let favorite = document.getElementById("favorite");
let favoritee = document.getElementById("favoritee");
let name_alert = document.getElementById("name_alert");
let total = document.getElementById("total");
let email_alert = document.getElementById("email_alert");
let phonr_alert = document.getElementById("phonr_alert");
let search = document.getElementById("search");
let photo = document.getElementById("photo");
let image = document.getElementById("image");
let nameReg = /^[A-Za-z]{2,}( [A-Za-z]{2,})?$/;
let emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let egyptPhoneReg = /^(?:\+20|0)?1[0125][0-9]{8}$/;
closebtns = [cancel, closebtn];
let contacts = [];
if (localStorage.getItem("contacts").length > 0) {
  contacts = JSON.parse(localStorage.getItem("contacts"));
  no_contacts.classList.add("d-none");
  displayContacts(contacts);
}
search.addEventListener("input", (e) => {
  let value = e.target.value.toLowerCase().trim();

  let filteredContacts = contacts.filter(
    (contact) =>
      contact.fullname.toLowerCase().includes(value) ||
      contact.phone.includes(value) ||
      contact.email.toLowerCase().includes(value)
  );

  displayContacts(filteredContacts);
});

photo.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    imageDiv.classList.remove("d-none");
    image.src = URL.createObjectURL(file);
  }
});
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", () => {
    save.innerHTML = "Add Contact";
    resetinpusts();
    model.classList.remove("d-none");
  });
}
for (let i = 0; i < closebtns.length; i++) {
  closebtns[i].addEventListener("click", () => {
    model.classList.add("d-none");
  });
}
fullname.addEventListener("input", () => {
  if (!nameReg.test(fullname.value)) {
    name_alert.classList.remove("d-none");
  } else {
    name_alert.classList.add("d-none");
  }
});
phone.addEventListener("input", () => {
  if (!egyptPhoneReg.test(phone.value)) {
    phone_alert.classList.remove("d-none");
  } else {
    phone_alert.classList.add("d-none");
  }
});
email.addEventListener("input", () => {
  if (!emailReg.test(email.value)) {
    email_alert.classList.remove("d-none");
  } else {
    email_alert.classList.add("d-none");
  }
});
let index = 0;
function edit(i) {
  model.classList.remove("d-none");
  fullname.value = contacts[i].fullname;
  email.value = contacts[i].email;
  phone.value = contacts[i].phone;
  address.value = contacts[i].address;
  group.value = contacts[i].group;
  notes.value = contacts[i].notes;
  contacts[i].emergency == true
    ? (emergency.checked = true)
    : (emergency.checked = false);
  contacts[i].favorite == true
    ? (favorite.checked = true)
    : (favorite.checked = false);
  save.innerHTML = "Update Contact";
  index = i;
}
save.addEventListener("click", function () {
  let mode = save.innerHTML;
  let contact = {
    fullname: fullname.value,
    email: email.value,
    phone: phone.value,
    address: address.value,
    group: group.value,
    notes: notes.value,
    emergency: emergency.checked,
    favorite: favorite.checked,
    photo: photo.files[0] ? "./images/" + photo.files[0].name : "",
  };
  let valid =
    mode == "Add Contact" ? validate(contact) : validate(contact, index);
  if (valid) {
    contacts = JSON.parse(localStorage.getItem("contacts")) ?? [];
    if (mode == "Add Contact") {
      contacts.push(contact);
    } else {
      photo.files[0]
        ? (contact.photo = "./images/" + photo.files[0].name)
        : contacts[index].photo;
      contacts[index] = contact;
    }
    localStorage.setItem("contacts", JSON.stringify(contacts));
    Swal.fire({
      title: mode,
      text: mode + " successfuly",
      icon: "success",
      confirmButtonText: "ok",
    });
    model.classList.add("d-none");
    displayContacts(contacts);
  }
});

function validate(contact, indexOF = true) {
  contacts = JSON.parse(localStorage.getItem("contacts"));

  if (contact.fullname == "") {
    Swal.fire({
      title: "Missing Name",
      text: "Please enter a name for the contact!",
      icon: "warning",
      confirmButtonText: "ok",
    });
    return false;
  } else if (!nameReg.test(contact.fullname)) {
    Swal.fire({
      title: "Invalid Name",
      text: "Name should contain only letters and spaces (2-50 characters)",
      icon: "warning",
      confirmButtonText: "ok",
    });
    return false;
  } else if (contact.phone == "") {
    Swal.fire({
      title: "Missing Phone",
      text: "Please Inter Phone Number",
      icon: "warning",
      confirmButtonText: "ok",
    });
    return false;
  } else if (contact.email == "") {
    Swal.fire({
      title: "Missing Email",
      text: "Please Inter Email Address",
      icon: "warning",
      confirmButtonText: "ok",
    });
    return false;
  } else if (!egyptPhoneReg.test(contact.phone)) {
    Swal.fire({
      title: "Invalid phone",
      text: "Please enter a valid Egyptian phone number",
      icon: "warning",
      confirmButtonText: "ok",
    });
    return false;
  } else if (!emailReg.test(contact.email)) {
    Swal.fire({
      title: "Invalid Email Address",
      text: " Please enter a valid email address",
      icon: "warning",
      confirmButtonText: "ok",
    });
    return false;
  } else if (
    contacts.some((ele, i) => ele.phone == contact.phone && i != indexOF)
  ) {
    Swal.fire({
      title: "Taken Phone Number",
      text: " This Phone Is taken",
      icon: "warning",
      confirmButtonText: "ok",
    });
    return false;
  }
  return true;
}
function deleteItem(i) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to undo this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      contacts = JSON.parse(localStorage.getItem("contacts"));
      contacts.splice(i, 1);
      localStorage.setItem("contacts", JSON.stringify(contacts));
      displayContacts(contacts);
    }
  });
}
function displayContacts(contacts) {
  let cartone = ``;
  for (let i = 0; i < contacts.length; i++) {
    cartone += `   <div class="col-md-6">
                  <div class="bg-white shadow-sm rounded-3 shadow-hav p-3">
                    <div
                      class="d-flex justify-content-start align-items-center gap-3"
                    >
                      <div class="icon2 overflow-hidden">
                        <img
                          src="${contacts[i].photo}"
                          alt=""
                          class="w-100"
                        />
                      </div>
                      <div class="">
                        <p class="my-0">${contacts[i].fullname}</p>
                        <div
                          class="d-flex justify-content-center align-items-center"
                        >
                          <div
                            class="icon2-sm bg-icon d-flex justify-content-center align-items-center"
                          >
                          <a href="tel:${contacts[i].phone}">
                          <i class="fa-solid fa-phone text-primary"></i>
                          </a>
                          </div>
                          <p class="my-0">${contacts[i].phone}</p>
                        </div>
                      </div>
                    </div>
                    <div
                      class="d-flex justify-content-start my-2 align-items-center"
                    >
                      <div
                        class="icon2-sm bg-icon d-flex justify-content-center align-items-center"
                      >
                      <a target="_plank" href="https://mail.google.com/mail/?view=cm&to=${
                        contacts[i].email
                      }">
  <i class="fa-solid fa-envelope text-warning"></i>
</a>
                      </div>
                      <p class="my-0">${contacts[i].email}</p>
                    </div>
                    <div
                      class="d-flex justify-content-start my-2 align-items-center"
                    >
                     ${
                       contacts[i].address &&
                       `<div
                        class="icon2-sm bg-icon d-flex justify-content-center align-items-center"
                      >
                        <i class="fa-solid fa-map-marker-alt text-info"></i>
                      </div>
                      <p class="my-0">${contacts[i].address}</p>`
                     }
                    </div>
                    <div
                      class="d-flex justify-content-start align-items-center gap-2"
                    >
                    ${
                      contacts[i].favorite
                        ? `<span
                        class="padge text-white py-1 px-3 rounded-3 bgff7600"
                        >Favourte</span
                      >
                      `
                        : ""
                    }
                    ${
                      contacts[i].emergency
                        ? `<span
                        class="padge text-white py-1 px-3 rounded-3 bgee0029"
                        >Emergancy</span
                      >
                    `
                        : ""
                    }
                      </div>
                    <div
                      class="d-flex justify-content-between align-items-center my-3"
                    >
                      <div
                        class="groupq d-flex justify-content-center align-items-center gap-1"
                      >
                        <div class="icon-small bgecfdf5 p-2 rounded-3 shadow-hav ">
                        <a href="tel:${contacts[i].phone}">
                          <i class="fa-solid fa-phone text-primary"></i>
                          </a>
                        </div>
                        <div class="icon-small bgecfdf5 p-2 rounded-3 shadow-hav">
                          <a target="_plank" href="https://mail.google.com/mail/?view=cm&to=${
                            contacts[i].email
                          }">
  <i class="fa-solid fa-envelope text-warning"></i>
</a>
                        </div>
                      </div>
                      <div
                        class="groupq d-flex justify-content-center align-items-center gap-1"
                      >
                        <div class="icon-small bgecfdf5 p-2 rounded-3 shadow-hav" onclick="togleFev(${i})">
                          <i class="fa-solid fa-star ${
                            contacts[i].favorite && "text-primary"
                          }"></i>
                        </div>
                        <div class="icon-small bgecfdf5 p-2 rounded-3 shadow-hav" onclick="togleEmr(${i})">
                          <i class="fa-solid fa-heartbeat ${
                            contacts[i].emergency && "text-danger"
                          } "></i>
                        </div>
                        <div class="icon-small bgecfdf5 p-2 rounded-3 shadow-hav" onclick='edit(${i})'>
                          <i class="fa-solid fa-pen text-secondary"></i>
                        </div>
                        <div class="icon-small bgecfdf5 p-2 rounded-3 shadow-hav " onclick='deleteItem(${i})'>
                          <i class="fa-solid fa-trash text-secondary"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>`;
  }

  total.innerHTML = contacts.length;
  let fevArr = contacts.filter((e) => e.favorite);

  favoritee.innerHTML = fevArr.length;
  let emrArr = contacts.filter((e) => e.emergency);
  em.innerHTML = emrArr.length;
  let favcart = ``;
  let Emcart = ``;
  emrArr.forEach((e) => {
    Emcart += ` <div
                  class="cart d-flex justify-content-between align-items-center w-100 p-3 shadow-hav m-2 rounded-3"
                >
                  <div
                    class="d-flex justify-content-center align-items-center gap-2"
                  >
                    <div class="icon2 overflow-hidden">
                      <img
                        src="${e.photo}"
                        alt=""
                        class="w-100"
                      />
                    </div>
                    <div class="">
                      <p class="my-0">${e.fullname}</p>
                      <p class="my-0">${e.phone}</p>
                    </div>
                  </div>
                  <div class="">
                    <div
                      class="d-flex justify-content-center align-items-center"
                    >
                      <div
                        class="icon2-sm bg-icon d-flex justify-content-center align-items-center"
                      >
                      
                         <a href="tel:${e.phone}">
                          <i class="fa-solid fa-phone text-primary"></i>
                          </a>
                      </div>
                    </div>
                  </div>
                </div>`;
  });
  fevArr.forEach((e) => {
    favcart += ` <div
                  class="cart d-flex justify-content-between align-items-center w-100 p-3 shadow-hav m-2 rounded-3"
                >
                  <div
                    class="d-flex justify-content-center align-items-center gap-2"
                  >
                    <div class="icon2 overflow-hidden">
                      <img
                        src="${e.photo}"
                        alt=""
                        class="w-100"
                      />
                    </div>
                    <div class="">
                      <p class="my-0">${e.fullname}</p>
                      <p class="my-0">${e.phone}</p>
                    </div>
                  </div>
                  <div class="">
                    <div
                      class="d-flex justify-content-center align-items-center"
                    >
                      <div
                        class="icon2-sm bg-icon d-flex justify-content-center align-items-center"
                      >
                         <a href="tel:${e.phone}">
                          <i class="fa-solid fa-phone text-primary"></i>
                          </a>
                      </div>
                    </div>
                  </div>
                </div>`;
  });
  favDivDisplay.innerHTML = favcart ? favcart : favDivDisplay.innerHTML;
  displayIm.innerHTML = Emcart ? Emcart : displayIm.innerHTML;
  row_contacts.innerHTML = cartone;
  no_contacts.classList.toggle("d-none", cartone !== "");
}
function togleFev(i) {
  contacts = JSON.parse(localStorage.getItem("contacts"));
  contacts[i].favorite = !contacts[i].favorite;
  localStorage.setItem("contacts", JSON.stringify(contacts));
  displayContacts(contacts);
}
function togleEmr(i) {
  contacts = JSON.parse(localStorage.getItem("contacts"));
  contacts[i].emergency = !contacts[i].emergency;
  localStorage.setItem("contacts", JSON.stringify(contacts));
  displayContacts(contacts);
}

function resetinpusts() {
  document.querySelectorAll("input").forEach((e) => (e.value = ""));
  group.value = "";
  notes.value = "";
  favorite.checked = false;
  emergency.checked = false;
  imageDiv.classList.add("d-none");
}
// photo.addEventListener("change", (e) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   const reader = new FileReader();
//   reader.onload = () => {
//     localStorage.setItem("profileImage", reader.result);
//     image.src = reader.result;
//   };
//   reader.readAsDataURL(file);
// });
