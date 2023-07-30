// Import your Client Component
import HomePage from './home-page';

// async function getPosts() {
//   const res = await fetch('https://...');
//   const posts = await res.json();
//   return posts;
// }
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncTimeout() {
  console.log('Start');
  await delay(100);
  console.log('End');
  return 'end';
}

export default async function Page() {
  // Fetch data directly in a Server Component
  const returnString = await asyncTimeout();
  console.log(returnString);
  // Forward fetched data to your Client Component
  return <HomePage test={returnString} />;
}
