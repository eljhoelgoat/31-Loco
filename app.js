/**
 * ==========================================================================
 * 31 LOCO - BALATRO EDITION
 * Motor de Juego Frontend / Lógica Interactiva (app.js)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. FOTO PERSONALIZADA DE LA CARTA (CONFIGURACIÓN MANUAL)
    // Pon aquí la ruta de la imagen si deseas que las cartas lleven una ilustración fija,
    // o déjalo en null para que muestre el palo tradicional gigante.
    // ==========================================================================
    const CARD_CUSTOM_IMAGE = null; // Ej: "img/Double_tag.webp" o null

    // ==========================================================================
    // 2. CATÁLOGO COMPLETO DE POTENCIADORES (11 EN TOTAL)
    // Modifica aquí nombres, descripciones, precios o imágenes ('image')
    // ==========================================================================
    const DEFAULT_ENHANCERS = [
        { 
            id: 'enhancer_1', 
            name: 'El Ojo', 
            desc: 'Se podrá ver la carta que se dé en la siguiente ronda.', 
            price: 7, 
            icon: '🧪', 
            image: 'img/Charm_tag.webp'
        },
        { 
            id: 'enhancer_2', 
            name: 'Mano Extra', 
            desc: 'Se podrá recibir una carta adicional al robar la siguiente ronda.', 
            price: 12, 
            icon: '🧲', 
            image: 'img/Handy_tag.webp'
        },
        { 
            id: 'enhancer_3', 
            name: 'Ganancias', 
            desc: 'Al activarlo se duplicará el monto recibido de dinero por cualquier ocasión.', 
            price: 15, 
            icon: '🔍', 
            image: 'img/Investment_tag.webp'
        },
        { 
            id: 'enhancer_4', 
            name: 'Hoy no, gracias', 
            desc: 'Se evitará la acción aplicada por la ronda.', 
            price: 20, 
            icon: '🛡️', 
            image: 'img/Speed_tag.webp'
        },
        { 
            id: 'enhancer_5', 
            name: 'Doble Chance', 
            desc: 'Podrás descartar una carta por otra de manera aleatoria.', 
            price: 17, 
            icon: '💨', 
            image: 'img/Boss_tag.webp' 
        },
        { 
            id: 'enhancer_6', 
            name: 'As bajo la manga', 
            desc: 'Podrás dejar la carta que quieras y pedir la que tú elijas (a excepción de jokers).', 
            price: 35, 
            icon: '🪙', 
            image: 'img/Polychrome_tag.webp' 
        },
        { 
            id: 'enhancer_7', 
            name: 'Eternidad', 
            desc: 'Elige 2 cartas de tu mano; se separan y son invulnerables hasta el final de la ronda.', 
            price: 40, 
            icon: '🎟️', 
            image: 'img/Ethereal_tag.webp'
        },
        { 
            id: 'enhancer_8', 
            name: 'Dobles', 
            desc: 'Toda tu mano vale x2, o puedes dividir tu mano a la mitad si te pasas de 31.', 
            price: 30, 
            icon: '🪞', 
            image: 'img/Double_tag.webp'
        },
        { 
            id: 'enhancer_9', 
            name: 'Negativo', 
            desc: 'Le quitas una carta aleatoria a un jugador de tu elección.', 
            price: 35, 
            icon: '⚡', 
            image: 'img/La negativa.webp' 
        },
        { 
            id: 'enhancer_10', 
            name: 'Oferta', 
            desc: 'Al usarse, cualquier efecto de objeto que uses se realizará dos veces.', 
            price: 40, 
            icon: '💰', 
            image: 'img/Voucher_tag.webp' 
        },
        { 
            id: 'enhancer_11', 
            name: 'Meteorito', 
            desc: 'Al usarse, todos en la mesa excepto tú pierden una carta al azar.', 
            price: 40, 
            icon: '🔮', 
            image: 'img/Meteor_tag.webp' 
        }
    ];

    // ==========================================================================
    // 3. JOKERS BASE (6 DIVISIONES FORMATO MÓVIL Y ESCRITORIO)
    // Modifica aquí los textos y rutas de imágenes ('image') directamente:
    // ==========================================================================
    const DEFAULT_JOKERS = [
        {
            id: 'joker_1',
            name: 'El Corazón',
            desc: 'Al usarlo te unes a una persona de tu elección toda la ronda. Son uno mismo: podrán hacer acciones normales 2 veces, recibir el doble de dinero, compartir ítems y ganar ambos. Si ganan la ronda, solo contará para quien usó el Joker.',
            icon: '🤡',
            image: 'img/corazon.webp'
        },
        {
            id: 'joker_2',
            name: 'Avaricioso',
            desc: 'Al Activarlo todas las acciones monetarias de la ronda valdran el doble hasta el final de la ronda (solo efectos positivos)',
            icon: '🤑',
            image: 'img/codicioso0.webp'
        },
        {
            id: 'joker_3',
            name: 'Las Picas',
            desc: 'Todos los jugadores deberan botar una carta (ellos eligen), tu elijes 2 para cambiarlas por las de tu mano, el resto se va al descarte',
            icon: '🗡️',
            image: 'img/Walkie_Talkie.webp'
        },
        {
            id: 'joker_4',
            name: 'Trebol',
            desc: 'Lo dejas sobre la mesa, hasta el final de la ronda, podras cambiar tus cartas en tu turno una vez por cartas aleatorias de el mazo central, desde solo una carta hasta toda la mano.',
            icon: '🎭',
            image: 'img/dado.webp'
        },
        {
            id: 'joker_5',
            name: 'Ticket',
            desc: 'Al usar el Jocker, podras comprar 3 objetos de la tienda, los que tu quieras, debes tener espacio en el inventario',
            icon: '🧙',
            image: 'img/soda.webp'
        },
        {
            id: 'joker_6',
            name: 'Diamante',
            desc: 'Al usarlo, ponerlo sobre la mesa, eres invulnerable a cualquier efecto durante 2 rondas, incluyendo jokers',
            icon: '✨',
            image: 'img/escudo.webp'
        }
    ];

    // ==========================================================================
    // 4. REGLAS DIGITALES POR PALO Y RANGO
    // ==========================================================================
    const DEFAULT_RULES = {
        spades: {
            even: "Todos deberán descartar una carta de manera aleatoria que irá directo a la basura.",
            odd: "Todos deberán botar todas sus picas al basurero.",
            seven: "El 7 sera todo lo contrario a la suerte, todos descartan 2 cartas y reducen su dinero a la mitad",
            a: "¡AS SUPREMO! Qué mala suerte: todos descartan 2 cartas aleatorias directo al basurero sin reusarse.",
            j: "Eligen a un jugador para que pierda todo y solo tenga 2 cartas; el resto se reparte aleatoriamente.",
            q: "Todos los comodines se destruyen a menos que tengan escudo o protección.",
            k: "Todos pierden 15 monedas y se van al organizador. Todo en la mesa se vuelve más caro."
        },
        hearts: {
            even: "¿Dos es mejor que uno? Quienes tengan mano impar alzan una carta más; todos reciben +$5.",
            odd: "El jugador con menos cartas debe tomar +2 y se le darán +$10 de dinero.",
            seven: "se pondran 7 cartas en mesa y cada jugador eligira una para alguien mas, empieza el que lee esto, a la izquierda",
            a: "AS de amantes, todos deberan alzar dos cartas, las parejas son eternas",
            j: "Se podrán intercambiar cartas entre jugadores que estén de acuerdo (también se pueden comprar).",
            q: "Minijuego por equipos: el perdedor toma +2 cartas y el equipo ganador recibe +$10 por persona.",
            k: "Todos cambian su dinero con alguien más a su propia elección."
        },
        clubs: {
            even: "Puedes cambiar una carta por otra (máx 2 por persona) o cambiar toda tu mano completa.",
            odd: "Se muestra una carta boca arriba y tú decides si te la quedas o la dejas en mesa.",
            seven: "La suerte se aplicara a todos, sus manos se cambiaran por otras nuevas, 4 cartas, te deseo suerte",
            a: "¡AS SUPREMO! Caos de Trébol: Se retiran 3 cartas al azar de todos y son reemplazadas por 3 nuevas.",
            j: "Se roban 2 cartas y se reparten aleatoriamente entre los jugadores desde el organizador.",
            q: "Deben cambiar 3 cartas por otras 3 de la persona al lado; si son impares, el organizador las da.",
            k: "Se reparten 3 cartas boca abajo en mesa y ustedes deciden cuáles robar. Sin devoluciones."
        },
        diamonds: {
            even: "Lo grato de dar dinero es gastarlo: todos obtienen +$10 monedas inmediatamente.",
            odd: "Los siguientes turnos todos los efectos monetarios se multiplicarán x2.",
            seven: "Todos deberan elegir un jugador para que reparta sus riquezas a todos, todos ganamos, menos el claro",
            a: "¡AS SUPREMO! Fortuna Real: Todos pueden comprar 1 ítem gratis de la tienda en este instante.",
            j: "El príncipe pierde la mitad de su dinero y todos eligen si tomar 2 cartas de la baraja.",
            q: "Por la bondad de la Reina, las riquezas se redistribuyen: se dan 20 fichas a cada jugador.",
            k: "La justicia del Rey equilibra la mesa: cada carta equivale a 5 monedas y se balancea tu saldo."
        }
    };

    // ==========================================
    // 5. ESTADO DE LA PARTIDA
    // ==========================================
    let gameState = {
        money: 10,
        currentRound: 1,
        maxRounds: 7,
        wins: 0,
        targetWins: 3,
        inventory: [],
        maxInventory: 4,
        roundsWithoutFaceCard: 0,
        activeCard: null,
        isCardFlipped: false,
        shopOffers: []
    };

    // ==========================================
    // 6. SELECTORES DEL DOM
    // ==========================================
    const DOM = {
        screenWelcome: document.getElementById('screen-welcome'),
        screenGame: document.getElementById('screen-game'),
        btnStartGame: document.getElementById('btn-start-game'),
        btnOpenJokers: document.getElementById('btn-open-jokers'),
        btnHudJokers: document.getElementById('btn-hud-jokers'),
        btnOpenBaseRules: document.getElementById('btn-open-base-rules'),

        moneyDisplay: document.getElementById('player-money-display'),
        currentRoundDisplay: document.getElementById('current-round-display'),
        maxRoundsDisplay: document.getElementById('max-rounds-display'),
        winsBadgesContainer: document.getElementById('wins-badges-container'),
        winsTextIndicator: document.getElementById('wins-text-indicator'),
        btnHudRules: document.getElementById('btn-hud-rules'),
        btnHudShop: document.getElementById('btn-hud-shop'),
        shopNotificationBadge: document.getElementById('shop-notification-badge'),

        btnPassTurn: document.getElementById('btn-pass-turn'),
        btnOpenManualMoney: document.getElementById('btn-open-manual-money'),
        btnRegisterWin: document.getElementById('btn-register-win'),

        interactiveCard: document.getElementById('interactive-card'),
        cardFrontElement: document.getElementById('card-front-element'),
        cardValTL: document.getElementById('card-value-tl'),
        cardSuitTL: document.getElementById('card-suit-tl'),
        cardCustomImage: document.getElementById('card-custom-image'),
        cardSuitCenter: document.getElementById('card-suit-center'),
        cardValBR: document.getElementById('card-value-br'),
        cardSuitBR: document.getElementById('card-suit-br'),
        cardEffectContainer: document.getElementById('card-effect-container'),
        cardTypeTag: document.getElementById('card-type-tag'),
        cardEffectTitle: document.getElementById('card-effect-title'),
        cardEffectDesc: document.getElementById('card-effect-description'),

        btnDrawRandom: document.getElementById('btn-draw-random'),
        btnDrawStrong: document.getElementById('btn-draw-strong'),

        inventoryItemsList: document.getElementById('inventory-items-list'),
        inventoryCapacity: document.getElementById('inventory-capacity'),

        modalShop: document.getElementById('modal-shop'),
        shopMoneyVal: document.getElementById('shop-money-val'),
        btnRerollShop: document.getElementById('btn-reroll-shop'),
        btnCloseShop: document.getElementById('btn-close-shop'),
        btnCloseShopQuick: document.getElementById('btn-close-shop-quick'),
        shopShelfItems: document.getElementById('shop-shelf-items'),

        modalJokers: document.getElementById('modal-jokers'),
        jokersGrid: document.getElementById('jokers-grid'),
        btnCloseJokers: document.getElementById('btn-close-jokers'),
        btnCloseJokersTop: document.getElementById('btn-close-jokers-top'),

        modalBaseRules: document.getElementById('modal-base-rules'),
        btnCloseRules: document.getElementById('btn-close-rules'),
        btnCloseRulesTop: document.getElementById('btn-close-rules-top'),

        modalManualMoney: document.getElementById('modal-manual-money'),
        inputManualMoney: document.getElementById('input-manual-money-amount'),
        btnApplyManualMoney: document.getElementById('btn-apply-manual-money'),
        btnCancelManualMoney: document.getElementById('btn-cancel-manual-money'),
        btnCloseMoneyTop: document.getElementById('btn-close-money-top')
    };

    // ==========================================
    // 7. INICIALIZACIÓN Y PERSISTENCIA
    // ==========================================
    function init() {
        loadFromStorage();
        if (!gameState.shopOffers || gameState.shopOffers.length === 0) {
            rollShopOffers();
        }
        bindEvents();
        updateHUD();
        renderInventory();
        renderJokers();
        updateCardCenterPhotoUI();
    }

    function saveToStorage() {
        const payload = {
            money: gameState.money,
            currentRound: gameState.currentRound,
            wins: gameState.wins,
            inventory: gameState.inventory,
            maxInventory: gameState.maxInventory,
            shopOffers: gameState.shopOffers
            // Ya no guardamos jokers aquí para que siempre lea tu array directo
        };
        localStorage.setItem('31loco_gamestate_v2', JSON.stringify(payload));
    }

    function loadFromStorage() {
        const savedData = localStorage.getItem('31loco_gamestate_v2');
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                gameState.money = parsed.money ?? 10;
                gameState.currentRound = parsed.currentRound ?? 1;
                gameState.wins = parsed.wins ?? 0;
                gameState.inventory = Array.isArray(parsed.inventory) ? parsed.inventory : [];
                gameState.maxInventory = parsed.maxInventory ?? 4;
                gameState.shopOffers = Array.isArray(parsed.shopOffers) ? parsed.shopOffers : [];
            } catch (e) {
                console.error("Error al cargar partida:", e);
            }
        }
    }

    function updateCardCenterPhotoUI() {
        if (!DOM.cardCustomImage || !DOM.cardSuitCenter) return;
        if (CARD_CUSTOM_IMAGE && CARD_CUSTOM_IMAGE.trim() !== '') {
            DOM.cardCustomImage.src = CARD_CUSTOM_IMAGE;
            DOM.cardCustomImage.classList.remove('hidden-img');
            DOM.cardSuitCenter.style.display = 'none';
        } else {
            DOM.cardCustomImage.src = '';
            DOM.cardCustomImage.classList.add('hidden-img');
            DOM.cardSuitCenter.style.display = 'block';
        }
    }

    // ==========================================
    // 8. HUD Y ACCIONES DE TURNO
    // ==========================================
    function updateHUD() {
        if (DOM.moneyDisplay) DOM.moneyDisplay.textContent = gameState.money;
        if (DOM.shopMoneyVal) DOM.shopMoneyVal.textContent = gameState.money;
        if (DOM.currentRoundDisplay) DOM.currentRoundDisplay.textContent = gameState.currentRound;
        if (DOM.maxRoundsDisplay) DOM.maxRoundsDisplay.textContent = gameState.maxRounds;

        if (DOM.winsBadgesContainer) {
            const tokens = DOM.winsBadgesContainer.querySelectorAll('.win-token');
            tokens.forEach((token, index) => {
                if (index < gameState.wins) {
                    token.classList.add('active-win');
                    token.textContent = '●';
                } else {
                    token.classList.remove('active-win');
                    token.textContent = '○';
                }
            });
        }

        if (DOM.winsTextIndicator) {
            DOM.winsTextIndicator.textContent = `${gameState.wins} de ${gameState.targetWins} para ganar`;
        }

        if (DOM.shopNotificationBadge) {
            if (gameState.currentRound > 1 && gameState.currentRound % 2 === 0) {
                DOM.shopNotificationBadge.style.display = 'inline-block';
            } else {
                DOM.shopNotificationBadge.style.display = 'none';
            }
        }

        if (DOM.inventoryCapacity) {
            DOM.inventoryCapacity.textContent = `(${gameState.inventory.length} / ${gameState.maxInventory})`;
        }

        saveToStorage();
    }

    function passTurn() {
        gameState.money += 5;
        rollShopOffers();

        if (gameState.currentRound >= gameState.maxRounds) {
            alert(`🎰 ¡CICLO DE 7 RONDAS COMPLETADO!\n\nTus $${gameState.money} monedas y los consumibles acumulados se conservan para el nuevo ciclo.`);
            gameState.currentRound = 1;
            gameState.roundsWithoutFaceCard = 0;
            resetCardDisplay();
        } else {
            gameState.currentRound++;
            gameState.roundsWithoutFaceCard++;
            resetCardDisplay();
        }
        updateHUD();
    }

    function registerWin() {
        if (gameState.wins < gameState.targetWins) {
            gameState.wins++;
            updateHUD();

            if (gameState.wins >= gameState.targetWins) {
                setTimeout(() => {
                    alert("🏆 ¡VICTORIA INDISCUTIBLE!\nHas acumulado 3 rondas ganadas y dominado la mesa.");
                    if (confirm("¿Iniciar otra partida completa?")) {
                        gameState.wins = 0;
                        updateHUD();
                    }
                }, 200);
            }
        }
    }

    // ==========================================
    // 9. ROBO DE NAIPES (AS = FUERTE, 7 EXCLUSIVO)
    // ==========================================
    const SUITS = [
        { name: 'spades', symbol: '♠', isRed: false },
        { name: 'hearts', symbol: '♥', isRed: true },
        { name: 'clubs', symbol: '♣', isRed: false },
        { name: 'diamonds', symbol: '♦', isRed: true }
    ];

    const RANKS = [
        { label: 'A', value: 1, isAce: true, isStrong: true, isFace: false },
        { label: '2', value: 2, isAce: false, isStrong: false, isFace: false },
        { label: '3', value: 3, isAce: false, isStrong: false, isFace: false },
        { label: '4', value: 4, isAce: false, isStrong: false, isFace: false },
        { label: '5', value: 5, isAce: false, isStrong: false, isFace: false },
        { label: '6', value: 6, isAce: false, isStrong: false, isFace: false },
        { label: '7', value: 7, isSeven: true, isStrong: false, isFace: false },
        { label: '8', value: 8, isAce: false, isStrong: false, isFace: false },
        { label: '9', value: 9, isAce: false, isStrong: false, isFace: false },
        { label: '10', value: 10, isAce: false, isStrong: false, isFace: false },
        { label: 'J', value: 11, isAce: false, isStrong: true, isFace: true, faceType: 'j' },
        { label: 'Q', value: 12, isAce: false, isStrong: true, isFace: true, faceType: 'q' },
        { label: 'K', value: 13, isAce: false, isStrong: true, isFace: true, faceType: 'k' }
    ];

    function drawCard(forceStrong = false) {
        const availableRanks = forceStrong ? RANKS.filter(r => r.isStrong) : RANKS;
        const randomSuit = SUITS[Math.floor(Math.random() * SUITS.length)];
        const randomRank = availableRanks[Math.floor(Math.random() * availableRanks.length)];

        gameState.activeCard = { suit: randomSuit, rank: randomRank };
        if (randomRank.isStrong) {
            gameState.roundsWithoutFaceCard = 0;
        }

        gameState.isCardFlipped = false;
        DOM.interactiveCard.classList.add('card-face-down');
        DOM.interactiveCard.setAttribute('aria-expanded', 'false');

        DOM.cardValTL.textContent = randomRank.label;
        DOM.cardSuitTL.textContent = randomSuit.symbol;
        DOM.cardSuitCenter.textContent = randomSuit.symbol;
        DOM.cardValBR.textContent = randomRank.label;
        DOM.cardSuitBR.textContent = randomSuit.symbol;

        DOM.cardFrontElement.classList.remove('suit-red', 'suit-black');
        DOM.cardFrontElement.classList.add(randomSuit.isRed ? 'suit-red' : 'suit-black');

        updateCardCenterPhotoUI();

        DOM.cardEffectContainer.classList.add('effect-hidden');
        DOM.cardTypeTag.textContent = "CARTA LISTA";
        DOM.cardEffectTitle.textContent = "Haz clic en la carta para voltear";
        DOM.cardEffectDesc.textContent = "Toca el reverso del naipe para descubrir el efecto activo.";
    }

    function flipCard() {
        if (!gameState.activeCard) {
            alert("Roba primero una carta con los botones inferiores.");
            return;
        }

        gameState.isCardFlipped = !gameState.isCardFlipped;

        if (gameState.isCardFlipped) {
            DOM.interactiveCard.classList.remove('card-face-down');
            DOM.interactiveCard.setAttribute('aria-expanded', 'true');
            revealCardEffect();
        } else {
            DOM.interactiveCard.classList.add('card-face-down');
            DOM.interactiveCard.setAttribute('aria-expanded', 'false');
            DOM.cardEffectContainer.classList.add('effect-hidden');
        }
    }

    function revealCardEffect() {
        const { suit, rank } = gameState.activeCard;
        const suitKey = suit.name;
        let effectText = "";
        let categoryName = "";

        if (rank.isAce) {
            categoryName = `AS SUPREMO [CARTA FUERTE] (${rank.label} de ${suit.symbol})`;
            effectText = DEFAULT_RULES[suitKey].a;
        } else if (rank.isSeven) {
            categoryName = `SIETE MUTANTE (${rank.label} de ${suit.symbol})`;
            effectText = DEFAULT_RULES[suitKey].seven;
        } else if (rank.isFace) {
            categoryName = `CARTA FUERTE (${rank.label} de ${suit.symbol})`;
            effectText = DEFAULT_RULES[suitKey][rank.faceType];
        } else if (rank.value % 2 === 0) {
            categoryName = `PAR (${rank.label} de ${suit.symbol})`;
            effectText = DEFAULT_RULES[suitKey].even;
        } else {
            categoryName = `IMPAR (${rank.label} de ${suit.symbol})`;
            effectText = DEFAULT_RULES[suitKey].odd;
        }

        DOM.cardTypeTag.textContent = categoryName;
        DOM.cardEffectTitle.textContent = `${rank.label} ${suit.symbol}`;
        DOM.cardEffectDesc.textContent = effectText;
        DOM.cardEffectContainer.classList.remove('effect-hidden');
    }

    function resetCardDisplay() {
        gameState.activeCard = null;
        gameState.isCardFlipped = false;
        if (DOM.interactiveCard) {
            DOM.interactiveCard.classList.add('card-face-down');
            DOM.interactiveCard.setAttribute('aria-expanded', 'false');
        }
        if (DOM.cardValTL) DOM.cardValTL.textContent = "?";
        if (DOM.cardSuitTL) DOM.cardSuitTL.textContent = "♠";
        if (DOM.cardSuitCenter) DOM.cardSuitCenter.textContent = "31";
        if (DOM.cardValBR) DOM.cardValBR.textContent = "?";
        if (DOM.cardSuitBR) DOM.cardSuitBR.textContent = "♠";
        if (DOM.cardEffectContainer) DOM.cardEffectContainer.classList.add('effect-hidden');
        if (DOM.cardTypeTag) DOM.cardTypeTag.textContent = "SIN CARTA ACTIVA";
        if (DOM.cardEffectTitle) DOM.cardEffectTitle.textContent = "Roba una carta";
        if (DOM.cardEffectDesc) DOM.cardEffectDesc.textContent = "Usa 'Robar Carta Aleatoria' o 'Forzar Carta Fuerte'.";
    }

    // ==========================================================================
    // 10. TIENDA ROGUELIKE: 3 OFERTAS ALEATORIAS Y REROLL
    // ==========================================================================
    function rollShopOffers() {
        const shuffled = [...DEFAULT_ENHANCERS].sort(() => 0.5 - Math.random());
        gameState.shopOffers = shuffled.slice(0, 3).map(item => item.id);
        saveToStorage();
    }

    function openShop() {
        if (DOM.shopMoneyVal) DOM.shopMoneyVal.textContent = gameState.money;
        renderThreeEnhancers();
        if (DOM.modalShop) DOM.modalShop.showModal();
    }

    function closeShop() {
        if (DOM.modalShop) DOM.modalShop.close();
        updateHUD();
    }

    function renderThreeEnhancers() {
        if (!DOM.shopShelfItems) return;
        DOM.shopShelfItems.innerHTML = '';

        const currentItems = DEFAULT_ENHANCERS.filter(e => gameState.shopOffers.includes(e.id));

        currentItems.forEach(enhancer => {
            const card = document.createElement('article');
            card.className = 'enhancer-card';
            card.dataset.enhancerId = enhancer.id;

            const hasImage = enhancer.image && enhancer.image.trim() !== '';

            card.innerHTML = `
                <div class="enhancer-badge">OFERTA</div>
                <div class="enhancer-art-slot">
                    ${hasImage 
                        ? `<img class="enhancer-img" src="${enhancer.image}" alt="${enhancer.name}">` 
                        : `<div class="enhancer-icon-fallback">${enhancer.icon}</div>`
                    }
                </div>
                <h4 class="enhancer-name">${enhancer.name}</h4>
                <p class="enhancer-desc">${enhancer.desc}</p>
                <div class="enhancer-footer">
                    <span class="enhancer-price-tag">$ ${enhancer.price}</span>
                    <button class="btn btn-buy-enhancer" data-price="${enhancer.price}">COMPRAR</button>
                </div>
            `;

            const buyBtn = card.querySelector('.btn-buy-enhancer');
            buyBtn.addEventListener('click', () => buyEnhancer(enhancer, card));

            DOM.shopShelfItems.appendChild(card);
        });
    }

    function rerollShop() {
        const rerollCost = 2;
        if (gameState.money < rerollCost) {
            alert(`Necesitas $${rerollCost} para hacer Reroll.`);
            return;
        }
        gameState.money -= rerollCost;
        rollShopOffers();
        updateHUD();
        renderThreeEnhancers();
    }

    function buyEnhancer(template, elementCard) {
        if (gameState.inventory.length >= gameState.maxInventory) {
            alert(`¡Inventario lleno! Capacidad: (${gameState.inventory.length}/${gameState.maxInventory}).`);
            return;
        }

        if (gameState.money < template.price) {
            alert(`Saldo insuficiente. Cuesta $${template.price} y tienes $${gameState.money}.`);
            return;
        }

        gameState.money -= template.price;

        const newItem = {
            instanceId: 'enh_' + Date.now() + Math.random().toString(36).substring(2, 6),
            name: template.name,
            desc: template.desc,
            icon: template.icon,
            image: template.image || null
        };

        gameState.inventory.push(newItem);

        elementCard.style.opacity = '0.35';
        elementCard.style.pointerEvents = 'none';
        const buyBtn = elementCard.querySelector('.btn-buy-enhancer');
        if (buyBtn) buyBtn.textContent = 'VENDIDO';

        updateHUD();
        renderInventory();
    }

    // ==========================================================================
    // 11. INTERFAZ DE JOKERS (LEE DIRECTAMENTE DE DEFAULT_JOKERS)
    // ==========================================================================
    function renderJokers() {
        if (!DOM.jokersGrid) return;
        DOM.jokersGrid.innerHTML = '';

        DEFAULT_JOKERS.forEach((joker, index) => {
            const card = document.createElement('div');
            card.className = 'joker-slot-card';

            const hasImg = joker.image && joker.image.trim() !== '';

            card.innerHTML = `
                <span class="joker-slot-badge">JOKER #${index + 1}</span>
                <div class="joker-slot-art">
                    ${hasImg 
                        ? `<img class="joker-slot-img" src="${joker.image}" alt="${joker.name}">` 
                        : `<div class="joker-slot-fallback-icon">${joker.icon}</div>`
                    }
                </div>
                <h4 class="joker-slot-title">${joker.name}</h4>
                <p class="joker-slot-desc">${joker.desc}</p>
            `;

            DOM.jokersGrid.appendChild(card);
        });
    }

    // ==========================================
    // 12. INVENTARIO
    // ==========================================
    function renderInventory() {
        if (!DOM.inventoryItemsList) return;
        DOM.inventoryItemsList.innerHTML = '';

        if (gameState.inventory.length === 0) {
            DOM.inventoryItemsList.innerHTML = `
                <div class="empty-inventory-message">Sin consumibles. Visita la tienda para equiparte.</div>
            `;
            return;
        }

        gameState.inventory.forEach(item => {
            const card = document.createElement('div');
            card.className = 'inventory-item-card';

            const visualIcon = item.image 
                ? `<img src="${item.image}" style="width:34px;height:34px;object-fit:cover;border-radius:4px;" alt="${item.name}">` 
                : `<span class="inventory-item-icon">${item.icon}</span>`;

            card.innerHTML = `
                ${visualIcon}
                <span class="inventory-item-name">${item.name}</span>
                <button class="btn btn-use-item" title="${item.desc}">USAR</button>
            `;

            const useBtn = card.querySelector('.btn-use-item');
            useBtn.addEventListener('click', () => useInventoryItem(item.instanceId));

            DOM.inventoryItemsList.appendChild(card);
        });
    }

    function useInventoryItem(instanceId) {
        const index = gameState.inventory.findIndex(i => i.instanceId === instanceId);
        if (index === -1) return;

        const item = gameState.inventory[index];
        alert(`✨ POTENCIADOR ACTIVADO:\n[${item.name}]\n\nEfecto: ${item.desc}\n\n(Se retira del inventario).`);

        if (item.name.includes("Bolsa de Fichas")) {
            gameState.money += 20;
            updateHUD();
        }

        gameState.inventory.splice(index, 1);
        renderInventory();
        saveToStorage();
    }

    // ==========================================
    // 13. VINCULACIÓN DE EVENTOS
    // ==========================================
    function bindEvents() {
        // Pantalla de Inicio
        if (DOM.btnStartGame) {
            DOM.btnStartGame.addEventListener('click', () => {
                DOM.screenWelcome.classList.add('hidden-view');
                DOM.screenWelcome.classList.remove('active-view');
                DOM.screenGame.classList.remove('hidden-view');
                DOM.screenGame.classList.add('active-view');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // Jokers Modal
        if (DOM.btnOpenJokers) {
            DOM.btnOpenJokers.addEventListener('click', () => {
                renderJokers();
                DOM.modalJokers.showModal();
            });
        }
        if (DOM.btnHudJokers) {
            DOM.btnHudJokers.addEventListener('click', () => {
                renderJokers();
                DOM.modalJokers.showModal();
            });
        }
        if (DOM.btnCloseJokers) DOM.btnCloseJokers.addEventListener('click', () => DOM.modalJokers.close());
        if (DOM.btnCloseJokersTop) DOM.btnCloseJokersTop.addEventListener('click', () => DOM.modalJokers.close());

        // Controles de Turno y Victoria
        if (DOM.btnPassTurn) DOM.btnPassTurn.addEventListener('click', passTurn);
        if (DOM.btnRegisterWin) DOM.btnRegisterWin.addEventListener('click', registerWin);

        // Cartas
        if (DOM.btnDrawRandom) DOM.btnDrawRandom.addEventListener('click', () => drawCard(false));
        if (DOM.btnDrawStrong) DOM.btnDrawStrong.addEventListener('click', () => drawCard(true));
        
        if (DOM.interactiveCard) {
            DOM.interactiveCard.addEventListener('click', flipCard);
            DOM.interactiveCard.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    flipCard();
                }
            });
        }

        // Tienda
        if (DOM.btnHudShop) DOM.btnHudShop.addEventListener('click', openShop);
        if (DOM.btnCloseShop) DOM.btnCloseShop.addEventListener('click', closeShop);
        if (DOM.btnCloseShopQuick) DOM.btnCloseShopQuick.addEventListener('click', closeShop);
        if (DOM.btnRerollShop) DOM.btnRerollShop.addEventListener('click', rerollShop);

        // Reglas
        if (DOM.btnOpenBaseRules) DOM.btnOpenBaseRules.addEventListener('click', () => DOM.modalBaseRules.showModal());
        if (DOM.btnHudRules) DOM.btnHudRules.addEventListener('click', () => DOM.modalBaseRules.showModal());
        if (DOM.btnCloseRules) DOM.btnCloseRules.addEventListener('click', () => DOM.modalBaseRules.close());
        if (DOM.btnCloseRulesTop) DOM.btnCloseRulesTop.addEventListener('click', () => DOM.modalBaseRules.close());

        // Dinero manual
        if (DOM.btnOpenManualMoney) {
            DOM.btnOpenManualMoney.addEventListener('click', () => {
                DOM.inputManualMoney.value = gameState.money;
                DOM.modalManualMoney.showModal();
            });
        }
        if (DOM.btnCancelManualMoney) DOM.btnCancelManualMoney.addEventListener('click', () => DOM.modalManualMoney.close());
        if (DOM.btnCloseMoneyTop) DOM.btnCloseMoneyTop.addEventListener('click', () => DOM.modalManualMoney.close());
        
        if (DOM.btnApplyManualMoney) {
            DOM.btnApplyManualMoney.addEventListener('click', (e) => {
                e.preventDefault();
                const val = parseInt(DOM.inputManualMoney.value, 10);
                if (!isNaN(val)) {
                    gameState.money = Math.max(0, val);
                    updateHUD();
                }
                DOM.modalManualMoney.close();
            });
        }
    }

    // Iniciar el juego
    init();
});