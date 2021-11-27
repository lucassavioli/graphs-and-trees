
class Tree {
    
    constructor(value) {
      this.value = value;
      this.children = []
      
      if (this.value == null) {
        console.log("The tree doesn't have a value on root node!");
      }
    }
        
    insertChild(value) {
      const newTree = new Tree(value);
      this.children.push(newTree);
      return newTree;
    }
    
    removeChild() {
      // Todo
    }
    
    traverse() {
      // todo
    }
    
}

// huffman start

// classe que define a estrutura do nó que compõe a árvore de huffmann
class HuffmanNode
{
	constructor()
	{
		this.data = 0;
		this.c = '';
		this.left = this.right = null;
	}
}

// função recursiva para printar os códigos de huffmann atravessando a árvore
// root: raiz
// s: codigo de huffman
function printCode(root, s) {

    // caso base

    // se left e right são iguais a null será uma folha, 
    // entao printamos o codigo s gerado atravessando a árvore
    if (root.left == null && root.right == null
        && (root.c).toLowerCase() != (root.c).toUpperCase()) {

        // c: caracter
        // s: código de huffmann
        let table = document.getElementById("tableHuffmanCodes");
        table.innerHTML += '<tr id="huffmanRows"><td>'+root.c+'</td><td>'+s+'</td></tr>'
        //document.write(root.c + ":" + s+"<br>");
        return;
    }

    // se formos para a esquerda, adicionamos o "0" ao código.
    // se formos para a esquerda, adicionamos o "1" ao código.

    // chamada recursiva para esquerda e
    // sub-arvore direita da árvore gerada
    printCode(root.left, s + "0");
    printCode(root.right, s + "1");
}

function huffmanTree() {

    // recebe os valores dos campos de entrada
    inputChar = document.getElementById("inputCharList").value;
    inputfreq = document.getElementById("inputFreqList").value;
    
    

    // remove os espaços em branco e as vírgulas da string de caracteres
    let charArray = inputChar.split(" ").join("").split(',');
    
    // remove os espaços em branco e as vírgulas da string de números e transforma para inteiros
    let charfreq = inputfreq.split(" ").join("").split(',').map(function(item) {
        return parseInt(item, 10);
    });

    let n = charArray.length;

    // Criando a prioridade da fila (q)
    // cria uma fila mínima de prioridades
    let q = [];

    for (let i = 0; i < n; i++) {

        // criando um objeto no de Huffman e adicionando ele a fila (q)
        let hn = new HuffmanNode();

        // coloca os dados no nó
        hn.c = charArray[i];
        hn.data = charfreq[i];

        // aponta para null
        hn.left = null;
        hn.right = null;

        // coloca o no de huffmann na fila (q)    
        q.push(hn);

    }

    // cria o no raiz e ordena a fila
    let root = null;
    q.sort(function(a,b){
        return a.data-b.data;
    });

    // Extraimos os dois valores minimos da heap cada vez ate que seu tamanho se reduza a 1
    // extraindo ate que todos os nos sejam extraidos
    while (q.length > 1) {

        // extracao do primeiro minimo
        let x = q[0];
        q.shift();

        // extracao do segundo minimo
        let y = q[0];
        q.shift();

        // cria nó f que é igual a soma da frequencia de dois nós
        // atribuindo valores a nó f    
        let f = new HuffmanNode();
        f.data = x.data + y.data;
        f.c = '-';

        // primeiro nó extraído como filho a esquerda
        f.left = x;

        // segundo nó extraído como filho a direita
        f.right = y;

        // definindo f como o nó na raiz
        root = f;

        // adiciona o nó a fila de prioridades
        q.push(f);
        
        // ordena a fila
        q.sort(function(a,b){
            return a.data-b.data;
        });
    }

    // printa os códigos atravessando a árvore
    printCode(root, "");
        
    
        
        
}
// end huffmann tree
      


function displayModal(title, text) {
    
    let modal =  `
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
                </div>
                <div class="modal-body">${text}</div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                </div>
            </div>
        </div>
    </div>`;
        
    $('body').append(modal);
    $('#exampleModal').modal('show');
    $('#exampleModal').on('hidden.bs.modal', function(event) {
        $('#exampleModal').remove();
    });   
}

function displayAlert(type, text) {

    var alert = `<div class="alert alert-${type}" id="alertNotifications" role="alert">${text}</div>`;
    $('body').append(alert);
    $('.alert').fadeTo(3000, 500).slideUp(500);
    $('.alert').alert('dispose');
}


