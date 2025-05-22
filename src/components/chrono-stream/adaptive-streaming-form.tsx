'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import { optimizeStreamingParameters, type OptimizeStreamingParametersOutput } from '@/ai/flows/optimize-streaming-parameters';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const AdaptiveStreamingInputSchema = z.object({
  connectedClients: z.coerce.number().min(0, "Must be non-negative").max(10000, "Too many clients"),
  serverLoad: z.coerce.number().min(0, "Must be 0-100").max(100, "Must be 0-100"),
});

type AdaptiveStreamingInput = z.infer<typeof AdaptiveStreamingInputSchema>;

interface AdaptiveStreamingFormProps {
  onParametersOptimized: (params: OptimizeStreamingParametersOutput) => void;
}

export default function AdaptiveStreamingForm({ onParametersOptimized }: AdaptiveStreamingFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedParams, setSuggestedParams] = useState<OptimizeStreamingParametersOutput | null>(null);

  const form = useForm<AdaptiveStreamingInput>({
    resolver: zodResolver(AdaptiveStreamingInputSchema),
    defaultValues: {
      connectedClients: 0,
      serverLoad: 0,
    },
  });

  const onSubmit: SubmitHandler<AdaptiveStreamingInput> = async (data) => {
    setIsLoading(true);
    setSuggestedParams(null);
    try {
      const result = await optimizeStreamingParameters(data);
      setSuggestedParams(result);
      toast({
        title: 'Optimization Complete',
        description: 'AI has suggested new streaming parameters.',
      });
    } catch (error) {
      console.error('Failed to optimize parameters:', error);
      toast({
        title: 'Optimization Error',
        description: 'Could not get suggestions. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-card/50 border-border">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Optimize Parameters</CardTitle>
            <CardDescription>
              Enter current server status to get AI-recommended settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="connectedClients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Connected RTSP Clients</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="serverLoad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Server Load (%)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 75" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Get Suggestions
            </Button>
            
            {suggestedParams && (
              <Card className="w-full bg-background p-4">
                <CardTitle className="text-lg mb-2">Suggested Parameters:</CardTitle>
                <div className="space-y-1 text-sm">
                  <p><strong>Video Codec:</strong> {suggestedParams.videoCodec}</p>
                  <p><strong>Resolution:</strong> {suggestedParams.videoResolution}</p>
                  <p><strong>FPS:</strong> {suggestedParams.framesPerSecond}</p>
                  {suggestedParams.videoCodec === 'h264' && suggestedParams.h264IFrameInterval && (
                    <p><strong>H.264 I-Frame Interval:</strong> {suggestedParams.h264IFrameInterval} frames</p>
                  )}
                  <p className="mt-2 pt-2 border-t border-border"><strong>Reasoning:</strong> {suggestedParams.reasoning}</p>
                </div>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => onParametersOptimized(suggestedParams)}
                >
                  Apply Suggestions to Form
                </Button>
              </Card>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
