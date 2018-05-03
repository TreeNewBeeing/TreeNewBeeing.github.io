export function BFS(node, graph, callback) {
    const arr = [];
    const queue = [node];
    while(queue.length > 0) {
        // pop one from queue
        const element = queue.shift();
        console.log(element)
        // set to visited
        element.visited = true;
        // push to array
        arr.push(element)
        // execute callback
        if(callback) {
            callback(element, graph);
        }
        // push unvisited adjacent links into queue
        element.links.forEach(e => {
            e = graph[e];
            if(!e.visited) {
                queue.push(e);
            }
        });
    }
    arr.forEach(e => {
        e.visited = false;
    })
    return arr;

}