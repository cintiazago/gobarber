import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppoitnmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appoitmentsRouter = Router();

appoitmentsRouter.use(ensureAuthenticated);

appoitmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentRepository);
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
});

appoitmentsRouter.post('/', async (request, response) => {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppoint = new CreateAppoitnmentService();

    const appointment = await createAppoint.execute({
        date: parsedDate,
        provider_id,
    });

    return response.json(appointment);
});

export default appoitmentsRouter;
