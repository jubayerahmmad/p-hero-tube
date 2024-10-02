const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
};
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos));
};

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("vdo-container");
  videos.forEach((video) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card h-full shadow-xl">
       <figure><img class="w-full h-80 object-cover" src="${video.thumbnail}" alt="" /></figure>
      <div class="flex items-center gap-4 p-6">
       <div class="pp">
         <img class="w-10 h-10 rounded-full" src="${video.authors[0].profile_picture}" alt="" />
       </div> 
         <div>
          <p class="font-bold text-2xl">${video.title}</p>
          <p>${video.authors[0].profile_name}</p>
        </div> 
      </div>
   </div>
    `;
    videoContainer.appendChild(div);

    // const img = document.createElement("img");
    // img.setAttribute("src", video.thumbnail);
    // img.setAttribute(
    //   "style",
    //   "width: 400px; height:400px; border-radius:20px "
    // );
    // img.classList = "rounded-xl h-72 w-full";
    // videoContainer.appendChild(img);
  });
};

const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories-container");
  categories.forEach((item) => {
    const button = document.createElement("button");
    button.classList = "btn bg-red-500 text-white btn-outline";
    button.innerText = item.category;
    // console.log(item.category);
    categoriesContainer.append(button);
  });
};

loadCategories();
loadVideos();
