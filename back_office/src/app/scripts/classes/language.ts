/**
 * Classe définissant un language parlé ou écrit
 **/
export class Language{

  _id:string;
  name:string;
  code:string;
  note:string;

  constructor(name: string, code:string, _id?: string,note?:string){

  }

  /**
   * Retourne l'id en base de donnée de la langue
   *
   * @return: id du language
   */
  /*get _id():string{
    if(this._id.length > 0){
      return this._id;
    }else{
      return "-1";
    }
  }*/

  /**
   * Défini l'id du language si la longueur du paramètre est supérieure à 0
   *
   * @param id: id du language
   */
  /*set _id(id: string){
    if(id.length>0){
      this._id = id;
    }
  }*/
    /**
     * Récupére le nom de la langue
     *
     * @return string contenant le nom du language
     */
    /*get name():string{
      return this.name;
    }*/

    /**
     * Défini le nom de la langue
     *
     * @param name: nom à donner à la langue
     */
    /*set name(name:string){
      if(name.length > 0){
        this.name = name;
      }
    }*/

    /**
     * récupére le code pays
     *
     * @return code pays
     */
    /*get code(): string{
      return this.code;
    }*/

    /**
     * défini le code pays
     *
     * @param code: code du pays
     **/
    /*set code(code:string){
      if(code.length > 0){
        this.code = code;
      }
    }*/

    /**
         * récupére le code pays
         *
         * @return code pays
         */
        /*get note(): string{
          return this.note;
        }*/

        /**
         * défini le code pays
         *
         * @param code: code du pays
         **/
        /*set note(code:string){
          if(note.length > 0){
            this.note = note;
          }
        }*/
}
