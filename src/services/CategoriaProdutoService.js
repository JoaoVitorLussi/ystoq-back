import axios from 'axios';

export const getCategoriasProduto = async () => {
    try {
        const categorias = await axios.get(`http://localhost:8080/categoria`);
        return categorias.data;
    } catch (error) {
        throw error;
    }
};