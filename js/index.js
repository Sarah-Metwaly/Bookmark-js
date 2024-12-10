var siteNameInput=document.getElementById('siteName');
var siteURLInput=document.getElementById('siteURL');

var elementList=[];

if(localStorage.getItem("elementContainer")!=null){
    elementList=JSON.parse(localStorage.getItem("elementContainer"));
    displayData();
}

function addElement(){
    if(validationName() && validationUrl()){
        var element={
            name:siteNameInput.value.trim(),
            //Link doesnt work if it doesnt start with http or https
            url:(siteURLInput.value.trim().charAt(0).toLowerCase()=='h'?siteURLInput.value.trim():"https:"+siteURLInput.value.trim())
        }
        elementList.push(element);

        displayData();
        localStorage.setItem("elementContainer",JSON.stringify(elementList));

        clearForm();
    }
}

function clearForm(){
    siteNameInput.value=null;
    siteURLInput.value=null;
}

function displayData(){
    var cartona="";

    for(var i=0;i<elementList.length;i++)
    {
        cartona+=`
        <tr>
            <td>${i+1}</td>
            <td>${elementList[i].name}</td>
            <td><a href="${elementList[i].url}" target="parent"><button class="btn btn-visit" id="visitButton""><i class="fa-solid fa-eye"></i>  Visit</button></a></td>
            <td><button class="btn btn-danger" onclick="deleteElement(${i})"><i class="fa-solid fa-trash-can"></i>  Delete</button></td>
        </tr>`
    }

    document.getElementById('data').innerHTML=cartona;
}


function deleteElement(index){
    elementList.splice(index,1);
    displayData();
    localStorage.setItem("elementContainer",JSON.stringify(elementList));
}

function validationName(){
    var regex=/^[A-Za-z0-9]{3,}$/;
    var text=siteNameInput.value;

    if(regex.test(text)){
        document.getElementById("siteName").classList.add("is-valid");
        document.getElementById("siteName").classList.remove("is-invalid");
        return(true);
    }
    else{
        document.getElementById("siteName").classList.remove("is-valid");
        document.getElementById("siteName").classList.add("is-invalid");
        return(false);
    }
}

function validationUrl(){
    var regex=/^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
    var text=siteURLInput.value;

    if(regex.test(text)){
        document.getElementById("siteURL").classList.add("is-valid");
        document.getElementById("siteURL").classList.remove("is-invalid");
        return(true);
    }
    else{
        document.getElementById("siteURL").classList.remove("is-valid");
        document.getElementById("siteURL").classList.add("is-invalid");
        return(false);
    }
}

function showDialog(){
    if(validationName()==false || validationUrl()==false){
        document.getElementById('overlay').classList.add("d-block");
        document.getElementById('overlay').classList.remove("d-none");
        document.getElementById('dialogBox').classList.add("d-block");
        document.getElementById('dialogBox').classList.remove("d-none");
    }
}

function closeDialog(){
    document.getElementById('dialogBox').classList.add("d-none");
    document.getElementById('dialogBox').classList.remove("d-block");
    document.getElementById('overlay').classList.add("d-none");
    document.getElementById('overlay').classList.remove("d-block");
}