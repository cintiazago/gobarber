import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentsService from '@modules/appointments/services/CreateAppointmentsService';

export default class AppointmentsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { provider_id, date } = request.body;
        const user_id = request.user.id;

        const createAppointment = container.resolve(CreateAppointmentsService);

        const appointment = await createAppointment.execute({
            date,
            user_id,
            provider_id,
        });

        return response.json(appointment);
    }
}
