import { expect } from "chai";

const error = {
    INDEX_OUT_OF_BOUND: "Index out of bound"
};

export class MutliDimensionalArray {
    constructor(dim, size) {
        this.data = [];
        this.dim = dim;
        
    }

    iterator(callback) {
        position = Array(this.dim).fill(0);
        // while()
    }

    set(position, value) {
        assert(position.length <= this.dim);
        position.reduce((prev, cur, curI) => {
            if (cur >= prev.length) throw erro.INDEX_OUT_OF_BOUND;
            if (curI === position.length - 1) {
                prev[cur] = value;
            }
            return prev[cur];
        }, this.data);
    }


    changeSize(size) {
        const curSize = this.getSize();
        const diffSize = size.map((e,i) => e)
    }

    get(position) {
        assert(position.length <= this.dim);
        return position.reduce((prev, cur, curI) => {
            if (cur >= prev.length) throw erro.INDEX_OUT_OF_BOUND;
            return prev[cur];
        }, this.data);
    }

    getSize() {
        const size = Array(this.dim).fill(0);
        let element = this.data;
        for (let i = 0; i < this.dim; i++) {
            size[i] = element.length;
            if (element.length == 0) {
                break;
            } else {
                element = element[0];
            }
        }
        return size;
    }
}

export class MutliDimensionalArrayTest {
    constructor() {
        describe("MutliDimensionalArrayTest", function() {
            describe("#constrictor()", function() {
                it("3D array", function() {
                    const arr = new MutliDimensionalArray(3);
                    expect(arr.data).to.eql([])                
                })
                it("3D array with size", function() {
                    const arr = new MutliDimensionalArray(3);
                    expect(arr.data).to.eql([])                
                })
            })
            describe("#getSize()", function() {
                it("initial", function() {
                    expect(new MutliDimensionalArray(3).getSize()).to.eql([
                        0,
                        0,
                        0
                    ]);
                });
            });

            describe("#set()", function() {
                const arr = new MutliDimensionalArray(3);
                it("normal", function() {
                    expect(arr, data )
                })
            })
        });
    }
}
