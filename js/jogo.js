//declaraçao das variaveis globais
    let desempenho = 0;
    let tentativas = 0;
    let acertos = 0;
    let jogar = true;

    //captura os botoes pelos ids e adiciona um evento de clique
    const btnReiniciar = document.getElementById('reiniciar');
    const btnJogarNovamente = document.getElementById('joganovamente');

    //funçao que zera os valores das variáveis controladoras
    function reiniciar() {
      desempenho = 0;
      tentativas = 0;
      acertos = 0;
      jogar = true;
      jogarNovamente();
      atualizaPlacar(0, 0);
      //mostra o botao jogarnovamente alterando a classe css (className)
      btnJogarNovamente.className = 'visivel';
      //oculta o botao reiniciar alterando a classe css (className)
      btnReiniciar.className = 'invisivel';
    }

    function jogarNovamente() {
  jogar = true;
  let divis = document.getElementsByTagName("div");
  for (let i = 0; i < divis.length; i++) {
    if (divis[i].id == 0 || divis[i].id == 1 || divis[i].id == 2 || divis[i].id == 3 || divis[i].id == 4) {
      divis[i].className = "inicial";
      divis[i].innerHTML = divis[i].id; // limpa emoji triste, volta ao número
    }
  }

  let imagem = document.getElementById("imagem");
  if (imagem != null) {
    imagem.remove();
  }
}


    function atualizaPlacar(acertos, tentativas) {
  //calcula o desempenho em porcentagem
  desempenho = (acertos / tentativas) * 100;
  //escreve o placar com os valores atualizados (innerHTML)
  let emoji = "😐";
  if (desempenho >= 80) emoji = "😎";
  else if (desempenho >= 50) emoji = "🙂";
  else if (desempenho > 0) emoji = "😕";
  
  document.getElementById("resposta").innerHTML = 
    `Placar - Acertos: ${acertos} ✅ | Tentativas: ${tentativas} 🔄 | Desempenho: ${Math.round(desempenho)}% ${emoji}`;
}

    //funçao executada quando o jogador acertou
    function acertou(obj) {
      //altera a classe CSS da <div> escolhida pelo jogador (className)
      obj.className = "acertou";
      //Criar uma constante img que armazena um novo objeto imagem com largura de 100px
      const img = new Image(100);
      img.id = "imagem";
      //altera o atributo src (source) da imagem criada
      img.src = "https://upload.wikimedia.org/wikipedia/commons/2/2e/Oxygen480-emotes-face-smile-big.svg";
      //adiciona a imagem criada na div (obj) escolhida pelo jogador (appendChild)
      obj.appendChild(img);
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
            acertou(obj);
            acertos++;
            document.getElementById("resposta").textContent = "Acertou! 😊";
        } else {
            obj.innerHTML = "😢";
            obj.className = "errou";
            document.getElementById("resposta").textContent = "Errou! 😢";
            
            setTimeout(() => {
                const objSorteado = document.getElementById(sorteado);
                acertou(objSorteado);
            }, 800);
        }
        
        atualizaPlacar(acertos, tentativas);
    } else {
        alert('Clique em "Jogar novamente" para continuar');
    }
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
      acertou(obj);
      acertos++;
      document.getElementById("resposta").textContent = "Acertou! 😊";
    } else {
      obj.innerHTML = "😢"; // Mostra emoji triste na carta clicada
      obj.className = "errou"; // Aplica animação e cor de erro
      document.getElementById("resposta").textContent = "Errou! 😢";

      setTimeout(() => {
        const objSorteado = document.getElementById(sorteado);
        acertou(objSorteado);
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