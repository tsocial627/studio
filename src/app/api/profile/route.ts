import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const profileData = await request.json();

    if (!profileData.fullName) {
      return NextResponse.json({ message: 'Full name is required' }, { status: 400 });
    }

    // In a real application, you'd save this to a database user profile.
    console.log('Updating profile with data:', profileData);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json({ message: 'Profile updated successfully' }, { status: 200 });

  } catch (error) {
    console.error('Profile API error:', error);
    return NextResponse.json({ message: 'An internal server error occurred' }, { status: 500 });
  }
}
