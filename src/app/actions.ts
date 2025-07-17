'use server';
import { smartDoctorFinder, type SmartDoctorFinderInput } from '@/ai/flows/smart-doctor-finder';

export async function findSpecialistAction(input: SmartDoctorFinderInput) {
  try {
    const result = await smartDoctorFinder(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `Failed to find a specialist: ${errorMessage}` };
  }
}
