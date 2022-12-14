class userHasLock {

    id;
    lock_id;
    user_id;

    constructor(id, lock_id, user_id) {
        this.id = id;
        this.lock_id = lock_id;
        this.user_id = user_id;
    }
}

module.exports = userHasLock;