function visitElement(animX) {
    
     d3.select("rect")
       .transition().duration(animDuration).delay(animDuration*animX)
       .style("fill","blue").style("stroke","blue");
}

function getCircularReplacer(deletePorperties) { //func that allows a circular json to be stringified
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if(deletePorperties){
          delete value.id; //delete all properties you don't want in your json (not very convenient but a good temporary solution)
          delete value.x0;
          delete value.y0;
          delete value.y;
          delete value.x;
          delete value.depth;
        }
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
};

function saveTree() {
    
    var treeName = document.getElementById("inputTreeName").value;
    
    if (treeName) {
        
        examplesNames.push(treeName);
        savedTree = root;
        var attrRemoved = JSON.stringify(root, getCircularReplacer(true));
        var savedTree = JSON.parse(attrRemoved);    
        examples.push(savedTree);
        
        let option = document.createElement("option");
        option.value = examplesNames.length - 1;
        let textOption = document.createTextNode(treeName);
        option.appendChild(textOption);
        document.getElementById("select-example").appendChild(option);
        console.log('[+] Exemplo de arvore salvo! ' + treeName);    

        displayAlert("primary", "Árvore \"" + treeName +  "\" salva com sucesso!");
    } else {
        console.log("[!] Insira um nome para a árvore antes de salvar!");
        displayModal("Erro ao salvar árvore!", "Insira um nome para a árvore antes de salvar!");
    }
    
}

function loadExamples() {

    examplesNames.forEach(function (name, value) {
  
        let option = document.createElement("option");
        option.value = value;
        let textOption = document.createTextNode(name);
        option.appendChild(textOption);
        document.getElementById("select-example").appendChild(option);

    });
}

// realiza a travessia em profundidade
function percursoDFT() {
    
    if (root) {
        
        console.log("[+] Percurso Depth-first iniciado!");
        var stack = [];
        var animX = 0;
        stack.push(root);
        
        while(stack.length != 0) {
            var element = stack.pop();
            visitElement(animX);
            animX = animX + 1;
            let displayDFT = document.getElementById("displayDFT");
            displayDFT.innerHTML += element.value + ', ';

            if(element.children != undefined) {

                for(var i=0; i<element.children.length; i++){

                    stack.push(element.children[element.children.length-i-1]);
                    
                }
            }
        }
    } else {
        displayModal("Árvore vazia!", "Não existem nós na árvore para fazer uma travessia. Para fazer a travessia, primeiro é necessário criar um diagrama de árvore.");
    }

}

// realiza a travessia em largura
function percursoBFT(){

    if (root) {
        
        console.log("[+] Percurso Breadth-first iniciado!");
        var queue=[];
        var animX=0;
        queue.push(root);
        
        while(queue.length != 0) {

            var element = queue.shift();
            visitElement(element,animX);
            animX= animX+1;
            let displayBFT = document.getElementById("displayBFT");
            displayBFT.innerHTML += element.value + ', ';

            if(element.children != undefined) {

                for(var i=0; i<element.children.length; i++){

                    queue.push(element.children[i]);

                }

            }

        }
    } else {
        displayModal("Árvore vazia!", "Não existem nós na árvore para fazer uma travessia. Para fazer a travessia, primeiro é necessário criar um diagrama de árvore.");
    }

}

// adicionar nó raiz
function addRoot() {
    
    var inputRoot = document.getElementById("inputRoot").value;
    if(inputRoot) {
        root = new Tree(inputRoot);
        root.x0 = 0;
        root.y0 = height / 2;        
        update(root);    
        document.getElementById('nodeAlert').hidden = true;
        document.getElementById('inputValue').disabled = false;
        document.getElementById('inputTreeName').disabled = false;
        console.log("[+] Nó raiz adicionado:" + inputRoot);
        displayAlert("success", "Nó raiz adicionado: " + inputRoot);        
    } else {

        console.log("[!] Insira um valor para o nó raiz!");
        displayModal("Campo vazio!", "Insira um valor no campo de entrada para adicionar um nó raiz.");

    }

}

