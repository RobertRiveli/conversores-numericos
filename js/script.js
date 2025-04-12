const binarioTexto = document.querySelector("#binario");
const botaoEnviar = document.querySelector(".enviar");
const decimalTexto = document.querySelector("#decimal");
const binario = document.querySelector(".binario_digitado");
const explicacaoCalculo = document.querySelector(".explicacao_calculo");
const valorPegoExemplo = document.querySelector(".valor_pego");
const somaExplicacao = document.querySelector(".soma_explicacao");
const resultadoExplicacao = document.querySelector(".resultado_explicacao");

let numerosBinario = [];

function inverterValores(array) {
  const valoresInvertidos = [...array].reverse();
  return valoresInvertidos;
}

function exemploPadrao() {
  binario.innerHTML = `1 0 1 1 1`;
  explicacaoCalculo.innerHTML = `(1x2<sup>4</sup>) + (0x2<sup>3</sup>) + (1x2<sup>2</sup>) +
          (1x2<sup>1</sup>) + (1x2<sup>0</sup>)`;
  somaExplicacao.innerHTML = `16 + 0 + 4 + 2 + 1`;
  resultadoExplicacao.innerHTML = `23`;
  valorPegoExemplo.innerHTML = valorPegoExemplo.innerHTML.replace(
    "seu",
    "seguinte"
  );
}

function calcularBinario(numero, indice) {
  return numero * Math.pow(2, indice);
}

function apagarTexto(texto) {
  texto.innerHTML = "";
}

botaoEnviar.addEventListener("click", function () {
  numerosBinario = [];
  let valorDecimalTotal = 0;
  const numeroBinario = binarioTexto.value;

  if (!numeroBinario) {
    exemploPadrao();
    return (decimalTexto.value = "");
  }

  for (let i = 0; i < numeroBinario.length; i++) {
    if (numeroBinario[i] !== "0" && numeroBinario[i] !== "1") {
      return (decimalTexto.value = "O valor digitado deve ter apenas 0s e 1s");
    }

    numerosBinario.push(numeroBinario[i]);
  }

  const binariosInvertidos = inverterValores(numerosBinario);

  binariosInvertidos.forEach((binario, indice) => {
    binario = Number(binario);
    let numeroDecimal = calcularBinario(binario, indice);
    valorDecimalTotal += numeroDecimal;
  });

  decimalTexto.value = valorDecimalTotal;

  if (numerosBinario.length >= 0 && numerosBinario.length <= 6) {
    apagarTexto(explicacaoCalculo);
    apagarTexto(somaExplicacao);

    let comprimento = numerosBinario.length;

    valorPegoExemplo.innerHTML = valorPegoExemplo.innerHTML.replace(
      "seguinte",
      "seu"
    );

    binario.innerHTML = numerosBinario.join(" ");
    resultadoExplicacao.innerHTML = valorDecimalTotal;

    numerosBinario.forEach((numero, indice) => {
      let expoente = comprimento - indice - 1;

      explicacaoCalculo.innerHTML += `(${numero}x2<sup>${expoente}</sup>)`;
      somaExplicacao.innerHTML += calcularBinario(numero, expoente);

      if (indice < numeroBinario.length - 1) {
        explicacaoCalculo.innerHTML += " + ";
        somaExplicacao.innerHTML += " + ";
      }
    });
  } else {
    exemploPadrao();
  }
});
