import React from "react";
import "./Gallery.css";
class Images {
    constructor(data, width, height) {
        this.data = data ? data : [];
        this.actualWidth = 0;
        this.actualHeight = 0;
        this.width = width ? width : 0;
        this.height = height ? height : 0;
    }

    find(x, y) {
        if (x < this.actualWidth && y < this.actualHeight) {
            return this.data[x][y];
        }
        return null;
    }

    changeSize(width, height) {
        this.width = width;
        this.height = height;
    }

    set width(width) {
        this.renderWidth = width;
        while (this.actualWidth < width) {
            const arr = Array(this.actualHeight);
            this.data.push(arr);
            this.actualWidth++;
        }
    }

    set height(height) {
        this.renderHeight = height;
        if (this.actualHeight < height) {
            for (let i = 0; i < this.actualWidth; i++) {
                for (let j = 0; j < height - this.actualHeight; j++) {
                    this.data[i].push(null);
                }
            }
            this.actualHeight = height;
        }
    }

    get width() {
        return this.renderWidth;
    }

    get height() {
        return this.renderHeight;
    }

    fill(images) {
        const width =
            this.actualWidth < images.actualWidth
                ? this.actualWidth
                : images.actualWidth;
        const height =
            this.actualHeight < images.actualHeight
                ? this.actualHeight
                : images.actualHeight;
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                this.data[i][j] = images.data[i][j];
                delete images.data[i][j];
            }
        }
        this.width = images.width;
        this.height = images.height;
    }

    toArray() {
        return this.data.reduce((prev, cur) => {
            return prev.concat(cur);
        }, []);
    }
}

export default class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focus: null,
            images: new Images(),
            recalculate: false
        };
        window.onresize = () => {
            this.setState({
                ...this.state,
                recalculate: true
            });
        };
    }

    static elementInside(x, y, images) {}

    static assignImages = (
        imageSources,
        canvasWidth,
        canvasHeight,
        imageWidth,
        imageHeight,
        prevImages
    ) => {
        const whitespace = 1.2;
        const width = canvasWidth ? canvasWidth : window.innerWidth;
        const height = canvasHeight ? canvasHeight : window.innerHeight;
        const col = Math.ceil(height / imageHeight);
        const row = Math.ceil(width / imageWidth);
        const images = new Images([], row + 1, col + 1);
        const unitWidth = parseInt(width / row);
        const unitHeight = parseInt(height / col);
        let num = 0;
        console.log(images.data);
        images.fill(prevImages);

        // if shrink
        // if (prevImages.find(images.width + 1, images.height + 1)) {
        //     console.log("a");
        //     prevImages.cpoyTo(images);
        //     for (let i = 0; i <= row; i++) {
        //         for (let j = 0; j <= col; j++) {
        //             const prevImage = images.find(i, j);
        //             prevImage.posX = i * unitWidth - 0.5 * imageWidth;
        //             prevImage.posY = j * unitHeight - 0.5 * imageHeight;
        //         }
        //     }

        //     return images;
        // }

        // if expand
        for (let i = 0; i <= row; i++) {
            for (let j = 0; j <= col; j++) {
                const prevImage = images.find(i, j);
                const posX = i * unitWidth - 0.5 * imageWidth;
                const posY = j * unitHeight - 0.5 * imageHeight;

                if (prevImage) {
                    // already rendered
                    prevImage.posX = posX;
                    prevImage.posY = posY;
                    images.data.push(prevImage);
                } else {
                    // not rendered
                    images.data[i][j] = {
                        src: imageSources[num],
                        randomTranslateX:
                            (Math.random() * 2 - 1) *
                            (1 - whitespace) *
                            imageWidth,
                        randomTranslateY:
                            (Math.random() * 2 - 1) *
                            (1 - whitespace) *
                            imageHeight,
                        randomRotate: (Math.random() * 2 - 1) * 45,
                        randomZIndex: parseInt(Math.random() * 20),
                        posX,
                        posY
                    };
                }
                num = (num + 1) % imageSources.length;
            }
        }

        return images;
    };

    static focusImage = (props, gallery, pos) => {
        const images = gallery.map((e, i) => {
            if (i == pos) {
            } else {
                const randomRotate = (Math.random() * 2 - 1) * 45;
                const randomTranslateX =
                    (Math.random() * 2 - 1) * 0.15 * props.imageWidth;
                const randomTranslateY =
                    (Math.random() * 2 - 1) * 0.15 * props.imageHeight;
                return {
                    src: e.src,
                    transform: `
                    translate(${0 + randomTranslateX}px, ${0 +
                        randomTranslateY}px)
                    rotate(${randomRotate}deg
                `,
                    zIndex: parseInt(Math.random() * 20)
                };
            }
        });
        return images;
    };

    static getDerivedStateFromProps(props, state) {
        state.images = Gallery.assignImages(
            props.images,
            props.width,
            props.height,
            props.imageWidth,
            props.imageHeight,
            state.images
        );

        state.fromMySelf = false;
        state.recalculate = false;
        return state;
    }

    focusPicture = i => {
        return () => {
            this.setState({ ...this.state, focus: i });
        };
    };

    unfocusPicture = () => {
        this.setState({ ...this.state, focus: null });
    };

    render() {
        return (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    transition: "filter 0.3s ease-in-out",
                    filter: `blur(${this.props.blur}px)`
                }}
                onClick={this.random}
            >
                {this.state.images.toArray().map((e, i) => (
                    <img
                        className="gallery-image"
                        key={`ucsd${i}`}
                        src={e.src}
                        style={{
                            height: this.props.imageHeight,
                            transform: `
                            translate(${e.posX +
                                e.randomTranslateX}px, ${e.posY +
                                e.randomTranslateY}px)
                            rotate(${e.randomRotate}deg
                        `,
                            zIndex: e.randomZIndex
                        }}
                        onClick={this.focusPicture(i)}
                    />
                ))}
            </div>
        );
    }
}
