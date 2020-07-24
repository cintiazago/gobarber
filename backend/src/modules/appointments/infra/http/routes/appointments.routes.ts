import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';
import CreateAppoitnmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appoitmentsRouter = Router();

appoitmentsRouter.use(ensureAuthenticated);

// appoitmentsRouter.get('/', async (request, response) => {
//     const appointments = await appointmentsRepository.find();

//     return response.json(appointments);
// });

appoitmentsRouter.post('/', async (request, response) => {
    const { provider_id, date } = request.body;

    const appointmentsRepository = new AppointmentRepository();
    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppoitnmentService(
        appointmentsRepository,
    );

    const appointment = await createAppointment.execute({
        date: parsedDate,
        provider_id,
    });

    return response.json(appointment);
});

export default appoitmentsRouter;
