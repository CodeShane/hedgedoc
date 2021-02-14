/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Test, TestingModule } from '@nestjs/testing';
import { UploadsController } from './uploads.controller';
import { LoggerModule } from '../../../logger/logger.module';
import { MediaModule } from '../../../media/media.module';
import { ConfigModule } from '@nestjs/config';
import appConfigMock from '../../../config/app.config.mock';
import mediaConfigMock from '../../../config/media.config.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthorColor } from '../../../notes/author-color.entity';
import { Authorship } from '../../../revisions/authorship.entity';
import { AuthToken } from '../../../auth/auth-token.entity';
import { Identity } from '../../../users/identity.entity';
import { MediaUpload } from '../../../media/media-upload.entity';
import { Note } from '../../../notes/note.entity';
import { Revision } from '../../../revisions/revision.entity';
import { User } from '../../../users/user.entity';
import { Tag } from '../../../notes/tag.entity';

describe('UploadsController', () => {
  let controller: UploadsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadsController],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [appConfigMock, mediaConfigMock],
        }),
        LoggerModule,
        MediaModule,
      ],
    })
      .overrideProvider(getRepositoryToken(AuthorColor))
      .useValue({})
      .overrideProvider(getRepositoryToken(Authorship))
      .useValue({})
      .overrideProvider(getRepositoryToken(AuthToken))
      .useValue({})
      .overrideProvider(getRepositoryToken(Identity))
      .useValue({})
      .overrideProvider(getRepositoryToken(MediaUpload))
      .useValue({})
      .overrideProvider(getRepositoryToken(Note))
      .useValue({})
      .overrideProvider(getRepositoryToken(Revision))
      .useValue({})
      .overrideProvider(getRepositoryToken(User))
      .useValue({})
      .overrideProvider(getRepositoryToken(Tag))
      .useValue({})
      .compile();

    controller = module.get<UploadsController>(UploadsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
