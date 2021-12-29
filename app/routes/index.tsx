export default function Home() {
	const handleLogin = () => console.log('handleLogin')
	return (
		<div>
			<h1>Welcome to PLM</h1>
			<button type="button" onClick={handleLogin}>
        Login with Spotify
			</button>
			<p>Maded by 9gu :P</p>
		</div>
	)
}
