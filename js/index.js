const fetchAllData = () =>{
    fetch(`https://openapi.programming-hero.com/api/ai/tools`)
    .then(res => res.json())
    .then(data => showTools(data.data.tools))
}
const showTools = data =>{
    // console.log(data)
    const toolsContainer =  document.getElementById('tools-container')
    data.forEach(singleTool=>{
        // console.log(singleTool);
      //destructuring
      const {id, image,name, published_in, features} = singleTool;


        const toolDiv = document.createElement('div');
        toolDiv.classList.add('col');
        toolDiv.innerHTML=`
        
          
        <div class="col">
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
                    <div class="d-flex mx-auto align-items-baseline">
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
  const {features,description,integrations,pricing,image_link} = toolsDetails;
  document.getElementById('modal-body').innerHTML =`
  <div class="row row-cols-1 row-cols-md-2 g-4">
 
  <div class="col">
    <div class="card p-4 rounded-4 bg-danger border border-danger" style="--bs-bg-opacity: .1;"">
      
      <div class="card-body">
      <h5 class="card-title mb-3">${description}</h5>
      <div class="d-flex align-items-center justify-content-between mb-3 ">
                    <div class="p-3 bg-light rounded-4">
                    <p>${pricing[0].price}</p>
                    <p>${pricing[0].plan}</p>
                    </div>
                    <div class="p-3 bg-light rounded-4">
                    <p>${pricing[1].price}</p>
                    <p>${pricing[1].plan}</p>
                    </div>
                    <div class="p-4 bg-light rounded-4">
                    <p>${pricing[2].price}</p>
                    <p>${pricing[2].plan}</p>
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
                        <li>${integrations[0] ? integrations[0] : "No Data Found"}</li>
                        <li>${integrations[1] ? integrations[1] : "No Data Found"}</li>
                        <li>${integrations[2] ? integrations[2] : "No Data Found"}</li>
                      </ul>                     
                    </div>
                    </div>

      </div>
    </div>
  </div>






  <div class="col">
    <div class="card">
      <img src="${image_link[0]}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
</div>
                    
  `;
}