let title= document.getElementById('title');
let price= document.getElementById('price');
let taxes= document.getElementById('taxes');
let ads= document.getElementById('ads');
let discount= document.getElementById('discount');
let total= document.getElementById('total');
let count= document.getElementById('count');
let category= document.getElementById('category');
let submit= document.getElementById('submit');

let mood = 'create'; //متغير
let tmp; // عملت متغير جلوبل بحيث انه يكون مرئي لكل الفانكشنس

//get total

function gettotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value )- +discount.value;
        total.innerHTML = result; // حط ف التوتل القيمه اللي جايه 
        total.style.background="green";
    }else{
        total.innerHTML='';
        total.style.background="rgb(122, 0, 0)"
    }

}

//creat

let dataPro; 
//عشان لما اعمل ريلود مايمسحش البيانات القديمة هقوله لو الاستوردج بتاعتي مش نال خليها فيها البيانات بتاعت ال الاستوردج اللي انا دخلتها ولو فاضية كمل زي ما انت عادي 
if (localStorage.product != null){
    dataPro= JSON.parse(localStorage.product)// رجعتها بأصلها ارقام مش سترينج
}else{
    dataPro = []; // array
}


submit.onclick = function(){
   let  newPro = {
    title : title.value.toLowerCase(),
    price: price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase(),
   } 
if(mood === 'create'){
   if (newPro.count > 1){ //الجزء دا هو اللي مسئول انه يعمل منتج جديد
    for(let i =0;  i < newPro.count; i++){
        dataPro.push(newPro);
    }

   } else{ 
    dataPro.push(newPro);}
}else{ 
    dataPro[ tmp ]= newPro;
    mood = 'creat'; // بعد ما تعدل خليه
    submit.innerHTML = 'Create';
    count.style.display='block';

}


   // حطيته الاوبجطت ف الاراي
   localStorage.setItem('product', JSON.stringify(dataPro) )     //حطيت الاراي ف الاستوردج
    // مابتقبلش غير سترينج ف حولتها لسترينج ب json 
    clearData()
    showData()
   
}
// clear
function clearData(){
    title.value= '';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
}
//read 

function showData(){
    gettotal()
    let table='';// عملت وسيط مابين الاراي والبادي
    //هعمل لوب علي الاراي اللي فيه داتا
    for(let i= 0; i<dataPro.length;i++){//هقوله هات البيانات اللي ف الاراي وضيفها ف التابل
        table += ` 
    <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>
        `
    

    document.getElementById('tbody').innerHTML=table; // انا كدا بضيف اوبجكت ف ال htmlو كدا ماينفعش 
    let btndelete = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        btndelete.innerHTML = ` <button onclick=" deleteall()"> delete all (${dataPro.length}) </button>`
    } else {btndelete.innerHTML='';
}}
}       showData()

//delete

function deleteData(i){
    dataPro.splice(i,1)                                   //كدا همسح من الاراي بس - طلامه ممسحتش من الاستوردج يبقا كدا معملتش حاجه لاوم امسح من الاتنين 
    localStorage.product = JSON.stringify(dataPro);      //بحط ف الاستوردج الاراي بعد ما مسحت منه عشان يبقا كدا مسحت من الاتنين 
 // هيمسح بس بعد ما اعمل ريلود
    showData() //عشان يعرض الداتا من اول وجديد ف كل مره بمسح عشان معملش ريلود
}

function deleteall(){
  
    dataPro.splice(0)
    localStorage.clear()
    showData()
    
}

// UPDATE

function updateData(i){
    title.value=dataPro[i].title;
    price.value=dataPro[i].price;
    taxes.value=dataPro[i].taxes;
    ads.value=dataPro[i].ads;
    discount.value=dataPro[i].discount;
    gettotal()
    count.style.display='none';
    category.value=dataPro[i].category;
    submit.innerHTML='Update';
    mood = 'update';
    tmp = i; //كدا ال i اصبحت مكشوفه لكل الفانكشنز
    scroll({
        top:0,
        behavior:'smooth',
    })
}
// search
let searchMood = 'title' ;

function getSearchMood(id){
    let search = document.getElementById('search');
    if(id == 'searchtitle'){
        searchMood = 'title';
        search.placeholder = 'Search by Title';
    }else{
        searchMood='category';
        search.placeholder = 'Search by Category';

    }
search.focus()
search.value = '';
showData();
}


function searchData(value){
    let table= '';
    if(searchMood == 'title')
    {
        for(let i = 0 ; i < dataPro.length; i++){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table += ` 
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
                    `
                

            }
        }
    }else{        for(let i = 0 ; i < dataPro.length; i++){
        if(dataPro[i].category.includes(value.toLowerCase())){
            table += ` 
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
                `
            

        }
    }

    }
    document.getElementById('tbody').innerHTML = table; 

}