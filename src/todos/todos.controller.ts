import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiProperty,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TODO } from './model';
import { TodosService } from './todos.service';

class CreateTODODTO {
  @ApiProperty()
  content: string;
}

@Controller('todos')
@ApiTags('todos')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiInternalServerErrorResponse({ description: 'Internal server error' })
@UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  @ApiOkResponse({ description: 'List of existing TODOs' })
  getAll(): Promise<TODO[]> {
    return this.todosService.getAll();
  }

  @Delete('/:id')
  @ApiBadRequestResponse({
    description: 'Bad request (TODO not found)',
  })
  @ApiOkResponse({ description: 'TODO deleted successfully' })
  deleteTODO(@Param('id') id: number): Promise<string> {
    return this.todosService.deleteTODO(Number(id));
  }

  @Post('/create')
  @ApiBadRequestResponse({
    description: 'Bad request (no content sent or already existing TODO)',
  })
  @ApiOkResponse({ description: 'TODO created successfully' })
  createTODO(@Body() { content }: CreateTODODTO): Promise<TODO> {
    return this.todosService.createTODO(content);
  }

  @Put('/complete/:id')
  @ApiBadRequestResponse({
    description: 'Bad request (trying to complete an already completed TODO)',
  })
  @ApiOkResponse({ description: 'TODO marked as done successfully' })
  completeTODO(@Param('id') id: number): Promise<string> {
    return this.todosService.completeTODO(Number(id));
  }
}
