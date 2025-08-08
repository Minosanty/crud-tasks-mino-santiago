import Task from "../models/task.model.js";


export const crearTask = async (req, res) => {
    const { title, description, isComplete } = req.body;
     
        for (let valor in req.body) {
            if (typeof req.body[valor] === "string") {
                req.body[valor] = req.body[valor].trim();
            }
        }
    try {
        // validación para que los datos no vengan vacíos
        if (title === undefined || title === "") return res.status(400).json({ message: "title no puede estar vacio " });
        if (description === undefined ||description === "") return res.status(400).json({ message: "description no puede estar vacio " });
        if (isComplete === undefined || isComplete === '') return res.status(400).json({ message: "isComplete no puede estar vacio" });
        if( typeof isComplete != "boolean")return res.status(400).json({ message: "isComplete tiene que ser boolean" });
        if (title.length>100)return res.status(400).json({ message: "title no tiene que superar los 100 caracteres " });
        if (description.length>100 )return res.status(400).json({ message: "description no tiene que superar los 100 caracteres " });
       
        const titleUnico = await Task.findOne({ where: { title} });
        if (titleUnico) return res.status(400).json({ message: "title existente" });

        const nuevoTask = await Task.create({ title, description, isComplete });
        res.status(201).json({ message: "se ha creado el Task correctamente ", nuevoTask });


        
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ mensaje: "error en la creacion del task:", error });
    }
};


export const actulizarTask = async (req, res) => {
    
        for (let valor in req.body) {
            if (typeof req.body[valor] === "string") {
                req.body[valor] = req.body[valor].trim();
            }
        }
    
    const { title, description, isComplete  } = req.body;

    try {
          const titleUnico = await Task.findOne({ where: { title } });
        if (titleUnico) return res.status(400).json({ message: "title existente" });

        const [updated] = await Task.update({ title, description, isComplete }, {
            where: { id: req.params.id }
        });
        if (updated === 0) return res.status(400).json({ message: "el task no existe" });

        return res.status(200).json({ message: "se actualizo el task correctamente " });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "error en la actualizacion del task" });
    }
};

export const obtenerTodosLosTask = async (req, res) => {
    try {
        const task = await Task.findAll();
        if (task.length === 0) return res.status(404).json({ message: "no se encontro ningun task" });

        return res.status(200).json(task);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};


export const obtenerPorId = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task) return res.status(200).json(task);

        return res.status(404).json({ message: "el task no existe" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const eliminacion = async (req, res) => {
    try {
        const eliminados = await Task.destroy({ where: { id: req.params.id } });
        console.log(eliminados);

        if (eliminados === 0) return res.status(404).json({ message: "task no encontrado" });

        res.status(204).json({ message: "task eliminado" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};