module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Report', {
        description : {
            type : DataTypes.STRING(255),
       },
        isReport : {
           type : DataTypes.STRING(255),
           defaultValue : 'NO',
            validate : {
                isIn : [['YES', 'NO']]
            }
       }

    }, {
        tableName : 'report',
        timestamps : true
    })

    model.associate = models => {
        model.belongsTo(models.Customer, {FOREIGNKEY : 'cid'})
        model.hasMany(models.Rphoto, {FOREIGNKEY : 'rid'})
        model.belongsTo(models.Order, {FOREIGNKEY : 'oid'})
    }

    return model
}