const { ObjectId, Int32 } = require("mongodb");

class UserEntity{
    constructor(){
        this._id = null;
        this.login = "Гость";
        this.password = "";
        this.access_level = Int32(99999);
        this.email = "";
        this.telephone = "";
        this.active = true;
        this.activation_code = "";
        this.remember_code = "";
        this.email_active = false;
        this.email_code = "";
        this.info = "Гость";
        this.session = {expires:new Date(), s_id: null}
    }
};

function UserEntityByObj(ue_obj){
    var reti = new UserEntity();
    reti._id = ue_obj._id; // ObjectId(ue_obj._id);
    reti.login = ue_obj.login;
    reti.password = ue_obj.password;
    reti.access_level = Int32(ue_obj.access_level);
    reti.email = ue_obj.email;
    reti.telephone = ue_obj.telephone;
    reti.active = ue_obj.active;
    reti.activation_code = ue_obj.activation_code;
    reti.remember_code = ue_obj.remember_code;
    reti.email_active = ue_obj.email_active;
    reti.email_code = ue_obj.email_code;
    reti.info = ue_obj.info;
    reti.session = {expires: (ue_obj.session.expires || new Date()), s_id: (ue_obj.session.s_id||null)}
    return reti;
}

module.exports = { UserEntity, UserEntityByObj };
