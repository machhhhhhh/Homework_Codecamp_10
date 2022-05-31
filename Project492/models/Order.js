module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Order', {
        problem : {
            type : DataTypes.STRING(255)
       },
       description : {
           type : DataTypes.STRING(255)
       },
       latitude : {
           type : DataTypes.INTEGER(255)
       },
       longitude : {
           type : DataTypes.INTEGER(255)
       }

    }, {
        tableName : 'Order',
        timestamps : true
    })

    model.associate = models => {
        model.belongsTo(models.Customer, {FORIENGEKEY : 'cid'})
        model.belongsTo(models.Shop, {FORIENGEKEY : 'sid'})
    
        model.hasOne(models.Invoice, {FORIENGEKEY : 'oid'})
        model.hasMany(models.Ophoto, {FORIENGEKEY : 'oid'})
        model.hasOne(models.Hcus, {FORIENGEKEY : 'oid'})
        model.hasOne(models.Hshop, {FORIENGEKEY : 'oid'})
        model.hasOne(models.Report, {FORIENGEKEY : 'oid'})
    }

    return model
}