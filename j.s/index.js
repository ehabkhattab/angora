





let userName;
let userEmail;
let userPhone;
let userAge;
let userPassword;
let userRePassword;
let userNameFor;
let userEmailFor;
let userPhoneFor;
let userAgeFor;
let userpasswordFor;
let userRepasswordFor;

search("").then(() => {
  $(".loading-screen").fadeOut(500, () => {
    $("body").css("overflow", "visible");
  });
});

var navwidth = 0,
  isTrue = !0,
  arr = [];


$(".exam-toggel-menu").click(function () {
  isTrue
    ? ($(".nav-tab-menu").addClass("open-menu").removeClass("close-menu"),
      (navwidth = $(".nav-tab-menu").width() - 10),
      $(".exam-header-nav").css("left", navwidth),
      $(".fa-align-justify").toggleClass("fa-times"),
      $(".nav-tab-menu .item1").animate(
        {
          opacity: "1",
          paddingTop: "25px",
        },
        1100
      ),
      $(".nav-tab-menu .item2").animate(
        {
          opacity: "1",
          paddingTop: "25px",
        },
        1200
      ),
      $(".nav-tab-menu .item3").animate(
        {
          opacity: "1",
          paddingTop: "25px",
        },
        1300
      ),
      $(".nav-tab-menu .item4").animate(
        {
          opacity: "1",
          paddingTop: "25px",
        },
        1400
      ),
      $(".nav-tab-menu .item5").animate(
        {
          opacity: "1",
          paddingTop: "25px",
        },
        1500
      ),
      $(".nav-tab-menu .item6").animate(
        {
          opacity: "1",
          paddingTop: "25px",
        },
        1600
      ),
      (isTrue = !isTrue))
    : ($(".nav-tab-menu").addClass("close-menu").removeClass("open-menu"),
      $(".fa-align-justify").toggleClass("fa-times"),
      $(".exam-header-nav").css("left", 0),
      $(".nav-tab-menu li").animate(
        {
          opacity: "0",
          paddingTop: "500px",
        },
        500
      ),
      (isTrue = !isTrue));
});


var isSearchTrue = !0;
$(".exam-search").click(function () {
  isSearchTrue
    ? ($(".search").addClass("open-menu").removeClass("close-search"),
      $(".fa-search").toggleClass("fa-times"),
      $(".search-input").animate(
        {
          top: "49%",
        },
        1500,
        function () {
          $(".search-input").animate(
            {
              top: "50%",
            },
            250
          );
        }
      ),
      (isSearchTrue = !isSearchTrue))
    : ($(".search").addClass("close-search").removeClass("open-menu"),
      $(".fa-search").toggleClass("fa-times"),
      $(".search-input").animate({
        top: "300%",
      }),
      (isSearchTrue = !isSearchTrue));
});

var row = document.getElementById("roww");



async function search(q) {
  $(".loading-container").fadeIn(100);
  let meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`
  );
  meals = await meals.json();
  displayMeals(meals.meals);
  $(".loading-container").fadeOut(400);
  return meals;
}



function displayCategories() {
  let e = "";
  for (var i = 0; i < arr.length; i++)
    e += `
    <div class="col-md-6 col-lg-3 my-3   shadow">
        <div class="catgg shadow rounded position-relative">
            <div onclick="filterByCategory('${
              arr[i].strCategory
            }')" class="post">
                <img src='${arr[i].strCategoryThumb}' class="w-100 rounded" />
                <div class="layer d-flex align-items-center ">
                    <div class="info p-2">
                        <h2>${arr[i].strCategory}</h2>
                        <p>${arr[i].strCategoryDescription
                          .split(" ")
                          .slice(0, 20)
                          .join(" ")}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
  row.innerHTML = e;
  $("html, body").animate(
    {
      scrollTop: 0,
    },
    200
  );
}


function displayArea() {
  let e = "";
  for (var i = 0; i < arr.length; i++)
    e += `
    <div class="col-md-6 col-lg-3 my-3    shadow">
        <div class="catgg shadow rounded position-relative">
            <div onclick=(filterByArea('${arr[i].strArea}')) class="post ">
                <i class="fa-solid fa-city fa-3x"></i>
                <h2 class="text-white">${arr[i].strArea}</h2>
            </div>
        </div>
    </div>`;
  row.innerHTML = e;
  $("html, body").animate(
    {
      scrollTop: 0,
    },
    200
  );
}

