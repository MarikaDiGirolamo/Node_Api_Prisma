import prisma from "../db";


//Get all products
export const getProducts = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        include: {
            products: true
        }
    })
    
    res.json({data: user.products})
}

//Get One

export const getOneProduct = async (req, res) => {
    const id = req.params.id
    const product = await prisma.product.findFirst({
        where: {
            id: String(id),
            belongsToId: req.user.id
        }
    })
    res.json({data: product})
}

export const getProductByName =async (req, res) => {
    const product = await prisma.product.findFirst({
        where: {
            // id: req.params.id,
            name: req.body.name,
            belongsToId: req.user.id
        },
    })
    res.json({data: product})
}

export const createProduct = async (req,res) => {
    const product = await prisma.product.create({
        data: {
            name: req.body.name,
            description: req.body.description,
            belongsToId: req.user.id,
        }
    })
    res.json({data: product});
}

export const createManyProducts = async (req, res) => {
    const productsWithId = req.body.products.map((product) => ({
        ...product,
        belongsToId: req.user.id
    }))

    const newProducts = await prisma.product.createMany({
        data: productsWithId
    })
    res.json({data: newProducts})
}

export const updateProduct = async (req, res) => {
    const updated = await prisma.product.update({
    where: {
        id_belongsToId: {
            id: req.params.id,
            belongsToId: req.user.id
        }
    },
    data: {
        name: req.body.name,
        description: req.body.description,
        quantity: req.body.quantity
        }
    })
    res.json({data: updated})
}

export const deleteProduct = async (req, res) => {
    const deleted = await prisma.product.delete({
        where: {
            // id: req.params.id,
            // belongsToId: req.user.id
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id
            }
        }
    })
    res.json({data: deleted})
}