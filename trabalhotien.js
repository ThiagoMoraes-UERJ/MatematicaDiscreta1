//FBF 
var strin = "(d & a) & (b | d')>a'"
// array com as prioridades de execução
var ListaPrioridades = ["'",'&','|','>'];

/* Função: Identificar e Substituir o parametro logico
   Entrada: Vetor de String a e posição a ser substituida
   Saída:  Vetor de String modificado
*/
function nomefunc(vetor,pos){
    var r = [];
    if(vetor[pos] == '&'){
       r = vetor[pos] = 'E';
    }
    if(vetor[pos] == "'"){
       r = vetor[pos] = 'N';
    }
    if(vetor[pos] == ">"){
       r = vetor[pos] = 'IMPLICA';
    }
    if(vetor[pos] == '|'){
       r = vetor[pos] = 'OU';
    }
    return r;
}

/* Função: Identificar e Substituir o () por [] 
   Entrada: Vetor de String 
   Saída:  Vetor de String modificado
*/
function precompila(vet2){
    for (var i = 0; i < vet2.length; i++) {
        if(vet2[i]=="("){
            vet2[i] = "[";
        }
        if(vet2[i]==")"){
            vet2[i] = "]";
        }
    }
    return vet2;
}

/* Função: Transformar String fbf em um vetor de strings tirando o espaços
   Entrada: String fbf 
   Saída:  Vetor de String 
*/ 
function vetorizar(carac){
    // transformr a estring vet em um vetor de arrays
    var vet = carac.split('');
    //tirar substituir os ' ' por ''
    var vet2 = [];
    var j = 0;
    for (var i = 0; i < vet.length; i++) {
        if(vet[i]!=" "){
            vet2[j] = vet[i];
            j++;
        }
    }
    return vet2;
}

/* Função: Retornar a posição do ultimo "("
   Entrada: Vetor de String
   Saída:  posição do ultimo "("
*/
function PegarAbreParent (vet){
   var pos = -1;
    for (var i = 0; i < vet.length; i++) {
        if(vet[i]=="["){
            pos = i;
        }
    }
    return pos;
}

/* Função: Retornar a posição do primeiro ")"
   Entrada: Vetor de String
   Saída:  posição do primeiro ")"
*/
function PegarFechaParent (vet){
    var pos = -1;
    for(var i = 0; i< vet.length; i++){
        if(vet[i]== ']'){
            pos = i;
        }
    }
    return pos;
}


/* Função: Retornar a posição do caracter de maior precedencia 
   Entrada: Vetor de String e o array de prioridades
   Saída:  posição do caracter de maior precedencia se existir
*/
function maiorProcedencia (vet,ListaP){
    var valorcarac = 100;
    var pos = -1;
    for(var i = 0; i< vet.length; i++){
        var caracter = vet[i];
        if(ListaP.indexOf(caracter) != -1){
            if(ListaP.indexOf(caracter) < valorcarac){
                valorcarac = ListaP.indexOf(caracter);
                pos = i; 
            }
        }
    }
    return pos;
}

/* Função: Retornar a posição do caracter a esquerda do de maior precedencia 
   Entrada: Vetor de String , array de prioridades e a posição do caracter de maior precedencia
   Saída:  posição do caracter a esquerda do de maior precedencia  se existir
*/
function  operadorEsquerda (posi,ListaP,vet){
    var vc = posi - 1;
    for (var i = vc; i >= 0; i--) {
        var caracter = vet[i];
        if(ListaP.indexOf(caracter) != -1){
            return i;
        }
    }
    return -1;
}

/* Função: Retornar a posição do caracter a direita do de maior precedencia 
   Entrada: Vetor de String , array de prioridades e a posição do caracter de maior precedencia
   Saída:  posição do caracter a direita do de maior precedencia  se existir
*/
function  operadorDireita (posi,ListaP,vet){
    var vc = posi + 1;
    for (var i = vc; i < vet.length; i++) {
        var caracter = vet[i];
        if(ListaP.indexOf(caracter) != -1){
            return i;
        }
    }
    return -1;
}

