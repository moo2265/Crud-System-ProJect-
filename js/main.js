let productNameInput = document.getElementById("productNameInput");

let productPriceInput = document.getElementById("productPriceInput");

let productCategoryInput = document.getElementById("productCategoryInput");

let productImgInput = document.getElementById("productImgInput");

let productDescInput = document.getElementById("productDescInput");

let searchInput = document.getElementById("searchInput");

let addBtn = document.getElementById("addBtn");
let updateBtn = document.getElementById("updateBtn");
let updatedIndex
 

let productList = JSON.parse(localStorage.getItem("products")) || [];

// functions
displayData();
function addProducts() {
  if (
    productNameInput.value === "" ||
    productPriceInput.value === "" ||
    productCategoryInput.value === "" ||
    productDescInput.value === ""
  ) {
    alert("Please Fill out The Form");
    return;
  }

  let file = productImgInput.files[0];

  let reader = new FileReader();

  reader.onload = function () {
    let product = {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      description: productDescInput.value,
      img: reader.result,
    };

    productList.push(product);

    localStorage.setItem("products", JSON.stringify(productList));

    clearData();

    displayData();
  };

  reader.readAsDataURL(file);
}

addBtn.addEventListener("click", function () {
  addProducts();
});

function clearData() {
  productCategoryInput.value = "";
  productDescInput.value = "";
  productNameInput.value = "";
  productPriceInput.value = "";
  productImgInput.value = "";
}

function displayData() {
  let tbody = document.getElementById("tbody");

  if (productList.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8">
          <div class="text-center py-5">
            <i class="fa-solid fa-box-open fs-1 text-secondary mb-3"></i>
            <h4 class="text-muted">No Products Found</h4>
            <p class="text-secondary mb-0">
              Start by adding your first product.
            </p>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  let cartona = "";
  for (let i = 0; i < productList.length; i++) {
    cartona += `
        
                        <tr>
                            <td>${i + 1}</td>

                            <td>
                                  <img src="${productList[i].img}" class="product-img" alt="">


                            <td>${productList[i].name}</td>
                            <td>$${productList[i].price}</td>
                            <td>${productList[i].category}</td>
                            <td>${productList[i].description}</td>

                            <td>
                                <button class="btn btn-update" onclick='setDataToUpdate(${i})'>
                                    Update
                                </button>
                            </td>

                            <td>
                                <button class="btn btn-delete"  onclick='deleteProduct(${i})'>
                                    Delete
                                </button>
                            </td>
                        </tr>
 
        `;
  }
  tbody.innerHTML = cartona;
}
function deleteProduct(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "This product will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      productList.splice(index, 1);

      localStorage.setItem("products", JSON.stringify(productList));

      displayData();

      Swal.fire({
        title: "Deleted!",
        text: "Your product has been deleted.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  });
}

// function searchProduct() {
//   let cartona;
//   let searchTerm = searchInput.value;

//   for (let i = 0; i < productList.length; i++) {
//     if (productList[i].name.toLowerCase().includes(searchTerm.toLowerCase())) {
//       cartona += `

//                         <tr>
//                             <td>${i + 1}</td>

//                             <td>
//                                 <img src="images/${productList[i].img}" class="product-img" alt="">
//                             </td>

//                             <td>${productList[i].name}</td>
//                             <td>$${productList[i].price}</td>
//                             <td>${productList[i].category}</td>
//                             <td>${productList[i].description}</td>

//                             <td>
//                                 <button class="btn btn-update">
//                                     Update
//                                 </button>
//                             </td>

//                             <td>
//                                 <button class="btn btn-delete"  onclick='deleteProduct(${i})'>
//                                     Delete
//                                 </button>
//                             </td>
//                         </tr>

//         `;
//     }
//   }
//   if (cartona === "") {
//     cartona.innerHTML = `   <tr>
//         <td colspan="8">
//           <div class="text-center py-5">
//             <i class="fa-solid fa-box-open fs-1 text-secondary mb-3"></i>
//             <h4 class="text-muted">No Products Found</h4>
//             <p class="text-secondary mb-0">
//               Start by adding your first product.
//             </p>
//           </div>
//         </td>
//       </tr>`;
//   }
//   let tbody = document.getElementById("tbody");
//   tbody.innerHTML = cartona;
// }
function searchProduct() {
  let searchTerm = searchInput.value.toLowerCase();

  let filteredProducts = productList.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm),
  );

  let cartona = "";

  if (filteredProducts.length === 0) {
    cartona = `
      <tr>
        <td colspan="8">
          <div class="text-center py-5">
            <i class="fa-solid fa-box-open fs-1 text-secondary mb-3"></i>
            <h4 class="text-muted">No Products Found</h4>
            <p class="text-secondary mb-0">
              No matching products found.
            </p>
          </div>
        </td>
      </tr>
    `;
  } else {
    for (let i = 0; i < filteredProducts.length; i++) {
      cartona += `
        <tr>
          <td>${i + 1}</td>

          <td>
           <img src="${filteredProducts[i].img}" class="product-img" alt="">
          </td>

          <td>${filteredProducts[i].name}</td>
          <td>$${filteredProducts[i].price}</td>
          <td>${filteredProducts[i].category}</td>
          <td>${filteredProducts[i].description}</td>

          <td>
            <button class="btn btn-update">
              Update
            </button>
          </td>

          <td>
            <button class="btn btn-delete">
              Delete
            </button>
          </td>
        </tr>
      `;
    }
  }

  document.getElementById("tbody").innerHTML = cartona;
}

searchInput.addEventListener("input", function () {
  searchProduct();
});
function setDataToUpdate(i) {
  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
  productCategoryInput.value = productList[i].category;
  productNameInput.value = productList[i].name;
  productDescInput.value = productList[i].description;
  productPriceInput.value = productList[i].price;

 
  updatedIndex = i
}

updateBtn.addEventListener("click", () => {
  updateDate(updatedIndex);
});
function updateDate(updatedIndex) {
  addBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");
  productList[updatedIndex].category = productCategoryInput.value;
  productList[updatedIndex].name = productNameInput.value;
  productList[updatedIndex].description = productDescInput.value;
  productList[updatedIndex].price = productPriceInput.value;
  localStorage.setItem("products", JSON.stringify(productList));
  clearData();
displayData()
}
