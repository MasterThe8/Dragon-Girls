const gachaItems = [
    { file: "item_0_0.png", prob: 0.96 },
    { file: "item_0_1.png", prob: 12.27 },
    { file: "item_0_2.png", prob: 5.17 },
    { file: "item_0_3.png", prob: 14.70 },
    { file: "item_0_4.png", prob: 13.50 },
    { file: "item_0_5.png", prob: 0.96 },
    { file: "item_0_6.png", prob: 25.10 },
    { file: "item_1_0.png", prob: 3.60 },
    { file: "item_1_1.png", prob: 2.26 },
    { file: "item_1_2.png", prob: 4.80 },
    { file: "item_1_3.png", prob: 5.40 },
    { file: "ur_shard.png", prob: 10.00 },
    { file: "ur_card.png", prob: 1.28 },
  ];

  let huntresses = [];
  let pity = 0;

  fetch("assets/data/waifu.json")
  .then((res) => res.json())
  .then((data) => {
    huntresses = data.sort((a, b) => a.name.localeCompare(b.name));

    const select = document.getElementById("huntress-select");
    huntresses.forEach((h) => {
      const option = document.createElement("option");
      option.value = h.icon;
      option.textContent = h.name;
      select.appendChild(option);
    });
  });

  function performGacha() {
    const selectedIcon = document.getElementById("huntress-select").value;
    const resultContainer = document.getElementById("gacha-container");
    resultContainer.innerHTML = "";
    let urGiven = false;

    for (let i = 0; i < 10; i++) {
      const item = rollItem(urGiven);
      if (item.file === "ur_card.png") {
        if (urGiven) {
          i--;
          continue;
        } else {
          urGiven = true;
          pity = 0;
        }
      } else {
        pity++;
      }

      const itemDiv = document.createElement("div");
      itemDiv.className = "gacha-item";

      if (item.file === "ur_card.png" || item.file === "ur_shard.png") {
        itemDiv.innerHTML = `
          <div class="item-layer">
            <img class="character-icon" src="${selectedIcon}" alt="icon">
            <img class="frame-overlay" src="assets/item/${item.file}" alt="overlay">
          </div>
        `;
      } else {
        itemDiv.innerHTML = `<img src="assets/item/${item.file}" alt="item" style="width: 100%; height: 100%; object-fit: contain">`;
      }

      resultContainer.appendChild(itemDiv);
    }
  }

  function rollItem(urAlreadyGiven) {
    if (pity >= 79 && !urAlreadyGiven) {
      return { file: "ur_card.png", prob: 0 };
    }
    const total = gachaItems.reduce((sum, item) => sum + item.prob, 0);
    let rand = Math.random() * total;
    for (let item of gachaItems) {
      if (rand < item.prob) return item;
      rand -= item.prob;
    }
    return gachaItems[gachaItems.length - 1];
  }