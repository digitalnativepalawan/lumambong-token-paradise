import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Edit3, Save, X, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface BusinessPlanButton {
  id: string;
  name: string;
  url: string;
  is_active: boolean;
  order_index: number;
}

const AdminBusinessPlanButtons = () => {
  const [buttons, setButtons] = useState<BusinessPlanButton[]>([]);
  const [editingButton, setEditingButton] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', url: '', is_active: true });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchButtons();
  }, []);

  const fetchButtons = async () => {
    try {
      const { data, error } = await supabase
        .from('business_plan_buttons')
        .select('*')
        .order('order_index');

      if (error) throw error;
      setButtons(data || []);
    } catch (error) {
      console.error('Error fetching buttons:', error);
      toast({
        title: "Error",
        description: "Failed to fetch buttons",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (button: BusinessPlanButton) => {
    setEditingButton(button.id);
    setEditForm({
      name: button.name,
      url: button.url,
      is_active: button.is_active
    });
  };

  const handleSave = async (buttonId: string) => {
    try {
      const { error } = await supabase
        .from('business_plan_buttons')
        .update(editForm)
        .eq('id', buttonId);

      if (error) throw error;

      setButtons(buttons.map(btn => 
        btn.id === buttonId ? { ...btn, ...editForm } : btn
      ));
      setEditingButton(null);
      toast({
        title: "Success",
        description: "Button updated successfully",
      });
    } catch (error) {
      console.error('Error updating button:', error);
      toast({
        title: "Error",
        description: "Failed to update button",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (buttonId: string) => {
    if (!confirm('Are you sure you want to delete this button?')) return;

    try {
      const { error } = await supabase
        .from('business_plan_buttons')
        .delete()
        .eq('id', buttonId);

      if (error) throw error;

      setButtons(buttons.filter(btn => btn.id !== buttonId));
      toast({
        title: "Success",
        description: "Button deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting button:', error);
      toast({
        title: "Error",
        description: "Failed to delete button",
        variant: "destructive",
      });
    }
  };

  const handleAddNew = async () => {
    try {
      const maxOrder = Math.max(...buttons.map(b => b.order_index), 0);
      const { error } = await supabase
        .from('business_plan_buttons')
        .insert({
          name: 'New Button',
          url: 'https://example.com',
          order_index: maxOrder + 1
        });

      if (error) throw error;

      await fetchButtons();
      toast({
        title: "Success",
        description: "New button added successfully",
      });
    } catch (error) {
      console.error('Error adding button:', error);
      toast({
        title: "Error",
        description: "Failed to add button",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="text-center">Loading buttons...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Business Plan Buttons</CardTitle>
          <Button onClick={handleAddNew} size="sm" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Button
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {buttons.map((button) => (
            <div key={button.id} className="border rounded-lg p-4">
              {editingButton === button.id ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor={`name-${button.id}`}>Button Name</Label>
                    <Input
                      id={`name-${button.id}`}
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      placeholder="Enter button name"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`url-${button.id}`}>URL</Label>
                    <Input
                      id={`url-${button.id}`}
                      value={editForm.url}
                      onChange={(e) => setEditForm({ ...editForm, url: e.target.value })}
                      placeholder="Enter URL"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`active-${button.id}`}
                      checked={editForm.is_active}
                      onCheckedChange={(checked) => setEditForm({ ...editForm, is_active: checked })}
                    />
                    <Label htmlFor={`active-${button.id}`}>Active</Label>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleSave(button.id)} size="sm">
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button 
                      onClick={() => setEditingButton(null)} 
                      variant="outline" 
                      size="sm"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{button.name}</h4>
                    <p className="text-sm text-gray-600">{button.url}</p>
                    <p className="text-xs text-gray-500">
                      Status: {button.is_active ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleEdit(button)} 
                      variant="outline" 
                      size="sm"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button 
                      onClick={() => handleDelete(button.id)} 
                      variant="destructive" 
                      size="sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminBusinessPlanButtons;