import PriorityQueue from "./PriorityQueue";

export function BFS(node, graph, callback) {
    const arr = [];
    // console.log('childs', node, node.visited);
    node.visited = true;
    const queue = [node];
    while(queue.length > 0) {
        // pop one from queue
        const element = queue.shift();
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
            if(!e.visited) {
                // set to visited
                e.visited = true;
                // console.log('childs', e, e.visited);
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
    const groups = [];
    for(let i = 0; i < nodes.length; i += 1) {
        if(nodes[i].group === undefined) {
            // create group
            const g = [];

            // find all connected nodes
            // console.log('group', group);
            BFS(graph[nodes[i].name], graph, (e) => {
                g.push(e.i)
                nodes[e.i].group = group;
            });

            // no more elements in this group
            groups.push(g);
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

export function Dijkstra(start, end, pq, graph, callback) {
    let queue;
    if(pq) {
        queue = pq;
    } else {
        queue = new PriorityQueue((a, b) => {
            return a.element > b.element;
        });
    }

    // [node, dist, prev]
    queue.push([start, 0, []]);
    while(queue.first.element[0].i !== end.i) {
        const shortestNode = queue.shift();
        const element = shortestNode[0];
        const dist = shortestNode[1];
        const prev = shortestNode[2];
        // execute callback
        if(callback) {
            callback(shortestNode, graph);
        }
        // push unvisited adjacent links into queue
        element.links.forEach((e, i) => {
            e = graph[e];
            // add weight
            const newDist = dist + element.weights[i];
            const newPrev = prev.concat(e.i);
            // push to queue
            queue.push([e, newDist, newPrev]);
        });
    }

    // generate array of shortest paths
    const arr = [];
    const shortestDist = queue.first.element[1];
    // console.log(shortestDist);
    while(queue.first && queue.first.element[1] === shortestDist){
        const shortestNode = queue.shift();
        const element = shortestNode[0];
        if(element.i === end.i) {
            arr.push(shortestNode);
        }
    }
    return arr;
}

/**
 * do dijkstra to get shortest paths from one source to all other nodes
 */
export function DijkstraAllFromOne(start, group, pq, graph, callback) {
    let queue;
    if(pq) {
        queue = pq;
    } else {
        queue = new PriorityQueue((a, b) => {
            return a.element > b.element;
        });
    }

    // [node, dist, prev]
    let count = 0;
    let min = 0;
    let obj = {};
    queue.push([start, 0, []]);
    // console.log(group, group.length - 1);
    // while it is a start of new dist and all have been reached before
    while(queue.first.element[1] <= min || count < group.length) {
        const shortestNode = queue.shift();
        const element = shortestNode[0];
        const dist = shortestNode[1];
        const prev = shortestNode[2];

        // update min
        min = dist;

        // add to the info obj
        if(obj[element.i] === undefined) {
            // never showed before
            // shortest path from start to element
            obj[element.i] = {
                dist: dist,
                prev: [prev],
            };
            count += 1;
        } else if(obj[element.i].dist === dist) {
            // showed before but both are shortest paths
            // add to prev
            obj[element.i].prev.push(prev);
        }

        // execute callback
        if(callback) {
            callback(shortestNode, graph);
        }
        // push unvisited adjacent links into queue
        element.links.forEach((e, i) => {
            e = graph[e];
            // add weight
            const newDist = dist + element.weights[i];
            const newPrev = prev.concat(e.i);
            // push to queue
            queue.push([e, newDist, newPrev]);
        });
    }

    return obj;
}

export function Centrality(groups, nodes, graph, betweenness, closeness) {
    // create the pq for use
    const pq = new PriorityQueue((cur, n) => {
        return n.element[1] > cur.element[1];
    });

    // reset centrality of the graph
    for(let i = 0; i < nodes.length; i += 1) {
        if(betweenness) {
            nodes[i].betweenness = 0;
        }
        if(closeness) {
            nodes[i].closeness = 0;
        }
    }

    // calculate centrality
    for(let i = 0; i < groups.length; i += 1) {
        const group = groups[i];
        for(let j = 0; j < group.length; j += 1) {
            // get a map of shortest paths from current node to all other nodes in the group
            const e1 = group[j];
            const info = DijkstraAllFromOne(graph[nodes[e1].name], group, pq, graph, null);
            pq.clear();

            // loop through all other nodes
            for(let k = j+1; k < group.length; k += 1) {
                const e2 = group[k];
                const element = info[e2];

                // betweenness
                if(betweenness) {
                    const numOfShortestPaths = element.prev.length

                    // for every shortest path
                    for(let l = 0; l < numOfShortestPaths; l += 1) {
                        let path = element.prev[l];
                        // calculate betweenness on every passby node
                        for(let m = 0; m < path.length - 1; m += 1) {
                            const node = nodes[path[m]];
                            node.betweenness += 1 / numOfShortestPaths;
                        }
                    }
                }

                // closeness
                if(closeness) {
                    // add start closeness
                    nodes[e1].closeness += nodes.length / element.dist;
                    // add end closeness
                    nodes[e2].closeness += nodes.length / element.dist;
                }
            }
        }
    }

    // another algorithm for centrality

    // generate all [start, end] pairs
    // const pq = new PriorityQueue((cur, n) => {
    //     return n.element[1] > cur.element[1];
    // });

    // for(let i = 0; i < nodes.length; i += 1) {
    //     if(betweenness) {
    //         nodes[i].betweenness = 0;
    //     }
    //     if(closeness) {
    //         nodes[i].closeness = 0;
    //     }
    // }
    // for(let i = 0; i < groups.length; i += 1) {
    //     const group = groups[i];
    //     for(let j = 0; j < group.length; j += 1) {
    //         const e1 = group[j];
    //         for(let k = j+1; k < group.length; k += 1) {
    //             // do Dijkstra
    //             const e2 = group[k];
    //             console.log('pair start', graph[nodes[e1].name].i, graph[nodes[e2].name].i);
    //             const info = Dijkstra(graph[nodes[e1].name], graph[nodes[e2].name], pq, graph, null);
    //             pq.clear();
    //             console.log('pair end', graph[nodes[e1].name].i, graph[nodes[e2].name].i, info);
    //             // add centrality

    //             // betweenness
    //             if(betweenness) {
    //                 const numOfShortestPaths = info.length

    //                 // for every shortest path
    //                 for(let l = 0; l < numOfShortestPaths; l += 1) {
    //                     let element = info[l][2];

    //                     // calculate betweenness on every passby node
    //                     for(let m = 0; m < element.length - 1; m += 1) {
    //                         const node = nodes[element[m]];
    //                         node.betweenness += 1 / numOfShortestPaths;
    //                     }
    //                 }
    //             }

    //             // closeness
    //             if(closeness) {
    //                 // add start closeness
    //                 nodes[e1].closeness += nodes.length / info[0][1];
    //                 // add end closeness
    //                 nodes[e2].closeness += nodes.length / info[0][1];
    //             }
    //         }
    //     }
    // }
}