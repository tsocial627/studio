import { NextResponse } from 'next/server';

// This is a mock database for feedback.
const feedbackStore: any[] = [
  {
    id: '1',
    doctorName: 'Dr. Evelyn Reed',
    rating: 5,
    comment: 'Dr. Reed was fantastic. Very thorough and caring.',
    timestamp: new Date('2023-11-10T10:00:00Z').toISOString(),
  },
  {
    id: '2',
    doctorName: 'Dr. Anya Sharma',
    rating: 4,
    comment: 'Good experience, but the wait time was a bit long.',
    timestamp: new Date('2023-11-12T14:30:00Z').toISOString(),
  }
];

export async function GET() {
  try {
    // In a real app, you'd fetch this from a database.
    // We add a short delay to simulate a network request.
    await new Promise(resolve => setTimeout(resolve, 500));
    return NextResponse.json({ feedback: feedbackStore.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()) }, { status: 200 });
  } catch (error) {
    console.error('Feedback API GET error:', error);
    return NextResponse.json({ message: 'An internal server error occurred' }, { status: 500 });
  }
}


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
