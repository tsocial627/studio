import { NextResponse } from 'next/server';

// This is a mock database. In a real app, you'd use a proper database.
const appointments = new Set<string>();

export async function POST(request: Request) {
  try {
    const { doctorId, doctorName, action } = await request.json();

    if (!doctorId || !doctorName || !action) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (action === 'book') {
      appointments.add(doctorId);
      console.log(`Appointment booked with ${doctorName} (ID: ${doctorId})`);
      return NextResponse.json({ message: 'Appointment Booked!' }, { status: 200 });
    } else if (action === 'cancel') {
      appointments.delete(doctorId);
      console.log(`Appointment with ${doctorName} (ID: ${doctorId}) cancelled`);
      return NextResponse.json({ message: 'Appointment Cancelled' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    console.error('Appointments API error:', error);
    return NextResponse.json({ message: 'An internal server error occurred' }, { status: 500 });
  }
}
