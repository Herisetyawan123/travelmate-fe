
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { checklistItems as initialItems } from "@/data/mockData";

// Group checklist items by category
const groupItemsByCategory = (items: typeof initialItems) => {
  return items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof initialItems>);
};

const formatCategoryName = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

const ChecklistPage = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const [checklistItems, setChecklistItems] = useState(initialItems);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const groupedItems = groupItemsByCategory(checklistItems);
  const categories = ["all", ...Object.keys(groupedItems)];
  
  const filteredItems = selectedCategory === "all" 
    ? checklistItems 
    : checklistItems.filter(item => item.category === selectedCategory);
  
  const completedCount = checklistItems.filter(item => item.completed).length;
  const progressPercentage = Math.round((completedCount / checklistItems.length) * 100);
  
  const handleToggleItem = (id: string) => {
    setChecklistItems(prev => 
      prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item)
    );
  };
  
  const handleDeleteItem = (id: string) => {
    setChecklistItems(prev => prev.filter(item => item.id !== id));
  };
  
  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-travelmate-charcoal">Trip Checklist</h1>
          <p className="text-muted-foreground">Track items to pack and tasks to complete</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Item
        </Button>
      </div>
      
      {/* Progress Bar */}
      <Card className="mb-6">
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Packing Progress</CardTitle>
            <div className="text-sm font-medium">
              {completedCount} of {checklistItems.length} items packed
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="w-full bg-muted rounded-full h-4">
            <div 
              className="bg-travelmate-blue h-4 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="text-right text-sm text-muted-foreground mt-1">
            {progressPercentage}% complete
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Category Selection */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent className="px-2 py-1">
              <div className="space-y-1">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === "all" ? "All Items" : formatCategoryName(category)}
                    {category !== "all" && (
                      <div className="ml-auto bg-muted rounded-full px-2 py-0.5 text-xs">
                        {groupedItems[category].length}
                      </div>
                    )}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Checklist Items */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedCategory === "all" ? "All Items" : formatCategoryName(selectedCategory)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredItems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No items in this category</p>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Item
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredItems.map((item) => (
                    <div 
                      key={item.id} 
                      className={`flex items-center justify-between p-3 rounded-lg border ${item.completed ? 'bg-muted/50' : ''}`}
                    >
                      <div className="flex items-center space-x-3">
                        <Checkbox 
                          checked={item.completed} 
                          onCheckedChange={() => handleToggleItem(item.id)}
                          id={item.id}
                        />
                        <label 
                          htmlFor={item.id}
                          className={`cursor-pointer ${item.completed ? 'line-through text-muted-foreground' : ''}`}
                        >
                          {item.text}
                        </label>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Photo Gallery Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Trip Photos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="rounded-lg overflow-hidden h-48">
                <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                  <span className="text-gray-500">Photo {item}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" /> Add Photos
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChecklistPage;
