class user {

    id;
    name_user;
    phone_user;
    email_user;
    pass_user;
    cpf_user

    constructor(id, name_trader, phone_trader, pass_trader, cpf_user, email_user) {
        this.id = id;
        this.name_trader = name_trader;
        this.phone_trader = phone_trader;
        this.pass_trader = pass_trader;
        this.cpf_user = cpf_user;
        this.email_user = email_user;
    }
}

module.exports = user;



