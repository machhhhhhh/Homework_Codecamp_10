module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Hshop', {
        isDelete : {
            type : DataTypes.STRING(255),
            defaultValue : 'NO',
            validate : {
                isIn : [['YES','NO']]
            }
       }

    }, {
        tableName : 'history_shop',
        timestamps : true
    })

    model.associate = models => {
        model.belongsTo(models.Shop, {FORIENGEKEY : 'sid'})
        model.belongsTo(models.Order, {FORIENGEKEY : 'oid'})
    }

    return model
}