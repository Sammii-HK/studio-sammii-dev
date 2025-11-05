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

function generateDescriptionFromRepo(repo: any): string {
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
    let allRepos: any[] = [];
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
    const formattedRepos: GitHubRepo[] = repos.map((repo: any) => ({
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

