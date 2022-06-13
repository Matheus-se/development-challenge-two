import { IAddress } from './../interfaces/IAddress.interface';

export class Address implements IAddress {
    constructor(
        public zip: string,
        public city: string,
        public state: string,
        public info: string,
    ) {}
}