const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
};
const loadVideos = (searchText = "") => {
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  )
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos));
};

function getTime(time) {
  const hour = parseInt(time / 3600);
  let seconds = time % 3600;
  const minutes = parseInt(seconds / 60);
  seconds = seconds % 60;
  return `${hour}h ${minutes}m ${seconds}s ago`;
}

const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  // btn.classList.remove("active");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};

const loadCategoryVideos = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");
      displayVideos(data.category);
    });
};

const loadDetails = async (videoId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
  );
  const data = await res.json();
  displayDetails(data.video);
};

const displayDetails = (video) => {
  console.log(video);
  const detailsContainer = document.getElementById("modal-content");
  detailsContainer.innerHTML = `
  <img class="object-cover w-full" src=${video.thumbnail} />
  <p>${video.description}</p>
  `;

  document.getElementById("customModal").showModal();
};

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("vdo-container");
  videoContainer.innerText = "";
  if (videos.length === 0) {
    videoContainer.innerText = "";
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
    <div class= "flex flex-col justify-center items-center mt-10">
    <img src="./images/Icon.png"/>
    <p class="text-2xl lg:text-3xl text-center font-extrabold text-red-600">No Content in This Category</p>
    </div>
    `;
    return;
  } else {
    videoContainer.classList.add("grid");
  }
  videos.forEach((video) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card h-full shadow-md">
       <figure class="relative"><img class="w-full h-80 object-cover" src="${
         video.thumbnail
       }" alt="" />
       ${
         video.others.posted_date?.length === 0
           ? ""
           : ` <span class="absolute right-8 bottom-6 text-white bg-black p-2 rounded-md text-sm">${getTime(
               video.others.posted_date
             )}</span>`
       }
      
       </figure>
      <div class="flex items-center justify-betweens gap-4 p-2">
       <div class="pp ">
         <img class="w-10 h-10 rounded-full object-cover" src="${
           video.authors[0].profile_picture
         }" alt="" />
       </div> 
         <div >
          <p class="font-bold text-2xl">${video.title}</p>
          <p class="flex items-center gap-2">${video.authors[0].profile_name} ${
      video.authors[0].verified === true
        ? `<img class="w-4 h-4" src="https://cdn-icons-png.flaticon.com/128/6364/6364343.png" />`
        : ""
    } </p>
          <p>${video.others.views} views </p>
        </div>
      </div>
      <div class="flex justify-end p-4">
          <button onclick="loadDetails('${
            video.video_id
          }')" class="btn btn-neutral" > Details</button>
        </div>
   </div>
    `;
    videoContainer.appendChild(div);
  });
};

const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories-container");
  categories.forEach((item) => {
    const btnContainer = document.createElement("div");

    btnContainer.innerHTML = `
    <button id= "btn-${item.category_id}" onclick = "loadCategoryVideos(${item.category_id})" class= "btn btn-outline category-btn">
    ${item.category}
    </button>

    `;
    categoriesContainer.append(btnContainer);

    // const button = document.createElement("button");
    // button.classList = "btn bg-red-500 text-white btn-outline";
    // button.innerText = item.category;
    // button.onclick = () => {
    //   alert("hello");
    // };
    // categoriesContainer.append(button);
  });
};

document.getElementById("search-input").addEventListener("keyup", (e) => {
  loadVideos(e.target.value);
});

loadCategories();
loadVideos();
