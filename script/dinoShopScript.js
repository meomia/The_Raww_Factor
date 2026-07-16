const dietSelect    = document.getElementById("filter-diet");
const sizeSelect    = document.getElementById("filter-size");
const envSelect     = document.getElementById("filter-environment");
const eraSelect     = document.getElementById("filter-era");
const licenseSelect = document.getElementById("filter-license");
const sortSelect    = document.getElementById("sort");
const dinoContainer = document.getElementById("product-list");

//Requirement 3
fetch("http://localhost:3000/categories")
    .then(response => response.json())
    .then(categories => {

        filterContents(dietSelect, categories.diet);
        filterContents(sizeSelect, categories.size);
        filterContents(envSelect, categories.environment);
        filterContents(eraSelect, categories.era);
        licenseSelect.innerHTML += '<option value="true">Requires license</option>';

        //read URL params
        const params = new URLSearchParams(window.location.search);
        if (params.get("diet"))        dietSelect.value    = params.get("diet");
        if (params.get("era"))         eraSelect.value     = params.get("era");
        if (params.get("size"))        sizeSelect.value    = params.get("size");
        if (params.get("environment")) envSelect.value     = params.get("environment");
       
        fetchRenderProduct();
    })
    .catch(err => console.error("Could not load categories:", err));

    //event listeners for filter/sort changes in the dropdowns
    dietSelect.addEventListener("change",    fetchRenderProduct);
    sizeSelect.addEventListener("change",    fetchRenderProduct);
    envSelect.addEventListener("change",     fetchRenderProduct);
    eraSelect.addEventListener("change",     fetchRenderProduct);
    licenseSelect.addEventListener("change", fetchRenderProduct);
    sortSelect.addEventListener("change",    fetchRenderProduct);

// Requirement 4
// filters and sort
function fetchRenderProduct() {
    const params = new URLSearchParams();
    
    const diet    = dietSelect.value;
    const size    = sizeSelect.value;
    const env     = envSelect.value;
    const era     = eraSelect.value;
    const license = licenseSelect.value;
    const sort    = sortSelect.value;

    //adding params
    if (diet)    params.set("diet",        diet);
    if (size)    params.set("size",        size);
    if (env)     params.set("environment", env);
    if (era)     params.set("era",         era);
    if (license) params.set("license",     license);
 
    
    //makes us able to fetch the url values in order to filter    
    fetch(`http://localhost:3000/products?${params.toString()}`)
        .then(response => response.json())
        .then(data => {
            let dinoProducts = data.filter(product => product.productType === "Dinosaur");
            

            //sorting is only client sided
            if (sort === "price-low")  dinoProducts.sort((a, b) => b.price - a.price);
            if (sort === "price-high") dinoProducts.sort((a, b) => a.price - b.price);

        renderProducts(dinoProducts);
    })
    .catch(err => console.error("Could not load products:", err));
}

//fills contents into dropdowns - makes it dynamic
function filterContents(select, values) {
    if (!values) return;

    values.forEach(v => {
        const opt = document.createElement("option");
        opt.value = v;
        opt.textContent = v;
        select.appendChild(opt);
    });
}

//render product cards using the correct CSS
function renderProducts(list) {
    dinoContainer.innerHTML = "";

    if (list.length === 0) {
        document.getElementById("no-results").classList.remove("visually-hidden");
        return;
    }
    document.getElementById("no-results").classList.add("visually-hidden");

    list.forEach(dino => {
        // Pick the right tag class based on diet
        const dietClass = dino.diet === "Carnivore" ? "tag-carnivore"
                        : dino.diet === "Herbivore" ? "tag-herbivore"
                        : "tag-omnivore";

        // License badge only if required
        const licenseBadge = dino.requires_license
            ? `<span class="tag tag-license">License required</span>`
            : "";

            dinoContainer.innerHTML += `
            <div class="product-card">
                <div class="product-image-wrap">
                    <a href="productPage.html?id=${dino.id}" style="display:block;width:100%;height:100%;">
                            <img src="${dino.mainImage}" alt="${dino.name}" class="card-img-top" style="width:100%;height:220px;object-fit:cover;display:block;">
                    </a>
                </div>
            <div class="product-card-body card-body">
                <p class="product-era">${dino.era}</p>
                <h3 class="product-title">${dino.name}</h3>
                <div class="product-meta">
                    <span class="tag ${dietClass}">${dino.diet}</span>
                    <span class="tag tag-environment">${dino.environment}</span>
                    <span class="tag tag-environment">${dino.size}</span>
                    ${licenseBadge}
                </div>
                <p class="product-price">${dino.price} DKK</p>
                <div class="d-flex gap-2" style="margin-top:auto;padding-top:0.2rem;">
                    <a href="productPage.html?id=${dino.id}" class="btn btn-raww-outline btn-sm flex-grow-1">View</a>
                    <button onclick="handleAddToCart(${dino.id})" class="btn btn-raww-primary btn-sm flex-grow-1">Add to cart</button>
                 </div>
            </div>
        </div>`;
    });
}