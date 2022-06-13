import { IItems } from "../interfaces/IItems.interface";

export class Items implements IItems {
    constructor(
        public title: JSX.Element,
        public description: string,
        public image: JSX.Element,
    ) {}
}