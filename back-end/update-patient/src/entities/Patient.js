class Patient {
    constructor(name=null, birth=null, address=null, email=null, id) {
        this.id = id;
        birth ? this.birth = birth : null;
        address ? this.address = address : null;
        email ? this.email = email : null;
        name ? this.name = name : null;
    }
}

module.exports = Patient;