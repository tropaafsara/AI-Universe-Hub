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

        const toolDiv = document.createElement('div');
        toolDiv.classList.add('col');
        toolDiv.innerHTML=`
        

        <div class="col">
                  <div class="card p-4 rounded-4">
                    <img src="${singleTool.image}" class="card-img-top rounded-4" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">Features</h5>
                      <p class="card-text">1. ${singleTool.features[0]}</p>
                      <p class="card-text">2. ${singleTool.features[1]}</p>
                      <p class="card-text">3. ${singleTool.features[2]}</p>
                    </div>
                    <hr>
                    <div>
                    <h5 class="card-title">${singleTool.name}</h5>
                    <div class="d-flex mx-auto align-items-baseline">
                    <div class="d-flex gap-2 align-items-baseline ">
                    <i class="fa-solid fa-calendar-days "></i>
                    <p>${singleTool.published_in}</p>
                    </div>
                    <i class="fas fa-arrow-right rounded-circle text-danger p-3 bg-danger" style="--bs-bg-opacity: .2;"></i>
                    </div>
                    </div>
                  </div>
                </div>

        `
        toolsContainer.appendChild(toolDiv);
    })
}
fetchAllData()

/* const fetchToolDetails = tool_id=>{
  let url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
} */