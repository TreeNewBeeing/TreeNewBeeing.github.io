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
    }

    toArray() {
        return this.data.reduce((prev, cur) => {
            return prev.concat(cur);
        }, []);
    }
}

const whitespace = 1.2;
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
        const width = canvasWidth ? canvasWidth : window.innerWidth;
        const height = canvasHeight ? canvasHeight : window.innerHeight;
        const col = Math.ceil(height / imageHeight);
        const row = Math.ceil(width / imageWidth);
        const images = new Images([], row + 1, col + 1);
        const unitWidth = parseInt(width / row);
        const unitHeight = parseInt(height / col);
        let num = 0;
        images.fill(prevImages);

        for (let i = 0; i <= row; i++) {
            for (let j = 0; j <= col; j++) {
                const prevImage = images.find(i, j);
                const posX = i * unitWidth;
                const posY = j * unitHeight;

                if (prevImage) {
                    // if already rendered only change position
                    prevImage.posX = posX;
                    prevImage.posY = posY;
                    images.data[i][j] = prevImage;
                } else {
                    // if not rendered set new object
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

                // if imageSource is not enough start new iteration
                num = (num + 1) % imageSources.length;
            }
        }

        return images;
    };

    static focusImage = (
        images,
        pos,
        canvasWidth,
        canvasHeight,
        imageWidth,
        imageHeight
    ) => {
        const y = pos % images.height;
        const x = parseInt(pos / images.height);
        const width = canvasWidth ? canvasWidth : window.innerWidth;
        const height = canvasHeight ? canvasHeight : window.innerHeight;
        const size = Math.ceil(images.width + images.height / 2);
        const unitHeight = height / (size + 1);

        images.data.forEach((row, j) =>
            row.map((e, i) => {
                if (j == x && i == y) {
                    e.randomRotate = 0;
                    e.randomTranslateX = 0;
                    e.randomTranslateY = 0;
                    e.posX = 0.5 * width;
                    e.posY = 0.5 * height;
                    e.prevZIndex = e.randomZIndex;
                    e.randomZIndex = 30;
                } else {
                    i = j * images.width + i;
                    e.randomZIndex =
                        e.randomZIndex > 20 ? e.prevZIndex : e.randomZIndex;
                    e.randomRotate = (Math.random() * 2 - 1) * 45;
                    e.randomTranslateX =
                        (Math.random() * 2 - 1) * (1 - whitespace) * imageWidth;
                    e.randomTranslateY =
                        (Math.random() * 2 - 1) *
                        (1 - whitespace) *
                        imageHeight;
                    e.posX = i % 2 == 0 ? 0 : width;
                    e.posY = parseInt(i / 2) * unitHeight;
                }
            })
        );
        return images;
    };

    static getDerivedStateFromProps(props, state) {
        if (state.focus !== null) {
            state.images = Gallery.focusImage(
                state.images,
                state.focus,
                props.width,
                props.height,
                props.imageWidth,
                props.imageHeight,
                state.images
            );
        } else {
            state.images = Gallery.assignImages(
                props.images,
                props.width,
                props.height,
                props.imageWidth,
                props.imageHeight,
                state.images
            );
        }

        state.fromMySelf = false;
        state.recalculate = false;
        return state;
    }

    focusPicture = i => {
        return e => {
            if (this.props.blur !== 0) return;
            e.stopPropagation();
            this.setState({ ...this.state, focus: i });
        };
    };

    unfocusPicture = () => {
        if (this.props.blur !== 0) return;
        this.setState({ ...this.state, focus: null });
    };

    render() {
        return (
            <div
                className="gallery"
                style={{
                    width: "100%",
                    height: "100%",
                    transition: "filter 0.3s ease-in-out",
                    filter: `blur(${this.props.blur}px)`
                }}
                onClick={this.unfocusPicture}
            >
                {this.state.images.toArray().map((e, i) => (
                    <img
                        className={`gallery-image ${
                            this.props.blur === 0 ? "galler-image-pointer" : ""
                        }`}
                        key={`image${i}`}
                        src={e.src}
                        style={{
                            height: this.props.imageHeight,
                            transform: `
                            translate(-50%, -50%)
                            translateX(${e.posX + e.randomTranslateX}px)
                            translateY(${e.posY + e.randomTranslateY}px)
                            rotate(${e.randomRotate}deg`,
                            zIndex: e.randomZIndex
                        }}
                        onClick={this.focusPicture(i)}
                    />
                ))}
            </div>
        );
    }
}
