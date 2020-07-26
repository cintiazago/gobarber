import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentsService from './CreateAppointmentsService';

describe('CreateAppointment', () => {
    it('should be able to create a new appointment', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentsService(
            fakeAppointmentsRepository,
        );

        const appointment = await createAppointment.execute({
            date: new Date(),
            provider_id: '121212121',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('121212121');
    });

    it('should not be able to create two appointments on the same time', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentsService(
            fakeAppointmentsRepository,
        );

        const appointmentDate = new Date(2020, 7, 25, 11);

        await createAppointment.execute({
            date: appointmentDate,
            provider_id: '121212121',
        });

        expect(
            createAppointment.execute({
                date: appointmentDate,
                provider_id: '121212121',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
