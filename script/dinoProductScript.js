const searchTag = new URLSearchParams(window.location.search);
const dinoID = searchTag.get("id");

// FIRST FETCH: get the FULL details for one specific product from the backend API
fetch(`http://localhost:3000/products/${dinoID}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Product not found");
    }

    return response.json();
  })

  .then((selectedDino) => {
    // Reuse the shared product loader from products.js
    return loadProducts().then((data) => {

        if (!selectedDino) {
          document.getElementById("product-info").innerHTML = `
            <section class="py-5">
              <div class="container text-center">
                <h1 class="mb-3">Product not found</h1>
                <p class="mb-4">We could not find the requested dinosaur.</p>
                <a href="dinoShop.html" class="btn btn-raww-primary">Back to shop</a>
              </div>
            </section>
          `;
          return;
        }

        let licenceText = "";

        if (selectedDino.requires_license) {
          licenceText = `<span class="tag tag-license">License required</span>`;
        }

        let dietClass = "";
        if (selectedDino.diet) {
          dietClass = selectedDino.diet.toLowerCase();
        }

        let thumbnailImages = [selectedDino.mainImage];

        if (selectedDino.extraImages && selectedDino.extraImages.length > 0) {
          thumbnailImages = [
            selectedDino.mainImage,
            ...selectedDino.extraImages
          ];
        }

        let thumbnailsHtml = "";

        thumbnailImages.forEach((image, index) => {
          thumbnailsHtml += `
            <div class="col-3">
              <img 
                src="${image}"
                class="img-fluid rounded-3 product-thumb ${index === 0 ? "active-thumb" : ""}"
                alt="${selectedDino.name}"
                data-large-image="${image}"
              >
            </div>
          `;
        });

        // Use the second fetch result(data) for related products
        const relatedProducts = data
          .filter(
            (product) =>
              product.productType === "Dinosaur" &&
              product.id != selectedDino.id
          )
          .slice(0, 4);

        let relatedHtml = "";

        relatedProducts.forEach((product) => {
          let relatedDietClass = "";
          if (product.diet) {
            relatedDietClass = product.diet.toLowerCase();
          }

          relatedHtml += `
            <div class="col-6 col-md-3">
              <div class="product-card h-100">
                <a href="productPage.html?id=${product.id}" style="display:block;">
                  <div class="product-image-wrap">
                    <img src="${product.mainImage}" alt="${product.name}" style="width:100%;height:100%;object-fit:cover;display:block;">
                  </div>
                </a>
                <div class="product-card-body">
                  <p class="product-era">${product.era}</p>
                  <h3 class="product-title">${product.name}</h3>
                  <p class="product-price">${product.price} DKK</p>
                  <div class="product-meta">
                    <span class="diet-tag ${relatedDietClass}">${product.diet}</span>
                    <span class="tag tag-environment">${product.environment}</span>
                  </div>
                  <div style="margin-top:auto;padding-top:0.2rem;">
                    <a href="productPage.html?id=${product.id}" class="btn-add-to-basket">View product</a>
                  </div>
                </div>
              </div>
            </div>
          `;
        });

        document.getElementById("product-info").innerHTML = `
          <section class="py-5">
            <div class="container">
              <div class="row g-5 align-items-start">

                <div class="col-lg-6">
                  <div class="mb-4">
                    <img 
                      src="${selectedDino.mainImage}"
                      class="img-fluid w-100 rounded-3"
                      alt="${selectedDino.name}"
                      id="main-product-image"
                    >
                  </div>

                  <div class="row g-3">
                    ${thumbnailsHtml}
                  </div>
                </div>

                <div class="col-lg-6">
                  <h1 class="mb-4">${selectedDino.name}</h1>

                  <div class="product-meta mb-4">
                    <span class="diet-tag ${dietClass}">
                      ${selectedDino.diet}
                    </span>

                    <span class="tag tag-environment">
                      ${selectedDino.environment}
                    </span>

                    <span class="tag tag-size">
                      ${selectedDino.size}
                    </span>

                    ${licenceText}
                  </div>

                  <p class="mb-3">${selectedDino.traits}</p>
                  <p class="mb-4">${selectedDino.description}</p>

                  <div class="product-price mb-4">
                    ${selectedDino.price} DKK
                  </div>

                  <button class="btn btn-raww-primary" onclick="handleAddToCart(${selectedDino.id})">
                    Add to basket
                  </button>
                </div>

              </div>
            </div>
          </section>

          <section class="pb-5">
            <div class="container">
              <div class="accordion" id="productAccordion">

                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTraits">
                      This is a good choice for you if...
                    </button>
                  </h2>

                  <div id="collapseTraits"
                    class="accordion-collapse collapse"
                    data-bs-parent="#productAccordion">
                    <div class="accordion-body">
                      ${selectedDino.description}
                    </div>
                  </div>
                </div>

                <div class="accordion-item mt-3">
                  <h2 class="accordion-header">
                    <button class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOwnership">
                      Legal owner requirements
                    </button>
                  </h2>

                  <div id="collapseOwnership"
                    class="accordion-collapse collapse"
                    data-bs-parent="#productAccordion">
                    <div class="accordion-body">
                      ${selectedDino.ownership_requirement}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          <section class="py-5">
            <div class="container">
              <h2 class="mb-5">You might also like...</h2>
              <div class="row g-4">
                ${relatedHtml}
              </div>
            </div>
          </section>

          <footer class="py-4">
            <div class="container">
              <div class="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
                <div class="d-flex align-items-center gap-2">
                  <span style="font-size:1.4rem;">🦖</span>
                  <span style="font-family:var(--font-heading);color:var(--accent);font-size:1rem;font-weight:700;letter-spacing:1px;">RAWW FACTOR</span>
                </div>
              </div>
              <p class="text-center mb-0" style="font-size:0.8rem;color:var(--muted);border-top:1px solid var(--border);padding-top:1rem;">
                &copy; 2025 The Raww Factor. All rights reserved. No dinosaurs were harmed in the making of this website.
              </p>
            </div>
          </footer>
        `;

        const mainProductImage = document.getElementById("main-product-image");
        const thumbnails = document.querySelectorAll(".product-thumb");

        thumbnails.forEach((thumbnail) => {
          thumbnail.addEventListener("click", () => {
            mainProductImage.src = thumbnail.dataset.largeImage;

            thumbnails.forEach((item) => {
              item.classList.remove("active-thumb");
            });

            thumbnail.classList.add("active-thumb");
          });
        });
      });
  })

  // If anything fails in either fetch, show fallback UI
  .catch((error) => {
    console.error("Error loading product:", error);

    document.getElementById("product-info").innerHTML = `
      <section class="py-5">
        <div class="container text-center">
          <h1 class="mb-3">Product not found</h1>
          <p class="mb-4">We could not find the requested dinosaur.</p>
          <a href="dinoShop.html" class="btn btn-raww-primary">Back to shop</a>
        </div>
      </section>
    `;
  });