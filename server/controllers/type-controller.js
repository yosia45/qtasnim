const { Type } = require("../models/index");

class TypeController {
  static async getType(req, res, next) {
    try {
      let type = await Type.findAll();
      res.status(200).json(type);
    } catch (err) {
      next(err);
    }
  }
  static async getTypeById(req,res,next){
    try {
      const {id} = req.params
      let  typeById = await Type.findByPk(id)
      res.status(200).json(typeById)
    } catch (err) {
      next(err)
    }
  }
  static async addType(req, res, next) {
    try {
      const { name } = req.body;
      let postType = await Type.create({ name });
      res.status(201).json(`Success adding new type:${name}!`);
    } catch (err) {
      console.log(err)
      next(err);
    }
  }
  static async deleteType(req, res, next) {
    try {
      const { id } = req.params;
      let findType = await Type.findByPk(id);
      if (!findType) {
        throw { name: "NotFound" };
      }
      let deleteType = await Type.destroy({ where: { id: id } });
      res.status(200).json(`Success deleting Type:${findType.name}`);
    } catch (err) {
      next(err);
    }
  }
  static async patchType(req, res, next) {
    try {
      const { id } = req.params;
      let { name } = req.body;
      let patchedType = await Type.update(
        {
          name: name,
        },
        { where: { id: id } }
      );
      res.status(200).json(`Success to edit type to ${name}`)
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TypeController;
