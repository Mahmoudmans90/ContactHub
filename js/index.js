let btns = document.querySelectorAll(".showModel");
let model = document.querySelector(".model");
let row_contacts = document.querySelector(".row-contacts");
let no_contacts = document.querySelector(".no-contacts");
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
let name_alert = document.getElementById("name_alert");
let email_alert = document.getElementById("email_alert");
let phonr_alert = document.getElementById("phonr_alert");
let photo = document.getElementById("photo");
let image = document.getElementById("image");
let nameReg = /^[A-Za-z]{2,}( [A-Za-z]{2,})?$/;
let emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let egyptPhoneReg = /^(?:\+20|0)?1[0125][0-9]{8}$/;
closebtns = [cancel, closebtn];
let contacts = [];
if (localStorage.getItem("contacts")) {
  contacts = JSON.parse(localStorage.getItem("contacts"));
  no_contacts.classList.add("d-none");
  let cartone = ``;
  for (let i = 0; i < contacts.length; i++) {
    cartone += `   <div class="col-md-6">
                  <div class="bg-white shadow-sm rounded-3 p-3">
                    <div
                      class="d-flex justify-content-start align-items-center gap-3"
                    >
                      <div class="icon2 overflow-hidden">
                        <img
                          src="./images/41NO8BRw+WL._AC_SX522_.jpg"
                          alt=""
                          class="w-100"
                        />
                      </div>
                      <div class="">
                        <p class="my-0">aa</p>
                        <div
                          class="d-flex justify-content-center align-items-center"
                        >
                          <div
                            class="icon2-sm bg-icon d-flex justify-content-center align-items-center"
                          >
                            <i class="fa-solid fa-phone text-primary"></i>
                          </div>
                          <p class="my-0">010101010</p>
                        </div>
                      </div>
                    </div>
                    <div
                      class="d-flex justify-content-start my-2 align-items-center"
                    >
                      <div
                        class="icon2-sm bg-icon d-flex justify-content-center align-items-center"
                      >
                        <i class="fa-solid fa-envelope text-warning"></i>
                      </div>
                      <p class="my-0">010101010</p>
                    </div>
                    <div
                      class="d-flex justify-content-start my-2 align-items-center"
                    >
                      <div
                        class="icon2-sm bg-icon d-flex justify-content-center align-items-center"
                      >
                        <i class="fa-solid fa-map-marker-alt text-info"></i>
                      </div>
                      <p class="my-0">010101010</p>
                    </div>
                    <div
                      class="d-flex justify-content-start align-items-center gap-2"
                    >
                      <span
                        class="padge text-white py-1 px-3 rounded-3 bgff7600"
                        >Frinds</span
                      >
                      <span
                        class="padge text-white py-1 px-3 rounded-3 bgee0029"
                        >Emergancy</span
                      >
                    </div>
                    <div
                      class="d-flex justify-content-between align-items-center my-3"
                    >
                      <div
                        class="groupq d-flex justify-content-center align-items-center gap-1"
                      >
                        <div class="icon-small bgecfdf5 p-2 rounded-3">
                          <i class="fa-solid fa-phone text-primary"></i>
                        </div>
                        <div class="icon-small bgecfdf5 p-2 rounded-3">
                          <i class="fa-solid fa-envelope text-warning"></i>
                        </div>
                      </div>
                      <div
                        class="groupq d-flex justify-content-center align-items-center gap-1"
                      >
                        <div class="icon-small bgecfdf5 p-2 rounded-3">
                          <i class="fa-solid fa-star text-warning"></i>
                        </div>
                        <div class="icon-small bgecfdf5 p-2 rounded-3">
                          <i class="fa-solid fa-heartbeat text-danger"></i>
                        </div>
                        <div class="icon-small bgecfdf5 p-2 rounded-3">
                          <i class="fa-solid fa-pen text-secondary"></i>
                        </div>
                        <div class="icon-small bgecfdf5 p-2 rounded-3">
                          <i class="fa-solid fa-trash text-secondary"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>`;
  }
  row_contacts.innerHTML = cartone;
}
photo.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    imageDiv.classList.remove("d-none");
    image.src = URL.createObjectURL(file);
  }
});
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", () => {
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

save.addEventListener("click", function () {
  let contact = {
    fullname: fullname.value,
    email: email.value,
    phone: phone.value,
    address: address.value,
    group: group.value,
    notes: notes.value,
    emergency: emergency.checked,
    favorite: favorite.checked,
    photo: "./images/" + photo.files[0].name,
  };
  if (validate(contact)) {
    contacts = JSON.parse(localStorage.getItem("contacts")) ?? [];
    contacts.push(contact);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    Swal.fire({
      title: "Contact Added",
      text: "Contact Added successfuly",
      icon: "success",
      confirmButtonText: "ok",
    });
    model.classList.add("d-none");
  }
});

function validate(contact) {
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
  } else if (contacts.some((ele) => ele.phone == contact.phone)) {
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
