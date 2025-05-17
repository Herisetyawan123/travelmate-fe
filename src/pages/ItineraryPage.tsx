
import { useState } from "react";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { Plus, GripVertical, MapPin, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { itineraryItems as initialItems } from "@/data/mockData";

const getDaysFromItems = (items: typeof initialItems) => {
  const days = [...new Set(items.map(item => item.day))].sort((a, b) => a - b);
  return days;
};

const ItineraryPage = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const [itineraryItems, setItineraryItems] = useState(initialItems);
  const [currentDay, setCurrentDay] = useState<number>(1);

  const days = getDaysFromItems(itineraryItems);

  const filteredItems = itineraryItems
    .filter(item => item.day === currentDay)
    .sort((a, b) => a.time.localeCompare(b.time));

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'activity':
        return "bg-blue-100 text-blue-800";
      case 'transportation':
        return "bg-green-100 text-green-800";
      case 'accommodation':
        return "bg-purple-100 text-purple-800";
      case 'food':
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;
    if (destination.index === source.index) return;

    const newItems = [...itineraryItems];
    const itemsForCurrentDay = newItems.filter(item => item.day === currentDay);
    const reorderedItem = itemsForCurrentDay[source.index];

    const nonDayItems = newItems.filter(item => item.day !== currentDay);
    const dayItems = newItems.filter(item => item.day === currentDay);
    dayItems.splice(source.index, 1);

    dayItems.splice(destination.index, 0, reorderedItem);

    setItineraryItems([...nonDayItems, ...dayItems]);
  };

  const handleDeleteItem = (id: string) => {
    setItineraryItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-travelmate-charcoal">Jadwal Perjalanan</h1>
          <p className="text-muted-foreground">Rancang aktivitas harian mu</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Tambah Aktivitas
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Day Selection Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Hari</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Mobile Day Selector */}
              <div className="block md:hidden mb-4">
                <Select
                  value={currentDay.toString()}
                  onValueChange={(value) => setCurrentDay(parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Day" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map(day => (
                      <SelectItem key={day} value={day.toString()}>
                        Day {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Desktop Day List */}
              <div className="hidden md:flex md:flex-col space-y-2">
                {days.map(day => (
                  <Button
                    key={day}
                    variant={currentDay === day ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setCurrentDay(day)}
                  >
                    Day {day}
                  </Button>
                ))}
                <Button variant="ghost" className="justify-start">
                  <Plus className="mr-2 h-4 w-4" /> Tambah Hari
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Itinerary Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Jadwal Hari {currentDay}</CardTitle>
              <Badge variant="outline" className="ml-2">
                {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
              </Badge>
            </CardHeader>
            <CardContent>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="itinerary-items">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-4"
                    >
                      {filteredItems.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-gray-500 mb-4">No activities planned for this day</p>
                          <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Activity
                          </Button>
                        </div>
                      ) : (
                        filteredItems.map((item, index) => (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="bg-white border rounded-lg p-4 flex gap-3"
                              >
                                <div {...provided.dragHandleProps} className="flex items-center cursor-grab">
                                  <GripVertical className="h-5 w-5 text-gray-400" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                                    <div className="flex items-center gap-2">
                                      <Badge className={getCategoryColor(item.category)}>
                                        {item.category}
                                      </Badge>
                                      <div className="flex items-center text-muted-foreground">
                                        <Clock className="mr-1 h-3.5 w-3.5" />
                                        <span className="text-sm">{item.time}</span>
                                      </div>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 shrink-0"
                                      onClick={() => handleDeleteItem(item.id)}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                  <h3 className="font-medium mb-1">{item.title}</h3>
                                  <div className="flex items-center text-muted-foreground mb-2">
                                    <MapPin className="mr-1 h-3.5 w-3.5" />
                                    <span className="text-sm">{item.location}</span>
                                  </div>
                                  <p className="text-sm text-gray-600">{item.description}</p>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ItineraryPage;
