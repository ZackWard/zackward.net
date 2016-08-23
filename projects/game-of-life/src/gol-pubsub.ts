// This is a very simple pub-sub component, my first attempt at one

interface eventListInterface {
    [eventName: string]: [() => any];
}

export class PubSub {

    private eventList: eventListInterface;

    constructor() {
        this.eventList = {};
    }

    emit(eventName: string) {
        if (this.eventList.hasOwnProperty(eventName) && this.eventList[eventName].length >= 1) {
            this.eventList[eventName].forEach((listener) => {
                listener();
            });
        }
    }

    on(eventName: string, cb: () => any) {
        if (! this.eventList.hasOwnProperty(eventName)) {
            this.eventList[eventName] = [cb];
        } else {
            this.eventList[eventName].push(cb);
        }
    }
}