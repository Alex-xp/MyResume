export class UserEntity {

    constructor() {

        this._id = null;
        this.login = "Гость";
        this.password = "";
        this.access_level = 99999;
        this.email = "";
        this.telephone = "";
        this.active = true;
        this.activation_code = "";
        this.remember_code = "";
        this.email_active = false;
        this.email_code = "";
        this.info = "Гость";
        this.session = { expires: new Date(), s_id: null }
    }

}