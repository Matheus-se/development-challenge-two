const crypto = require('crypto');

class Patient {
    constructor(name, birth, address, email) {
        this.name = name;
        this.address = address;
        this.email = email;
        this.birth = new Date(birth);

        this.createdAt = new Date();
        
        this.id = crypto.randomUUID();
    }
}

module.exports = Patient;