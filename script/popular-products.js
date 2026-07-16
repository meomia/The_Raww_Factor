fetch('http://localhost:3000/products')
.then(response => response.json())
.then(data => {

    const dinoProducts = data.filter(product => {
        return product.productType === "Dinosaur";
    });

    const selectedDinos = dinoProducts
        .sort((a, b) => {
            if (b.stock_quantity !== a.stock_quantity) {
                return b.stock_quantity - a.stock_quantity;
            }
            return b.price - a.price;
        })
        .slice(0, 4);

    const container = document.getElementById("popular-products");

    selectedDinos.forEach(dino => {

        let stockBadge = "";
        if (dino.stock_quantity < 10) {
            stockBadge = `<span class="badge badge-sale badge-overlay">Almost gone</span>`;
        }

        let licenseTag = "";
        if (dino.requires_license) {
            licenseTag = `<span class="tag tag-license">License required</span>`;
        }

        let dietClass = "";
        if (dino.diet) {
            dietClass = dino.diet.toLowerCase();
        }

        container.innerHTML += `
        <div class="col-12 col-sm-6 col-lg-3">
            <div class="product-card h-100">
                <div class="product-image-wrap">
                    ${stockBadge}
                    <a href="productPage.html?id=${dino.id}">
                        <img src="${dino.mainImage}" alt="${dino.name}" style="width:100%;height:100%;object-fit:cover;display:block;">
                    </a>
                </div>

                <div class="product-card-body">

                    <div class="product-era">${dino.era}</div>

                    <h3 class="product-title">${dino.name}</h3>

                    <div class="product-price">${dino.price} DKK</div>

                    <div class="product-meta mb-3">

                        <span class="diet-tag ${dietClass}">
                            ${dino.diet}
                        </span>

                        <span class="tag tag-environment">
                            ${dino.environment}
                        </span>

                        ${licenseTag}

                    </div>

                    <div style="margin-top:auto;padding-top:0.2rem;">
                        <a href="productPage.html?id=${dino.id}" class="btn-add-to-basket">
                            View product
                        </a>
                    </div>

                </div>
            </div>
        </div>
        `;
    });

})
.catch(error => {
    console.error(error);
});