// adicionar nó
function addValue() {
    
    if(selected) {

        var inputVal = document.getElementById("inputValue").value;
        var newNodeObj = new Tree(inputVal);
        var newNode = tree.nodes(newNodeObj);
        newNode.depth = selected.depth + 1;
        newNode.parent = selected;

        if(!selected.children) {
            selected.children = [];
        }
        
        selected.children.push(newNode[0]);         
        update(selected);        
        console.log("[+] Nó filho adicionado: " + inputVal);
        displayAlert("success", "Nó filho adicionado: " + inputVal);

    } else {
        console.log("[!] É preciso adicionar selecionar um nó!");
        displayModal('Erro ao adicionar nó!', 'Se um nó raiz já foi adicionado, então selecione um nó qualquer com um click para adicionar um nó filho. Caso contrário adicione um nó raiz.');
    }
}

function removeValue() {
    
    let updateChildren = [];

    if (selected) {

        if (selected.parent) {
            selected.parent.children.forEach(target => {
    
                if (target.id != selected.id) {
    
                    updateChildren.push(target);    
    
                }
    
                selected.parent.children = updateChildren;
            });
            update(selected);
            console.log("[-] Nó removido: " + selected.value);
        }

    } else {
        console.log("[!] Nenhum nó foi selecionado! Selecione um nó para ser removido.");
        displayModal("Erro ao remover o nó!", "Nenhum nó foi selecionado! Selecione um nó para ser removido.");
    } 
}

function selectExample() {
    document.getElementById('nodeAlert').hidden = true;
    document.getElementById('inputValue').disabled = false;
    document.getElementById('inputRoot').disabled = true;
    document.getElementById('inputTreeName').disabled = false;
    let selected = document.getElementById("select-example");
    console.log("[+] Exemplo selecionado: " + examplesNames[selected.value]);    
    root = examples[selected.value];
    root.x0 = 0;
    root.y0 = height / 2;
    update(root);
    //displayAlert("success", "Árvore inicializada: " + examplesNames[selected.value]);
}

function onlyUnique(value, index, self) {

    return self.indexOf(value) === index;

}

// retorna a quantidade de nos da arvore
function getDistinctNodeValues() {

    var stack = [];
    var node_values = [];
    stack.push(root);
    
    while(stack.length != 0) {
        
        var element = stack.pop();
        
        if(element.children != undefined) {

            node_values.push(element.value);

            for(var i=0; i < element.children.length; i++){
                
                stack.push(element.children[element.children.length-i-1]);
                
            }

        } else {

            node_values.push(element.value);

        }
        
    }

    unique_values = node_values.filter(onlyUnique);
    return unique_values;
}

function getTreeNodesInformationBFT() {

    var queue = [];
    var count_nodes = 1;
    var count_leaves = 0;
    var tree_height = 0;
    queue.push(root);
    
    while(queue.length != 0) {
        
        var element = queue.shift();
        //console.log(element);
        if(element.children != undefined) {

            for(var i=0; i < element.children.length; i++){
                
                if(element.children[i].depth > tree_height) {

                    tree_height = element.children[i].depth;

                }

                queue.push(element.children[i]);
                count_nodes++;
                
            }            

        } else {

            count_leaves++

        }
        
    }

    tree_info = {
        count_leaves: count_leaves,
        tree_height: tree_height,
        count_nodes: count_nodes
    };

    var displayTreeInfo = document.getElementById("treePropInfo");
   
    displayTreeInfo.innerHTML = '<tr><td>Número de Folhas: </td><td>'+tree_info.count_leaves+'</td></tr>';
    displayTreeInfo.innerHTML += '<tr><td>Altura da Árvore: </td><td>'+tree_info.tree_height+'</td></tr>';
    displayTreeInfo.innerHTML += '<tr><td>Total de Nós: </td><td>'+tree_info.count_nodes+'</td></tr>';
    return tree_info;
}

// retorna a quantidade de nos da arvore
function getTreeNodesInformation() {

    var stack = [];
    var count_nodes = 1;
    var count_leaves = 0;
    var tree_height = 0;
    stack.push(root);
    
    while(stack.length != 0) {
        
        var element = stack.pop();
        
        if(element.children != undefined) {

            for(var i=0; i < element.children.length; i++){

                stack.push(element.children[element.children.length-i-1]);
                count_nodes++;
                
            }

            tree_height++;

        } else {

            count_leaves++

        }
        
    }

    tree_info = {
        count_leaves: count_leaves,
        tree_height: tree_height,
        count_nodes: count_nodes
    };

    var displayTreeInfo = document.getElementById("treePropInfo");
   
    displayTreeInfo.innerHTML = '<tr><td>Número de Folhas: </td><td>'+tree_info.count_leaves+'</td></tr>';
    displayTreeInfo.innerHTML += '<tr><td>Altura da Árvore: </td><td>'+tree_info.tree_height+'</td></tr>';
    displayTreeInfo.innerHTML += '<tr><td>Total de Nós: </td><td>'+tree_info.count_nodes+'</td></tr>';
    return tree_info;
}

