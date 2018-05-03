import * as d3 from 'd3';
// input: csv file
// each line:
// {source: ... , target: ... , Connection Weight: ... ,}

// result:
// callback main function with first paramter the json data
// when the loading process finished

export function parseNetwork(filename, main) {
    filename = convertToPath(filename);
    console.log(filename);
    d3.csv(filename)
        .then(function(data, err) {
            if(err)
                throw err;

            const node = {};

            // links data
            const links_data = data;

            // nodes_data
            data.forEach((e) => {
              if (node[e.source] === undefined) {
                node[e.source] = {};
                node[e.source].links = [];
              }
              if (node[e.target] === undefined) {
                node[e.target] = {};
                node[e.target].links = [];
              }

              node[e.source].links.push(e.target);
              node[e.target].links.push(e.source);
            })

            console.log(node);
            const nodes_data = Object.keys(node).map((e, i) => {
              node[e].i = i;
              return {'name': e};
            });

            // nodes dict data
            // const nodes_dict_data = {};
            // nodes_data.forEach((e, i) => {
            //     nodes_dict_data[e.name] = i;
            // })

            // nodes tree data
            // const nodes_tree_data = d3.stratify()
            //     .id(function(d) { return d.target; })
            //     .parentId(function(d) { return d.source; })
            //     (links_data);
            // console.log(nodes_tree_data);
            data = {
              links: links_data,
              nodes: nodes_data,
              nodes_dict: node,
            };
            main(data);
        }
    );
}


function convertToPath(filename) {
    return `../data/${filename}`;
}