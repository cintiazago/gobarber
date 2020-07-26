import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateuserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
    async update(request: Request, response: Response): Promise<Response> {
        const updateUserAvatar = container.resolve(UpdateuserAvatarService);

        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatar_filename: request.file.filename,
        });

        delete user.password;

        return response.json(user);
    }
}