function getNodeInformation(node) {
    
    var isLeave;
    var descendants;

    if(node.children != undefined) {

        descendants = node.children.length;
        isLeave = 'Não';

    } else {

        isLeave = 'Sim';
        descendants = 0;

    }

    node_info = {
        descendantsNumber: descendants,
        isLeave: isLeave,
        value: node.value,
        depth: node.depth
    };
    
    var displayNodeInfo = document.getElementById("treePropInfo2");
    
    displayNodeInfo.innerHTML = '<tr><td>Nó selecionado: </td><td>'+node_info.value+'</td></tr>';
    displayNodeInfo.innerHTML += '<tr><td>É folha: </td><td>'+node_info.isLeave+'</td></tr>';
    displayNodeInfo.innerHTML += '<tr><td>Núm. Descendentes: </td><td>'+node_info.descendantsNumber+'</td></tr>';
    displayNodeInfo.innerHTML += '<tr><td>Altura do nó: </td><td>'+node_info.depth+'</td></tr>';
    
    return node_info;
}

function resetTree() {
    window.location.href = window.location.href;
    console.log("[-] Reset");
}

/*
function treeToAdjacencyList() {
    
    var queue=[];    
    queue.push(root);
    
    while(queue.length != 0) {

        var element = queue.shift();                

        if(element.children != undefined) {

            for(var i=0; i<element.children.length; i++){

                queue.push(element.children[i]);

            }

        }

    }

    return queue;
}


// matriz de adjacências diretamente do diagrama da árvore
function createAdjacencyMatrixAuto() {

    // retorna o conteudo dos nós sem duplicidade
    unique_chars = getDistinctNodeValues();

    // tamanho do array valores
    dim = node_values.length
    
    // usa a o tamanho do array para criar uma matriz de zeros de tam. (dim x dim)
    let m = Array(dim).fill().map(() => Array(dim).fill(0));

    // percorre os nós da árvore e montade adjacências automaticamente.

    for(var parent in adjList) {
        
        for(var i=0; i < adjList[parent].length; i++) {
            
            if(adjList[parent].length > 0) {

                // pega o símbolo da lista de adj. e retorna o indice na lista de caracteres únicos
                // para as linha e coluna
                row = unique_chars.indexOf(parent);
                col = unique_chars.indexOf(adjList[parent][i]);                    
                m[row][col] += 1;

            }
            
        }
            
    }

    var table = '<table class="matrix">';

    for(x in m) {

        table += '<tr>';
        
        for (y in m[x]) {

            table += '<td>' + m[x][y] + '</td>';

        }

        table += '</tr>';
    }

    table += '</table>';

    var displayMatrixAdj = document.getElementById("displayMatrixAdj");
    displayMatrixAdj.innerHTML += table;
} */

function createAdjacencyMatrixFromInput() {

    // receber um input no formato de objeto/hashmap
    
    var inputAdjList = document.getElementById("inputAdjList").value;
    
    if (inputAdjList.length > 0) {
        
        //var adjList = {"+": ["+", "-"], "-": []};
        var adjList = JSON.parse(inputAdjList);
        
        unique_chars = [];
        
        // forma uma lista de caracteres únicos a partir da lista de adjacências
        for(var key in adjList) {

            unique_chars.push(key);	

        }

        // conta quantos símbolos diferentes existem
        var dim = Object.keys(adjList).length;
        
        // cria a matriz quadrada de zeros com dimensão
        var m = Array(dim).fill().map(() => Array(dim).fill(0));

        // dado o simbolo atual, verificar o indice correspondente na lista de diferentes símbolos
        // Usamos esse índice para encontrar a posição correspondente do símbolo na matriz de zeros(M)

        for(var parent in adjList) {
            
            for(var i=0; i < adjList[parent].length; i++) {
                
                if(adjList[parent].length > 0) {

                    // pega o símbolo da lista de adj. e retorna o indice na lista de caracteres únicos
                    // para as linha e coluna
                    row = unique_chars.indexOf(parent);
                    col = unique_chars.indexOf(adjList[parent][i]);                    
                    m[row][col] += 1;

                }
                
            }
                
        }

        var table = '<table class="matrix">';

        for(x in m) {

            table += '<tr>';
            
            for (y in m[x]) {

                table += '<td>' + m[x][y] + '</td>';

            }

            table += '</tr>';
        }

        table += '</table>';

        var displayMatrixAdj = document.getElementById("displayMatrixAdj");
        displayMatrixAdj.innerHTML += table;
    } else {
        displayModal('Campo vazio!', "Insira uma lista de adjacências no formato objeto em JavaScript. Ex1: {'+': ['+', '-'], '-': []}<br><br>onde,<br><br> {'pai1': ['filho1', 'filho2'], 'pai2': ['filho3', 'filho4']}.<br> Se não houverem filhos, é necessário colocar um array vazio como:<br><br> Ex2: {'pai5': []}");
    }
    
    
}

