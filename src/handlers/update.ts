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