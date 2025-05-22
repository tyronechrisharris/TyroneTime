// src/ai/flows/optimize-streaming-parameters.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for optimizing streaming parameters based on server load and client connections.
 *
 * - optimizeStreamingParameters - A function that suggests optimal streaming parameters.
 * - OptimizeStreamingParametersInput - The input type for the optimizeStreamingParameters function.
 * - OptimizeStreamingParametersOutput - The return type for the optimizeStreamingParameters function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeStreamingParametersInputSchema = z.object({
  connectedClients: z
    .number()
    .describe('The number of currently connected RTSP clients.'),
  serverLoad: z
    .number()
    .describe(
      'The current server load as a percentage (0-100), representing CPU and memory usage.'
    ),
});
export type OptimizeStreamingParametersInput = z.infer<
  typeof OptimizeStreamingParametersInputSchema
>;

const OptimizeStreamingParametersOutputSchema = z.object({
  videoCodec: z
    .enum(['mjpeg', 'h264'])
    .describe('The recommended video codec.'),
  videoResolution: z
    .string()
    .describe(
      'The recommended video resolution (e.g., 640x480, 1280x720, 1920x1080).'
    ),
  framesPerSecond: z.number().describe('The recommended frames per second (FPS).'),
  h264IFrameInterval: z
    .number()
    .optional()
    .describe(
      'The recommended I-frame interval in frames, applicable if H.264 is selected.'
    ),
  reasoning: z.string().describe('The reasoning behind the suggested parameters.'),
});
export type OptimizeStreamingParametersOutput = z.infer<
  typeof OptimizeStreamingParametersOutputSchema
>;

export async function optimizeStreamingParameters(
  input: OptimizeStreamingParametersInput
): Promise<OptimizeStreamingParametersOutput> {
  return optimizeStreamingParametersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeStreamingParametersPrompt',
  input: {schema: OptimizeStreamingParametersInputSchema},
  output: {schema: OptimizeStreamingParametersOutputSchema},
  prompt: `You are an expert in optimizing RTSP streaming parameters for network security cameras. Given the current number of connected clients and the server load, you will suggest the optimal video codec, video resolution, frames per second, and H.264 I-frame interval (if applicable) to balance streaming quality and server performance. You will also explain your reasoning.

Number of connected clients: {{{connectedClients}}}
Server load: {{{serverLoad}}}%

Consider the following:

*   MJPEG is less CPU-intensive but results in larger file sizes.
*   H.264 is more CPU-intensive but offers better compression.
*   Lower resolutions and FPS reduce server load but decrease video quality.
*   A higher I-frame interval reduces bandwidth but may impact video quality during seeking.

Output the parameters as a valid JSON object with the following keys: videoCodec, videoResolution, framesPerSecond, h264IFrameInterval, and reasoning.
`,
});

const optimizeStreamingParametersFlow = ai.defineFlow(
  {
    name: 'optimizeStreamingParametersFlow',
    inputSchema: OptimizeStreamingParametersInputSchema,
    outputSchema: OptimizeStreamingParametersOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
