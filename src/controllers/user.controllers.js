import { Op } from "sequelize";
import User from "../models/user.model.js";


export const crearUser = async (req, res) => {
    const { name, email, password } = req.body;
     
        for (let valor in req.body) {
            if (typeof req.body[valor] === "string") {
                req.body[valor] = req.body[valor].trim();
            }
        }
    try {
        // validación para que los datos no vengan vacíos
        if (name === undefined || name === ""|| name.length>100) return res.status(400).json({ message: "name no puede estar vacio " });
        if (email === undefined ||email === ""|| email.length>100) return res.status(400).json({ message: "email no puede estar vacio " });
        if (password === undefined || password === ""|| password.length > 100) return res.status(400).json({ message: "password no puede estar vacio " });
        if (name.length>100)return res.status(400).json({ message: "name no tiene que superar los 100 caracteres " });
        if (email.length>100 )return res.status(400).json({ message: "email no tiene que superar los 100 caracteres " });
        if (password.length>100 )return res.status(400).json({ message: "password no tiene que superar los 100 caracteres " });


        const emailUnico = await User.findOne({ where: { email,id:{[Op.ne]:req.params.id} } });
        if (emailUnico) return res.status(400).json({ message: "email existente" });

        const nuevoUser = await User.create({ name, email, password });
        res.status(201).json({ message: "se ha creado el user correctamente ", nuevoUser });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ mensaje: "error en la creacion del user:", error });
    }
};

export const actulizarUser = async (req, res) => {
    
        for (let valor in req.body) {
            if (typeof req.body[valor] === "string") {
                req.body[valor] = req.body[valor].trim();
            }
        }
    
    const { name, email, password } = req.body;

    try {
          const emailUnico = await User.findOne({ where: { email } });
        if (emailUnico) return res.status(400).json({ message: "email existente" });

        const [updated] = await User.update({ name, email, password }, {
            where: { id: req.params.id }
        });
        if (updated === 0) return res.status(400).json({ message: "el user no existe" });

        return res.status(200).json({ message: "se actualizo el user correctamente " });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "error en la actualizacion del user" });
    }
};

export const obtenerTodosLosUser = async (req, res) => {
    try {
        const user = await User.findAll();
        if (user.length === 0) return res.status(404).json({ message: "no se encontro ningun user" });

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};


export const obtenerPorId = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) return res.status(200).json(user);

        return res.status(404).json({ message: "el user no existe" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const eliminacion = async (req, res) => {
    try {
        const eliminados = await User.destroy({ where: { id: req.params.id } });
        console.log(eliminados);

        if (eliminados === 0) return res.status(404).json({ message: "user no encontrado" });

        res.status(204).json({ message: "user eliminado" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};