module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Hshop', {
        isDelete : {
            type : DataTypes.BOOLEAN
       }

    }, {
        tableName : 'history_shop',
        timestamps : true
    })

    return model
}