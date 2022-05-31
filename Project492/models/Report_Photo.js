module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Rphoto', {
        photo : {
            type : DataTypes.STRING(255)
       }

    }, {
        tableName : 'report_photo',
        timestamps : true
    })

    return model
}