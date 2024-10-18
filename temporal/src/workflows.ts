import * as wf from '@temporalio/workflow';

// Define the stop signal
export const stopSignal = wf.defineSignal('stop');

// Workflow definition that waits for a stop signal
export async function myWorkflow(): Promise<void> {
  wf.log.info('Workflow started and waiting for the stop signal.');

  // Initialize a blocked state
  let isStopped = false;

  // Set handler to update the stopped state when stop signal is received
  wf.setHandler(stopSignal, () => {
    isStopped = true;
    wf.log.info('Stop signal received. Stopping workflow.');
  });

  // Wait until the stop signal is received (i.e., isStopped becomes true)
  await wf.condition(() => isStopped);

  wf.log.info('Workflow stopped.');
}
