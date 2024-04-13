import { observable, makeObservable } from 'mobx';
import { UserStore } from './userStore';

class RootStore {
    userStore = new UserStore();

    constructor() {
        makeObservable(this, {
            userStore: observable,
        });
    }
}

const rootStore = new RootStore();

export { rootStore, RootStore };
