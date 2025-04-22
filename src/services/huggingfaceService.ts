
// This file handles interactions with the Hugging Face API

interface HuggingFaceConfig {
  apiKey: string;
  models: {
    main: string;
  };
}

const defaultConfig: HuggingFaceConfig = {
  apiKey: "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",
  models: {
    main: "mistralai/Mixtral-8x7B-Instruct-v0.1"
  }
};

let config: HuggingFaceConfig = { ...defaultConfig };

export const configureHuggingFace = (apiKey: string, models?: Partial<typeof defaultConfig.models>) => {
  config.apiKey = apiKey;
  if (models) {
    config.models = { ...config.models, ...models };
  }
  return config;
};

export const getHuggingFaceConfig = (): HuggingFaceConfig => {
  return { ...config };
};

export const processMessage = async (
  message: string, 
  files?: File[],
  task?: 'review' | 'summarize' | 'insights' | 'solutions'
): Promise<string> => {
  if (!config.apiKey) {
    throw new Error("Hugging Face API key not configured");
  }

  try {
    console.log(`Processing ${task || 'general'} request with model: ${config.models.main}`);
    console.log(`Message: ${message}`);
    
    if (files && files.length > 0) {
      console.log(`Files: ${files.map(f => f.name).join(", ")}`);
    }

    const response = await fetch(`https://api-inference.huggingface.co/models/${config.models.main}`, {
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
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }
    
    const result = await response.json();
    return extractGeneratedText(result);
  } catch (error) {
    console.error("Error processing message with Hugging Face:", error);
    throw error;
  }
};

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

const extractGeneratedText = (result: any): string => {
  if (Array.isArray(result) && result[0]?.generated_text) {
    return result[0].generated_text;
  } else if (result.generated_text) {
    return result.generated_text;
  } else {
    return JSON.stringify(result).slice(0, 1000);
  }
};

export default {
  configureHuggingFace,
  processMessage,
  getHuggingFaceConfig,
};
