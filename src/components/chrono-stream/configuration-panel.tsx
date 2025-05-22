// src/components/chrono-stream/configuration-panel.tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import type { z } from 'zod';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ServerConfigSchema, type ServerConfig } from '@/lib/zod-schemas';
import { saveConfiguration, loadConfiguration } from '@/actions/configurationActions';
import { Loader2 } from 'lucide-react';

const defaultValues: ServerConfig = {
  viewerUsername: 'user',
  viewerPassword: 'password',
  serverIPAddress: '0.0.0.0',
  serverPort: 8554,
  videoCodec: 'h264',
  videoResolution: '1280x720',
  framesPerSecond: 30,
  h264IFrameInterval: 2,
};

export default function ConfigurationPanel() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ServerConfig>({
    resolver: zodResolver(ServerConfigSchema),
    defaultValues,
  });

  const videoCodec = form.watch('videoCodec');

  useEffect(() => {
    async function fetchConfig() {
      setIsLoading(true);
      try {
        const config = await loadConfiguration();
        if (config) {
          form.reset(config);
        } else {
          form.reset(defaultValues); // Reset to defaults if no config found
        }
      } catch (error) {
        console.error('Failed to load configuration:', error);
        toast({
          title: 'Error Loading Config',
          description: 'Could not load existing configuration. Using defaults.',
          variant: 'destructive',
        });
        form.reset(defaultValues);
      } finally {
        setIsLoading(false);
      }
    }
    fetchConfig();
  }, [form, toast]);

  const onSubmit: SubmitHandler<ServerConfig> = async (data) => {
    setIsSubmitting(true);
    try {
      await saveConfiguration(data);
      toast({
        title: 'Configuration Saved',
        description: 'Your server settings have been successfully updated in config.json.',
      });
    } catch (error) {
      console.error('Failed to save configuration:', error);
      toast({
        title: 'Error Saving Config',
        description: 'There was a problem saving your settings. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2">Loading configuration...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="viewerUsername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Viewer Username</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., admin" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="viewerPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Viewer Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="e.g., pa$$wOrd" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="serverIPAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Server IP Address</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 0.0.0.0" {...field} />
                  </FormControl>
                  <FormDescription>Use "0.0.0.0" to bind to all interfaces.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="serverPort"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Server Port</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 8554" {...field} onChange={e => field.onChange(parseInt(e.target.value,10) || 0)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="videoCodec"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video Codec</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select video codec" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="mjpeg">MJPEG</SelectItem>
                      <SelectItem value="h264">H.264</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="videoResolution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video Resolution</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select resolution" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="640x480">640x480</SelectItem>
                      <SelectItem value="1280x720">1280x720 (720p)</SelectItem>
                      <SelectItem value="1920x1080">1920x1080 (1080p)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Select a standard resolution or type a custom one (e.g. 800x600).</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="framesPerSecond"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frames Per Second (FPS)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 30" {...field} onChange={e => field.onChange(parseInt(e.target.value,10) || 0)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {videoCodec === 'h264' && (
              <FormField
                control={form.control}
                name="h264IFrameInterval"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>H.264 I-Frame Interval (seconds)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 2" {...field} onChange={e => field.onChange(parseInt(e.target.value,10) || 0)} />
                    </FormControl>
                    <FormDescription>GOP size in seconds.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Configuration
          </Button>
        </form>
      </Form>
    </div>
  );
}
