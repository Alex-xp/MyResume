const { UserEntity } = require("./db/UserEntity");

class qResult {
    constructor(){
        this.result = null;
        this.error = null;
        this.messages = [];
        this.user = new UserEntity();
    }
}

module.exports = { qResult };