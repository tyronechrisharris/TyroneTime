import { z } from 'zod';

export const ServerConfigSchema = z.object({
  viewerUsername: z.string().min(1, 'Username is required'),
  viewerPassword: z.string().min(1, 'Password is required'),
  serverIPAddress: z.string().ip({ message: 'Invalid IP address' }).or(z.literal('0.0.0.0')),
  serverPort: z.coerce.number().int().min(1024, 'Port must be above 1023').max(65535, 'Port must be below 65536'),
  videoCodec: z.enum(['mjpeg', 'h264']),
  videoResolution: z.string().regex(/^\d+x\d+$/, 'Resolution must be in format WxH (e.g., 640x480)'),
  framesPerSecond: z.coerce.number().int().min(1, 'FPS must be at least 1').max(120, 'FPS seems too high'),
  h264IFrameInterval: z.coerce.number().int().min(1, 'I-Frame interval must be at least 1').optional(),
});

export type ServerConfig = z.infer<typeof ServerConfigSchema>;
