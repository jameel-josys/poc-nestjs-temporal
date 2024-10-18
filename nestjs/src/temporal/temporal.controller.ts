// temporal.controller.ts
import { Controller, Post, Body, Param } from '@nestjs/common';
import { TemporalService } from './temporal.service';

@Controller('workflow')
export class TemporalController {
  constructor(private readonly temporalService: TemporalService) {}

  @Post('start/:workflowId')
  async startWorkflow(@Param('workflowId') workflowId: string) {
    await this.temporalService.startWorkflow(workflowId);
    return { message: `Workflow with ID ${workflowId} started.` };
  }

  @Post('signal/:workflowId')
  async signalWorkflow(@Param('workflowId') workflowId: string) {
    await this.temporalService.signalWorkflow(workflowId);
    return { message: `Signal sent to workflow with ID ${workflowId}.` };
  }

  @Post('history/:workflowId')
  async getWorkflowDetails(@Param('workflowId') workflowId: string) {
    const res = await this.temporalService.getWorkflowDetails(workflowId);
    console.log(res);

    return {
      message: `Fetching workflow history for this workflowId: ${workflowId}.`,
      data: res,
    };
  }
}
