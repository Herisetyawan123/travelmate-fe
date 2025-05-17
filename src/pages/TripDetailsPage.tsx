
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CalendarDays, Map, PieChart, CheckSquare, Edit, Globe, Lock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trips, comments as mockComments } from "@/data/mockData";
import TripContent from "@/components/trip-details/TripContent";
import ItineraryPage from "./ItineraryPage";
import BudgetPage from "./BudgetPage";
import ChecklistPage from "./ChecklistPage";
import MapPage from "./MapPage";

const pagesDetails = [
  <TripContent />,
  <ItineraryPage />,
  <BudgetPage />,
  <ChecklistPage />,
  <MapPage />
];

const TripDetailsPage = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const [pgId, setPgId] = useState(0);
  // const [comments, setComments] = useState(mockComments);
  // const [newComment, setNewComment] = useState("");

  const trip = trips.find(t => t.id === tripId);

  if (!trip) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Trip not found</h1>
        <Link to="/trips" className="text-travelmate-blue hover:underline">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  // const handleAddComment = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (newComment.trim() === "") return;

  //   const newCommentObj = {
  //     id: `c${comments.length + 1}`,
  //     userId: "m1",
  //     userName: "John Doe",
  //     userAvatar: "https://i.pravatar.cc/150?img=1",
  //     text: newComment,
  //     timestamp: new Date().toISOString()
  //   };

  //   setComments([...comments, newCommentObj]);
  //   setNewComment("");
  // };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // const formatCommentDate = (timestamp: string) => {
  //   const date = new Date(timestamp);
  //   return date.toLocaleDateString('en-US', {
  //     month: 'short',
  //     day: 'numeric',
  //     hour: '2-digit',
  //     minute: '2-digit'
  //   });
  // };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: number) => {
    e.preventDefault();
    setPgId(id);
  }

  return (
    <div className="container mx-auto">
      {/* Trip Header */}
      <div className="relative rounded-xl overflow-hidden h-64 mb-8">
        <img
          src={trip.image}
          alt={trip.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{trip.name}</h1>
              <div className="flex items-center gap-4">
                <Badge variant={trip.privacy === 'public' ? "default" : "secondary"}>
                  {trip.privacy === 'public' ?
                    <><Globe className="mr-1 h-3 w-3" /> Public</> :
                    <><Lock className="mr-1 h-3 w-3" /> Private</>
                  }
                </Badge>
                <span className="text-white/90 text-sm">
                  {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                </span>
              </div>
            </div>
            <Button variant="secondary">
              <Edit className="mr-2 h-4 w-4" /> Edit Trip
            </Button>
          </div>
        </div>
      </div>

      {/* Trip Navigation */}
      <div className="flex overflow-x-auto pb-4 mb-8 gap-2">
        <Button asChild variant="outline">
          <Link to={`/trips/${tripId}`} onClick={(e) => handleClick(e, 0)} className="whitespace-nowrap">Overview</Link>
        </Button>
        <Button asChild variant="outline">

          <Link to={`/trips/${tripId}/itinerary`} onClick={(e) => handleClick(e, 1)} className="whitespace-nowrap">
            <CalendarDays className="mr-2 h-4 w-4" /> Jadwal
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to={`/trips/${tripId}/budget`} onClick={(e) => handleClick(e, 2)} className="whitespace-nowrap">
            <PieChart className="mr-2 h-4 w-4" /> Angaran
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to={`/trips/${tripId}/checklist`} onClick={(e) => handleClick(e, 3)} className="whitespace-nowrap">
            <CheckSquare className="mr-2 h-4 w-4" /> Checklist
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to={`/trips/${tripId}/map`} onClick={(e) => handleClick(e, 4)} className="whitespace-nowrap">
            <Map className="mr-2 h-4 w-4" /> Destinasi Map
          </Link>
        </Button>
      </div>

      {
        pagesDetails[pgId]
      }


    </div>
  );
};

export default TripDetailsPage;
