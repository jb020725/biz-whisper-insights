
// This file handles interactions with the Hugging Face API

// Configuration for the Hugging Face API
interface HuggingFaceConfig {
  apiKey: string;
  models: {
    main: string;
    summarization: string;
    backup: string;
  };
}

// Default configuration with the provided API key
// DEVELOPER: These values should only be edited by the developer
const defaultConfig: HuggingFaceConfig = {
  apiKey: "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",
  models: {
    main: "mistralai/Mixtral-8x7B-Instruct-v0.1",
    summarization: "facebook/bart-large-cnn",
    backup: "tiiuae/falcon-7b-instruct"
  }
};

// Store the configuration
let config: HuggingFaceConfig = { ...defaultConfig };

// Set the API key and models
export const configureHuggingFace = (apiKey: string, models?: Partial<typeof defaultConfig.models>) => {
  config.apiKey = apiKey;
  if (models) {
    config.models = { ...config.models, ...models };
  }
  return config;
};

// Get current configuration (for developer use only)
export const getHuggingFaceConfig = (): HuggingFaceConfig => {
  return { ...config };
};

// Process a message with appropriate Hugging Face model based on task
export const processMessage = async (
  message: string, 
  files?: File[],
  task?: 'review' | 'summarize' | 'insights' | 'solutions'
): Promise<string> => {
  // Check if API key is configured
  if (!config.apiKey) {
    throw new Error("Hugging Face API key not configured");
  }

  try {
    // Select the appropriate model based on the task
    let modelToUse = config.models.main; // Default to main model (Mixtral)
    
    if (task === 'summarize') {
      modelToUse = config.models.summarization; // Use BART for summarization
    }
    
    console.log(`Processing ${task || 'general'} request with model: ${modelToUse}`);
    console.log(`Message: ${message}`);
    
    if (files && files.length > 0) {
      console.log(`Files: ${files.map(f => f.name).join(", ")}`);
      // Here you would process the files (extract text from PDFs, DOCXs, etc.)
    }

    // In a real implementation with the Hugging Face API, you would make a call like:
    const response = await fetch(`https://api-inference.huggingface.co/models/${modelToUse}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: buildPrompt(task, message),
        parameters: {
          max_length: 500,
          temperature: 0.7,
          top_p: 0.95,
        }
      }),
    });
    
    // Check if response is OK
    if (!response.ok) {
      // If the main model fails and we're not already using the backup, try the backup model
      if (modelToUse !== config.models.backup) {
        console.log("Primary model failed, trying backup model");
        modelToUse = config.models.backup;
        
        const backupResponse = await fetch(`https://api-inference.huggingface.co/models/${modelToUse}`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${config.apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: buildPrompt(task, message),
            parameters: {
              max_length: 500,
              temperature: 0.7,
              top_p: 0.95,
            }
          }),
        });
        
        if (backupResponse.ok) {
          const result = await backupResponse.json();
          return extractGeneratedText(result, modelToUse);
        } else {
          throw new Error(`Both primary and backup models failed: ${backupResponse.statusText}`);
        }
      } else {
        throw new Error(`API request failed: ${response.statusText}`);
      }
    }
    
    const result = await response.json();
    return extractGeneratedText(result, modelToUse);
  } catch (error) {
    console.error("Error processing message with Hugging Face:", error);
    throw new Error("Failed to process message with Hugging Face");
  }
};

// Helper function to build prompts based on task
const buildPrompt = (task: string | undefined, message: string): string => {
  switch (task) {
    case 'review':
      return `Review the following business document and provide a comprehensive analysis: ${message}`;
    case 'summarize':
      return `Summarize the following business document concisely: ${message}`;
    case 'insights':
      return `Extract key insights and opportunities from the following business document: ${message}`;
    case 'solutions':
      return `Generate strategic solutions based on the following business problem: ${message}`;
    default:
      return message;
  }
};

// Helper function to extract the generated text from the API response
const extractGeneratedText = (result: any, model: string): string => {
  // Different models return different response formats
  if (model.includes('bart')) {
    // BART model usually returns a summary field
    return result[0]?.summary_text || "No summary generated";
  } else if (Array.isArray(result) && result[0]?.generated_text) {
    // Mixtral and many others return generated_text
    return result[0].generated_text;
  } else if (result.generated_text) {
    // Some models return a single object
    return result.generated_text;
  } else {
    // Fallback for other formats
    return JSON.stringify(result).slice(0, 1000);
  }
};

export default {
  configureHuggingFace,
  processMessage,
  getHuggingFaceConfig,
};
