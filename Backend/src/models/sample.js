class SampleUser {

    id;
    firstname;
    lastname;
    email;

    constructor(id, firstname, lastname, email) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
    }
}

module.exports = SampleUser;