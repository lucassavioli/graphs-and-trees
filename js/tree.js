export class Tree {
    
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
  
}
