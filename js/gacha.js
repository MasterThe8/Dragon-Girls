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
let userCrystals = 0;
let pullCount = 0;

// Initialize crystal display on load
document.addEventListener('DOMContentLoaded', function() {
  updateCrystalDisplay();
});

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

// Add these variables at the top with other variables
let urCardCount = 0;
let urShardCount = 0;

function performGacha() {
    if (userCrystals < 3000) {
        alert("Kristal Lu Abis! Berak!");
        return;
    }

    // Deduct crystals
    userCrystals -= 3000;
    updateCrystalDisplay();

    const selectedIcon = document.getElementById("huntress-select").value;
    const resultContainer = document.getElementById("gacha-container");
    resultContainer.innerHTML = "";
    let urGiven = false;
    
    // Reset counters for this gacha
    let currentGachaUrCards = 0;
    let currentGachaUrShards = 0;

    for (let i = 0; i < 10; i++) {
        const item = rollItem(urGiven);
        
        // Count UR items
        if (item.file === "ur_card.png") {
            currentGachaUrCards++;
            if (urGiven) {
                i--;
                continue;
            } else {
                urGiven = true;
                pity = 0;
            }
        } else if (item.file === "ur_shard.png") {
            currentGachaUrShards++;
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
        
            if (item.file === "ur_card.png") {
                itemDiv.classList.add("ur-glow");
                const selectElement = document.getElementById("huntress-select");
                const selectedHuntressName = selectElement.options[selectElement.selectedIndex].text;
                // alert(`You got ${selectedHuntressName} UR card!`);
            }
        } else {
            itemDiv.innerHTML = `<img src="assets/item/${item.file}" alt="item" style="width: 100%; height: 100%; object-fit: contain">`;
        }

        resultContainer.appendChild(itemDiv);
    }
    
    urCardCount += currentGachaUrCards;
    urShardCount += currentGachaUrShards;
    pullCount += 10;
    updateURCounters();
    
}

// Add this new function
function updateURCounters() {
    document.getElementById("ur-card-count").textContent = urCardCount;
    document.getElementById("ur-shard-count").textContent = urShardCount;
    document.getElementById("pull-count").textContent = pullCount;
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

// New functions for crystal management
function topUpCrystals() {
  const input = document.getElementById("crystal-input");
  const amount = parseInt(input.value);
  
  if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid positive number");
      return;
  }
  
  userCrystals += amount;
  updateCrystalDisplay();
  input.value = "";
}

function updateCrystalDisplay() {
  document.getElementById("crystal-display").textContent = userCrystals;
}