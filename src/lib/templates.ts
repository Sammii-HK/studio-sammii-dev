const STUDIO_STORE_API_URL = process.env.STUDIO_STORE_API_URL || 'https://framify-nine.vercel.app';

export type TemplateStats = {
  views: number;
  downloads: number;
  sales: number;
};

export type Template = {
  id: string;
  title: string;
  description: string;
  style: string;
  category: string;
  tags: string[];
  price: number;
  licenseType: string;
  thumbnailUrl: string;
  previewUrl: string;
  viewUrl: string;
  purchaseUrl?: string;
  stats: TemplateStats;
  featured: boolean;
  createdAt: string;
};

export type Pagination = {
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
};

export type TemplatesResponse = {
  templates: Template[];
  pagination: Pagination;
};

export type SingleTemplateResponse = Template;

export interface FetchTemplatesParams {
  style?: string;
  category?: string;
  featured?: boolean;
  limit?: number;
  offset?: number;
}

export async function fetchTemplates(params: FetchTemplatesParams = {}): Promise<TemplatesResponse> {
  try {
    const { style, category, featured, limit = 20, offset = 0 } = params;
    
    // Build query string
    const queryParams = new URLSearchParams();
    if (style) queryParams.append('style', style);
    if (category) queryParams.append('category', category);
    if (featured !== undefined) queryParams.append('featured', featured.toString());
    queryParams.append('limit', limit.toString());
    queryParams.append('offset', offset.toString());
    
    const url = `${STUDIO_STORE_API_URL}/api/templates/public?${queryParams.toString()}`;
    
    const response = await fetch(url, {
      next: { revalidate: 300 }, // Cache for 5 minutes
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Studio Store API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching templates:', error);
    // Return empty response on error
    return {
      templates: [],
      pagination: {
        total: 0,
        limit: 20,
        offset: 0,
        hasMore: false,
      },
    };
  }
}

export async function fetchTemplate(id: string): Promise<SingleTemplateResponse | null> {
  try {
    const url = `${STUDIO_STORE_API_URL}/api/templates/${id}/public`;
    
    const response = await fetch(url, {
      next: { revalidate: 300 }, // Cache for 5 minutes
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Studio Store API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching template ${id}:`, error);
    return null;
  }
}

