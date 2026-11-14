function iniciarPortfolio() {
  const spanAno = document.getElementById("ano");
  if (spanAno) {
    spanAno.textContent = new Date().getFullYear();
  }

  const ctasHero = [
    "Vender",
    "Converter",
    "Resolver",
    "Escalar"
  ];

  const typewriterWord = document.getElementById("typewriter-word");
  const typewriterCursor = document.getElementById("typewriter-cursor");

  if (typewriterWord && typewriterCursor) {
    let ctaIndex = 0;
    let charIndex = ctasHero[0].length;
    let apagando = true;

    function tickTypewriter() {
      const palavraAtual = ctasHero[ctaIndex];

      if (apagando) {
        typewriterCursor.classList.remove("blinking");
        charIndex--;
        typewriterWord.textContent = palavraAtual.slice(0, charIndex);

        if (charIndex <= 0) {
          apagando = false;
          ctaIndex = (ctaIndex + 1) % ctasHero.length;
          window.setTimeout(tickTypewriter, 240);
        } else {
          window.setTimeout(tickTypewriter, 60);
        }
      } else {
        typewriterCursor.classList.remove("blinking");
        const novaPalavra = ctasHero[ctaIndex];
        charIndex++;
        typewriterWord.textContent = novaPalavra.slice(0, charIndex);

        if (charIndex >= novaPalavra.length) {
          apagando = true;
          typewriterCursor.classList.add("blinking");
          window.setTimeout(tickTypewriter, 1900);
        } else {
          window.setTimeout(tickTypewriter, 85);
        }
      }
    }

    window.setTimeout(tickTypewriter, 1500);
  }

  const palavrasAutomotiva = [
    "Polimento.",
    "Vitrificação.",
    "Cristalização.",
    "Higienização.",
    "Pintura.",
    "Insulfilm."
  ];

  const polishLine = document.getElementById("polish-line");
  const polishWord = document.getElementById("polish-word");
  let indiceAuto = 0;

  if (polishLine && polishWord) {
    window.setInterval(() => {
      polishLine.classList.remove("polishing");
      void polishLine.offsetWidth;
      polishLine.classList.add("polishing");

      window.setTimeout(() => {
        indiceAuto = (indiceAuto + 1) % palavrasAutomotiva.length;
        polishWord.textContent = palavrasAutomotiva[indiceAuto];
      }, 650);

      window.setTimeout(() => {
        polishLine.classList.remove("polishing");
      }, 1300);
    }, 3200);
  }

  const palavrasSalao = [
    "Loiros Iluminados.",
    "Liso Espelhado.",
    "Corte & Nutrição.",
    "Mechas Criativas."
  ];

  const salonWord = document.getElementById("salon-word");
  let indiceSalao = 0;

  if (salonWord) {
    salonWord.classList.remove("blonde-active", "pintar-loiro", "trocando-blur");

    window.setInterval(() => {
      salonWord.classList.add("trocando-blur");

      window.setTimeout(() => {
        indiceSalao = (indiceSalao + 1) % palavrasSalao.length;
        salonWord.textContent = palavrasSalao[indiceSalao];
        salonWord.classList.remove("trocando-blur");
      }, 450);
    }, 3200);
  }

  function iniciarCarrossel(idContainer, intervaloMs) {
    const root = document.getElementById(idContainer);
    if (!root) return;

    const cards = Array.from(root.querySelectorAll(".carousel-item"));
    if (cards.length < 3) return;

    let atual = 1;
    let timer = null;

    function atualizar() {
      const total = cards.length;
      const esquerda = (atual - 1 + total) % total;
      const direita = (atual + 1) % total;

      cards.forEach((card, i) => {
        card.classList.remove("left", "center", "right");
        if (i === atual) {
          card.classList.add("center");
        } else if (i === esquerda) {
          card.classList.add("left");
        } else if (i === direita) {
          card.classList.add("right");
        }
      });
    }

    function reiniciarTimer() {
      window.clearInterval(timer);
      timer = window.setInterval(() => {
        atual = (atual + 1) % cards.length;
        atualizar();
      }, intervaloMs);
    }

    cards.forEach((card) => {
      card.addEventListener("click", () => {
        if (card.classList.contains("right")) {
          atual = (atual + 1) % cards.length;
          atualizar();
          reiniciarTimer();
        } else if (card.classList.contains("left")) {
          atual = (atual - 1 + cards.length) % cards.length;
          atualizar();
          reiniciarTimer();
        }
      });
    });

    atualizar();
    reiniciarTimer();
  }

  iniciarCarrossel("carousel-auto", 3400);
  iniciarCarrossel("carousel-salon", 3800);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciarPortfolio);
} else {
  iniciarPortfolio();
}