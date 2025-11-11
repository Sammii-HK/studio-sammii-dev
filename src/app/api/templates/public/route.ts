import { NextRequest, NextResponse } from 'next/server';
import { fetchTemplates, FetchTemplatesParams } from '@/lib/templates';

const ENABLE_TEMPLATES_STORE = process.env.NEXT_PUBLIC_ENABLE_TEMPLATES_STORE === 'true';

export async function GET(request: NextRequest) {
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
    const searchParams = request.nextUrl.searchParams;
    
    // Extract query parameters
    const params: FetchTemplatesParams = {};
    
    const style = searchParams.get('style');
    if (style) params.style = style;
    
    const category = searchParams.get('category');
    if (category) params.category = category;
    
    const featured = searchParams.get('featured');
    if (featured !== null) {
      params.featured = featured === 'true';
    }
    
    const limit = searchParams.get('limit');
    if (limit) {
      const limitNum = parseInt(limit, 10);
      if (!isNaN(limitNum)) params.limit = limitNum;
    }
    
    const offset = searchParams.get('offset');
    if (offset) {
      const offsetNum = parseInt(offset, 10);
      if (!isNaN(offsetNum)) params.offset = offsetNum;
    }
    
    const data = await fetchTemplates(params);
    
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in templates API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
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

