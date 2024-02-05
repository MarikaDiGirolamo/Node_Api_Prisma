import prisma from "../db";


export const createUpdate = async (req, res) =>{

    const newUpdate = await prisma.update.create({
        data: {
            title: req.body.title,
            body: req.body.body,
            product: {
                connect: {
                    id: req.body.productId
                }
            }
        }
    })
    res.json({data: newUpdate})
}

export const updateUpdate = async(req, res) =>{

    const original = await prisma.update.update({
        where: {
            id: req.params.id
        },
        data: {
            updatedAt: new Date(),
            title: req.body.title,
            body: req.body.body,
            status: req.body.status,
            version: req.body.version
        }
    })
    res.json({data: updateUpdate})
}

export const getUpdates = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })
const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates]
}, [])

    res.json({data: updates})
}



export const getOneUpdate = async (req, res) => {
    const update = await prisma.update.findUnique({
        where: {
            id: req.params.id
            },
            include:{
                product:{
                    include:{
                        belongsTo: true
                    }
                }
            }
    })

    if(update.product.belongsTo.id !== req.user.id){
        return res.status(403).json({erros : 'Access Forbidden'})
    }

    res.json({data: update})
}

export const deleteUpdate = async (req, res) => {
    const deleted = await prisma.update.delete({
        where: {
            id: req.params.id
        }
    })
    res.json({data: deleted})
}