export function BFS(node, graph, callback) {
    const arr = [];
    const queue = [node];
    while(queue.length > 0) {
        // pop one from queue
        const element = queue.shift();
        // set to visited
        element.visited = true;
        // console.log('node', element)
        // push to array
        arr.push(element)
        // execute callback
        if(callback) {
            callback(element, graph);
        }
        // push unvisited adjacent links into queue
        element.links.forEach(e => {
            e = graph[e];
            // console.log('childs', e, e.visited);
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

/**
 * divide node into seperate communities
 * @param {*} nodes
 * @param {*} graph
 */
export function classify(nodes, graph) {
    let group = 0;
    const groups = {};
    for(let i = 0; i < nodes.length; i += 1) {
        if(nodes[i].group === undefined) {
            // create group
            groups[group] = [];

            // find all connected nodes
            BFS(graph[nodes[i].name], graph, (e) => {
                groups[group].push(e.i)
                nodes[e.i].group = group;
            });

            // no more elements in this group
            group++;
        }
    }
    return groups;
}

/**
 * weighted BFS algorithm from node
 * @param {*} node
 * @param {*} graph weighted graph with positive weights
 * @param {*} callback
 * @returns an object with each has prev set and its minimum distance from node
 */
export function weightedBFS(node, graph, callback) {
    // console.log(node.i);
    const map = {};
    map[node.i] = {};
    map[node.i].dist = 0;
    map[node.i].prev = [];
    BFS(node, graph, (e, g) => {
        for(let i = 0; i < e.links.length; i += 1) {
            const child = g[e.links[i]];
            // console.log(map);
            const weight = e.weights[i];
            const curShortestDistance = map[e.i].dist + weight;

            // if haven't visited before, create object
            if(map[child.i] === undefined) {
                map[child.i] = {};
                map[child.i].dist = curShortestDistance;
                map[child.i].prev = [];
                map[child.i].prev.push(e.i);
            } else
            // if cureent distance is shorter than any other previous, update dist and prev
            if(curShortestDistance < map[child.i].dist) {
                map[child.i].dist = curShortestDistance;
                map[child.i].prev = [];
                map[child.i].prev.push(e.i);
            } else
            // if current shortest distance is equal to previous shortest path, update prev
            if(curShortestDistance === map[child.i].dist) {
                // if(map[child.i].prev.find(a => a === e.i) === undefined){
                    map[child.i].prev.push(e.i);
                // }
            }
        }
    });

    return map;
}

export function Centrality(nodes, graph, betweenness, closeness) {
    let max = 0;
    for(let i = 0; i < nodes.length; i += 1) {
        const start = i;
        const obj = weightedBFS(graph[nodes[i].name], graph);
        const objEntry = Object.keys(obj);


        // calculate betweenness
        if(betweenness) {
            // accumulate
            for(let j = 0; j < objEntry.length; j += 1) {
                const end = parseInt(objEntry[j], 10);
                // console.log('start: ', start, ' end: ', end, start === end);
                // start and end are same node
                if(end === start) {
                    continue;
                }

                // traverse to accumulate
                const numOfShortestPaths = obj[end].prev.length;
                let prev = obj[end].prev;


                while(prev.length !== 0) {
                    const newPrev = [];
                    for(let k = 0; k < prev.length; k += 1) {
                        // calculate betweenness
                        if(nodes[prev[k]].betweenness === undefined) {
                            nodes[prev[k]].betweenness = 0;
                        }
                        // start do not count
                        if(prev[k] === start){
                            continue;
                        }
                        nodes[prev[k]].betweenness += 1 / numOfShortestPaths;
                        max = nodes[prev[k]].betweenness > max ? nodes[prev[k]].betweenness : max;
                        // console.log(prev, k, obj);
                        // form new prev
                        if(k === 0 || prev[k] !== prev[k-1]) {
                            for(let l = 0; l < obj[prev[k]].prev.length; l += 1) {
                                if(obj[prev[k]].prev[l] !== start) {
                                    newPrev.push(obj[prev[k]].prev[l]);
                                }
                            }
                        }
                    }
                    prev = newPrev;
                }

                    // const cur = obj[end].prev[k];
                    // if(nodes[cur].betweenness === undefined) {
                    //     nodes[cur].betweenness = 0;
                    // } else {
                    //     nodes[cur].betweenness += 1;
                    //     max = nodes[cur].betweenness > max ? nodes[cur].betweenness : max;
                    // }
            }
        }


        // calculate closeness
        if(closeness) {
            // closeness represents the sum of distance of shortest path to each node
            nodes[start].closeness = 0;
            for(let j = 0; j < objEntry.length; j += 1) {
                const end = parseInt(objEntry[j], 10);
                nodes[start].closeness += obj[end].dist;
            }
            nodes[start].closeness = nodes.length / nodes[start].closeness;

        }
    }
}