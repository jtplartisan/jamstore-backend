const { Product } = require("../../models/Product.model");

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([
          {
            $lookup: {
              from: 'categories',
              localField: 'category',
              foreignField: '_id',
              as: 'categoryInfo',
            },
          },
          {
            $lookup: {
              from: 'users', 
              let: { ownerId: '$owner' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ['$_id', '$$ownerId'] },
                        { $eq: ['$role', 'vendor'] },
                      ],
                    },
                  },
                },
                {
                  $project: {
                    _id: 1,
                    username: 1,
                  },
                },
              ],
              as: 'ownerInfo',
            },
          },
          {
            $addFields: {
              category: { $arrayElemAt: ['$categoryInfo', 0] },
              owner: { $arrayElemAt: ['$ownerInfo', 0] },
            },
          },
          {
            $project: {
              categoryInfo: 0,
              ownerInfo: 0,
            },
          },
            
        ]);
    
        res.status(200).json({ products });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
      }
};