// travessia em preordem

function preOrder(node) {

    // exibe o valor do nó
    let displayTraverseTypes = document.getElementById("displayPreorder");
    displayTraverseTypes.innerHTML += node.value + ', ';
    console.log(node.value);

    // se existem filhos...
    if (node.children) {
        
        // por recursão, vá para subarvore esquerda    
        preOrder(node.children[0]);
    
        // e então vá para subarvore direita
        preOrder(node.children[1]);
        
    }
    
}

// travessia em posordem

function postOrder(node) {

    
    // se existem filhos...
    if (node.children) {
        
        // primeiro, por recursão, vá para subarvore esquerda    
        postOrder(node.children[0]);
        
        // por recursão, vá para subarvore direita
        postOrder(node.children[1]);
        
    }
    
    // exibe o valor do nó
    let displayTraverseTypes = document.getElementById("displayPostorder");
    displayTraverseTypes.innerHTML += node.value + ', ';
    console.log(node.value);

}

// travessia em inordem

function inOrder(node) {

    // se existem filhos...
    if (node.children) {

        // primeiro, por recursão, vá para subarvore esquerda    
        inOrder(node.children[0]);

    }    
        // exibe o valor do nó
        let displayTraverseTypes = document.getElementById("displayInorder");
        displayTraverseTypes.innerHTML += node.value + ', ';
        console.log(node.value);

    if (node.children) {

        // por recursão, vá para subarvore direita
        inOrder(node.children[1]);

    }

}

// exibe a travessia em preordem
function traversePreOrder() {

    if (root) {
        
        preOrder(root);    
        
    } else {

        displayModal("Árvore vazia!", "Não existem nós na árvore para fazer uma travessia. Para fazer a travessia, primeiro é necessário criar um diagrama de árvore.");

    }

}

// exibe a travessia em posordem
function traversePostOrder() {

    if (root) {
        
        postOrder(root);

    } else {

        displayModal("Árvore vazia!", "Não existem nós na árvore para fazer uma travessia. Para fazer a travessia, primeiro é necessário criar um diagrama de árvore.");

    }
    

}

// exibe a travessia em inordem
function traverseInorder() {

    if (root) {
        
        inOrder(root);

    } else {

        displayModal("Árvore vazia!", "Não existem nós na árvore para fazer uma travessia. Para fazer a travessia, primeiro é necessário criar um diagrama de árvore.");

    }
    
    
}

function clearTraverseDisplay() {
    document.getElementById('displayPreorder').innerHTML = "";
    document.getElementById('displayPostorder').innerHTML = "";
    document.getElementById('displayInorder').innerHTML = "";
}

function clearHuffmanTable() {    
    document.getElementById('tableHuffmanCodes').innerHTML = "";
    document.getElementById('tableHuffmanCodes').innerHTML = "<table id='tableHuffmanCodes' class='codesTable'><thead><td>Caractere</td><td>Código</td></thead></table>";
}

function clearTraversal() {
    document.getElementById('displayDFT').innerHTML = "";
    document.getElementById('displayBFT').innerHTML = "";
}
 
function clearAdjacencyMatrix() {
    document.getElementById('displayMatrixAdj').innerHTML = "";
    document.getElementById('displayMatrixAdj').innerHTML = '<div id="displayMatrixAdj" align=center></div>';
}

