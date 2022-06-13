import { Address } from "./Address.model";
import { IPatient } from "./../interfaces/IPatient.interface";

export class Patient implements IPatient {
  constructor(
    public birth: string,
    public name: string,
    public email: string,
    public address: Address,
    public id: string,
    public createdAt: string
  ) {
    this.birth = new Date(birth).toLocaleDateString("pt-BR");
    this.name = name.split(" ").map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    }).join(" ");
  }
}
