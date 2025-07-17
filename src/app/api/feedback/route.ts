import { NextResponse } from 'next/server';

// This is a mock database for feedback.
const feedbackStore: any[] = [];

export async function POST(request: Request) {
  try {
    const { doctorName, rating, comment } = await request.json();

    if (!doctorName || !rating) {
      return NextResponse.json({ message: 'Doctor name and rating are required' }, { status: 400 });
    }
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const newFeedback = {
      id: Date.now().toString(),
      doctorName,
      rating,
      comment,
      timestamp: new Date().toISOString(),
    };

    feedbackStore.push(newFeedback);
    console.log('New feedback received:', newFeedback);

    return NextResponse.json({ message: 'Feedback submitted successfully', feedback: newFeedback }, { status: 201 });

  } catch (error) {
    console.error('Feedback API error:', error);
    return NextResponse.json({ message: 'An internal server error occurred' }, { status: 500 });
  }
}