function displayIngredients() {
  let e = "";
  for (var i = 0; i < arr.length; i++)
    e += `
    <div class="col-md-6 col-lg-3 my-3    shadow">
        <div onclick="getMainIngredient('${
          arr[i].strIngredient
        }')" class="catgg shadow rounded position-relative">
            <div class="post ">
                <i class="fa-solid fa-bowl-food fa-3x"></i>
                <h2 class="text-white">${arr[i].strIngredient}</h2>
                <p class="text-white">${arr[i].strDescription
                  .split(" ")
                  .splice(0, 20)
                  .join(" ")}</p>
            </div>
        </div>
    </div>`;
  row.innerHTML = e;
  $("html, body").animate(
    {
      scrollTop: 0,
    },
    200
  );
}

async function getMainIngredient(mealName) {
  $(".loading-container").fadeIn(100);
  let meal = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealName}`
  );
  meal = await meal.json();
  displayMeals(meal.meals);
  $(".loading-container").fadeOut(500);
}

function displayMeals(arr) {
  let meals = "";
  for (let i = 0; i < arr.length; i++) {
    meals += `
        <div class="col-md-6 col-lg-3 my-3    shadow">
            <div onclick="getMeal('${arr[i].idMeal}')" class="catgg shadow rounded position-relative">
                <div class="post ">
                    <img src='${arr[i].strMealThumb}' class="w-100 rounded" />
                    <div class="layer d-flex align-items-center ">
                        <div class="info p-2">
                            <h2>${arr[i].strMeal}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
  }
  row.innerHTML = meals;
  $("html, body").animate(
    {
      scrollTop: 0,
    },
    200
  );
}

async function getMeal(mealID) {
  $(".loading-container").fadeIn(100);
  let meal = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );
  meal = await meal.json();
  displayMeal(meal.meals[0]);
  $(".loading-container").fadeOut(500);
}

function displayMeal(meal) {
  let recipes = "";
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      recipes += `<li class="my-3 mx-1 p-1 alert-success rounded">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(",");
  let tagsStr = "";
  for (let i = 0; i < tags?.length; i++) {
    tagsStr += `<li class="my-3 mx-1 p-1 alert-danger rounded">${tags[i]}</li>`;
  }
  let str = `
    <div class="col-md-4   text-white">
					<img class="w-100" src="${meal.strMealThumb}" alt=""
						srcset=""><br>
					<h1>${meal.strMeal}</h1>
				</div>
      
				<div class="col-md-8   text-white text-left">
                <div class="justify-content-start d-flex"> <h2>Instructions</h2>
                
                
					<p>${meal.strInstructions}</p>
          </div>
                    <div class="justify-content-start d-flex">
					<p><b class="fw-bolder">Area :</b> ${meal.strArea}</p>
                    </div>
                    <div class="justify-content-start d-flex">
					<p><b class="fw-bolder">Category :</b> ${meal.strCategory}</p>
                    </div>
                    <div class="justify-content-start d-flex">
					<h3>Recipes :</h3>
                    </div>
                  
					<ul class="d-flex ullrs " id="recipes">
					</ul>
  <div class="justify-content-start d-flex">
					<h3 class="my-2 mx-1 p-1">Tags :</h3>
                      </div>
                      <div class="justify-content-start d-flex">
					<ul class="d-flex tagg  my-3 mx-1 " id="tags">
          </div>
					</ul>

					<div class="justify-content-start d-flex">
					<a class="btn btn-success text-white" target="_blank" href="${meal.strSource}">Source</a>
					<a class="btn youtube text-white ms-2" target="_blank" href="${meal.strYoutube}">Youtub</a>
                    </div>
				</div>`;
  row.innerHTML = str;
  document.getElementById("recipes").innerHTML = recipes;
  document.getElementById("tags").innerHTML = tagsStr;
  $("html, body").animate(
    {
      scrollTop: 0,
    },
    200
  );
}

async function getCategories( listEV) {
  x = await fetch(`https://www.themealdb.com/api/json/v1/1/${ listEV}`);
  x = await x.json();
  return x;
}

async function getByLetter(letter) {
  if (letter) {
    $(".loading-container").fadeIn(100);
    let meals = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
    );
    meals = await meals.json();
    if (meals.meals) {
      displayMeals(meals.meals);
    }
    $(".loading-container").fadeOut(100);
  }
}

