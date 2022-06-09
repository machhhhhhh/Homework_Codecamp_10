module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('PostLike', 
    {
        // user_id : {
        //     type : DataTypes.INTEGER,
        //     allowNull : false,
        //     reference : {
        //         model : {
        //             tableName : 'user'
        //         },
        //         key : 'id',
        //         onUpdate : 'RESTRICT',
        //         onDelete : 'RESTRICT'
        //     }
        // },
        // post_id : {
        //     type : DataTypes.INTEGER,
        //     allowNull : false,
        //     reference : {
        //         model : {
        //             tableName : 'post'
        //         },
        //         key : 'id',
                // onUpdate : 'RESTRICT',
                // onDelete : 'RESTRICT'
        //     }
        // }
    },
    {
        tableName : 'post_like',
        timestamps : true
    })

    model.associate = models => {
        model.belongsTo(models.User, {
            FORIENGKEY : 'user_id',
            onUpdate : 'RESTRICT',
            onDelete : 'RESTRICT'
        })
        model.belongsTo(models.Post, {
            FORIENGKEY : 'post_id',
            onUpdate : 'RESTRICT',
            onDelete : 'RESTRICT'
        })
    }

    return model
}