// funcao para atualizar a arvore
function update(source) {
    
    // coloca os dados de entrada na forma de nos
    var nodes = tree.nodes(root).reverse(),
        links = tree.links(nodes);

    // normaliza para um profundidade fixa
    nodes.forEach(function (d) {
        d.y = d.depth * 180;
    });

    // Seleciona todos svg's com o atributo g.node e retorna o id
    var node = svg.selectAll("g.node")
        .data(nodes, function (d) {
        return d.id || (d.id = ++i);
    });
    
    
    // Enter any new nodes at the parent's previous position.
    // add class node to element g and it's coordinates
    var nodeEnter = node.enter().append("g")
    .attr("class", "node")
    .attr("transform", function (d) {
        return "translate(" + source.x0 + "," + source.y0 + ")";
    }).on("click", click);

    nodeEnter.append("rect")
        .attr("width", rectW)
        .attr("height", rectH)
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .on("click", function () {
            d3.select(this).style("fill", "red");
        });
                
    //d3.select(this).select("rect").style("fill", "blue").on("click", click);
    
    nodeEnter.append("text")
        .attr("x", rectW / 2)
        .attr("y", rectH / 2)
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text(function (d) {
        return d.value;
    });

    // faz a transicao dos nos par sua nova posicao
    var nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
    });

    nodeUpdate.select("rect")
        .attr("width", rectW)
        .attr("height", rectH)
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .style("fill", function (d) {
        return d._children ? "lightsteelblue" : "#fff";
    });

    nodeUpdate.select("text")
        .style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function (d) {
        return "translate(" + source.x + "," + source.y + ")";
    })
        .remove();
    
    nodeExit.select("rect")
        .attr("width", rectW)
        .attr("height", rectH)
        .attr("stroke", "black")
        .attr("stroke-width", 1);

    nodeExit.select("text");

    // atualiza os links
    var link = svg.selectAll("path.link")
        .data(links, function (d) {
        return d.target.id;
    });

    // entra qualquer novo link na antiga posicao do no pai
    link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("x", rectW / 2)
        .attr("y", rectH / 2)
        .attr("d", function (d) {
        var o = {
            x: source.x0,
            y: source.y0
        };
        return diagonal({
            source: o,
            target: o
        });
    });

    // transicao dos links para uma nova posicao
    link.transition()
        .duration(duration)
        .attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition()
        .duration(duration)
        .attr("d", function (d) {
        var o = {
            x: source.x,
            y: source.y
        };
        return diagonal({
            source: o,
            target: o
        });
    })
        .remove();

    // Stash the old positions for transition.
    nodes.forEach(function (d) {
        d.x0 = d.x;
        d.y0 = d.y;
    });

    // exibe informações sobre a árvore
    getTreeNodesInformationBFT();
    

}

// retorna o no selecionado
function click(d) {
    selected = d;
    document.getElementById('btn-add').disabled = false;
    document.getElementById('btn-del').disabled = false;    
    getNodeInformation(d); // exibe informações do nó selecionado
    console.log("Nó selecionado:" + d.value);
    update(d); 
}


// re-renderiza quando o zoom mudar
function redraw() {
  
  svg.attr("transform",
      "translate(" + d3.event.translate + ")"
      + " scale(" + d3.event.scale + ")");
}



var margin = {
    top: 20,
    right: 120,
    bottom: 20,
    left: 120
},
width = 960 - margin.right - margin.left,
height = 800 - margin.top - margin.bottom;


var animDuration = 500;

// armazena a estrutura de uma arvore para ser carregada depois
var savedTrees = [];

// guarda o nome dos exemplos
var examplesNames = ['Árvore Binária Completa', 'Expressão Aritmética', 'Árvore de Huffmann'];

// guarda o no selecionado
var selected = null;

// raiz da arvore
var root = null;

loadExamples();
var i = 0,
    duration = 750,
    rectW = 60,
    rectH = 30;

// cria o layout da arvore e define o tamanho dos nos
// get an svg file
var tree = d3.layout.tree().nodeSize([70, 40]);
var diagonal = d3.svg.diagonal()
    .projection(function (d) {
    return [d.x + rectW / 2, d.y + rectH / 2];
});

// creates a zoom with a scale range
// set #body id in which the tree will be displayed
var zm = d3.behavior.zoom().scaleExtent([-6,6]);
var svg = d3.select("#body").append("svg").attr("width", 1500).attr("height", 1000)
    .call(zm.on("zoom", redraw)).append("g")
    .attr("transform", "translate(" + 350 + "," + 20 + ")");

//necessary so that zoom knows where to zoom and unzoom from
zm.translate([350, 20]);

if(root) {

    //update(root);

} else {
    document.getElementById('nodeAlert').hidden = false;
    document.getElementById('inputValue').disabled = true;
    document.getElementById('inputTreeName').disabled = true;
    createAdjacencyMatrixFromInput();
}

d3.select("#body").style("height", "800px");