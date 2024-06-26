document.addEventListener('DOMContentLoaded', function () {
    const cube = document.querySelector('.cube');
    const innerFaces = document.querySelectorAll('.inner-face');
    const swapCounterElement = document.getElementById('swap-counter');
    let isMouseDown = false;
    let startX, startY;
    let startRotX = 0;
    let startRotY = 0;
    let rotateX = 0;
    let rotateY = 0;
    let selectedFaces = [];
    let swapCounter = 0; // Teller voor het aantal swaps
    
    function toggleInfo() {
        let element = document.getElementById("myspan");
        let button = document.getElementById("popup");
    
        if (element.style.display === "none") {
            element.style.display = "block";
            button.innerText = "x";
        } else {
            element.style.display = "none";
            button.innerText = "i";
        }
    }
    
    const infoButton = document.getElementById("popup");
    infoButton.addEventListener("click", toggleInfo);
    let sidesUnique = false;
    let sidesSameColor = false;
    
    // Voer toggleInfo() uit bij het laden van de pagina om ervoor te zorgen dat de uitleg verborgen is
    // toggleInfo();

    function checkPuzzleSolved() {
        // Array om de kleuren van elke zijde op te slaan
        let colors = [];

        // Loop door elke zijde van de kubus
        for (let i = 0; i < 6; i++) {
            let sideColors = [];
            // Loop door elk vakje van de zijde
            for (let j = 0; j < 9; j++) {
                // Voeg de kleur van elk vakje toe aan de array voor deze zijde
                sideColors.push(innerFaces[i * 9 + j].style.backgroundColor);
            }
            // Voeg de kleuren van deze zijde toe aan de array met kleuren
            colors.push(sideColors);
        }

        // Controleer of elke zijde uniek is
        sidesUnique = colors.every((side, index) => {
            console.log(sidesUnique);
            return colors.indexOf(side) === index;
        });
        
        // console.log(sidesUnique);

        // Controleer of elke zijde dezelfde kleur heeft
        sidesSameColor = colors.every(side => {
            console.log(sidesSameColor);
            return side.every(color => color === side[0]);
        });

        // Als elke zijde uniek is en dezelfde kleur heeft, is de puzzel opgelost
        if (sidesUnique && sidesSameColor) {
            showPopupMessage();
            puzzleFinished();
            console.log("Puzzle opgelost");
        }
    }

    function puzzleFinished() {
        var puzzleFinished = document.getElementById("puzzleSolved");
        puzzleFinished.style.display = "block";
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i].style.backgroundColor, array[j].style.backgroundColor] = [array[j].style.backgroundColor, array[i].style.backgroundColor];
        }
    }

    function rotateCube() {
        cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }


    function handleMouseDown(event) {
        if (cube.classList.contains('rotating')) return;

        isMouseDown = true;
        startX = event.clientX;
        startY = event.clientY;
        startRotX = rotateX;
        startRotY = rotateY;

        const clickedFace = event.target.closest('.inner-face');
        if (clickedFace) {
            toggleSelectedFace(clickedFace);
        }
    }

    function toggleSelectedFace(face) {
        const index = selectedFaces.indexOf(face);
        if (index === -1) {
            if (selectedFaces.length < 2) {
                selectedFaces.push(face);
                face.style.border = '2px solid red';
            }
        } else {
            selectedFaces.splice(index, 1);
            face.style.border = '1px solid #000';
        }

        if (selectedFaces.length === 2) {
            swapSelectedFaces();
        }
    }

    function swapSelectedFaces() {
        const firstFace = selectedFaces[0];
        const secondFace = selectedFaces[1];
        const tempColor = firstFace.style.backgroundColor;
        firstFace.style.backgroundColor = secondFace.style.backgroundColor;
        secondFace.style.backgroundColor = tempColor;

        selectedFaces = [];
        innerFaces.forEach(face => face.style.border = '1px solid #000');

        // Verhoog de swap-teller
        swapCounter++;
        // Werk de teller op het scherm bij
        swapCounterElement.textContent = swapCounter;
        swapCounterElement.style.margin = "5px";
        swapCounterElement.style.fontFamily = "Roboto";
        swapCounterElement.style.fontSize = "24px";

        // Check of de puzzel is opgelost
        checkPuzzleSolved();
    }

    function handleMouseMove(event) {
        if (!isMouseDown) return;

        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const deltaX = mouseX - startX;
        const deltaY = mouseY - startY;

        const sensitivity = 0.5;
        rotateX = startRotX - deltaY * sensitivity;
        rotateY = startRotY + deltaX * sensitivity;

        rotateCube();
    }

    function handleMouseUp() {
        isMouseDown = false;
    }

    cube.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    cube.addEventListener('transitionstart', function (event) {
        if (event.propertyName === 'transform') {
            cube.classList.add('rotating');
            cube.style.pointerEvents = 'none'; 
        }
    });

    cube.addEventListener('transitionend', function (event) {
        if (event.propertyName === 'transform') {
            cube.classList.remove('rotating');
            cube.style.pointerEvents = 'auto'; 
        }
    });

    // Shuffle vlakken op pagina load
    shuffle(innerFaces);
});
