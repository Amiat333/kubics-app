let pisos = [];
let current_page = 1;
let obj_per_page = 12;
function totNumPages(obj) {
  return Math.ceil(obj?.length / obj_per_page);
}

function prevPage() {
  if (current_page > 1) {
    current_page--;
    //change(current_page);
    getPisos(current_page);
    document.querySelector("#scroll_js").scrollIntoView({ behavior: "smooth" });
  }
}

function nextPage() {
  if (current_page < totNumPages(JSON.parse(localStorage.getItem("pisos")))) {
    current_page++;
    //change(current_page);
    getPisos(current_page);
    document.querySelector("#scroll_js").scrollIntoView({ behavior: "smooth" });
  }
}

const fetchData = () =>
  fetch("./assets/data/data.json")
    .then((response) => response.json())
    .catch((error) => console.log(error));

async function getPisos(page) {
  const response = await fetchData();
  localStorage.setItem("pisos", JSON.stringify(response));
  generarCard(response, page);
}

getPisos(1);

function generarCard(pisos, page) {
  let obj = pisos;
  let btn_next = document.getElementById("btn_next");
  let btn_prev = document.getElementById("btn_prev");
  let listing_table = document.getElementById("TableList");
  let page_span = document.getElementById("page");
  if (page < 1) {
    page = 1;
  }
  if (page > totNumPages(pisos)) {
    page = totNumPages(pisos);
  }
  listing_table.innerHTML = "";
  console.log(pisos);
  for (let i = (page - 1) * obj_per_page; i < page * obj_per_page; i++) {
    listing_table.innerHTML += `<div class="col">
          <div class="card" style="width: 18rem">
            <img src="${
              pisos[i].img || "./assets/img/Logo-Horizontal-web-black-1.png"
            }" class="card-img-top img_card" alt="KuBics" />
            <hr>
            <div class="card-body">
              <p class="card-text">
              <h5>${pisos[i].direccion}</h5>
              <h6>Precio: ${pisos[i].precio}€</h6>
              <div class="d-flex justify-content-start">
                <h7><a href="${
                  pisos[i].contacto
                }" class="link_card">Contacto</a>
                </h7>
              </div>
              <hr>
              <div class="d-flex justify-content-between">
                <i class="fa-solid fa-bed">: ${pisos[i].habitaciones}</i>
                <i class="fa-solid fa-bath">: ${pisos[i].banos}</i>
                <i class="fa-solid fa-arrows-up-down-left-right">: ${
                  pisos[i].m2
                } m²</i>
              </div>
              </p>
            </div>
          </div>
         </div>`;
  }
  page_span.innerHTML = page;
  if (page == 1) {
    btn_prev.style.visibility = "hidden";
  } else {
    btn_prev.style.visibility = "visible";
  }
  if (page == totNumPages(obj)) {
    btn_next.style.visibility = "hidden";
  } else {
    btn_next.style.visibility = "visible";
  }
}
