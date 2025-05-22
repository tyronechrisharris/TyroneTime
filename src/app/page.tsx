import RealtimeInfoDisplay from '@/components/tyrone-time/realtime-info-display';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-4">
          Welcome to TyroneTime
        </h1>
        <p className="text-xl text-muted-foreground">
          Real-time millisecond clock and RTSP connection monitoring.
        </p>
      </section>
      
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Live Status</CardTitle>
        </CardHeader>
        <CardContent>
          <RealtimeInfoDisplay />
        </CardContent>
      </Card>

      <p className="text-center text-muted-foreground max-w-xl">
        This interface provides a visual representation of the data your TyroneTime RTSP server would be streaming.
        Configure your server settings via the 'Configure' page.
      </p>
    </div>
  );
}
