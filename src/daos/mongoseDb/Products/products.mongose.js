import { ProductModel } from "../models/products.models.js";

export default class ProductMongoDB {

    async getAll(page = 1, limit = 10) {
      try {
        const response = await ProductModel.paginate({}, { page, limit, sort: { price: 1 }  });
        const next = response.hasNextPage ? `http://localhost:8080/api/products?page=${response.nextPage}` : null;
        const prev = response.hasPrevPage ? `http://localhost:8080/api/products?page=${response.prevPage}` : null;
        return {
          payload: response.docs,
          info: {
            count: response.docs.length, 
            pages: response.totalPages,
            next,
            prev
          }
        };
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  
  async getById(id) {
    try {
      const response = await ProductModel.findById(id);
      return response;
    } catch (error) {
      console.log(error);
      return null
    }
  }

  async createProduct(obj) {
    try {
      const response = await ProductModel.create(obj);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, obj) {
    try {
      const response = await ProductModel.findByIdAndUpdate(obj, id, { new: true, });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const response = await ProductModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async aggregation1(category) {
    try {
      return await ProductModel.aggregate([
        {
          $match: { category: category }
        },
        {
          $sort: { price: 1 } 
        },
      ]);

    } catch (error) {
      console.error('Error en la operación de agregación:', error);
      return null;
    }
  }


}