async function filterByCategory(category) {
  $(".loading-container").fadeIn(100);
  let meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  meals = await meals.json();
  displayMeals(meals.meals);
  $(".loading-container").fadeOut(500);
}

async function filterByArea(area) {
  $(".loading-container").fadeIn(100);
  let meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  meals = await meals.json();
  displayMeals(meals.meals.slice(0, 20));
  $(".loading-container").fadeOut(500);
}

$(".nav-item a").click(async (e) => {
  let listEV = e.target.getAttribute("data-list");

  document.getElementById("search-container").innerHTML = "";
  row.innerHTML = "";
  $("html, body").animate(
    {
      scrollTop: 0,
    },
    200
  );

  if ( listEV == "contact") {
    row.innerHTML = `
        <section id="contact" class="container   w-75 mx-auto mb-5 ">
		<div class="p-2">
			<h2 class="text-light mb-5">ContactUs...</h2>
			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<input class="form-control shadow " onkeyup="validation()" id="name"
							placeholder="Enter Your Name">
						<div class="alert mt-1 alert-danger d-none" id="namealert" role="alert">
							Special Characters and Numbers not allowed
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" id="email" placeholder="Enter Email">
						<div class="alert mt-1 alert-danger d-none" id="emailalert" role="alert">
							Enter valid email. *Ex: xxx@yyy.zzz
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" id="phone" placeholder="Enter phone">
						<div class="alert mt-1 alert-danger  d-none" id="phonealert" role="alert">
							Enter valid Phone Number
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" id="age" placeholder="Enter Age">
						<div class="alert mt-1 alert-danger  d-none" id="agealert" role="alert">
							Enter valid Age
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" type="password" id="password"
							placeholder="Enter Password">
						<div class="alert mt-1 alert-danger  d-none" id="passwordalert" role="alert">
							Enter valid password Minimum eight characters, at least one letter and one number:
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" type="password" id="rePassword"
							placeholder="Enter RePassword">
						<div class="alert mt-1 alert-danger  d-none" id="repasswordalert" role="alert">
							Enter valid Repassword
						</div>
					</div>
				</div>


			</div>

			<button type="submit" disabled id="submitBtn" class="btn btn-outline-danger  m-3">Submit</button>
		</div>

	</section>`;
    (userName = document.getElementById("name")),
      (userEmail = document.getElementById("email")),
      (userPhone = document.getElementById("phone")),
      (userAge = document.getElementById("age")),
      (userPassword = document.getElementById("password")),
      (userRePassword = document.getElementById("rePassword")),
      (userNameFor = document.getElementById("namealert")),
      (userEmailFor = document.getElementById("emailalert")),
      (userPhoneFor = document.getElementById("phonealert")),
      (userAgeFor = document.getElementById("agealert")),
      (userpasswordFor = document.getElementById("passwordalert")),
      (userRepasswordFor = document.getElementById("repasswordalert"));

    userName.addEventListener("focus", () => {
      nameToached = true;
    });
    userEmail.addEventListener("focus", () => {
      emailToached = true;
    });
    userPhone.addEventListener("focus", () => {
      phoneToached = true;
    });
    userAge.addEventListener("focus", () => {
      ageToached = true;
    });
    userPassword.addEventListener("focus", () => {
      passwordToached = true;
    });
    userRePassword.addEventListener("focus", () => {
      repasswordToached = true;
    });
  }
  if ( listEV == "search") {
    row.innerHTML = "";
    document.getElementById("search-container").innerHTML = `
        <div class="row">
				<div class="col-md-6"><input id="searchInput" class="form-control mb-2 " placeholder="Search By Name">
				</div>
				<div class="col-md-6">
					<input class="form-control " type="text" maxlength="1" id="letter"
						placeholder="search By First Letter...">
				</div>

			</div>`;

    $("#searchInput").keyup((e) => {
      search(e.target.value);
    });
    $("#letter").keyup((e) => {
      getByLetter(e.target.value);
    });

    $("#letter").on("input", function () {
      if (this.value.length > 1) this.value = this.value.slice(0, 1);
    });
  }

  let click_event = new CustomEvent("click");
  document.querySelector(".exam-toggel-menu").dispatchEvent(click_event);

  let x;

  if ( listEV == "categories") {
    $(".loading-container").fadeIn(100);

    x = await getCategories( listEV+ ".php");
    arr = x.categories.splice(0, 20);
    displayCategories();
    $(".loading-container").fadeOut(500);
  } else if ( listEV == "a") {
    $(".loading-container").fadeIn(100);

    x = await getCategories("list.php?a=list");
    arr = x.meals.splice(0, 20);
    displayArea();
    $(".loading-container").fadeOut(500);
  } else if ( listEV == "i") {
    $(".loading-container").fadeIn(100);

    x = await getCategories("list.php?i=list");
    arr = x.meals.splice(0, 20);
    displayIngredients();
    $(".loading-container").fadeOut(500);
  }
});

