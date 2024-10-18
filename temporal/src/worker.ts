import { NativeConnection, Worker } from '@temporalio/worker';

async function run() {
  const connection = await NativeConnection.connect({
    address: 'localhost:7233',
    // TLS and gRPC metadata configuration goes here.
  });
  const worker = await Worker.create({
    connection,
    workflowsPath: require.resolve('./workflows'), // Path to your workflow definitions
    taskQueue: 'my-task-queue', // Task queue the worker will poll
  });

  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
