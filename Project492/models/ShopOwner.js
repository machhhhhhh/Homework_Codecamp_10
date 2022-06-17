module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Shop', {
       email : {
           type : DataTypes.STRING(255),
           unique : true,
           allowNull : false,
            validate : {
                notEmpty : true
            }
       } ,
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
           unique : true,
           allowNull : false,
            validate : {
                notEmpty : true
            }
       },
       photo : {
           type : DataTypes.STRING(255)
       },
       shopname : {
           type : DataTypes.STRING(255),
           unique : true,
           allowNull : false,
            validate : {
                notEmpty : true
            }
       },
       isShopOn : {
           type : DataTypes.STRING(255),
           defaultValue : 'NO',
            validate : {
                isIn : [['YES','NO']]
            }
       },
       latitude : {
           type : DataTypes.INTEGER(255),
           allowNull : false,
            validate : {
                notEmpty : true
            }
       },
       longitude : {
           type : DataTypes.INTEGER(255),
           allowNull : false,
            validate : {
                notEmpty : true
            }
       }

    }, {
        tableName : 'shop',
        timestamps : true
    })


    model.associate = models => {
        model.hasMany(models.Order, {FORIENGEKEY : 'sid'})
        model.hasMany(models.Hshop, {FORIENGEKEY : 'sid'})
        model.hasMany(models.Invoice, {FORIENGEKEY : 'sid'})
    }


    return model
}