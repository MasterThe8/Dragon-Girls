const relationships = ["Bini", "Pacar", "Selingkuhan", "Budak"];
const getWaifuBtn = document.getElementById("get-waifu-btn");
const waifuGrid = document.getElementById("waifu-grid");

getWaifuBtn.addEventListener("click", async () => {
    // Fetch data from JSON
    const response = await fetch("assets/data/waifu.json");
    const waifuList = await response.json();

    // Clear previous waifus
    waifuGrid.innerHTML = "";

    // Get 4 random waifus
    const selectedWaifus = getRandomItems(waifuList, 4);

    selectedWaifus.forEach((waifu, index) => {
        const image = getRandomItem(waifu.images);
        const relationship = relationships[index];

        // Create card element
        const waifuCard = document.createElement("div");
        waifuCard.classList.add("waifu-card");

        const encodedPath = encodeURI(`assets/img/${waifu.name}/${image}`);
        waifuCard.innerHTML = `
            <div class="waifu-image-wrapper">
                <img src="${encodedPath}" alt="${waifu.name}">
            </div>
            <div class="waifu-info">${waifu.name} adalah ${relationship} anda</div>
        `;

        waifuGrid.appendChild(waifuCard);
    });
});

// Helper: Get random item from array
function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Helper: Get N random unique items from array
function getRandomItems(arr, n) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}
