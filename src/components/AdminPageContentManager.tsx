import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Edit3, Trash2, Save, X, ArrowUp, ArrowDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PageContent {
  id: string;
  page_type: string;
  section_id: string;
  title: string;
  content: string;
  order_index: number;
  is_active: boolean;
}

interface AdminPageContentManagerProps {
  onClose: () => void;
}

const AdminPageContentManager = ({ onClose }: AdminPageContentManagerProps) => {
  const [whitepaperContent, setWhitepaperContent] = useState<PageContent[]>([]);
  const [businessPlanContent, setBusinessPlanContent] = useState<PageContent[]>([]);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [newSection, setNewSection] = useState({ page_type: "", title: "", content: "", section_id: "" });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .order('order_index');

      if (error) throw error;

      const whitepaper = data?.filter(item => item.page_type === 'whitepaper') || [];
      const businessPlan = data?.filter(item => item.page_type === 'business_plan') || [];

      setWhitepaperContent(whitepaper);
      setBusinessPlanContent(businessPlan);
    } catch (error) {
      console.error('Error fetching content:', error);
      toast({
        title: "Error",
        description: "Failed to fetch page content",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (item: PageContent) => {
    try {
      const { error } = await supabase
        .from('page_content')
        .update({
          title: item.title,
          content: item.content,
          section_id: item.section_id,
        })
        .eq('id', item.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Content updated successfully",
      });

      setEditingItem(null);
      fetchContent();
    } catch (error) {
      console.error('Error updating content:', error);
      toast({
        title: "Error",
        description: "Failed to update content",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('page_content')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Content deleted successfully",
      });

      fetchContent();
    } catch (error) {
      console.error('Error deleting content:', error);
      toast({
        title: "Error",
        description: "Failed to delete content",
        variant: "destructive",
      });
    }
  };

  const handleAddSection = async () => {
    if (!newSection.page_type || !newSection.title || !newSection.content || !newSection.section_id) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const currentContent = newSection.page_type === 'whitepaper' ? whitepaperContent : businessPlanContent;
      const maxOrder = Math.max(...currentContent.map(item => item.order_index), 0);

      const { error } = await supabase
        .from('page_content')
        .insert({
          page_type: newSection.page_type,
          section_id: newSection.section_id,
          title: newSection.title,
          content: newSection.content,
          order_index: maxOrder + 1,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Section added successfully",
      });

      setNewSection({ page_type: "", title: "", content: "", section_id: "" });
      fetchContent();
    } catch (error) {
      console.error('Error adding section:', error);
      toast({
        title: "Error",
        description: "Failed to add section",
        variant: "destructive",
      });
    }
  };

  const handleReorder = async (item: PageContent, direction: 'up' | 'down') => {
    const currentContent = item.page_type === 'whitepaper' ? whitepaperContent : businessPlanContent;
    const currentIndex = currentContent.findIndex(c => c.id === item.id);
    
    if ((direction === 'up' && currentIndex === 0) || (direction === 'down' && currentIndex === currentContent.length - 1)) {
      return;
    }

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const swapItem = currentContent[newIndex];

    try {
      await supabase
        .from('page_content')
        .update({ order_index: swapItem.order_index })
        .eq('id', item.id);

      await supabase
        .from('page_content')
        .update({ order_index: item.order_index })
        .eq('id', swapItem.id);

      fetchContent();
    } catch (error) {
      console.error('Error reordering:', error);
      toast({
        title: "Error",
        description: "Failed to reorder content",
        variant: "destructive",
      });
    }
  };

  const ContentTable = ({ content, pageType }: { content: PageContent[], pageType: string }) => (
    <Card>
      <CardHeader>
        <CardTitle>Content Sections</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Order</TableHead>
                <TableHead>Section ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="hidden lg:table-cell">Content Preview</TableHead>
                <TableHead className="w-[200px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {content.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="font-mono text-sm">
                    {editingItem === item.id ? (
                      <Input
                        value={item.section_id}
                        onChange={(e) => {
                          const updated = content.map(c => 
                            c.id === item.id ? { ...c, section_id: e.target.value } : c
                          );
                          if (pageType === 'whitepaper') {
                            setWhitepaperContent(updated);
                          } else {
                            setBusinessPlanContent(updated);
                          }
                        }}
                        className="h-8 text-xs"
                      />
                    ) : (
                      item.section_id
                    )}
                  </TableCell>
                  <TableCell>
                    {editingItem === item.id ? (
                      <Input
                        value={item.title}
                        onChange={(e) => {
                          const updated = content.map(c => 
                            c.id === item.id ? { ...c, title: e.target.value } : c
                          );
                          if (pageType === 'whitepaper') {
                            setWhitepaperContent(updated);
                          } else {
                            setBusinessPlanContent(updated);
                          }
                        }}
                        className="h-8 text-xs"
                      />
                    ) : (
                      <div className="max-w-[200px] truncate">{item.title}</div>
                    )}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {editingItem === item.id ? (
                      <Textarea
                        value={item.content}
                        onChange={(e) => {
                          const updated = content.map(c => 
                            c.id === item.id ? { ...c, content: e.target.value } : c
                          );
                          if (pageType === 'whitepaper') {
                            setWhitepaperContent(updated);
                          } else {
                            setBusinessPlanContent(updated);
                          }
                        }}
                        className="h-20 text-xs resize-none"
                      />
                    ) : (
                      <div className="max-w-[300px] text-xs text-muted-foreground truncate">
                        {item.content.substring(0, 100)}...
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {editingItem === item.id ? (
                        <>
                          <Button 
                            size="sm" 
                            onClick={() => handleSave(item)}
                            className="h-7 px-2"
                          >
                            <Save className="w-3 h-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => setEditingItem(null)}
                            className="h-7 px-2"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleReorder(item, 'up')}
                            disabled={index === 0}
                            className="h-7 px-2"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleReorder(item, 'down')}
                            disabled={index === content.length - 1}
                            className="h-7 px-2"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingItem(item.id)}
                            className="h-7 px-2"
                          >
                            <Edit3 className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(item.id)}
                            className="h-7 px-2"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">Page Content Manager</h2>
          <Button variant="outline" onClick={onClose}>
            <X className="w-4 h-4 mr-2" />
            Close
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <Tabs defaultValue="whitepaper" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="whitepaper">Whitepaper</TabsTrigger>
              <TabsTrigger value="business-plan">Business Plan</TabsTrigger>
            </TabsList>

            <TabsContent value="whitepaper" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Whitepaper Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    value={newSection.page_type === 'whitepaper' ? newSection.section_id : ''}
                    onChange={(e) => setNewSection({ ...newSection, section_id: e.target.value, page_type: 'whitepaper' })}
                    placeholder="Section ID (e.g., executive-summary)"
                  />
                  <Input
                    value={newSection.page_type === 'whitepaper' ? newSection.title : ''}
                    onChange={(e) => setNewSection({ ...newSection, title: e.target.value, page_type: 'whitepaper' })}
                    placeholder="Section Title"
                  />
                  <Textarea
                    value={newSection.page_type === 'whitepaper' ? newSection.content : ''}
                    onChange={(e) => setNewSection({ ...newSection, content: e.target.value, page_type: 'whitepaper' })}
                    placeholder="Section Content"
                    rows={4}
                  />
                  <Button onClick={handleAddSection}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Section
                  </Button>
                </CardContent>
              </Card>

              <ContentTable content={whitepaperContent} pageType="whitepaper" />
            </TabsContent>

            <TabsContent value="business-plan" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Business Plan Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    value={newSection.page_type === 'business_plan' ? newSection.section_id : ''}
                    onChange={(e) => setNewSection({ ...newSection, section_id: e.target.value, page_type: 'business_plan' })}
                    placeholder="Section ID (e.g., market-analysis)"
                  />
                  <Input
                    value={newSection.page_type === 'business_plan' ? newSection.title : ''}
                    onChange={(e) => setNewSection({ ...newSection, title: e.target.value, page_type: 'business_plan' })}
                    placeholder="Section Title"
                  />
                  <Textarea
                    value={newSection.page_type === 'business_plan' ? newSection.content : ''}
                    onChange={(e) => setNewSection({ ...newSection, content: e.target.value, page_type: 'business_plan' })}
                    placeholder="Section Content"
                    rows={4}
                  />
                  <Button onClick={handleAddSection}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Section
                  </Button>
                </CardContent>
              </Card>

              <ContentTable content={businessPlanContent} pageType="business_plan" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminPageContentManager;