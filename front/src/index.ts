import express, { Request, Response } from 'express';
const cors = require('cors');
const axios = require('axios');


const app = express();

app.use(express.json());
app.use(cors());

// URL base do backend Java
const JAVA_BACKEND_URL = 'http://localhost:8080'; // Substitua pela URL correta do backend Java

// Tipagem para cliente
interface Cliente {
    id?: number;
    nome: string;
    cpf: string;
    rg: string;
    telefone?: string;
    dataEmissao: string;
    dataCadastro: string;
    genero?: string;
    dataNascimento: string;
}

// Rota para listar todos os clientes
app.get('/clientes', async (_req: Request, res: Response) => {
    try {
        const response = await axios.get(`${JAVA_BACKEND_URL}/clientes`);
        res.status(200).json(response.data);
    } catch (error: any) {
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});

// Rota para buscar cliente por ID
app.get('/clientes/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const response = await axios.get(`${JAVA_BACKEND_URL}/clientes/${id}`);
        res.status(200).json(response.data);
    } catch (error: any) {
        if (error.response?.status === 404) {
            res.status(404).json({ message: 'Cliente não encontrado' });
        } else {
            res.status(error.response?.status || 500).json({ error: error.message });
        }
    }
});

// Rota para criar cliente
app.post('/clientes', async (req: Request, res: Response) => {
    try {
        const response = await axios.post(`${JAVA_BACKEND_URL}/clientes`, req.body);
        res.status(201).json(response.data);
    } catch (error: any) {
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});

// Rota para atualizar cliente
app.put('/clientes/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const response = await axios.put(`${JAVA_BACKEND_URL}/clientes/${id}`, req.body);
        res.status(200).json(response.data);
    } catch (error: any) {
        if (error.response?.status === 404) {
            res.status(404).json({ message: 'Cliente não encontrado' });
        } else {
            res.status(error.response?.status || 500).json({ error: error.message });
        }
    }
});

// Rota para excluir cliente
app.delete('/clientes/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const response = await axios.delete(`${JAVA_BACKEND_URL}/clientes/${id}`);
        res.status(200).json(response.data);
    } catch (error: any) {
        if (error.response?.status === 404) {
            res.status(404).json({ message: 'Cliente não encontrado' });
        } else {
            res.status(error.response?.status || 500).json({ error: error.message });
        }
    }
});

const PORT = 32832;
app.listen(PORT, () => console.log(`Servidor Node.js rodando na porta ${PORT}`));
