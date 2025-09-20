
import { GoogleGenAI, Type } from "@google/genai";
import { MarketingKitData, MarketingKitText } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = error => reject(error);
    });
};

const generateConcepts = async (brief: string): Promise<string[]> => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: `A 3D product render of a ${brief}, photorealistic, studio lighting, multiple angles (front view, side view, three-quarter view), on a clean minimalist white background.`,
            config: {
                numberOfImages: 4,
                outputMimeType: 'image/jpeg',
                aspectRatio: '1:1',
            }
        });
        
        return response.generatedImages.map(img => `data:image/jpeg;base64,${img.image.imageBytes}`);
    } catch (error) {
        console.error("Error generating concepts:", error);
        throw new Error("Could not generate product concepts. The model may have safety concerns with the prompt.");
    }
};

const refineWithText = async (brief: string, refinement: string): Promise<string[]> => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: `A refined 3D product render of a ${brief}, specifically modified to incorporate the following change: "${refinement}". The image should be photorealistic, with studio lighting, showing multiple angles on a clean minimalist white background.`,
            config: {
                numberOfImages: 4,
                outputMimeType: 'image/jpeg',
                aspectRatio: '1:1',
            }
        });
        
        return response.generatedImages.map(img => `data:image/jpeg;base64,${img.image.imageBytes}`);
    } catch (error) {
        console.error("Error refining with text:", error);
        throw new Error("Could not refine the product. The model may have safety concerns with the prompt.");
    }
};

const refineWithImage = async (brief: string, file: File): Promise<string[]> => {
    try {
        const base64Data = await fileToBase64(file);
        const imagePart = {
            inlineData: {
                data: base64Data,
                mimeType: file.type,
            },
        };
        const textPart = {
            text: `Analyze the key design elements of this image, including color palette, materials, textures, and overall aesthetic style. Provide a concise description of these elements that can be used to inspire a new product design.`,
        };
        
        const descriptionResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] }
        });

        const designInspiration = descriptionResponse.text;

        const imageResponse = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: `A 3D product render of a ${brief}, heavily inspired by the following design elements: "${designInspiration}". The image should be photorealistic, with studio lighting, showing multiple angles on a clean minimalist white background.`,
            config: {
                numberOfImages: 4,
                outputMimeType: 'image/jpeg',
                aspectRatio: '1:1',
            }
        });
        
        return imageResponse.generatedImages.map(img => `data:image/jpeg;base64,${img.image.imageBytes}`);

    } catch (error) {
        console.error("Error refining with image:", error);
        throw new Error("Could not refine the product with the provided image.");
    }
};

const generateMarketingKit = async (brief: string, productDescription: string): Promise<MarketingKitData> => {
    try {
        // Step 1: Generate Marketing Text
        const textResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Based on the following product brief: "${brief}" for "${productDescription}", generate a complete marketing kit.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        productName: { type: Type.STRING, description: "A catchy, memorable name for the product." },
                        productDescription: { type: Type.STRING, description: "A compelling 2-3 sentence description of the product." },
                        adCopy: { type: Type.STRING, description: "Short, punchy ad copy for a social media campaign." }
                    },
                    required: ["productName", "productDescription", "adCopy"]
                }
            }
        });
        
        const marketingText: MarketingKitText = JSON.parse(textResponse.text);

        // Step 2: Generate Marketing Visuals
        const visualPrompts = [
            `A vibrant lifestyle marketing photograph for social media featuring: ${marketingText.productName}. A person is happily using it in a modern, sun-drenched setting.`,
            `A sleek product-focused shot of the ${marketingText.productName} on a minimalist background that complements its design. Showcases its key features.`,
            `An action shot for an advertisement featuring the ${marketingText.productName}. The scene is energetic and targets the product's key demographic.`
        ];
        
        const visualPromises = visualPrompts.map(prompt => 
            ai.models.generateImages({
                model: 'imagen-4.0-generate-001',
                prompt,
                config: {
                    numberOfImages: 1,
                    aspectRatio: "1:1", // Square for social media
                    outputMimeType: 'image/jpeg',
                }
            })
        );
        
        const visualResponses = await Promise.all(visualPromises);
        const visuals = visualResponses.map(res => `data:image/jpeg;base64,${res.generatedImages[0].image.imageBytes}`);

        return { text: marketingText, visuals };

    } catch (error) {
        console.error("Error generating marketing kit:", error);
        throw new Error("Could not generate the marketing kit.");
    }
};


export const geminiService = {
  generateConcepts,
  refineWithText,
  refineWithImage,
  generateMarketingKit,
};
