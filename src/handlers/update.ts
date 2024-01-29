import prisma from "../db";

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

    res.json({data: update})
}