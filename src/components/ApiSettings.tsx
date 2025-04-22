
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { configureHuggingFace } from "@/services/huggingfaceService";

interface ApiSettingsProps {
  onClose: () => void;
}

const ApiSettings: React.FC<ApiSettingsProps> = ({ onClose }) => {
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("mistralai/Mixtral-8x7B-Instruct-v0.1");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    if (!apiKey.trim()) {
      toast.error("Please enter your HuggingFace API key");
      return;
    }

    setIsLoading(true);
    try {
      configureHuggingFace(apiKey, model);
      toast.success("API settings saved successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to save API settings");
      console.error("API settings error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <Label htmlFor="apiKey">HuggingFace API Key</Label>
        <Input
          id="apiKey"
          type="password"
          placeholder="Enter your API key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          required
        />
        <p className="text-xs text-muted-foreground">
          You can find your API key in your HuggingFace account settings
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="model">Model</Label>
        <Input
          id="model"
          type="text"
          placeholder="Enter model name"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          Default: mistralai/Mixtral-8x7B-Instruct-v0.1
        </p>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          variant="outline"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          disabled={isLoading}
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default ApiSettings;
