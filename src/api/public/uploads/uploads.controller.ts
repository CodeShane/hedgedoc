/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';
import { ConsoleLoggerService } from '../../../logger/console-logger.service';
import { MediaService } from '../../../media/media.service';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('media')
@ApiSecurity('token')
@Controller('uploads')
export class UploadsController {
  constructor(
    private readonly logger: ConsoleLoggerService,
    private mediaService: MediaService,
  ) {
    this.logger.setContext(UploadsController.name);
  }

  @Get(':mediaId')
  getMedia(@Param('mediaId') mediaId: string, @Res() res) {
    // only serve static files, if FileSystem is configured as the media backend
    if (!this.mediaService.backendIsFileSystem()) {
      throw new NotFoundException();
    }
    // serve the requested file from the directory
    res.sendFile(mediaId, { root: this.mediaService.getUploadPath() });
  }
}
