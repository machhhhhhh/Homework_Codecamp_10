module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Shop', {
       email : {
           type : DataTypes.STRING(255)
       } ,
       password : {
           type : DataTypes.STRING(255)
       },
       firstname : {
           type : DataTypes.STRING(255)
       },
       lastname : {
           type : DataTypes.STRING(255)
       },
       phone : {
           type : DataTypes.STRING(255)
       },
       photo : {
           type : DataTypes.STRING(255)
       },
       shopname : {
           type : DataTypes.STRING(255)
       },
       isShopOn : {
           type : DataTypes.BOOLEAN
       },
       latitude : {
           type : DataTypes.INTEGER(255)
       },
       longitude : {
           type : DataTypes.INTEGER(255)
       }

    }, {
        tableName : 'shop',
        timestamps : true
    })


    model.associate = models => {
        model.hasMany(models.Order, {FORIENGEKEY : 'sid'})
        model.hasMany(models.Hshop, {FORIENGEKEY : 'sid'})
        model.hasMany(models.Hcus, {FORIENGEKEY : 'sid'})
        model.hasMany(models.Invoice, {FORIENGEKEY : 'sid'})
    }


    return model
}