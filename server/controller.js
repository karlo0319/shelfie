module.exports = {
    getInventory: (req, res) => {
        const db = req.app.get('db');

        db.get_inventory()
        .then(inventory => res.status(200).send(inventory))
        .catch(err => res.status(500).send(err))
    },

    createInventory: (req, res) => {
        const {name, price, image} = req.body,
            db = req.app.get('db');
        
        db.create_inventory({name, price, image})
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    },

    updateInventory: (req, res) => {
        const {id} = req.params,
        {name, price, image} = req.body,
        db = req.app.get('db');

        db.update_inventory({name, price, image})
        .then(() => res.sendStatus(200))
        .cathc(err => res.status(500).send(err))
    },
    
    deleteInventory: (req, res) => {
        const {id} = req.params,
               db = req.app.get('db');
        
        db.delete_inventory(id)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    }
}