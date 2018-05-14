export default class PriorityQueue {
    constructor(comparator){
        this.first = null;
        this.comparator = comparator;
    }

    clear() {
        this.first = null;
    }
    shift(){
        let e;
        if(this.first !== null) {
            e = this.first.element;
            this.first = this.first.next;
        } else {
            e = null;
        }
        return e;
    }

    push(e){
        const node = new Node(e);
        if(this.first === null) {
            this.first = node;
        } else {
            let prevNode = null;
            let curNode = this.first;
            while (curNode !== null && this.comparator(curNode, node)) {
                prevNode = curNode;
                curNode = curNode.next;
            }

            node.next = curNode;
            if(prevNode !== null) {
                prevNode.next = node;
            } else {
                this.first = node;
            }


        }
    }


}

class Node {
    constructor(e) {
        this.element = e;
        this.next = null;
    }
}