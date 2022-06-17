module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Hcus', {
        isDelete : {
            type : DataTypes.STRING(255),
            defaultValue : 'NO',
            validate : {
                isIn : [['YES','NO']]
            }
       }

    }, {
        tableName : 'history_customer',
        timestamps : true
    })

    model.associate = models => {
        model.belongsTo(models.Customer, {FORIENGEKEY : 'cid'})
        model.belongsTo(models.Order, {FORIENGEKEY : 'oid'})
    }


    return model
}