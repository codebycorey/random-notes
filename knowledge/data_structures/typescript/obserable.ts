interface INotify<T> {
    value: T;
    oldValue: T;
    message: string;
}

class Observer {

    public callback: (payload: INotify) => T;

    constructor(callback: (payload: INotify) => T) {
        this.callback = callback;
    }
}

class Observable<T> {

    private valueWatched: T;
    private observer: 

    constructor(value: T) {
        this.x = value;
        this.observers: Observer[] = [];
    }

    public subscribe(observer) {
        this.observer.push(observer);
    }

    public update(newValue: T) {
        const oldValue: T = { ...this.valueWatched };
        this.valueWatched = newValue;
        this.notify({
            value: this.valueWatched, 
            oldValue: oldValue,
            message: 'Value Updated'
        });
    }

    private notify(payload: INotify) {
        this.observers.forEach((observer: Observer): void => {
            observer.callback(payload);
        });
    }
}