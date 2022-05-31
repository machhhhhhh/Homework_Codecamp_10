module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Customer', {
        email : {
            type : DataTypes.STRING(255)
       },
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

    }, {
        tableName : 'customer',
        timestamps : false
    })


    model.associate = models => {
        model.hasMany(models.Hcus, { FORIENGEKEY : 'cid' })
        model.hasMany(models.Order, { FORIENGEKEY : 'cid' })
        model.hasMany(models.Report, { FORIENGEKEY : 'cid' })
        model.hasMany(models.Invoice, { FORIENGEKEY : 'cid' })
        model.hasMany(models.Hshop, { FORIENGEKEY : 'cid' })
    }


    return model
}