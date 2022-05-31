module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Hcus', {
        isDelete : {
            type : DataTypes.BOOLEAN
       }

    }, {
        tableName : 'history_customer',
        timestamps : true
    })

    model.associate = models => {
        model.belongsTo(models.Customer, {FORIENGEKEY : 'cid'})
        model.belongsTo(models.Shop, {FORIENGEKEY : 'sid'})
        model.belongsTo(models.Order, {FORIENGEKEY : 'oid'})
    }


    return model
}