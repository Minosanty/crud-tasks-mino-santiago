import user from "../models/user.model.js";


export const crearUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (req.body) {
        for (let valor in req.body) {
            if (typeof req.body[valor] === "string") {
                req.body[valor] = req.body[valor].trim();
            }
        }
    }
    try {
        // validación para que los datos no vengan vacíos
        if (name === undefined || name === "") return res.status(400).json({ message: "name no puede estar vacio" });
        if (email === undefined ||email === "") return res.status(400).json({ message: "email year no puede estar vacio" });
        if (password === undefined || password === "") return res.status(400).json({ message: "password no puede estar vacio" });

        const nameUnico = await user.findOne({ where: { name } });
        if (nameUnico !== null) return res.status(400).json({ message: "name existente" });

        const emailUnico = await user.findOne({ where: { email } });
        if (emailUnico !== null) return res.status(400).json({ message: "email existente" });

        const nuevoUser = await user.create({ name, password, password });
        res.status(201).json({ message: "se ha creado el user correctamente ", user: nuevoUser });
    }
    catch (error) {
        res.status(500).json({ mensaje: "error en la creacion del user" });
    }
};

export const actulizarUser = async (req, res) => {
    if (req.body) {
        for (let valor in req.body) {
            if (typeof req.body[valor] === "string") {
                req.body[valor] = req.body[valor].trim();
            }
        }
    }
    const { name, email, password } = req.body;

    try {
        if (name) {
            const nombreUnico = await user.findOne({ where: { name } });
            if (nombreUnico !== null) return res.status(400).json({ message: "nombre existente" });
        }

        const [updated] = await user.update({ name, email, password }, {
            where: { id: req.params.id }
        });
        if (updated === 0) return res.status(400).json({ message: "el user no existe" });

        return res.status(200).json({ message: "se actualizo el user" });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "error en la actualizacion del user" });
    }
};

export const obtenerTodosLosUser = async (req, res) => {
    try {
        const user = await user.findAll();
        if (user.length === 0) return res.status(404).json({ message: "no se encontro ningun user" });

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};


export const obtenerPorId = async (req, res) => {
    try {
        const user = await user.findByPk(req.params.id);
        if (user) return res.status(200).json(user);

        return res.status(404).json({ message: "el user no existe" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const eliminacion = async (req, res) => {
    try {
        const eliminados = await user.destroy({ where: { id: req.params.id } });
        console.log(eliminados);

        if (eliminados === 0) return res.status(404).json({ message: "user no encontrado" });

        res.status(204).json({ message: "user eliminado" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};