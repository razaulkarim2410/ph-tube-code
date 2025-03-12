

function loadCategory (){
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
  .then((res) => res.json())
  .then((data)=> displayCategories(data.categories));

}

function loadVideos (){
  fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
  .then((res) => res.json())
  .then((data) => displayVideos(data.videos))
}

const loadCategoryVideos =(id) => {
  
  const url =`https://openapi.programming-hero.com/api/phero-tube/category/${id} `;
  console.log(url);

  fetch(url)
  .then(res=> res.json())
  .then(data=> {
    const clickedButton = document.getElementById(`btn-${id}`);
    clickedButton.classList.add('active');
    console.log(clickedButton);
    displayVideos(data.category);
  })
    
}
// {

//   "category_id": "1001",
//   "category": "Music"
// }


function displayCategories(categories){
  const categoryContainer = document.getElementById('category-container')

  for(let cat of categories){
    console.log(cat);

    const categoryDiv = document.createElement('div')
    categoryDiv.innerHTML = `
    <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
    `;
    categoryContainer.append(categoryDiv);
  }
}

const displayVideos =(videos) =>{
  const videoContainer = document.getElementById('video-container')

  videoContainer.innerHTML = "" ;

  if(videos.length== 0){
    videoContainer.innerHTML=`
     <div class="col-span-full flex flex-col text-center justify-center items-center py-16">
    <img class="w-[120px]" src="./assets/Icon.png" alt="">
    <h2 class="font-bold text-2xl">Oops!! Sorry, There is no content here</h2>
  </div>
  
    `

    return;

  }
  videos.forEach((video) => {
    console.log(video);

    const videoCard = document.createElement('div')
    videoCard.innerHTML = `
    <div class="card bg-base-100  ">
    <figure class="relative">
      <img class='w-full h-[150px] object-cover' src="${video.thumbnail}"
        alt="Shoes" />
        <span class="absolute bottom-2 right-2 text-white bg-black rounded text-sm p-2">3hrs 56 min ago</span>
    </figure>
    <div class=" flex gap-3 px-0 py-4">
      <div class="profile"><div class="avatar">
        <div class="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
          <img src="${video.authors[0].profile_picture}" />
        </div>
      </div></div>
      <div class="intro">
        <h2 class="text-xl font-semibold">Building a Winning UX Strategy Using the Kano Model</h2>

        <p class="text-sm text-gray-400 flex gap-1">
       ${video.authors[0].profile_name}<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=SRJUuaAShjVD&format=png" alt=""></p>
        <p class="text-sm text-gray-400 ">${video.others.views}</p>
      </div>
      
    </div>
  </div>
    `
    videoContainer.append(videoCard)

  })

}
loadCategory();
