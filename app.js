import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import shipmentRoutes from './routes/shipment.routes.js';

const app = express();

const PORT = process.env.PORT || 4001;

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/shipments', shipmentRoutes);

connectDB();

app.listen(PORT, () => {
  console.info(`Server is running at http://localhost:${PORT}`);
})

