import { GoogleGenAI, Type } from "@google/genai";
import type { FeedbackItem } from '../types';
import { FeedbackCategory } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const reviewSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        line: {
          type: Type.INTEGER,
          description: 'The line number of the code where the issue is found.',
        },
        category: {
          type: Type.STRING,
          description: 'The category of the feedback.',
          enum: Object.values(FeedbackCategory),
        },
        comment: {
          type: Type.STRING,
          description: 'A concise comment explaining the issue.',
        },
        suggestion: {
          type: Type.STRING,
          description: 'A code snippet or detailed explanation on how to fix the issue.',
        },
      },
      required: ['line', 'category', 'comment', 'suggestion'],
    },
};

export async function reviewCode(code: string, language: string): Promise<FeedbackItem[]> {
  const prompt = `
    As an expert C/C++ code reviewer, provide a strict and thorough review of the following ${language} code.

    Analyze for:
    - Bugs: Logic errors, null pointers, memory leaks, undefined behavior.
    - Performance: Bottlenecks, inefficient algorithms.
    - Style: Readability, consistency with common C/C++ style guides.
    - Security: Vulnerabilities like buffer overflows, format string bugs.
    - Best Practices: Modern C++ features, resource management (RAII), and other improvements.

    For each issue, provide a specific, actionable feedback item.
    Return your feedback as a JSON array. If you find no issues, return an empty array.

    Code to review:
    \`\`\`${language}
    ${code}
    \`\`\`
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: reviewSchema,
        temperature: 0.2,
      },
    });

    const jsonText = response.text.trim();
    if (!jsonText) {
        return [];
    }
    
    const parsedResponse = JSON.parse(jsonText);
    
    // Validate that the response is an array before returning
    if (Array.isArray(parsedResponse)) {
      return parsedResponse as FeedbackItem[];
    } else {
      console.warn("Gemini response was not an array, returning empty.", parsedResponse);
      return [];
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get review from Gemini. Please check the console for more details.");
  }
}
