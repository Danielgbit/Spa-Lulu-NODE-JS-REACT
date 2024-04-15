const db = require('../database/models');


const inventoryController = {

    postCreateInventory: async (req, res) => {
        try {

            const newInventory = {
                name: req.body.name,
                quantity: req.body.quantity,
                supplier: req.body.supplier,
                expiration_date: req.body.expirationDate,
                category: req.body.category,
                description: req.body.description,
                price: req.body.price,
                sale_price: req.body.salePrice,
            };

            const inventoryCreate = await db.Inventory.create(newInventory, { raw: true });

            if (!inventoryCreate) return res.status(400).json({ message: 'error al crear el item' });

            res.status(201).json({ message: 'Registro exitoso' });
            

        } catch (e) {
            console.error(e);
        }
    },

    getInventories: async (req, res) => {
        try {
            const inventoryItems = await db.Inventory.findAll({ raw: true });

            if (!inventoryItems) return res.status(404).json({ message: 'No se encontraron items en el inventario' });

            const inventoryMap = inventoryItems.map((item) => ({
                inventoryId: item.inventory_id,
                name: item.name,
                quantity: item.quantity,
                supplier: item.supplier,
                expirationDate: item.expiration_date,
                category: item.category,
                description: item.description,
                price: item.price,
                salePrice: item.sale_price
            }));

            res.status(200).json({ inventoryItems: inventoryMap });

        } catch (e) {
            console.error(e);
        }
    },

    getInventoryItem: async (req, res) => {
        try {

            const id = req.params.id;

            const findInventoryItem = await db.Inventory.findByPk(id, { raw: true });

            if(!findInventoryItem) return res.status(404).json({ message: 'Inventory item not found' });

            const inventoryObject = {
                inventoryId: findInventoryItem.inventory_id,
                name: findInventoryItem.name,
                quantity: findInventoryItem.quantity,
                supplier: findInventoryItem.supplier,
                expirationDate: findInventoryItem.expiration_date,
                category: findInventoryItem.category,
                description: findInventoryItem.description,
                price: findInventoryItem.price,
                salePrice: findInventoryItem.sale_price
            };

            res.status(200).json({ inventoryItemDetail: inventoryObject });

        } catch (e) {
            console.error(e);
        }
    },

    putInventory: async (req, res) => {
        try {
            const id = req.params.id;

            const findInventoryItem = await db.Inventory.findByPk(id, { raw: true });

            if(!findInventoryItem) return res.status(404).json({ message: 'Inventory item not found' });

            const updateInventory = {
                name: req.body.name,
                quantity: req.body.quantity,
                supplier: req.body.supplier,
                expiration_date: req.body.expirationDate,
                category: req.body.category,
                description: req.body.description,
                price: req.body.price,
                sale_price: req.body.salePrice
            };
            
            const [ rowsUpdate, inventoryItemUpdate ] = await db.Inventory.update(updateInventory, {
                where: {
                    inventory_id: id
                }
            });

            if (rowsUpdate === 0) return res.status(400).json({ message: 'No se actualizo ninguna fila' });

            res.status(200).json({ message: 'Item actualizado correctamente' });


        } catch (e) {
            console.error(e);
            return e.response;
        }
    },

    destroyInventory: async (req, res) => {
        try {
            const { id } = req.params;

            const findInventoryItem = await db.Inventory.findByPk(id, { raw: true });

            if(!findInventoryItem) return res.status(404).json({ message: 'Inventory item not found' });

            const destroyItem = await db.Inventory.destroy({
                where: {
                    inventory_id: id
                }
            });

            console.log(destroyItem);

            res.status(200).json({ message: 'item eliminado correctamente' });

        } catch (e) {
            console.error(e);
        }
    }

};

module.exports = inventoryController;