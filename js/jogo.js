//declaraçao das variaveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

//captura os botoes pelos ids
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;
  jogarNovamente();
  atualizaPlacar(0, 0);
  btnJogarNovamente.className = 'visivel';
  btnReiniciar.className = 'invisivel';
}

function jogarNovamente() {
  jogar = true;
  let divis = document.getElementsByTagName("div");
  for (let i = 0; i < divis.length; i++) {
    if (divis[i].id >= 0 && divis[i].id <= 4) {
      divis[i].className = "inicial";
      divis[i].innerHTML = divis[i].id;
    }
  }

  let imagem = document.getElementById("imagem");
  if (imagem) {
    imagem.remove();
  }
}

function atualizaPlacar(acertos, tentativas) {
  desempenho = (acertos / tentativas) * 100;
  let emoji = "😐";
  if (desempenho >= 80) emoji = "😎";
  else if (desempenho >= 50) emoji = "🙂";
  else if (desempenho > 0) emoji = "😕";
  
  document.getElementById("resposta").innerHTML = 
    `Placar - Acertos: ${acertos} ✅ | Tentativas: ${tentativas} 🔄 | Desempenho: ${Math.round(desempenho)}% ${emoji}`;
}

function verifica(obj) {
  if (jogar) {
    jogar = false;
    tentativas++;

    if (tentativas == 5) {
      btnJogarNovamente.className = 'invisivel';
      btnReiniciar.className = 'visivel';
    }

    let sorteado = Math.floor(Math.random() * 5);

    if (obj.id == sorteado) {
      acertos++;
      obj.className = "acertou";
      const img = new Image(100);
      img.id = "imagem";
      img.src = "https://upload.wikimedia.org/wikipedia/commons/2/2e/Oxygen480-emotes-face-smile-big.svg";
      obj.appendChild(img);
      document.getElementById("resposta").textContent = "Acertou! 😊";
    } else {
      obj.innerHTML = "😢";
      obj.className = "errou";
      document.getElementById("resposta").textContent = "Errou! 😢";

      setTimeout(() => {
        const objSorteado = document.getElementById(sorteado);
        objSorteado.className = "acertou";
        const img = new Image(100);
        img.id = "imagem";
        img.src = "https://upload.wikimedia.org/wikipedia/commons/2/2e/Oxygen480-emotes-face-smile-big.svg";
        objSorteado.appendChild(img);
      }, 500);
    }

    atualizaPlacar(acertos, tentativas);
  } else {
    alert('Clique em "Jogar novamente"');
  }
}

//adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);