$(document).scroll((e) => {
  if ($(document).scrollTop()) {
    $(".star").css("backgroundColor", "#0D0D0D");
  }
});

let nameToached = false,
  emailToached = false,
  phoneToached = false,
  ageToached = false,
  passwordToached = false,
  repasswordToached = false;

function validation() {
  if (nameToached) {
    if (userNameValid()) {
      userName.classList.remove("is-invalid");
      userName.classList.add("is-valid");
      userNameFor.classList.replace("d-block", "d-none");
      userNameFor.classList.replace("d-block", "d-none");
    } else {
      userName.classList.replace("is-valid", "is-invalid");
      userNameFor.classList.replace("d-none", "d-block");
    }
  }

  if (emailToached) {
    if (userEmailValid()) {
      userEmail.classList.remove("is-invalid");
      userEmail.classList.add("is-valid");
      userEmailFor.classList.replace("d-block", "d-none");
      userEmailFor.classList.replace("d-block", "d-none");
    } else {
      userEmail.classList.replace("is-valid", "is-invalid");
      userEmailFor.classList.replace("d-none", "d-block");
    }
  }

  if (phoneToached) {
    if (userPhoneValid()) {
      userPhone.classList.remove("is-invalid");
      userPhone.classList.add("is-valid");
      userPhoneFor.classList.replace("d-block", "d-none");
      userPhoneFor.classList.replace("d-block", "d-none");
    } else {
      userPhone.classList.replace("is-valid", "is-invalid");
      userPhoneFor.classList.replace("d-none", "d-block");
    }
  }

  if (ageToached) {
    if (userAgeValid()) {
      userAge.classList.remove("is-invalid");
      userAge.classList.add("is-valid");
      userAgeFor.classList.replace("d-block", "d-none");
      userAgeFor.classList.replace("d-block", "d-none");
    } else {
      userAge.classList.replace("is-valid", "is-invalid");
      userAgeFor.classList.replace("d-none", "d-block");
    }
  }

  if (passwordToached) {
    if (userPasswordValid()) {
      userPassword.classList.remove("is-invalid");
      userPassword.classList.add("is-valid");
      userpasswordFor.classList.replace("d-block", "d-none");
      userpasswordFor.classList.replace("d-block", "d-none");
    } else {
      userPassword.classList.replace("is-valid", "is-invalid");
      userpasswordFor.classList.replace("d-none", "d-block");
    }
  }

  if (repasswordToached) {
    if (userRePasswordValid()) {
      userRePassword.classList.remove("is-invalid");
      userRePassword.classList.add("is-valid");
      userRepasswordFor.classList.replace("d-block", "d-none");
      userRepasswordFor.classList.replace("d-block", "d-none");
    } else {
      userRePassword.classList.replace("is-valid", "is-invalid");
      userRepasswordFor.classList.replace("d-none", "d-block");
    }
  }

  if (
    userNameValid() &&
    userEmailValid() &&
    userPhoneValid() &&
    userAgeValid() &&
    userPasswordValid() &&
    userRePasswordValid()
  ) {
    document.getElementById("submitBtn").removeAttribute("disabled");
  } else {
    document.getElementById("submitBtn").setAttribute("disabled", "true");
  }
}

function userNameValid() {
  return /^[a-zA-Z ]+$/.test(userName.value);
}

function userEmailValid() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    userEmail.value
  );
}

function userPhoneValid() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    userPhone.value
  );
}

function userAgeValid() {
  return /^[1-9][0-9]?$|^100$/.test(userAge.value);
}

function userPasswordValid() {
  return /^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{8,}$/.test(userPassword.value);
}

function userRePasswordValid() {
  return userPassword.value == userRePassword.value;
}









