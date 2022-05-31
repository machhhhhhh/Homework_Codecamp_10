module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Ophoto', {
        photo : {
            type : DataTypes.STRING(255)
       }

    }, {
        tableName : 'order_photo',
        timestamps : true
    })

    model.associate = models => {
        model.belongsTo(models.Order ,{FORIENGEKEY : 'oid'})
    }

    return model
}