/* Função: Retornar uma interação com a fbf traduzindo e modificando 
   Entrada: Vetor de String e o array de prioridades 
   Saída:  vetor de String modificado
*/
function resolveF (vet,ListaP){
    
    // guarda a posição do operador de maior precedencia, do operador a esquerda dele e a direita 
    var posMaiorProcedencia = maiorProcedencia(vet,ListaP);
    var posOperadorEsquerda = operadorEsquerda(posMaiorProcedencia,ListaP,vet);
    var posOperadorDireita = operadorDireita(posMaiorProcedencia,ListaP,vet);
    
    
    //declarando
    var vetAntesEsquerda = [];
    var vetDepoisDireita = [];
    var vetEsquerda = [];
    var vetDireita = [];
    var miolo = [];
    var i = 0;
    var vet2 = [];
    var operadorEsq;
    var operadorDir;
    
    // se existir operador a esquerda do de maior precedencia
    if (posOperadorEsquerda != -1){
        var y = 0;
        // guarda tudo que vem antes do operador a esquerda no vetor vetAntesEsquerda[]
        for( i = 0; i < posOperadorEsquerda; i++){
            vetAntesEsquerda[y] = vet[i];
            y++;
        }
        var y = 0;
        // guarda tudo que está entre o operador a esquerda e o de maior precedencia no vetor vetEsquerda[]
        for( i = posOperadorEsquerda + 1; i < posMaiorProcedencia; i++){
            vetEsquerda[y] = vet[i];
            y++;
        }
    }else{
        // se não existir operador a esquerda do de maior precedencia
        // então vetor antes do operador a esquerda é '' 
        vetAntesEsquerda= [''];
        var y = 0;
        // guarda tudo que está entre 0 e o de maior precedencia no vetor vetEsquerda[]
        for( i = 0; i < posMaiorProcedencia; i++){
            vetEsquerda[y] = vet[i];
            y++;
        }
     }
    // se existir operador a Direita do de maior precedencia
    if(posOperadorDireita != -1){
        var y = 0;
         // guarda tudo que vem depois do operador a direita no vetor vetDepoisDireita[]
        for(i = posOperadorDireita + 1; i< vet.length; i++){
            vetDepoisDireita[y] = vet[i];
            y++;
            }
        var y = 0;
        // guarda tudo que está entre o operador de maior precedencia e o da direita no vetor vetDireita[]
        for( i = posMaiorProcedencia + 1; i < posOperadorDireita; i++){
            vetDireita[y] = vet[i];
            y++;
        }
    }else{
        // se não existir operador a direita do de maior precedencia
        // então vetor depois do operador a direita é '' 
        vetDepoisDireita = [''];
        var y = 0;
        // guarda tudo que está entre o operador de maior precedencia até o final, no vetor vetDireita[]
        for( i = posMaiorProcedencia + 1; i < vet.length; i++){
            vetDireita[y] = vet[i];
            y++;
        }
     }  // juntar o meio da função e separa-los com um '0' ('vetEsquerda 0 vetDireita')
        vet2 = ["0"];
        var parte1 = vetEsquerda.concat(vet2);
        miolo = parte1.concat(vetDireita);
        miolo = miolo.join('');
    
    // se não existir operador a esquerda o operadorEsq = ''
    if(vet[posOperadorEsquerda] == undefined){
       operadorEsq = '';
    }else{
       // se existir guardar o operador
       operadorEsq = vet[posOperadorEsquerda];
    }
    // se não existir operador a direita o operadorDir = ''
    if(vet[posOperadorDireita]== undefined){
       operadorDir = '';
    }else{
       // se existir guardar o operador
       operadorDir = vet[posOperadorDireita];
    }
    //juntar os vetores de string modificando os de maiores precedencia 
    vet = vetAntesEsquerda.concat(operadorEsq.concat(nomefunc(vet,posMaiorProcedencia).concat('('.concat(miolo.concat(')'.concat(operadorDir.concat(vetDepoisDireita)))))));
    vet = vet.join("");
    
    return vet;
}

/* Função: principal
   Entrada: String e o array de prioridades 
   Saída:  vetor de String modificado e traduzido
*/
function f(strinn,ListaP){
    var ve = vetorizar(strinn);
    var vetor = precompila(ve);
    var r;
    var parent = parenteses(vetor,ListaP);
    vetor = vetorizar(parent);
    while(maiorProcedencia(vetor,ListaP) != -1){
        r = resolveF(vetor,ListaP);
        vetor = vetorizar(r);
    }
    var ve = vetorizar(r);
    for (var i = 0; i < ve.length; i++) {
        if(ve[i]==","){
            ve[i] = "";
        }
    }
    ve = ve.join("");
    ve = vetorizar(ve);
    for (var i = 0; i < ve.length; i++) {
        if(ve[i]==","){
            ve[i] = "";
        }
    }
    window.alert(ve);
    for (var i = 0; i < ve.length; i++) {
        if(ve[i]=="0"){
            if(ve[i-3]=="N"){
              ve[i]='';
            }else{
            	ve[i] = ",";
            }
        }
    }
    ve = ve.join("");
    return ve;
}

// para testar chama um alert mostrando o resultado da função exemplo
window.alert(f(strin,ListaPrioridades));

// dar a maior precedencia oq estiver em parenteses para fazer as subfunções 
function parenteses(vetor,ListaP){
    var vet2 = [];
    while(PegarAbreParent(vetor) != -1){
        var posabrep = PegarAbreParent(vetor);
        var posfechp = PegarFechaParent(vetor);
        var miolo = [];
        var antesmiolo = [];
        var depoismiolo = [];
        var y = 0;
        for (var i = posabrep + 1 ; i < posfechp; i++) {
            miolo[y] = vetor[i];
            y++;
        }
        var y = 0;
        for (var i = 0; i < posabrep; i++) {
            antesmiolo[y] = vetor[i];
            y++;
        }
        var y = 0;
        for (var i = posfechp + 1 ; i < vetor.length; i++) {
            depoismiolo[y] = vetor[i];
            y++;
        }
        while(maiorProcedencia(miolo,ListaP) != -1){
            r = resolveF(miolo,ListaP);
            miolo = vetorizar(r);
            miolo = miolo.join('');
        }
        if(antesmiolo == undefined){
           antesmiolo = '';
        }
        if(depoismiolo == undefined){
           depoismiolo = '';
        }
        vetor = antesmiolo.concat("{".concat(miolo.concat('}'.concat(depoismiolo))));
        vetor = vetor.join("");
        vetor = vetorizar(vetor);
        //tirar substituir os ' ' por ''
        var j = 0;
        for (var i = 0; i < vetor.length; i++) {
            if(vetor[i]!=" "){
                vet2[j] = vetor[i];
                j++;
            }
        }}
        var j = 0;
        var vet3 = [];
        for (var i = 0; i < vet2.length; i++) {
            if(vet2[i]!=","){
                vet3[j] = vet2[i];
                j++;
            }
        }
    vet3 = vet3.join("");
    return vet3;
}