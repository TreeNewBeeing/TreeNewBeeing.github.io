export class DragHandler {
    constructor(event) {
        if (event instanceof MouseEvent) {
            this.y = event.screenY;
            this.prevY = this.y;
        } else if (event instanceof TouchEvent) {
            this.y = event.targetTouches[0].screenY;
            this.prevY = this.y;
        }
    }

    calculateDiff(event) {
        let result;
        if (event instanceof MouseEvent) {
            result = event.screenY - this.prevY;
            this.prevY = event.screenY;
        } else if (event instanceof TouchEvent) {
            result = event.changedTouches[0].screenY - this.prevY;
            this.prevY = event.changedTouches[0].screenY;
        }

        return result;
    }

    calculateInitialDiff(event) {
        if (event instanceof MouseEvent) {
            return event.screenY - this.y;
        } else if (event instanceof TouchEvent) {
            return event.changedTouches[0].screenY - this.y;
        }
    }
}
