import Category from "../models/category.model.js"

const getCategories = async (req, res) => {
    try {
        const response = await Category.find();

        return res.status(200).json({
            data: response
        })
    } catch (error) {
        console.log("Error in Fetching the Categories: ", error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const categoryController = {
    getCategories
}

export default categoryController;