let allData;
const fetchAllData = () =>{
    fetch(`https://openapi.programming-hero.com/api/ai/tools`)
    .then(res => res.json())
    .then(data =>{
      allData=data;
      showTools(data.data.tools.slice(0,6))
    } )    
}
const showTools = (data) =>{
  toggleSpinner(true)

  // sort by date
  /* const l =
    data.sort(function(a, b) {
      var c = new Date(a.published_in);
      var d = new Date(b.published_in);
      return c-d;
  });
    
document.getElementById('sort-btn').addEventListener('click',function(){
  console.log(l,"sorted");
  
}) */

   
    const toolsContainer =  document.getElementById('tools-container')
  toolsContainer.innerHTML="";
    data.forEach(singleTool=>{
      //destructuring
      const {id, image,name, published_in, features} = singleTool;
      

        const toolDiv = document.createElement('div');
        toolDiv.classList.add('col');
        toolDiv.innerHTML=`   
        <div class="col" >
                  <div class="card p-4 rounded-4 ">
                    <img src="${image}" class="card-img-top rounded-4" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">Features</h5>
                      <p class="card-text">1. ${features[0]}</p>
                      <p class="card-text">2. ${features[1]}</p>
                      <p class="card-text">3. ${features[2]}</p>
                    </div>
                    <hr>
                    <div>
                    <h5 class="card-title">${name}</h5>
                    <div class="d-flex mx-auto align-items-baseline justify-content-between">
                    <div class="d-flex gap-2 align-items-baseline ">
                    <i class="fa-solid fa-calendar-days "></i>
                    <p>${published_in}</p>
                    </div>
                    <i class="fas fa-arrow-right rounded-circle text-danger p-3 bg-danger" style="--bs-bg-opacity: .2;"
                    onclick="fetchToolDetails('${id}')" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                    </div>
                    </div>
                  </div>
                </div>

        `
        toolsContainer.appendChild(toolDiv);
    })
    toggleSpinner(false)
}

fetchAllData()

const fetchToolDetails = id =>{
  let url = `https://openapi.programming-hero.com/api/ai/tool/${id}`; 
  fetch(url)
  .then(res => res.json())
  .then(data=>showToolDetails(data.data))
  
}

const showToolDetails = toolsDetails =>{
  console.log(toolsDetails)
  const {features,description,integrations,pricing,image_link,input_output_examples,accuracy} = toolsDetails;
  
  
  
  
  document.getElementById('modal-body').innerHTML =`
  <div class="row row-cols-1 row-cols-md-2 g-4">
 
  <div class="col">
    <div class="card p-4 rounded-4 bg-danger border border-danger" style="--bs-bg-opacity: .1;"">
      
      <div class="card-body">
      <h5 class="card-title mb-3">${description}</h5>
      <div class="d-flex align-items-center justify-content-between mb-3 ">
                    <div class="p-3 me-3 bg-light rounded-4 text-success fw-bold ">
                    <p>${pricing ===null ? "Free Of Cost/" : pricing[0].price }</p>
                    <p>${pricing === null ? "Basic" : pricing[0].plan}</p>
                    </div>
                    <div class="p-3 me-3 bg-light rounded-4 fw-bold" style="color: orange;">
                    <p>${pricing ===null ? "Free Of Cost/" : pricing[1].price}</p>
                    <p>${pricing === null ? "Pro" : pricing[1].plan}</p>
                    </div>
                    <div class="p-4 bg-light rounded-4 text-danger fw-bold">
                    <p>${pricing===null ? "Free Of Cost/" : pricing[2].price}</p>
                    <p>${pricing === null ? "Enterprise" : pricing[2].plan}</p>
                    </div>
                    </div>
                    <div class="d-flex align-items-center">
                    <div>
                    <h5 class="card-title">Features</h5>
                    
                    <ul>
                    <li>${features[1].feature_name}</li>
                    <li>${features[2].feature_name}</li>
                    <li>${features[3].feature_name}</li>
                    
                  </ul>
                    </div>
                    <div>
                    <h5 class="card-title">Integrations</h5>
                      <ul>
                      ${integrations===null ?   "No Data Found" : integrations.map(a=>`<li>${a}</li>`).join("")}
                      </ul>                     
                    </div>
                    </div>

      </div>
    </div>
  </div>
  <div class="col">
    <div class="card rounded-3">
      <div class="container position-relative">
      <img src="${image_link[0]}" class="card-img-top p-3 rounded-3" alt="...">
      <button id="accuracy" class="btn btn-danger position-absolute top-0 end-0  " style="width:150px;">${ accuracy===null ? 'd-none' : accuracy.score*100}% accuracy</button>
      </div>
      <div class="card-body text-center ">
        <h5 class="card-title ">${input_output_examples === null ? "Can you give any example?" : input_output_examples[0].input}</h5>
        <p class="card-text">${input_output_examples===null ? "No! Not Yet! Take a Break" : input_output_examples[0].output }</p>
      </div>
    </div>
  </div>
</div>
                    
  `;
}
//spinner 
const toggleSpinner = isLoading =>{
  const loaderSection = document.getElementById('loader');
  if(isLoading){
      loaderSection.classList.remove('d-none')
  }else{
      loaderSection.classList.add('d-none')
  }
}

const showAllData =() =>{
  

  fetch(`https://openapi.programming-hero.com/api/ai/tools`)
  .then(res => res.json())
  .then(data =>{
    allData=data;
    showTools(data.data.tools)
  } )  
  const seeMore = document.getElementById('see-more');
  seeMore.classList.add('d-none');

}








