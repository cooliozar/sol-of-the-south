import releases from '../data/releases.json';
import tracks from '../data/tracks.json';
import shows from '../data/shows.json';
import posts from '../data/posts.json';
import photos from '../data/photos.json';
import videos from '../data/videos.json';
import merch from '../data/merch.json';

function sortItems(items, sortKey) {
  if (!sortKey) return items;
  const desc = sortKey.startsWith('-');
  const key = desc ? sortKey.slice(1) : sortKey;
  return [...items].sort((a, b) => {
    const av = a[key];
    const bv = b[key];
    if (av == null && bv == null) return 0;
    if (av == null) return 1;
    if (bv == null) return -1;
    const cmp = av < bv ? -1 : av > bv ? 1 : 0;
    return desc ? -cmp : cmp;
  });
}

function createEntity(data) {
  return {
    list: (sortKey, limit) => {
      let result = sortItems(data, sortKey);
      if (limit != null) result = result.slice(0, limit);
      return Promise.resolve(result);
    },
    filter: (criteria, sortKey, limit) => {
      let result = data.filter(item =>
        Object.entries(criteria).every(([k, v]) => item[k] === v)
      );
      result = sortItems(result, sortKey);
      if (limit != null) result = result.slice(0, limit);
      return Promise.resolve(result);
    },
  };
}

export const Release = createEntity(releases);
export const Track = createEntity(tracks);
export const Show = createEntity(shows);
export const Post = createEntity(posts);
export const Photo = createEntity(photos);
export const Video = createEntity(videos);
export const MerchItem = createEntity(merch);
