const GITHUB_USERNAME = 'Sammii-HK';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

export type GitHubRepo = {
  name: string;
  fullName: string;
  description: string;
  githubUrl: string;
  language: string;
  updatedAt: string;
  isPublic: boolean;
  stars: number;
  forks: number;
  homepage: string | null;
  topics: string[];
};

interface GitHubRepoRaw {
  name: string;
  description: string | null;
  language: string | null;
  topics: string[];
  private: boolean;
  updated_at: string;
  html_url: string;
  full_name: string;
  stargazers_count: number;
  forks_count: number;
  homepage: string | null;
}

function generateDescriptionFromRepo(repo: GitHubRepoRaw): string {
  // If there's a description, use it
  if (repo.description && repo.description.trim()) {
    return repo.description;
  }

  // Generate description from name and topics
  const name = repo.name;
  const topics = repo.topics || [];
  
  // Known product descriptions based on repo names
  const knownDescriptions: Record<string, string> = {
    'reo-ai': 'A beautiful, minimal landing page for Reo - the conversational life tracker',
    'notify-me': 'AI Social Content Engine - An automated social media content generation and scheduling platform',
    'ai-voiceover': 'AI-powered voiceover generation tool for creating professional audio content',
    'iconify': 'Icon management and customization tool for designers and developers',
    'iprep': 'Preparation and study tool to help you stay organized and focused',
    'content-creator': 'Content creation and management platform for creators and marketers',
  };
  
  // Check if we have a known description
  if (knownDescriptions[name.toLowerCase()]) {
    return knownDescriptions[name.toLowerCase()];
  }
  
  // Create a description based on name and topics
  const nameWords = name.split('-').join(' ');
  const topicWords = topics.length > 0 ? topics.join(', ') : '';
  
  if (topics.length > 0) {
    return `${nameWords.charAt(0).toUpperCase() + nameWords.slice(1)} - ${topicWords}`;
  }
  
  // Fallback: create description from name
  const capitalizedName = name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return `${capitalizedName} - A ${repo.language || 'web'} application`;
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    // Fetch with pagination - get up to 100 repos per page
    let allRepos: GitHubRepoRaw[] = [];
    let page = 1;
    const perPage = 100;
    let hasMore = true;

    while (hasMore) {
      const url = `${GITHUB_API_URL}?per_page=${perPage}&page=${page}&sort=updated&direction=desc`;
      const response = await fetch(url, {
        next: { revalidate: 300 }, // Cache for 5 minutes (reduced for debugging)
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          // Add GitHub token if you have one for higher rate limits (optional)
          // 'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        },
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const repos = await response.json();
      
      if (repos.length === 0) {
        hasMore = false;
      } else {
        allRepos = allRepos.concat(repos);
        // If we got fewer than per_page, we've reached the end
        if (repos.length < perPage) {
          hasMore = false;
        } else {
          page++;
        }
      }
    }

    const repos = allRepos;

    // Transform the data to match our structure
    const formattedRepos: GitHubRepo[] = repos.map((repo: GitHubRepoRaw) => ({
      name: repo.name,
      fullName: repo.full_name,
      description: generateDescriptionFromRepo(repo),
      githubUrl: repo.html_url,
      language: repo.language || 'Other',
      updatedAt: repo.updated_at,
      isPublic: !repo.private,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      homepage: repo.homepage,
      topics: repo.topics || [],
    }));

    // Sort by updated date (most recent first)
    formattedRepos.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

    return formattedRepos;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

async function fetchReadmeImage(repoName: string): Promise<string | null> {
  try {
    const readmeUrl = `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/readme`;
    const response = await fetch(readmeUrl, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      return null;
    }

    const readme = await response.json();
    
    // Decode base64 content
    const content = Buffer.from(readme.content, 'base64').toString('utf-8');
    
    // Extract first image URL from markdown
    // Match ![alt](url) or ![alt text](url "title")
    const imageRegex = /!\[.*?\]\((.*?)(?:\s+"[^"]*")?\)/;
    const match = content.match(imageRegex);
    
    if (match && match[1]) {
      let imageUrl = match[1];
      
      // Handle relative URLs - convert to raw GitHub URLs
      if (imageUrl.startsWith('./') || !imageUrl.startsWith('http')) {
        // Convert relative path to raw GitHub URL
        const branch = readme.html_url.split('/').pop()?.replace('.md', '') || 'main';
        const path = imageUrl.replace('./', '');
        imageUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoName}/${branch}/${path}`;
      }
      
      // Handle GitHub blob URLs - convert to raw
      if (imageUrl.includes('github.com') && imageUrl.includes('/blob/')) {
        imageUrl = imageUrl.replace('/blob/', '/').replace('github.com', 'raw.githubusercontent.com');
      }
      
      return imageUrl;
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching README for ${repoName}:`, error);
    return null;
  }
}

export async function fetchProjectImages(repoNames: string[]): Promise<Map<string, string>> {
  const imageMap = new Map<string, string>();
  
  // Fetch images for all repos in parallel
  const promises = repoNames.map(async (repoName) => {
    const imageUrl = await fetchReadmeImage(repoName);
    if (imageUrl) {
      imageMap.set(repoName.toLowerCase(), imageUrl);
    }
  });
  
  await Promise.all(promises);
  return imageMap;
}

export function formatUpdatedDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / 60000);
  const diffInHours = Math.floor(diffInMs / 3600000);
  const diffInDays = Math.floor(diffInMs / 86400000);

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString();
  }
}

