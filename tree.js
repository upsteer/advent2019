class Node{
	constructor(value){
		this.value = value;
		this.left = null;
		this.right = null;
	}
	add_new_child(member){
		if(this.value > member){
			// Go to left
			if(this.left){
				this.left.add_new_child(member);
			} else {
				this.left = new Node(member);
			}
		} else {
			// Go to right
			if(this.right){
				this.right.add_new_child(member);
			} else {
				this.right = new Node(member);
			}
		}
	}
}