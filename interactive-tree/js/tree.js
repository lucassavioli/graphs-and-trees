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

// Creating an instancce of a Tree
const tree1 = new Tree(1);
tree1.insertChild(3);
const tree2 = tree1.insertChild(5);
tree2.insertChild(7)
//console.log(tree1);
var data = JSON.stringify(tree1);
console.log(data);
