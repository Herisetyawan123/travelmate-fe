
import { Link } from "react-router-dom";
import { ArrowRight, Map, Calendar, Users, CheckSquare, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: <Users className="h-8 w-8 text-travelmate-blue" />,
    title: "Collaborative Planning",
    description: "Plan trips together with friends and family in real-time."
  },
  {
    icon: <Calendar className="h-8 w-8 text-travelmate-blue" />,
    title: "Interactive Itineraries",
    description: "Create and organize daily activities with our drag-and-drop interface."
  },
  {
    icon: <PieChart className="h-8 w-8 text-travelmate-blue" />,
    title: "Budget Tracking",
    description: "Keep track of expenses and split costs among trip participants."
  },
  {
    icon: <CheckSquare className="h-8 w-8 text-travelmate-blue" />,
    title: "Smart Checklists",
    description: "Never forget essentials with customizable packing lists."
  },
  {
    icon: <Map className="h-8 w-8 text-travelmate-blue" />,
    title: "Map Integration",
    description: "Visualize your destinations and plan routes efficiently."
  }
];

const HomePage = () => {
  return (
    <div className="container mx-auto pb-16">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-travelmate-charcoal">
            Travel Planning Made <span className="text-travelmate-blue">Simple</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10">
            Plan your trips collaboratively with friends and family.
            Create itineraries, track expenses, and make memories together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-travelmate-blue hover:bg-travelmate-blue/90">
              <Link to="/trips">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/login">Login / Register</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50 rounded-xl">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-travelmate-charcoal">
            Everything you need for <span className="text-travelmate-blue">perfect trips</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto bg-travelmate-purple p-10 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-travelmate-charcoal">
            Ready to start planning your next adventure?
          </h2>
          <p className="text-xl mb-8 text-gray-700">
            Join TravelMate today and make your travel planning experience stress-free and enjoyable.
          </p>
          <Button asChild size="lg" className="bg-travelmate-blue hover:bg-travelmate-blue/90">
            <Link to="/trips">Start Planning Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
