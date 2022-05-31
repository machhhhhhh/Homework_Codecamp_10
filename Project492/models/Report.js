module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Report', {
        description : {
            type : DataTypes.STRING(255)
       },
        isReport : {
           type : DataTypes.BOOLEAN
       }

    }, {
        tableName : 'report',
        timestamps : true
    })

    return model
}