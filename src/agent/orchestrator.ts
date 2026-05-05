import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export interface GeneratedArchitecture {
  securityRules: string;
  flutterModels: string;
  repositoryLayer: string;
  rawResponse: string;
}

export async function generateArchitecture(prompt: string): Promise<GeneratedArchitecture> {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
    throw new Error('GEMINI_API_KEY is missing or invalid in .env file. Security Requirement: Never commit secrets.');
  }

  const systemPrompt = `
You are the Flutter-Firebase Schema & Logic Orchestrator.
Based on the user's feature description, you must generate:
1. Firestore Security Rules (Secure, production-ready, no read/write true globally)
2. Flutter Data Models (using freezed and json_serializable)
3. Flutter Repository Class (using cloud_firestore, include try-catch error handling)

Return the response in JSON format.
`;

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    systemInstruction: systemPrompt,
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: SchemaType.OBJECT,
        properties: {
          securityRules: { type: SchemaType.STRING },
          flutterModels: { type: SchemaType.STRING },
          repositoryLayer: { type: SchemaType.STRING }
        },
        required: ["securityRules", "flutterModels", "repositoryLayer"]
      }
    }
  });

  const result = await model.generateContent(prompt);
  const response = result.response;
  const content = response.text();

  if (!content) {
    throw new Error('Failed to generate content.');
  }

  const parsed = JSON.parse(content);
  return {
    securityRules: parsed.securityRules,
    flutterModels: parsed.flutterModels,
    repositoryLayer: parsed.repositoryLayer,
    rawResponse: content
  };
}
