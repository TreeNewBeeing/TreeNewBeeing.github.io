import React from "react";
import "./DropPanel.css";
import Draggable from "react-draggable";
import { DragHandler } from "../../../lib/DragHandler";

function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
}

const leavers_height = 35;
export default class DropPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fromMySelf: false,
            offset: props.expand
                ? (props.offset + props.height) / props.height
                : leavers_height / props.height,
            bounds: {
                top: -(this.props.height - leavers_height),
                left: 0,
                bottom: props.offset,
                right: 0
            },
            RATIO_OF_WHITE: leavers_height / props.height,
            RATIO_OF_MAX: (props.offset + props.height) / props.height
        };
    }

    drop = e => {
        const direction = this.dragInfo.calculateInitialDiff(e);
        this.animatePanel(direction);
    };

    animatePanel = direction => {
        const totalTime = 300;
        const limit =
            direction > 0 ? this.state.RATIO_OF_MAX : this.state.RATIO_OF_WHITE;
        const totalDistance = limit - this.state.offset;
        const startTime = performance.now();
        const startProgress = this.state.offset;
        const animation = () => {
            const curTime = performance.now() - startTime;
            const progress = easeInOutQuad(
                curTime,
                startProgress,
                totalDistance,
                totalTime
            );

            if (curTime >= totalTime) {
                // end animation
                this.setState({
                    ...this.state,
                    offset: limit,
                    fromMySelf: true
                });
            } else {
                // animating
                this.setState({
                    ...this.state,
                    offset: progress,
                    fromMySelf: true
                });
                requestAnimationFrame(animation);
            }
        };
        requestAnimationFrame(animation);
        if (direction > 0) {
            this.props.onExpand();
        } else {
            this.props.onClose();
        }
    };

    startDrag = e => {
        const event = e.nativeEvent;
        this.dragInfo = new DragHandler(event);
    };

    drag = e => {
        e.preventDefault();
        e.stopPropagation();
        const displacement = this.dragInfo.calculateDiff(e) / this.props.height;

        let progress = this.state.offset + displacement;
        progress =
            progress > this.state.RATIO_OF_MAX
                ? this.state.RATIO_OF_MAX
                : progress;
        progress =
            progress < this.state.RATIO_OF_WHITE
                ? this.state.RATIO_OF_WHITE
                : progress;
        this.setState({
            ...this.state,
            offset: progress,
            fromMySelf: true
        });
    };

    static getDerivedStateFromProps(props, state) {
        if (!state.fromMySelf) {
        } else {
            state.fromMySelf = false;
        }

        return state;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.expand != this.props.expand) {
            this.animatePanel(this.props.expand ? 1 : -1);
        }
    }

    touch = () => {
        const direction =
            this.state.offset >
            (this.state.RATIO_OF_MAX + this.state.RATIO_OF_WHITE) / 2
                ? 1
                : -1;
        this.animatePanel(direction);
    };

    render() {
        return (
            <Draggable
                bounds={this.state.bounds}
                handle="strong"
                axis="y"
                position={{
                    x: 0,
                    y: (this.state.offset - 1) * this.props.height
                }}
                onStart={this.startDrag}
                onDrag={this.drag}
                onStop={this.drop}
            >
                <div
                    className={`${this.props.className} drop-panel`}
                    style={{
                        width: this.props.width,
                        height: this.props.height,
                        backgroundColor: `rgba(
                                ${parseInt(this.state.offset * 238)},
                                ${parseInt(this.state.offset * 238)},
                                ${parseInt(this.state.offset * 238)},
                                ${(this.state.RATIO_OF_MAX -
                                    this.state.offset) *
                                    0.2 +
                                    0.7})`,
                        borderRadius:
                            this.state.offset *
                                (this.props.corner[1] - this.props.corner[0]) +
                            this.props.corner[0]
                    }}
                >
                    <strong
                        className="drop-panel-leavers"
                        // onTouchStart={this.touch}
                    >
                        <div className="drop-panel-leaver" />
                        <div className="drop-panel-leaver" />
                    </strong>
                    <div
                        className="drop-panel-content"
                        style={{
                            height: this.props.height - leavers_height
                        }}
                    >
                        {this.props.children}
                    </div>
                </div>
            </Draggable>
        );
    }
}
DropPanel.defaultProps = {
    width: "100%",
    height: 400,
    corner: [35, 35],
    offset: 0
};
