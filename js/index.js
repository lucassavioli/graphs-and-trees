
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


function visitElement(animX) {
    
     d3.select("rect")
       .transition().duration(animDuration).delay(animDuration*animX)
       .style("fill","blue").style("stroke","blue");
}

function percursoDFT() {
    
    console.log("[+] Percurso Depth-first iniciado!");
    var stack = [];
    var animX = 0;
    stack.push(root);

    while(stack.length != 0) {
        var element = stack.pop();
        visitElement(animX);
        animX=animX+1;
        console.log(element);

        if(element.children != undefined) {

            for(var i=0; i<element.children.length; i++){

                stack.push(element.children[element.children.length-i-1]);
                
            }
        }
    }
}


function addRoot() {
    
    var inputRoot = document.getElementById("inputRoot").value;
    if(inputRoot) {
        root = new Tree(inputRoot);
        root.x0 = 0;
        root.y0 = height / 2;        
        update(root);
        document.getElementById('nodeAlert').hidden = true;
        console.log("[+] Nó raiz adicionado:" + inputRoot);
    } else {
        console.log("[!] Insira um valor para o nó raiz!");
    }

}

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

    } else {
        console.log("[!] É preciso adicionar selecionar um nó!");
    }
}

function removeValue() {
    
    let updateChildren = [];

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
}

function selectExample() {
    document.getElementById('nodeAlert').hidden = true;
    let selected = document.getElementById("select-example");
    console.log("[+] Exemplo selecionado: " + selected.options[selected.value].text);    
    root = examples[selected.value];
    root.x0 = 0;
    root.y0 = height / 2;
    update(root);
}

function resetTree() {
    window.location.href = window.location.href;
    console.log("[-] Reset");
}
  
// funcao para atualizar a arvore
function update(source) {
    
    // Compute the new tree layout.
    var nodes = tree.nodes(root).reverse(),
        links = tree.links(nodes);
    
    // normaliza para um profundidade fixa
    nodes.forEach(function (d) {
        d.y = d.depth * 180;
    });

    // Atualiza os nos
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
    })
        .on("click", click);
    nodeEnter.append("rect")
        .attr("width", rectW)
        .attr("height", rectH)
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .style("fill", function (d) {
        return d._children ? "lightsteelblue" : "#fff";
    });
    
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
}

// retorna o no selecionado
function click(d) {
    selected = d;
    document.getElementById('btn-add').disabled = false;
    document.getElementById('btn-del').disabled = false;
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

// guarda o no selecionado
var selected = null;

// raiz da arvore
var root = null;

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
var zm = d3.behavior.zoom().scaleExtent([1,3]);
var svg = d3.select("#body").append("svg").attr("width", 1000).attr("height", 1000)
    .call(zm.on("zoom", redraw)).append("g")
    .attr("transform", "translate(" + 350 + "," + 20 + ")");

//necessary so that zoom knows where to zoom and unzoom from
zm.translate([350, 20]);

if(root) {

    //update(root);    

} else {
    document.getElementById('nodeAlert').hidden = false;
}

d3.select("#body").style("height", "800px");