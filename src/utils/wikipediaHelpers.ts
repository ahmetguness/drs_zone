export const getWikipediaImageUrl = async (wikipediaUrl: string) => {
  try {
    const pageTitle = wikipediaUrl.split("/").pop();

    if (!pageTitle) return null;

    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
        pageTitle
      )}&prop=pageimages&format=json&pithumbsize=500&origin=*`
    );

    const data = await response.json();
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];

    return pages[pageId].thumbnail?.source || null;
  } catch (error) {
    console.error("Error fetching Wikipedia image:", error);
    return null;
  }
};
