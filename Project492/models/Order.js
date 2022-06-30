module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Order', {
        problem : {
            type : DataTypes.STRING(255),
            allowNull : false,
            validate : {
                notEmpty : true
            }
       },
       brand : {
           type : DataTypes.STRING(255)
       },
       model : {
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
        },
       isChoose : {
        type : DataTypes.STRING(255),
           defaultValue : 'NO',
            validate : {
                isIn : [['YES', 'NO']]
            }
       },
       isFinish : {
        type : DataTypes.STRING(255),
           defaultValue : 'NO',
            validate : {
                isIn : [['YES', 'NO']]
            }
       },

    }, {
        tableName : 'Order',
        timestamps : true
    })

    model.associate = models => {
        model.belongsTo(models.Customer, {FORIENGEKEY : 'cid'})
        model.belongsTo(models.Shop, {
            FORIENGEKEY : 'sid',
            // allowNull : true
        })
    
        model.hasOne(models.Invoice, {FORIENGEKEY : 'oid'})
        model.hasMany(models.Ophoto, {FORIENGEKEY : 'oid'})
        model.hasOne(models.Hcus, {FORIENGEKEY : 'oid'})
        model.hasOne(models.Hshop, {FORIENGEKEY : 'oid'})
        model.hasOne(models.Report, {FORIENGEKEY : 'oid'})
    }

    return model
}