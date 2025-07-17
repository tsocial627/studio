'use server';

/**
 * @fileOverview A smart doctor finder AI agent.
 *
 * - smartDoctorFinder - A function that suggests the most appropriate specialist based on symptoms.
 * - SmartDoctorFinderInput - The input type for the smartDoctorFinder function.
 * - SmartDoctorFinderOutput - The return type for the smartDoctorFinder function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartDoctorFinderInputSchema = z.object({
  symptomsDescription: z
    .string()
    .describe('A description of the patients symptoms and medical history.'),
  availableDoctors: z.array(z.string()).describe('A list of available doctors.'),
});
export type SmartDoctorFinderInput = z.infer<typeof SmartDoctorFinderInputSchema>;

const SmartDoctorFinderOutputSchema = z.object({
  suggestedSpecialist: z
    .string()
    .describe('The name of the most appropriate specialist for the patient.'),
  reasoning: z.string().describe('The reasoning behind the suggestion.'),
});
export type SmartDoctorFinderOutput = z.infer<typeof SmartDoctorFinderOutputSchema>;

export async function smartDoctorFinder(input: SmartDoctorFinderInput): Promise<SmartDoctorFinderOutput> {
  return smartDoctorFinderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartDoctorFinderPrompt',
  input: {schema: SmartDoctorFinderInputSchema},
  output: {schema: SmartDoctorFinderOutputSchema},
  prompt: `You are an AI assistant helping patients find the most appropriate medical specialist based on their symptoms and available doctors.

  Given the following patient's description of symptoms and medical history:
  {{symptomsDescription}}

  And the following list of available doctors:
  {{#each availableDoctors}}
  - {{this}}
  {{/each}}

  Suggest the most appropriate specialist from the available doctors and explain your reasoning.

  {{output}}
  `,
});

const smartDoctorFinderFlow = ai.defineFlow(
  {
    name: 'smartDoctorFinderFlow',
    inputSchema: SmartDoctorFinderInputSchema,
    outputSchema: SmartDoctorFinderOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
