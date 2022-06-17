module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Invoice', {
        isPay : {
            type : DataTypes.STRING(255),
            defaultValue : 'NO',
            validate : {
                isIn : [['YES','NO']]
            }
       },
       photo : {
           type : DataTypes.STRING(255)
       }

    }, {
        tableName : 'invoice',
        timestamps : true
    })

    model.associate = models => {
        model.belongsTo(models.Customer, {FORIENGEKEY : 'cid'})
        model.belongsTo(models.Shop, {FORIENGEKEY : 'sid'})
        model.belongsTo(models.Order, {FORIENGEKEY : 'oid'})
    
        model.hasMany(models.InList, {FORIENGEKEY : 'bid'})
    }

    return model
}