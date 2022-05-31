module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('InList', {
        description : {
            type : DataTypes.STRING(255)
       }

    }, {
        tableName : 'invoice_list',
        timestamps : true
    })

    model.associate = models => {
        model.belongsTo(models.Invoice, {FORIENGEKEY : 'bid'})
    }

    return model
}