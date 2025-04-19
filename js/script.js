    const characterGrid = document.getElementById('character-grid');
    const cardContainer = document.getElementById('character-card-container');
    
    let currentFilters = {
      type: 0,
      element: 0
    };
    
    let allHuntresses = [];
    
    fetch('assets/data/waifu.json')
      .then(response => {
        if (!response.ok) throw new Error("Failed to load waifu.json");
        return response.json();
      })
      .then(huntresses => {
        allHuntresses = huntresses;
        renderCharacterGrid(huntresses);
      })
      .catch(err => {
        characterGrid.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
        console.error(err);
      });
    
    function renderCharacterGrid(huntresses) {
      characterGrid.innerHTML = "";
      
      const filteredHuntresses = huntresses.filter(huntress => {
        const typeMatch = currentFilters.type === 0 || huntress.type === currentFilters.type;
        const elementMatch = currentFilters.element === 0 || huntress.element === currentFilters.element;
        return typeMatch && elementMatch;
      });
      
      filteredHuntresses.forEach(huntress => {
        const gridItem = document.createElement('div');
        gridItem.className = 'character-item';
        gridItem.dataset.id = huntress.id;
        
        const typeIcon = getTypeIcon(huntress.type);
        const elementIcon = getElementIcon(huntress.element);
        
        gridItem.innerHTML = `
          <img src="${huntress.icon}" alt="${huntress.name}" class="character-icon"/>
          <span class="character-name">${huntress.name}</span>
        `;
        
        gridItem.addEventListener('click', () => showCharacterCard(huntress));
        
        characterGrid.appendChild(gridItem);
      });
      
      if (filteredHuntresses.length === 0) {
        characterGrid.innerHTML = '<p>No huntresses match the selected filters</p>';
      }
    }
    
    function setFilter(filterType, value) {
      currentFilters[filterType] = value;
      
      document.querySelectorAll(`[data-filter="${filterType}"]`).forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.value) === value);
      });
      
      renderCharacterGrid(allHuntresses);
    }
    
    function getTypeIcon(type) {
      const typeIcons = {
        1: 'assets/icon/strength.png',
        2: 'assets/icon/agility.png',
        3: 'assets/icon/wisdom.png'
      };
      return typeIcons[type] || '';
    }
    
    function getElementIcon(element) {
      const elementIcons = {
        1: 'assets/icon/wind.png',
        2: 'assets/icon/fire.png',
        3: 'assets/icon/water.png',
        4: 'assets/icon/earth.png',
        5: 'assets/icon/light.png',
        6: 'assets/icon/dark.png'
      };
      return elementIcons[element] || '';
    }
    
    function showCharacterCard(huntress) {
      const galleryId = `gallery-${huntress.id}`;
      const typeName = getTypeName(huntress.type);
      const elementName = getElementName(huntress.element);
    
      cardContainer.innerHTML = `
        <div class="huntress-card" id="card-${huntress.id}">
          <span class="close-btn" onclick="closeCard()">&times;</span>
          <div class="huntress-header">
            <img src="${huntress.icon}" alt="${huntress.name} icon"/>
            <h2 class="huntress-title">${huntress.name}</h2>
            <div class="huntress-attributes">
              <div class="attribute">
                <img src="${getTypeIcon(huntress.type)}" alt="${typeName}" title="${typeName}">
                <span>${typeName}</span>
              </div>
              <div class="attribute">
                <img src="${getElementIcon(huntress.element)}" alt="${elementName}" title="${elementName}">
                <span>${elementName}</span>
              </div>
            </div>
          </div>
          <div class="huntress-gallery" id="${galleryId}"></div>

          ${Array.isArray(huntress.animations) ? `
            <div class="show-animation-wrapper">
              <button class="show-animation-btn" onclick="toggleVideoCard(${huntress.id})">Show Animation</button>
            </div>
            <div class="video-card" id="video-card-${huntress.id}" style="display: none;">
              ${
                huntress.animations.map(link => `
                  <div class="video-wrapper">
                    <iframe src="${link}" frameborder="0" allowfullscreen loading="lazy"></iframe>
                  </div>`).join("")
              }
            </div>
          ` : ""}

          <div class="huntress-skill">${huntress.skill}</div>
        </div>
      `;
    
      cardContainer.style.display = 'block';
    
      const gallery = document.getElementById(galleryId);
      if (Array.isArray(huntress.images)) {
        const folderName = huntress.name;
        huntress.images.forEach(fileName => {
          const img = document.createElement('img');
          img.src = `./assets/img/${encodeURIComponent(folderName)}/${fileName}`;
          img.alt = fileName;
          img.onerror = () => img.remove();
          gallery.appendChild(img);
        });
      }
    
      cardContainer.scrollIntoView({ behavior: 'smooth' });
    }

    function toggleVideoCard(id) {
      const videoCard = document.getElementById(`video-card-${id}`);
      const button = document.querySelector(`#card-${id} .show-animation-btn`);
      if (videoCard) {
        const isVisible = videoCard.style.display === 'block';
        videoCard.style.display = isVisible ? 'none' : 'block';
        button.textContent = isVisible ? 'Show Animation' : 'Hide Animation';
        if (!isVisible) {
          videoCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }    
    
    function showVideoCard(id) {
      const videoCard = document.getElementById(`video-card-${id}`);
      if (videoCard) {
        videoCard.style.display = 'block';
        videoCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    
    function closeVideoCard(id) {
      const videoCard = document.getElementById(`video-card-${id}`);
      if (videoCard) {
        videoCard.style.display = 'none';
      }
    }      
    
    function getTypeName(type) {
      const typeNames = {
        1: 'Strength',
        2: 'Agility',
        3: 'Wisdom'
      };
      return typeNames[type] || 'Unknown';
    }
    
    function getElementName(element) {
      const elementNames = {
        1: 'Wind',
        2: 'Fire',
        3: 'Water',
        4: 'Earth',
        5: 'Light',
        6: 'Dark'
      };
      return elementNames[element] || 'Unknown';
    }
    
    function closeCard() {
      cardContainer.style.display = 'none';
      cardContainer.innerHTML = '';
    }

    // AUDIO
    const audio = document.getElementById('audio');

    const tracks = [
      {
        src: "assets/audio/loginmusic.wav"
      },
      {
        src: "assets/audio/shuqing.wav"
      }
    ];
    
    let lastIndex = -1;
    
    function getRandomIndex() {
      let index;
      do {
        index = Math.floor(Math.random() * tracks.length);
      } while (index === lastIndex && tracks.length > 1);
      lastIndex = index;
      return index;
    }
    
    function playRandomTrack() {
      const index = getRandomIndex();
      const track = tracks[index];
      audio.src = track.src;
      audio.play().catch(err => {
        console.warn("Autoplay blocked:", err);
      });
    }
    
    audio.addEventListener('ended', () => {
      playRandomTrack();
    });
    
    window.addEventListener('load', () => {
      playRandomTrack();
    });
    