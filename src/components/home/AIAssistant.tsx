import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Sparkles } from "lucide-react";
import AIChat from "@/components/AIChat/AIChat";
import { AxiosClient } from "@/lib/utils";

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const syncDataForAI = async () => {
    try {
      setisLoading(true);
      await AxiosClient.post("/ai/sync-data");
    } catch (error) {
      console.error("Error syncing data for AI:", error);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    syncDataForAI();
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {isOpen && (
        <div className="w-[400px] h-[600px] bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="flex justify-between items-center p-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Sparkles className="w-4 h-4 text-blue-500" />
              AI Travel Assistant
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={toggleChat}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="h-full overflow-y-auto">
              <AIChat />
            </div>
          </div>
        </div>
      )}

      <Button
        onClick={toggleChat}
        className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition-transform hover:scale-110"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Sparkles className="h-6 w-6 animate-pulse" />
        )}
      </Button>
    </div>
  );
};

export default AIAssistant;
