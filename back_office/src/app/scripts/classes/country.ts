import {Language} from './language';
/**
 * Classe définissant un language parlé ou écrit
 **/
export class Country{

  _id:string;
  country_code: string;
  country_name: string;
  currency_code: String;
  capital: string;
  continent: string;
  population: Number;
  area: Number;
  languages: String;

  constructor(country_code:string, country_name:string, capital:string, continent: string, area:number, currency_code?:string, population?:number, languages?: string){

  }

}
