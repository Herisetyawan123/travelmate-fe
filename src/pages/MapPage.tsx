
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trips } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const MapPage = () => {
  const { tripId } = useParams<{ tripId: string }>();

  const trip = trips[0];

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-travelmate-charcoal">Trip Map</h1>
          <p className="text-muted-foreground">Explore your destination: {trip.destination}</p>
        </div>

        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Point of Interest
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Container */}
        <div className="lg:col-span-3">
          <Card className="overflow-hidden">
            <CardHeader className="pb-8">
              <CardTitle>Map View</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Static Map Image - Replace this with an actual embed in a real application */}
              <div className="h-[500px] w-full bg-gray-200 relative">
                {/* This would be a Google Maps iframe or similar in a real application */}
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15789.529835082412!2d113.5609458!3d-8.3639854!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd68352602063e5%3A0x562a6f4802082778!2sSDN%20Kesilir%2005!5e0!3m2!1sid!2sid!4v1747550440866!5m2!1sid!2sid" className="w-full h-full" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Points of Interest */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Points of Interest</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* These would be actual points of interest in a real application */}
                <div className="p-3 bg-muted/50 rounded-lg">
                  <h3 className="font-medium">Eiffel Tower</h3>
                  <p className="text-sm text-muted-foreground">Iconic landmark, great for photos</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <h3 className="font-medium">Louvre Museum</h3>
                  <p className="text-sm text-muted-foreground">Home to thousands of works of art</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <h3 className="font-medium">Notre-Dame Cathedral</h3>
                  <p className="text-sm text-muted-foreground">Medieval Catholic cathedral</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <h3 className="font-medium">Arc de Triomphe</h3>
                  <p className="text-sm text-muted-foreground">Honors those who fought for France</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
