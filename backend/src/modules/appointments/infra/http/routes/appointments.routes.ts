import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentRepository from '@modules/appointments/repositories/AppointmentRepository';
import CreateAppoitnmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

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
