import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppoitnmentService from '../services/CreateAppointmentService';

const appoitmentsRouter = Router();
const appointmentsRepository = new AppointmentRepository();

appoitmentsRouter.get('/', (request, response) => {
    const appointments = appointmentsRepository.all();

    return response.json(appointments);
});

appoitmentsRouter.post('/', (request, response) => {
    try {
        const { provider, date } = request.body;

        const parsedDate = parseISO(date);

        const createAppoint = new CreateAppoitnmentService(
            appointmentsRepository,
        );

        const appointment = createAppoint.execute({
            date: parsedDate,
            provider,
        });

        return response.json(appointment);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default appoitmentsRouter;
