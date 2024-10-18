// temporal.service.ts
import { Injectable } from '@nestjs/common';
import { Connection, Client } from '@temporalio/client';

@Injectable()
export class TemporalService {
  private client: Client;

  constructor() {
    this.init();
  }

  private async init() {
    const connection = await Connection.connect({ address: 'localhost:7233' });
    this.client = new Client({ connection });
  }

  // Start a new workflow
  async startWorkflow(workflowId: string) {
    const handle = await this.client.workflow.start('myWorkflow', {
      workflowId, // unique workflow ID for each execution
      taskQueue: 'my-task-queue',
    });
    return handle;
  }

  // Send a signal to the running workflow
  async signalWorkflow(workflowId: string) {
    const handle = this.client.workflow.getHandle(workflowId);
    await handle.signal('stop');
  }

  async getWorkflowDetails(workflowId: string) {
    const handle = this.client.workflow.getHandle(workflowId);
    // console.log('handle', handle);

    const details = await handle.describe();
    console.log('details', details);

    return {
      workflowId: details?.workflowId,
      runId: details?.runId,
      status: details?.status,
      startTime: details?.startTime.toISOString(),
      closeTime: details?.closeTime?.toISOString() || null,
      workflowType: details?.type,
    };
  }
}
