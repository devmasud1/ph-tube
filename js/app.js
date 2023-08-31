//main api = `

//All category : - https://openapi.programming-hero.com/api/videos/categories
//URL Format: - https://openapi.programming-hero.com/api/videos/category/${id}

//Example: - https://openapi.programming-hero.com/api/videos/category/1000

const handleAllCategory = async () => {
  const url = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const result = await url.json();
  const category = result.data;

  const menuItem = document.getElementById("menu-item");

  category.forEach((element) => {
    const { category, category_id } = element;
    //console.log(element);
    const div = document.createElement("div");
    div.innerHTML = `
        <button onclick="findDisplayData('${category_id}')" class="btn btn-default">${category}</button>
        `;
    menuItem.appendChild(div);
  });

  findDisplayData(1000);
};

const findDisplayData = async (category_id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${category_id}`
  );
  const data = await res.json();
  const result = data.data;

  displayVideoData(result);
};

const displayVideoData = async (result) => {
  // console.log(result)

  const notAvailableData = document.getElementById("not-available-data");

  if (result.length === 0) {
    notAvailableData.classList.remove("hidden");
    console.log("no");
    // notFound.classList.remove("hidden");
  } else {
    notAvailableData.classList.add("hidden");
  }

  const cardContainer = document.getElementById("card-container");
  cardContainer.textContent = "";

  result.forEach((item) => {
    const { thumbnail, title, others } = item;

    // console.log(item, item.authors[0].verified);
    const div = document.createElement("div");
    div.innerHTML = `
        <!-- card -->
        <div class="card">
            <div class="h-[300px] my-10">
                <div class="bg-[url('${thumbnail}')] bg-cover bg-no-repeat bg-center w-full h-full">
                      ${
                        others.posted_date
                          ? `  <p class="text-center bg-black text-white py-2 w-1/2 absolute right-0 bottom-1/3">  ${others.posted_date} </p>`
                          : ""
                      }
                </div>
            </div>
            <div class="flex gap-5">
                <div class="avatar mt-3">
                    <div class="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src="${
                          item.authors[0].profile_picture
                        }" alt="img"/>
                    </div>
                </div>
                <div class="leading-8">
                    <h4 class="font-medium md:font-semibold lg:font-bold">${title}</h4>

                    <div class="flex items-center">
                        <p class="me-5">${item.authors[0].profile_name}</p>
                      
                      <div>
                      ${
                        item.authors[0].verified
                          ? '<img src="../image/badge.svg" alt="badge" />'
                          : ""
                      }
                      </div>
                    </div>
                    <p>${others.views} views</p>
                </div>
            </div>
        </div>
        `;
    cardContainer.appendChild(div);
  });
};

handleAllCategory();

///items.sort((a, b) => a.value - b.value);
