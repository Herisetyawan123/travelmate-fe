import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trips } from "@/data/mockData";
import { CalendarDays, Map, PieChart, CheckSquare, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  // Calculate some statistics for the dashboard
  const totalTrips = trips.length;
  const upcomingTrips = trips.filter(trip => trip.status === 'upcoming').length;
  const pastTrips = trips.filter(trip => trip.status === 'past').length;

  // Get the most recent trip
  const recentTrip = [...trips].sort((a, b) =>
    new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  )[0];

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-travelmate-charcoal">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your travel plans</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Trips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalTrips}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Upcoming Trips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{upcomingTrips}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Completed Trips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pastTrips}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Trip</CardTitle>
              <CardDescription>Your most recent travel plan</CardDescription>
            </CardHeader>
            <CardContent>
              {recentTrip ? (
                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden h-40">
                    <img
                      src={recentTrip.image}
                      alt={recentTrip.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                      <h3 className="text-xl font-bold text-white">{recentTrip.name}</h3>
                      <p className="text-white/90 text-sm">{recentTrip.destination}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Link
                      to={`/trips/${recentTrip.id}/itinerary`}
                      className="flex items-center gap-2 px-3 py-2 bg-muted rounded-md text-sm hover:bg-muted/80"
                    >
                      <CalendarDays className="h-4 w-4" />
                      <span>Itinerary</span>
                    </Link>
                    <Link
                      to={`/trips/${recentTrip.id}/budget`}
                      className="flex items-center gap-2 px-3 py-2 bg-muted rounded-md text-sm hover:bg-muted/80"
                    >
                      <PieChart className="h-4 w-4" />
                      <span>Budget</span>
                    </Link>
                    <Link
                      to={`/trips/${recentTrip.id}/checklist`}
                      className="flex items-center gap-2 px-3 py-2 bg-muted rounded-md text-sm hover:bg-muted/80"
                    >
                      <CheckSquare className="h-4 w-4" />
                      <span>Checklist</span>
                    </Link>
                    <Link
                      to={`/trips/${recentTrip.id}/map`}
                      className="flex items-center gap-2 px-3 py-2 bg-muted rounded-md text-sm hover:bg-muted/80"
                    >
                      <Map className="h-4 w-4" />
                      <span>Map</span>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No trips found</p>
                  <Link
                    to="/trips/new"
                    className="text-travelmate-blue hover:underline"
                  >
                    Create your first trip
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Links */}
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Shortcuts to common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link
                to="/trips/new"
                className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-travelmate-blue/10">
                  <TrendingUp className="h-4 w-4 text-travelmate-blue" />
                </div>
                <div>
                  <p className="font-medium">Create New Trip</p>
                  <p className="text-sm text-muted-foreground">Plan your next adventure</p>
                </div>
              </Link>

              <Link
                to="/mytrips"
                className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-travelmate-purple/10">
                  <Users className="h-4 w-4 text-travelmate-purple" />
                </div>
                <div>
                  <p className="font-medium">My Trips</p>
                  <p className="text-sm text-muted-foreground">View your travel plans</p>
                </div>
              </Link>

              <Link
                to="/profile"
                className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-travelmate-green/10">
                  <Users className="h-4 w-4 text-travelmate-green" />
                </div>
                <div>
                  <p className="font-medium">Profile Settings</p>
                  <p className="text-sm text-muted-foreground">Update your information</p>
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;