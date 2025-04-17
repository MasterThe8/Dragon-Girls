    // DOM elements
    const characterGrid = document.getElementById('character-grid');
    const cardContainer = document.getElementById('character-card-container');
    
    // Filter state
    let currentFilters = {
      type: 0,    // 0 means no filter
      element: 0   // 0 means no filter
    };
    
    // Store all huntresses data
    let allHuntresses = [];
    
    // Fetch character data
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
    
    // Function to render character grid with filters
    function renderCharacterGrid(huntresses) {
      // Clear grid
      characterGrid.innerHTML = "";
      
      // Apply filters
      const filteredHuntresses = huntresses.filter(huntress => {
        const typeMatch = currentFilters.type === 0 || huntress.type === currentFilters.type;
        const elementMatch = currentFilters.element === 0 || huntress.element === currentFilters.element;
        return typeMatch && elementMatch;
      });
      
      // Create grid items for each filtered character
      filteredHuntresses.forEach(huntress => {
        const gridItem = document.createElement('div');
        gridItem.className = 'character-item';
        gridItem.dataset.id = huntress.id;
        
        // Add type and element indicators
        const typeIcon = getTypeIcon(huntress.type);
        const elementIcon = getElementIcon(huntress.element);
        
        gridItem.innerHTML = `
          <img src="${huntress.icon}" alt="${huntress.name}" class="character-icon"/>
          <span class="character-name">${huntress.name}</span>
        `;
        
        // Add click event to show character card
        gridItem.addEventListener('click', () => showCharacterCard(huntress));
        
        characterGrid.appendChild(gridItem);
      });
      
      // Show message if no results
      if (filteredHuntresses.length === 0) {
        characterGrid.innerHTML = '<p>No huntresses match the selected filters</p>';
      }
    }
    
    // Function to set filter and update grid
    function setFilter(filterType, value) {
      // Update filter state
      currentFilters[filterType] = value;
      
      // Update active state of filter buttons
      document.querySelectorAll(`[data-filter="${filterType}"]`).forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.value) === value);
      });
      
      // Re-render grid with filters
      renderCharacterGrid(allHuntresses);
    }
    
    // Helper functions to get icon paths
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
    
    // Function to show character card
    function showCharacterCard(huntress) {
      const galleryId = `gallery-${huntress.id}`;
      
      // Get type and element names
      const typeName = getTypeName(huntress.type);
      const elementName = getElementName(huntress.element);
      
      // Create card HTML
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
        <div class="huntress-skill">${huntress.skill}</div>
        </div>
      `;
      
      // Show the card container
      cardContainer.style.display = 'block';
      
      // Load images for the gallery
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
      
      // Scroll to the card
      cardContainer.scrollIntoView({
        behavior: 'smooth'
      });
    }
    
    // Helper functions to get type and element names
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
    
    // Function to close character card
    function closeCard() {
      cardContainer.style.display = 'none';
      cardContainer.innerHTML = '';
    }