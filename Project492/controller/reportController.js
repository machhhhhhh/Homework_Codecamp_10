const {Customer, Shop, Report, Order, Rphoto} = require('../models')

const getReport = async(req,res,next) => {
    try {
        const report = await Report.findAll({
            where : {isReport : "YES"},
            include : [
                {
                    model : Customer
                },
                {
                    model : Rphoto
                }
            ]
        })

        return res.status(200).send(report)

        
    } catch (error) {
        next(error)
    }
}

const isReport = async(req,res,next) => {
    try {

        const {id} = req.params // order id

        const shop = await Shop.findOne({where : {username : req.user.username}})
        if(shop) return res.status(400).send({message: 'shop cannot check whether report or not'})

        const customer = await Customer.findOne({where : {username : req.user.username}})
        if(!customer) return res.status(404).send({message : 'customer not found'})

        const report = await Report.findOne({
            where : {
                OrderId : id,
                CustomerId : customer.id
            },
            include : [
                {
                    model : Customer
                },
                {
                    model : Order
                },
                {
                    model : Rphoto
                }
            ]
        })

        if(!report) return res.status(404).send({message : 'report not found'})

        if(report.isReport==="NO") return res.status(200).send({check : false, report})

        return res.status(200).send({check : true , report})


    } catch (error) {
        next(error)
    }
}


const createReport = async(req,res,next) => {
    try {
        const {order_id} = req.body

        const order = await Order.findOne({where : {id : order_id}})
        if(!order) return res.status(404).send({message : 'order not found'})

        const report = await Report.findOne({
            where : {
                CustomerId : order.CustomerId,
                OrderId : order.id
            }
        })

        if(report) return res.status(400).send({message : 'Already have this report'})

        const newReport = await Report.create({
            // description : description,
            OrderId : order_id,
            CustomerId : order.CustomerId,
            isReport : "NO"
        })

        if(!newReport) return res.status(400).send({message : 'cannot create this report'})

        // const data = await Report.findOne({
        //     where : {id : newReport.id},
        //     include : [
        //         {
        //             model : Customer
        //         },
        //         {
        //             model : Order
        //         }
        //     ]
        // })

        // if(!data) return res.status(404).send({message : 'cannot create this report'})

        return res.status(201).send(newReport)

    } catch (error) {
        next(error)
    }
}

const pressReport = async(req,res,next) => {

    try {
        const {id} = req.params // order id
        const {description} = req.body

        const order = await Order.findOne({where : {id : id}})
        if(!order) return res.status(404).send({message : 'order not found'})

        const shop = await Shop.findOne({where : {username : req.user.username}})
        if(shop) return res.status(400).send({message : 'shop cannot report the order'})

        const customer = await Customer.findOne({where : {username : req.user.username}})
        if(!customer) return res.status(404).send({message : 'customer not found'})

        if(order.CustomerId !== customer.id) return res.status(400).send({message : 'only onwer can report'})

        const report = await Report.findOne({
            where : {
                OrderId : order.id,
                CustomerId : order.CustomerId
            }
        })

        if(!report) return res.status(404).send({message : 'report not found'})

        if(report.isReport === "YES") return res.status(400).send({message : 'cannot make the second report for every single order'})

        await report.update({
            description : description,
            isReport : 'YES'
        })
       
        return res.status(200).send({message : 'report successfully', report})
        
    } catch (error) {
        next(error)
    }
}





module.exports = {
    getReport,
    createReport,
    isReport,
    pressReport
}