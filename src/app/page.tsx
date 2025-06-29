import { Toaster } from 'react-hot-toast';
import AnimeContent from './components/animeContent';
import AnimeHero from './components/heroAnime';

export default function Home() {
	return (
		<main>
			<Toaster />
			<AnimeHero></AnimeHero>
			<AnimeContent></AnimeContent>
		</main>
	);
}
