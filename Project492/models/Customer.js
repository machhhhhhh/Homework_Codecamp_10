module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Customer', {
        username : {
            type : DataTypes.STRING(255),
            unique : true,
            allowNull : false,
            validate : {
                isEmail : true
            }
       },
        password : {
            type : DataTypes.STRING(255),
            allowNull : false,
            validate : {
                notEmpty : true
            }
       },
        firstname : {
            type : DataTypes.STRING(255),
            allowNull : false,
            validate : {
                notEmpty : true
            }
       },
        lastname : {
            type : DataTypes.STRING(255),
            allowNull : false,
            validate : {
                notEmpty : true
            }
       },
        phone : {
            type : DataTypes.STRING(255),
            allowNull : false,
            validate : {
                notEmpty : true
            }
       },
        image : {
            type : DataTypes.STRING(255)
       },

    }, {
        tableName : 'customer',
        timestamps : false
    })


    model.associate = models => {
        model.hasMany(models.Hcus, { FORIENGEKEY : 'cid' })
        model.hasMany(models.Order, { FORIENGEKEY : 'cid' })
        model.hasMany(models.Report, { FORIENGEKEY : 'cid' })
        model.hasMany(models.Invoice, { FORIENGEKEY : 'cid' })
    }


    return model
}