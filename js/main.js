var bookmarksNameInp = document.getElementById("bookmarksNameInp");
var bookmarksUrlInp = document.getElementById("bookmarksUrlInp");
var dataControl = document.getElementById("dataControl");

var box ;
var IUpdate;
if (localStorage.getItem("books") != null) {
  box = JSON.parse(localStorage.getItem("books"));
  displayData(box);
} else {
  var box = [];
}
function setDis(nameKey = "", data = []) {
  localStorage.setItem(nameKey, JSON.stringify(data));
  displayData(data);
}

function addData() {
  var bookMark = {
    name: bookmarksNameInp.value,
    mail: bookmarksUrlInp.value,
  };
  if (
    validationName(bookmarksNameInp) &&
    validationMail(bookmarksUrlInp)
  ) {
   
    if (dataControl.innerHTML === "Add Bookmark") {
      box.push(bookMark);
      setDis("books", box);

    } else {
      box.splice(IUpdate, 1, bookMark);
      setDis("books", box);
    }
      clearValid();
      clearForm();
      swal({
          icon: "success",
          title: "Thanks" ,
          text: "Done Validation",
          timer: 1700,
          buttons:false,
      })
  } else {

    swal({
        title:'Validation Error',
        icon: 'error',
        closeOnClickOutside: false,
        closeOnEsc: false,
        dangerMode:true,
        text:'Please follow the rules'
  })
  }
  dataControl.innerHTML = "Add Bookmark";
}

function clearValid() {
    bookmarksNameInp.classList.remove('is-valid','is-invalid')
    bookmarksUrlInp.classList.remove('is-valid','is-invalid')
}
function validationMail(mail) {
  var regX = /^(https:\/\/|www\.)[\w\S]+\.[a-z]{2,5}$/;
    if (regX.test(mail.value)) {
        document.getElementById('urlError').innerHTML =''

        mail.classList.remove('is-invalid')
        mail.classList.add('is-valid')
    var x = true;
  } else {
      mail.classList.add('is-invalid')
        var x = false;
        document.getElementById('urlError').innerHTML = "*Please enter Url starts with https:// or www. , ends with .domain and has no spaces ";
        
  }

  return x;

}

function validationName(name) {
  var regX = /^[A-Z][a-z0-9\S]{3,15}$/;
    if (regX.test(name.value)) {
        document.getElementById('nameError').innerHTML =''
      name.classList.remove('is-invalid')
      name.classList.add('is-valid')
        var x = true;
    } else {
        var x = false;
        name.classList.add('is-invalid')
      document.getElementById('nameError').innerHTML = "*Please enter Name between 3 & 10 char, it starts with capital char and has no spaces ";
  }
  return x;
}
function clearForm() {
  bookmarksNameInp.value = "";
  bookmarksUrlInp.value = "";
    clearValid()
}
function editData(index) {
  bookmarksNameInp.value = box[index].name;
  bookmarksUrlInp.value = box[index].mail;
  dataControl.innerHTML = "Update";
  IUpdate = index;
}
function displayData(data) {
  var list = ``;
  for (var i = 0; i < data.length; i++) {
    list += `
<tr>
<td>${i+1}</td>
                <td>${data[i].name}</td>
                <td>
                <a href="${data[i].mail}" target="_blank" class="text-decoration-none text-dark">
                    <button onclick="visitData(${i})" class="btn bg-second btn-sm">
                        <i class="fa-solid fa-eye text-white"></i>
                    </button></a>
                </td>
                <td>
                    <button onclick="deleteRow(${i})" class="btn btn-danger btn-sm">
                    <i class="fa-solid fa-trash-can text-white"></i>
                    </button>
                </td>
                <td>
                    <button onclick="editData(${i})" class="btn  btn-success btn-sm">
                    <i class="fa-solid fa-pen-to-square text-white"></i>
                    </button>
                </td>
            </tr>
`;
  }
  document.getElementById("tableList").innerHTML = list;
}

function deleteRow(index) {
  box.splice(index, 1);
    setDis("books", box);
    clearValid()

}
function searchForm(term) {
  var selected = [];
  for (var i = 0; i < box.length; i++) {
    if (box[i].name.toLowerCase().includes(term.toLowerCase()) || i == term-1){
      selected.push(box[i]);
    }
  }
    displayData(selected);
    clearValid()
}
