class Model {
    constructor () {
    this.idno = " ";
    this.newName = " ";
    this.emailid = " ";
    this.phoneno = " ";
    this.id = this.idno;
    this.name = this.newName;
    this.email = this.emailid;
    this.phone = this.phoneno;
    }
    }
 
    class Controller {
     constructor(model) {
     this.model = model;
     }
     get modelName() {
     this.model.name = this.model.newName;
     return this.model.name;
     }
     get modelId() {
     this.model.id = this.model.idno;
     return this.model.id;
     }
     get emailId() {
     this.model.email = this.model.emailid;
     return this.model.email;
     }
     get phoneId() {
     this.model.phone = this.model.phoneno;
     return this.model.phone;
     }
     handleEvent(e) {
     e.stopPropagation();
     this.changeHandler();
     }
     
      changeHandler() {

      // MODEL //
        this.model.newName = this.view.newName.value;
        this.model.idno = this.view.idno.value;
        this.model.emailid = this.view.emailid.value;
        this.model.phoneno = this.view.phoneno.value;


      // VIEW //
        this.view.name.innerHTML=this.modelName;
        this.view.id.innerHTML=this.modelId;
        this.view.email.innerHTML=this.emailId;
        this.view.phone.innerHTML=this.phoneId;
        // this.view.newName.value = "";
        // this.view.idno.value = "";
        // this.view.emailid.value = "";
        // this.view.phoneno.value = "";
      }
      
    }
    
    class View {
      constructor(controller) {
      this.controller = controller;

      this.name = document.getElementById('name');
      this.id = document.getElementById('id');
      this.email = document.getElementById('email');
      this.phone = document.getElementById('phone');

      this.name.innerText = controller.modelName;
      this.id.innerText = controller.modelId;
      this.email.innerText = controller.emailId;
      this.phone.innerText = controller.phoneId;

      this.newName = document.getElementById('newName');
      this.idno = document.getElementById('idno');
      this.emailid = document.getElementById('emailid');
      this.phoneno = document.getElementById('phoneno');

      // UPDATE //
      this.changeBtn = document.getElementById('changeNameButton');
      this.changeBtn.addEventListener('click', controller);
      controller.view = this;
      }
    }
    const btn = document.getElementById('changeNameButton');
    btn.addEventListener('click', function(e){
      e.preventDefault();
    });
    
    function main () {
    const model = new Model();
    const controller = new Controller(model);
    const view = new View(controller);
    }
    
    main();

const form = document.querySelector("form");
const submit = document.querySelector(".submit");
const updates = document.querySelector(".update");
const tbody = document.querySelector("table>tbody");

submit.addEventListener('click', () => {
  let idb = indexedDB.open('crud', 1)
  idb.onupgradeneeded = () => {
      let res = idb.result;
      res.createObjectStore('data', { autoIncrement: true })
  }
  idb.onsuccess = () => {
      let res = idb.result;
      let tx = res.transaction('data', 'readwrite')
      let store = tx.objectStore('data')
      store.put({
          name: form[0].value,
          email: form[1].value,
          phone: form[2].value,
          address: form[3].value
      })
      location.reload()
  }
})

function read() {
  let idb = indexedDB.open('crud', 1)
  idb.onsuccess = () => {
      let res = idb.result;
      let tx = res.transaction('data', 'readonly')
      let store = tx.objectStore('data')
      let cursor = store.openCursor()
      cursor.onsuccess = () => {
          let curRes = cursor.result;
          if (curRes) {
              console.log(curRes.value.name);
              tbody.innerHTML += `
              <tr>
              <th>${curRes.value.name}</th>
              <th>${curRes.value.email}</th>
              <th>${curRes.value.phone}</th>
              <th>${curRes.value.address}</th>
              <th>Update</th>
              <th class="del">Delete</th>
              </tr>
              
              `;
              curRes.continue()
          }

      }
  }
}


read()





