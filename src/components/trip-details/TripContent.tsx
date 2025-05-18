import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { trips, comments as mockComments, Trip } from "@/data/mockData";

import { CalendarDays, Map, PieChart, CheckSquare, Edit, Globe, Lock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


interface Comment {
  id: string;
  user_id: number;
  user_name: string;
  userAvatar: string;
  text: string;
  timestamp: string;
}

export default function TripContent({ trip }: { trip: Trip }) {
  const { tripId } = useParams<{ tripId: string }>();
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState("");

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


  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === "") return;

    const newCommentObj = {
      id: `c${comments.length + 1}`,
      userId: "m1",
      userName: "John Doe",
      userAvatar: "https://i.pravatar.cc/150?img=1",
      text: newComment,
      timestamp: new Date().toISOString()
    };

    setComments([...comments, newCommentObj]);
    setNewComment("");
  };


  const formatCommentDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column */}
      <div className="lg:col-span-2">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Tentang trip ini</h2>
            <p className="text-gray-700 mb-6">{trip.description}</p>

            <div className="mb-6">
              <h3 className="font-medium mb-3">Destination</h3>
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-travelmate-charcoal">
                  <Map className="h-5 w-5" />
                  <span className="font-medium">{trip.destination}</span>
                </div>
              </div>
            </div>

            <h3 className="font-medium mb-3">Discussion</h3>
            <div className="space-y-4">
              {trip.comments.map(comment => (
                <div key={comment.id} className="flex gap-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={'https://i.pravatar.cc/150?img=1'} />
                    <AvatarFallback>{comment.username}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{comment.username}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatCommentDate(comment.created_at)}
                        </span>
                      </div>
                      <p>{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))}

              <form onSubmit={handleAddComment} className="flex gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="https://i.pravatar.cc/150?img=1" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex">
                  <input
                    type="text"
                    className="flex-1 bg-muted/50 rounded-l-lg px-4 focus:outline-none focus:ring-1 focus:ring-travelmate-blue"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <Button type="submit" className="rounded-l-none">Post</Button>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column */}
      <div>
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Petualang</h2>
            <div className="space-y-3">
              {trip.members.map(member => (
                <div key={member.user_id} className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.username}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{member.username}</div>
                    <div className="text-sm text-muted-foreground">
                      {member.role === 'admin' ? 'Trip Organizer' : 'Traveler'}
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4">
                <Plus className="mr-2 h-4 w-4" /> Undang Petualang
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Akses Cepat</h2>
            <div className="space-y-3">
              <Button variant="outline" asChild className="w-full justify-start">
                <Link to={`/trips/${tripId}/itinerary`}>
                  <CalendarDays className="mr-2 h-4 w-4" /> Lihat Jadwal
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start">
                <Link to={`/trips/${tripId}/budget`}>
                  <PieChart className="mr-2 h-4 w-4" /> Atur Anggaran
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start">
                <Link to={`/trips/${tripId}/checklist`}>
                  <CheckSquare className="mr-2 h-4 w-4" /> Update Checklist
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start">
                <Link to={`/trips/${tripId}/map`}>
                  <Map className="mr-2 h-4 w-4" /> Destination Map
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
