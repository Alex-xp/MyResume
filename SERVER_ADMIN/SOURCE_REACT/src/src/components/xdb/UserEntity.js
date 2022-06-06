export class UserEntity{

    constructor(){
        this._id = null;
        this.login = "";
        this.email = "";
        this.telephone = "";
        this.access_level = 1000;
        this.info = "Пользователь";

        this.active = false;
        this.activation_code = "";

        this.remember_code = "";

        this.email_active = false;
        this.email_code = "";

        this.isSetPassword = false;
        this.newPassword = "";
    }

    setUserObj(u){
        var u = u || {};
        this._id = u._id || null;
        this.login = u.login || "";
        this.email = u.email || "";
        this.telephone = u.telephone || "";

        if(u.access_level!== undefined && u.access_level!==null) {
            this.access_level = u.access_level
        }else this.access_level = 1000;
        this.info = u.info || "Пользователь";

        this.active = u.active || false;
        this.activation_code = u.activation_code || "";
        this.remember_code = u.remember_code || "";
        this.email_active = u.email_active || false;
        this.email_code = u.email_code || "";

        this.isSetPassword = false;
        this.newPassword = "";
        return this;
    }

}