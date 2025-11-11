import { NextRequest, NextResponse } from 'next/server';
import { fetchTemplate } from '@/lib/templates';

const ENABLE_TEMPLATES_STORE = process.env.NEXT_PUBLIC_ENABLE_TEMPLATES_STORE === 'true';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Return "not available" if templates store is not enabled
  if (!ENABLE_TEMPLATES_STORE) {
    return NextResponse.json(
      { error: 'Templates store is not available' },
      { 
        status: 503,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
        },
      }
    );
  }

  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Template ID is required' },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
          },
        }
      );
    }
    
    const template = await fetchTemplate(id);
    
    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { 
          status: 404,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
          },
        }
      );
    }
    
    return NextResponse.json(template, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in template API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch template' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
        },
      }
    );
  }
}

