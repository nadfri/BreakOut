  'use strict';
  /*****************************Start of onload**********************/

  // Variable pour suivre le niveau sélectionné
  let selectedLevel = 1;
  let maxUnlockedLevel = 1;

  div_01.onclick = () => {
    document.location = 'level_01.html';
  };

  const tabStorage = [
    {
      local: localStorage.getItem('level_02'),
      div: div_02,
      html: 'level_02.html',
      num: 2,
    },
    {
      local: localStorage.getItem('level_03'),
      div: div_03,
      html: 'level_03.html',
      num: 3,
    },
    {
      local: localStorage.getItem('level_04'),
      div: div_04,
      html: 'level_04.html',
      num: 4,
    },
    {
      local: localStorage.getItem('level_05'),
      div: div_05,
      html: 'level_05.html',
      num: 5,
    },
    {
      local: localStorage.getItem('level_06'),
      div: div_06,
      html: 'level_06.html',
      num: 6,
    },
    {
      local: localStorage.getItem('level_07'),
      div: div_07,
      html: 'level_07.html',
      num: 7,
    },
    {
      local: localStorage.getItem('level_08'),
      div: div_08,
      html: 'level_08.html',
      num: 8,
    },
    {
      local: localStorage.getItem('level_09'),
      div: div_09,
      html: 'level_09.html',
      num: 9,
    },
    {
      local: localStorage.getItem('level_10'),
      div: div_10,
      html: 'level_10.html',
      num: 10,
    },
    {
      local: localStorage.getItem('level_11'),
      div: div_11,
      html: 'level_11.html',
      num: 11,
    },
    {
      local: localStorage.getItem('level_12'),
      div: div_12,
      html: 'level_12.html',
      num: 12,
    },
    {
      local: localStorage.getItem('level_13'),
      div: div_13,
      html: 'level_13.html',
      num: 13,
    },
    {
      local: localStorage.getItem('level_14'),
      div: div_14,
      html: 'level_14.html',
      num: 14,
    },
    {
      local: localStorage.getItem('level_15'),
      div: div_15,
      html: 'level_15.html',
      num: 15,
    },
    {
      local: localStorage.getItem('level_16'),
      div: div_16,
      html: 'level_16.html',
      num: 16,
    },
    {
      local: localStorage.getItem('level_17'),
      div: div_17,
      html: 'level_17.html',
      num: 17,
    },
    {
      local: localStorage.getItem('level_18'),
      div: div_18,
      html: 'level_18.html',
      num: 18,
    },
    {
      local: localStorage.getItem('level_19'),
      div: div_19,
      html: 'level_19.html',
      num: 19,
    },
    {
      local: localStorage.getItem('level_20'),
      div: div_20,
      html: 'level_20.html',
      num: 20,
    },
  ];

  for (let item of tabStorage) {
    if (item.local == 'true') {
      item.div.className = 'box unlocked';
      item.div.onclick = () => {
        document.location = item.html;
      };
      maxUnlockedLevel = item.num;
    }
  }

  // Constantes de navigation (grille 5x4)
  const TOTAL_LEVELS = 20;
  const COLS = 5;

  // Fonction pour mettre en surbrillance le niveau sélectionné
  function highlightSelectedLevel() {
    // Enlève la surbrillance de tous les niveaux
    div_01.style.border = '';
    for (let item of tabStorage) {
      item.div.style.border = '';
    }

    // Ajoute la surbrillance au niveau sélectionné (même si verrouillé)
    if (selectedLevel === 1) {
      div_01.style.border = '3px solid yellow';
    } else {
      const item = tabStorage[selectedLevel - 2];
      if (item && item.div) {
        item.div.style.border = '3px solid yellow';
      }
    }
  }

  // Contrôle au clavier
  document.addEventListener('keydown', (e) => {
    console.log('Key pressed:', e.key); // Debug
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      // Aller à droite si pas en fin de ligne
      if (selectedLevel % COLS !== 0 && selectedLevel < TOTAL_LEVELS) {
        selectedLevel += 1;
        highlightSelectedLevel();
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      // Aller à gauche si pas au début de ligne
      if ((selectedLevel - 1) % COLS !== 0 && selectedLevel > 1) {
        selectedLevel -= 1;
        highlightSelectedLevel();
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      // Descendre d'une ligne
      if (selectedLevel + COLS <= TOTAL_LEVELS) {
        selectedLevel += COLS;
        highlightSelectedLevel();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      // Monter d'une ligne
      if (selectedLevel - COLS >= 1) {
        selectedLevel -= COLS;
        highlightSelectedLevel();
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      // Valider le niveau sélectionné
      if (selectedLevel === 1) {
        document.location = 'level_01.html';
      } else {
        const item = tabStorage[selectedLevel - 2];
        if (item && item.local === 'true') {
          document.location = item.html;
        } else {
          // Optionnel: petit feedback si verrouillé
          const el = item && item.div ? item.div : null;
          if (el) {
            el.animate(
              [
                { transform: 'scale(1)' },
                { transform: 'scale(1.03)' },
                { transform: 'scale(1)' },
              ],
              { duration: 200, easing: 'ease-out' }
            );
          }
        }
      }
    }
  });

  // Initialise la surbrillance au démarrage
  highlightSelectedLevel();
