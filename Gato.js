export default class Gato {
  constructor() {
    this.turnos = document.querySelector("#turno");
    this.cuadricula = document.querySelector("#cuadricula");
    this.msg_fin = document.querySelector("#msg_fin");
    this.msg_fin_txt = document.querySelector("#msg_fin_txt");

    this.jugador_actual = "jugador 1";
    this.cuadricula_lista;
    this.inicializa_cuadricula();

    this.juego = true;

    this.button = document.getElementById('reset');

    let self = this;

    this.button.addEventListener('click', function(evt){
      self.resetear();
    });

    this.cuadricula.addEventListener("mousedown", function(evt) {
      if(self.juego){
        if(!evt.target.hasAttribute("clicked")){
          evt.target.setAttribute("clicked", true);
          if(self.jugador_actual === "jugador 1"){
            evt.target.style.backgroundImage = "url('imgs/Equis.png')";
            self.turnos.innerText = "Turno de jugador 2.";
            self.turnos.style.color = "red";
          }
          else{
            evt.target.style.backgroundImage = "url('imgs/Circulo.png')";
            self.turnos.innerText = "Turno de jugador 1.";
            self.turnos.style.color = "black";
          }
          self.cambia_cuadricula(evt.target, self.jugador_actual);

          if(self.alguien_gano()){
            self.juego = false;
            self.msg_fin_txt.innerText = "Ganó el " + self.jugador_actual;
            self.msg_fin.style.display = "block";
          }else if(self.tablero_lleno()){
            self.juego = false;
            self.msg_fin_txt.innerText = "¡Empate!";
            self.msg_fin.style.display = "block";
          }

          self.jugador_actual = self.jugador_actual === "jugador 1" ? "jugador 2" : "jugador 1";
        } 
      }
    });
  }

  // Método para internamente tener el tablero vacío.
  inicializa_cuadricula(){
    this.cuadricula_lista = {"arriba_izq": ["", false],
                               "arriba_cent": ["", false],
                               "arriba_der": ["", false],
                               "cent_izq": ["", false],
                               "cent_cent": ["", false],
                               "cent_der": ["", false],
                               "abajo_izq": ["", false],
                               "abajo_cent": ["", false],
                               "abajo_der": ["", false]};
  }

  //Para cambiar el estado de la cuadrícula según cual jugador fue el último en jugar.
  cambia_cuadricula(target, jugador){
    if(jugador === "jugador 1")
      this.cuadricula_lista[target.id] = ["X", true];
    else
      this.cuadricula_lista[target.id] = ["O", true];
  }

  // Método para determinar si en un estado de la cuadrícula, un jugador ya ha ganado.
  alguien_gano(){
    if(this.condicion_victoria(this.cuadricula_lista["arriba_izq"], this.cuadricula_lista["arriba_cent"], this.cuadricula_lista["arriba_der"])
      || this.condicion_victoria(this.cuadricula_lista["cent_izq"], this.cuadricula_lista["cent_cent"], this.cuadricula_lista["cent_der"])
      || this.condicion_victoria(this.cuadricula_lista["abajo_izq"], this.cuadricula_lista["abajo_cent"], this.cuadricula_lista["abajo_der"])
      || this.condicion_victoria(this.cuadricula_lista["arriba_izq"], this.cuadricula_lista["cent_izq"], this.cuadricula_lista["abajo_izq"])
      || this.condicion_victoria(this.cuadricula_lista["arriba_cent"], this.cuadricula_lista["cent_cent"], this.cuadricula_lista["abajo_cent"])
      || this.condicion_victoria(this.cuadricula_lista["arriba_der"], this.cuadricula_lista["cent_der"], this.cuadricula_lista["abajo_der"])
      || this.condicion_victoria(this.cuadricula_lista["arriba_izq"], this.cuadricula_lista["cent_cent"], this.cuadricula_lista["abajo_der"])
      || this.condicion_victoria(this.cuadricula_lista["arriba_der"], this.cuadricula_lista["cent_cent"], this.cuadricula_lista["abajo_izq"]))
      return true;

    return false;
  }

  // Método para determinar si el tablero está lleno (y nadie ha ganado).
  tablero_lleno(){
    if(this.cuadricula_lista["arriba_izq"][1]
      && this.cuadricula_lista["arriba_cent"][1]
      && this.cuadricula_lista["arriba_der"][1]
      && this.cuadricula_lista["cent_izq"][1]
      && this.cuadricula_lista["cent_cent"][1]
      && this.cuadricula_lista["cent_der"][1]
      && this.cuadricula_lista["abajo_izq"][1]
      && this.cuadricula_lista["abajo_cent"][1]
      && this.cuadricula_lista["abajo_der"][1])
      return true;

    return false;
  }

  // Método para resetear el juego y volver a empezar.
  resetear(){
    this.juego = true;
    this.msg_fin.style.display = "none";
    this.inicializa_cuadricula();
    let hijos = this.cuadricula.querySelectorAll(".cuad");
    for (var i=0; i<hijos.length; i++) {
        hijos[i].removeAttribute("clicked");
        hijos[i].style.backgroundImage = "";
    }
  }

  // Método que dice si ya se ha cumplido la condición para ganar dada una combinación.
  condicion_victoria(s1, s2, s3){
    if(s1[0] === s2[0] && s1[0] === s3[0] && s1[1] === s2[1] && s1[1] === s3[1] && s1[1] === true)
      return true;

    return false
  }

}